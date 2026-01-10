import { CustomError } from "../../../../../../errors/CustomError";
import { PgIndicatorRepository } from "../../infra/repository/IndicatorRepository";
import { IndicatorObservation, IndicatorRepository, IndicatorUseCase } from "../../interfaces/IndicatorInterfaces";
import { INDICATOR_NOT_FOUND } from "../errors/IndicatorErrors";

export class FindAllObservations implements IndicatorUseCase {
  private readonly repo: IndicatorRepository

  constructor() {
    this.repo = new PgIndicatorRepository()
  }

  async exec(): Promise<IndicatorObservation[]> {
    const observations = await this.repo.findAllObservations()
    
    if(!observations.length) {
      throw new CustomError(INDICATOR_NOT_FOUND)
    }

    return observations 
  }
}