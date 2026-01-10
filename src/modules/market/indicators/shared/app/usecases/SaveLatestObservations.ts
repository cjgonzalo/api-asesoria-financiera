import { CustomError } from "../../../../../../errors/CustomError";
import { IndicatorAdapter } from "../../adapters/IndicatorAdapter";
import { PgIndicatorRepository } from "../../infra/repository/IndicatorRepository";
import { SAVE_OBSERVATION_ERROR } from "../errors/IndicatorErrors";
import { 
  IndicatorNames,
  IndicatorRepository,
  IndicatorUseCase,
  ObservationWithName
} from "../../interfaces/IndicatorInterfaces";

export class SaveLatestObservations implements IndicatorUseCase {
  private readonly repo: IndicatorRepository

  constructor() {
    this.repo = new PgIndicatorRepository()
  }

  private findLatestByIndicator(indicator: string, obs: ObservationWithName[]) {
    return obs
      .filter(ob => ob.indicator === indicator)
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      .at(0)!
  }

  async exec(): Promise<void> {
    try {
      const indicators = Object.values(IndicatorNames)

      const observations = (await Promise.all(
        indicators.map(
          async ind => await new IndicatorAdapter(ind).getObservations()
        )
      )).flat()

      const latestByIndicator = indicators
        .flatMap(ind => this.findLatestByIndicator(ind, observations))

      await this.repo.saveLatestObservations(latestByIndicator)
    } catch(error) {
      throw new CustomError(SAVE_OBSERVATION_ERROR)
    }
  }
}