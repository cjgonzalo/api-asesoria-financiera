import { PgCaucionRepository } from "../../infra/repository/CaucionRepository"
import { CaucionRepository, CaucionUseCase } from "../../interfaces/CaucionInterfaces"

export class FindCaucionMetrics implements CaucionUseCase {
  private readonly repo: CaucionRepository

  constructor() {
    this.repo = new PgCaucionRepository()
  }

  async exec(instrumentId: string) {
    return await this.repo.findMetricsByInstrument(instrumentId)
  }
}
