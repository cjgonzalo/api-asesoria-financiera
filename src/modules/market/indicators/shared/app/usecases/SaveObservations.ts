import { CustomError } from "../../../../../../errors/CustomError";
import { PgIndicatorRepository } from "../../infra/repository/IndicatorRepository";
import { IndicatorObservation, IndicatorRepository, IndicatorUseCase } from "../../interfaces/IndicatorInterfaces";
import { SAVE_OBSERVATION_ERROR } from "../errors/IndicatorErrors";

export class SaveObservation implements IndicatorUseCase {
  private readonly repo: IndicatorRepository

  constructor() {
    this.repo = new PgIndicatorRepository()
  }

  async exec(observations: IndicatorObservation[]): Promise<void> {
    try {
      await this.repo.saveObservations(observations)
    } catch(error) {
      throw new CustomError(SAVE_OBSERVATION_ERROR)
    }
  }
}