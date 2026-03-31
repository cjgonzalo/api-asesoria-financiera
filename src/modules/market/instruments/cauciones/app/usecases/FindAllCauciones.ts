import { PgCaucionRepository } from "../../infra/repository/CaucionRepository"
import { CaucionRepository, CaucionUseCase } from "../../interfaces/CaucionInterfaces"

export class FindAllCauciones implements CaucionUseCase {
  private readonly repo: CaucionRepository

  constructor() {
    this.repo = new PgCaucionRepository()
  }

  async exec() {
    return await this.repo.findAllDetails()
  }
}
