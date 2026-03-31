import { PgCedearRepository } from "../../infra/repository/CedearRepository"
import { CedearRepository, CedearUseCase } from "../../interfaces/CedearInterfaces"

export class FindCedearDetail implements CedearUseCase {
  private readonly repo: CedearRepository

  constructor() {
    this.repo = new PgCedearRepository()
  }

  async exec(instrumentId: string) {
    return await this.repo.findDetailByInstrument(instrumentId)
  }
}
