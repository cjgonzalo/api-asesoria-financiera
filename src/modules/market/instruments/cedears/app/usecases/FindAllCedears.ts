import { PgCedearRepository } from "../../infra/repository/CedearRepository"
import { CedearRepository, CedearUseCase } from "../../interfaces/CedearInterfaces"

export class FindAllCedears implements CedearUseCase {
  private readonly repo: CedearRepository

  constructor() {
    this.repo = new PgCedearRepository()
  }

  async exec() {
    return await this.repo.findAllDetails()
  }
}
