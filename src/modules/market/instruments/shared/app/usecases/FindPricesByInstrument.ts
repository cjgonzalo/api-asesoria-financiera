import { PgInstrumentRepository } from "../../infra/repository/InstrumentRepository"
import { InstrumentRepository, InstrumentUseCase } from "../../interfaces/InstrumentInterfaces"

export class FindPricesByInstrument implements InstrumentUseCase {
  private readonly repo: InstrumentRepository

  constructor() {
    this.repo = new PgInstrumentRepository()
  }

  async exec(instrumentId: string) {
    return await this.repo.findPricesByInstrument(instrumentId)
  }
}
