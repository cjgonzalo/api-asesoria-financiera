import { UUID } from "crypto";
import { PgDollarRepository } from "../../infra/repository/DollarRepository";
import { DollarRepository, DollarUseCase } from "../../interfaces/DollarInterfaces";

export class FindPricesByHouse implements DollarUseCase {
  private readonly repo: DollarRepository
  
  constructor() {
    this.repo = new PgDollarRepository()
  }
  
  async exec(house: UUID) {
    return await this.repo.findPricesByHouse(house)
  }
}