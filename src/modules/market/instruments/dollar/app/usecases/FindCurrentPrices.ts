import { PgDollarRepository } from "../../infra/repository/DollarRepository";
import { DollarPrice, DollarRepository, DollarUseCase } from "../../interfaces/DollarInterfaces";

export class FindCurrentPrices implements DollarUseCase {
  private readonly repo: DollarRepository
  
  constructor() {
    this.repo = new PgDollarRepository()
  }

  async exec(): Promise<DollarPrice[]> {
    return await this.repo.findCurrentPrices()
  }
}