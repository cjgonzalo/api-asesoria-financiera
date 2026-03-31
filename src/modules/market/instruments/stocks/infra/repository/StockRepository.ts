import { Repository } from "typeorm"
import { getDataSource } from "../../../../../../db/db-connection"
import { StockDetail, StockRepository } from "../../interfaces/StockInterfaces"
import { StocksDetailEntity } from "../entities/StocksDetailEntity"

export class PgStockRepository implements StockRepository {
  private readonly detailRepo: Repository<StocksDetailEntity>

  constructor() {
    this.detailRepo = getDataSource()!.getRepository(StocksDetailEntity)
  }

  async findAllDetails(): Promise<StockDetail[]> {
    return await this.detailRepo.find()
  }

  async findDetailByInstrument(instrumentId: string): Promise<StockDetail | null> {
    return await this.detailRepo.findOne({
      where: { instrumentId }
    })
  }
}
