import { Repository } from "typeorm"
import { getDataSource } from "../../../../../../db/db-connection"
import { DollarPrice, DollarRepository } from "../../interfaces/DollarInterfaces"
import { DollarPriceEntity } from "../entities/DollarPricesEntity"
import { UUID } from "crypto"

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

  async findPricesByHouse(house: UUID): Promise<DollarPrice[]> {
    return await this.dollarRepo.find({
      where: { house },
      relations: { dollarHouse: true },
      order: { date: "DESC" },
    })
  }

  async savePrice(dollar: DollarPrice): Promise<void> {
    await this.dollarRepo.insert(dollar)
  }
}
