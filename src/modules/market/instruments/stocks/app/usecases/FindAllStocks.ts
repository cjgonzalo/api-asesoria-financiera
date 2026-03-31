import { PgStockRepository } from "../../infra/repository/StockRepository"
import { StockRepository, StockUseCase } from "../../interfaces/StockInterfaces"

export class FindAllStocks implements StockUseCase {
  private readonly repo: StockRepository

  constructor() {
    this.repo = new PgStockRepository()
  }

  async exec() {
    return await this.repo.findAllDetails()
  }
}
