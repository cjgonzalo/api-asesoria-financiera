import { CustomError } from "../../../../../errors/CustomError";
import { PgIndicatorRepository } from "../../infra/repository/IndicatorRepository";
import { Indicator, IndicatorRepository, IndicatorUseCase } from "../../interfaces/IndicatorInterfaces";
import { INDICATOR_NOT_FOUND } from "../errors/IndicatorErrors";

export class FindIndicatorById implements IndicatorUseCase {
  private readonly repo: IndicatorRepository

  constructor() {
    this.repo = new PgIndicatorRepository()
  }

  async exec(id: string): Promise<Indicator> {
    const indicator = await this.repo.findIndicatorById(id)
    
    if(!indicator) {
      throw new CustomError(INDICATOR_NOT_FOUND)
    }

    return indicator 
  }
}