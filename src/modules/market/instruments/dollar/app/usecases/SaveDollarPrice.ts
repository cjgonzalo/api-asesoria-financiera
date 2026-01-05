import { PgDollarRepository } from "../../infra/repository/DollarRepository";
import { DollarRepository, DollarUseCase } from "../../interfaces/DollarInterfaces";
import { DolarApiAdapter } from "../../adapters/DolarApiAdapter";

export class SaveDollarPrice implements DollarUseCase {
  private readonly repo: DollarRepository
  
  constructor() {
    this.repo = new PgDollarRepository()
  }
  
  async exec() {
    const currentPrices = await new DolarApiAdapter()
      .getCurrentPrices()
    
    return await this.repo.savePrices(currentPrices)
  }
}