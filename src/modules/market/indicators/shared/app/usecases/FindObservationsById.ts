import { CustomError } from "../../../../../../errors/CustomError";
import { PgIndicatorRepository } from "../../infra/repository/IndicatorRepository";
import { IndicatorObservation, IndicatorRepository, IndicatorUseCase } from "../../interfaces/IndicatorInterfaces";
import { INDICATOR_NOT_FOUND } from "../errors/IndicatorErrors";

export class FindObservationsById implements IndicatorUseCase {
  private readonly repo: IndicatorRepository

  constructor() {
    this.repo = new PgIndicatorRepository()
  }

  async exec(id: string): Promise<IndicatorObservation[]> {
    const observations = await this.repo.findObservationsById(id)
    
    if(!observations.length) {
      throw new CustomError(INDICATOR_NOT_FOUND)
    }

    return observations 
  }
}