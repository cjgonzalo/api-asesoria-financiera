import { CustomError } from "../../../../../errors/CustomError";
import { PgIndicatorRepository } from "../../infra/repository/IndicatorRepository";
import { Indicator, IndicatorRepository, IndicatorUseCase } from "../../interfaces/IndicatorInterfaces";
import { INDICATOR_NOT_FOUND } from "../errors/IndicatorErrors";

export class FindIndicatorByName implements IndicatorUseCase {
  private readonly repo: IndicatorRepository

  constructor() {
    this.repo = new PgIndicatorRepository()
  }

  async exec(name: string): Promise<Indicator> {
    const indicator = await this.repo.findIndicatorByName(name)
    
    if(!indicator) {
      throw new CustomError(INDICATOR_NOT_FOUND)
    }

    return indicator 
  }
}