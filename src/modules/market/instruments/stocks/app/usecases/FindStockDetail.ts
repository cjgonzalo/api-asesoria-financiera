import { PgStockRepository } from "../../infra/repository/StockRepository"
import { StockRepository, StockUseCase } from "../../interfaces/StockInterfaces"

export class FindStockDetail implements StockUseCase {
  private readonly repo: StockRepository

  constructor() {
    this.repo = new PgStockRepository()
  }

  async exec(instrumentId: string) {
    return await this.repo.findDetailByInstrument(instrumentId)
  }
}
