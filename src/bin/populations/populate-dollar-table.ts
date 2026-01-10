import "dotenv/config"
import { randomUUID } from "crypto";
import {
  DataSource,
  Table,
  TableForeignKey,
  QueryRunner,
} from "typeorm";
import {
  connectToPostgre,
  disconnectFromPostgre,
} from "../../db/db-connection";

const HOUSES = [
  "OFICIAL",
  "BLUE",
  "BOLSA",
  "CONTADOCONLIQUI",
  "CRIPTO",
  "MAYORISTA",
  "TARJETA"
] as const;

type House = (typeof HOUSES)[number];

type HousePriceResponse = {
  casa: string;
  fecha: string;
  compra: number;
  venta: number;
};

type DollarPriceRow = {
  house_id: string;
  date: string;
  bid_price: number | null;
  ask_price: number | null;
};

const ensureTables = async (dataSource: DataSource) => {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    const hasHouses = await queryRunner.hasTable("dollar_houses");
    if (!hasHouses) {
      await queryRunner.createTable(
        new Table({
          name: "dollar_houses",
          columns: [
            {
              name: "id",
              type: "uuid",
              isPrimary: true,
              isNullable: false,
            },
            {
              name: "house",
              type: "varchar",
              length: "20",
              isNullable: false,
            },
          ],
        }),
      );
    }

    const hasPrices = await queryRunner.hasTable("dollar_prices");
    if (!hasPrices) {
      await queryRunner.createTable(
        new Table({
          name: "dollar_prices",
          columns: [
            {
              name: "house_id",
              type: "uuid",
              isPrimary: true,
              isNullable: false,
            },
            {
              name: "date",
              type: "date",
              isPrimary: true,
              isNullable: false,
            },
            {
              name: "bid_price",
              type: "numeric",
              isNullable: true,
            },
            {
              name: "ask_price",
              type: "numeric",
              isNullable: true,
            },
          ],
          foreignKeys: [
            new TableForeignKey({
              columnNames: ["house_id"],
              referencedTableName: "dollar_houses",
              referencedColumnNames: ["id"],
            }),
          ],
        }),
      );
    }
  } finally {
    await queryRunner.release();
  }
};

const ensureHouses = async (queryRunner: QueryRunner) => {
  const existingRows: Array<{ id: string; house: string }> =
    await queryRunner.query("SELECT id, house FROM dollar_houses");
  const houseMap = new Map(
    existingRows.map((row) => [row.house, row.id]),
  );

  const missingHouses = HOUSES.filter((house) => !houseMap.has(house));
  if (missingHouses.length > 0) {
    const insertRows = missingHouses.map((house) => ({
      id: randomUUID(),
      house,
    }));

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("dollar_houses")
      .values(insertRows)
      .execute();

    insertRows.forEach((row) => {
      houseMap.set(row.house, row.id);
    });
  }

  return houseMap;
};

const fetchHousePrices = async (house: House, houseId: string) => {
  const response = await fetch(
    `https://api.argentinadatos.com/v1/cotizaciones/dolares/${house.toLowerCase()}`,
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch dollar prices for ${house}: ${response.statusText}`,
    );
  }

  const payload = (await response.json()) as
    | HousePriceResponse
    | HousePriceResponse[];
  const items = Array.isArray(payload) ? payload : [payload];

  return items.map((item) => ({
    house_id: houseId,
    date: item.fecha,
    bid_price: item.compra ?? null,
    ask_price: item.venta ?? null,
  }));
};

const insertPrices = async (
  queryRunner: QueryRunner,
  rows: DollarPriceRow[],
) => {
  if (rows.length === 0) {
    return;
  }
  const sql = `INSERT INTO dollar_prices ("house_id","date","bid_price","ask_price") VALUES ($1,$2,$3,$4) ON CONFLICT ("house_id","date") DO UPDATE SET "bid_price" = EXCLUDED."bid_price", "ask_price" = EXCLUDED."ask_price"`;

  for (const row of rows) {
    await queryRunner.query(sql, [row.house_id, row.date, row.bid_price, row.ask_price]);
  }
};

const main = async () => {
  const dataSource = await connectToPostgre();
  try {
    await ensureTables(dataSource);

    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      const houseMap = await ensureHouses(queryRunner);

      const priceRows = (
        await Promise.all(
          HOUSES.map((house) => {
            const houseId = houseMap.get(house);
            if (!houseId) {
              throw new Error(`Missing house id for ${house}`);
            }
            return fetchHousePrices(house, houseId);
          }),
        )
      ).flat();

      await insertPrices(queryRunner, priceRows);
    } finally {
      await queryRunner.release();
    }
  } finally {
    await disconnectFromPostgre();
    console.log("Finally")
  }
};

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exitCode = 1;
});