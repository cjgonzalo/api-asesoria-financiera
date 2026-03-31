import { In, Repository } from "typeorm"
import { getDataSource } from "../../../../../../db/db-connection"
import { DollarPrice, DollarRepository } from "../../interfaces/DollarInterfaces"
import { DollarPriceEntity } from "../entities/DollarPricesEntity"
import { DollarHouseEntity } from "../entities/DollarHousesEntity"

export class PgDollarRepository implements DollarRepository {
  private readonly dollarRepo: Repository<DollarPriceEntity>
  
  constructor() {
    this.dollarRepo = getDataSource()!.getRepository(DollarPriceEntity)
  }

  async findCurrentPrices(): Promise<DollarPrice[]> {
    return await this.dollarRepo
      .createQueryBuilder("dp")
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select("MAX(sub.date)", "maxDate")
          .addSelect("sub.house", "house")
          .from(DollarPriceEntity, "sub")
          .groupBy("sub.house")
          .getQuery()

        return `(dp.house, dp.date) IN (${subQuery})`
      })
      .leftJoinAndSelect("dp.dollarHouse", "house")
      .orderBy("dp.date", "DESC")
      .getMany()
  }

  async findPricesByHouse(house: number): Promise<DollarPrice[]> {
    return await this.dollarRepo.find({
      where: { house },
      relations: { dollarHouse: true },
      order: { date: "DESC" },
    })
  }

  async savePrices(pricesByHouse: DollarPrice[]): Promise<void> {
    const houseRepo = getDataSource()!.getRepository(DollarHouseEntity)
    const houses = await houseRepo.find({
      where: { house: In(pricesByHouse.map(({ house }) => house )) }
    })

    const houseIdByName = new Map(houses.map((house) => [house.house, house.id]))

    const pricesToInsert = pricesByHouse.map(p => ({
      ...p,
      house: houseIdByName.get(String(p.house))
    }))

    const conflictPaths = ["house", "date"]

    await this.dollarRepo.upsert(pricesToInsert, conflictPaths)
  }
}
