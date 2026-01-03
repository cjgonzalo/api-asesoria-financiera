import { DataSource } from "typeorm";

let dataSource: DataSource | null = null;
let initPromise: Promise<DataSource> | null = null;

const createDataSource = () => {
  const url = process.env.DATABASE_URL;
  const baseConfig = {
    type: "postgres" as const,
    logging: false,
    synchronize: false,
    entities: [],
  };

  if (url && url.trim().length > 0) {
    return new DataSource({ ...baseConfig, url });
  }
  return new DataSource({
    ...baseConfig,
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 5432),
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "postgres",
  });
};

export const connectToPostgre = async () => {
  if (dataSource?.isInitialized) {
    return dataSource;
  }

  if (!initPromise) {
    dataSource = createDataSource();
    initPromise = dataSource.initialize();
  }

  await initPromise;
  return dataSource as DataSource;
};

export const disconnectFromPostgre = async () => {
  if (!dataSource?.isInitialized) {
    return;
  }

  await dataSource.destroy();
  dataSource = null;
  initPromise = null;
};
