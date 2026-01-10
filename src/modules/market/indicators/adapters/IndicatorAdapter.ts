import { IndicatorService } from "../app/services/IndicatorService";
import { IndicatorApiResponse, IndicatorNames, ObservationWithName } from "../interfaces/IndicatorInterfaces";

export class IndicatorAdapter {
  private readonly argDatosApiBaseUrl: string

  constructor(private readonly indicator: IndicatorNames) {
    this.argDatosApiBaseUrl = "https://api.argentinadatos.com/v1/finanzas/indices"
  }

  private async getIndicatorId(): Promise<string> {
    return (await (IndicatorService.getIndicatorByName(this.indicator))).id
  }

  async getObservations(): Promise<ObservationWithName[]> {
    
    const indicatorId = await this.getIndicatorId()
    const res = await fetch(`${this.argDatosApiBaseUrl}/${this.indicator}`)
    const apiObservations = await res.json() as IndicatorApiResponse[]

    return apiObservations.map(obs => ({
      indicator: this.indicator,
      indicatorId: indicatorId,
      value: obs.valor,
      date: new Date(obs.fecha)
    }))
  }
}