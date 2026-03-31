import { PgCaucionRepository } from "../../infra/repository/CaucionRepository"
import { CaucionRepository, CaucionUseCase } from "../../interfaces/CaucionInterfaces"

export class FindCaucionDetail implements CaucionUseCase {
  private readonly repo: CaucionRepository

  constructor() {
    this.repo = new PgCaucionRepository()
  }

  async exec(instrumentId: string) {
    return await this.repo.findDetailByInstrument(instrumentId)
  }
}
