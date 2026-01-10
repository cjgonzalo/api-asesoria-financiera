import { CustomError } from "../../../../../../errors/CustomError";
import { PgIndicatorRepository } from "../../infra/repository/IndicatorRepository";
import { Indicator, IndicatorRepository, IndicatorUseCase } from "../../interfaces/IndicatorInterfaces";
import { INDICATOR_NOT_FOUND } from "../errors/IndicatorErrors";

export class FindAllIndicators implements IndicatorUseCase {
  private readonly repo: IndicatorRepository

  constructor() {
    this.repo = new PgIndicatorRepository()
  }

  async exec(): Promise<Indicator[]> {
    const indicators = await this.repo.findAllIndicators()
    
    if(!indicators.length) {
      throw new CustomError(INDICATOR_NOT_FOUND)
    }

    return indicators 
  }
}