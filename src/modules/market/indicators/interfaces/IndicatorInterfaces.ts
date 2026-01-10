export interface Indicator {
  id: string,
  name: string,
  unit: string
}

export interface IndicatorObservation {
  indicatorId: string,
  value: number,
  date: Date
}

export type ObservationWithName = IndicatorObservation & { indicator: string }

export interface IndicatorRepository {
  findAllIndicators(): Promise<Indicator[]>
  findIndicatorById(id: string): Promise<Indicator | null>
  findIndicatorByName(name: string): Promise<Indicator | null>
  findAllObservations(): Promise<IndicatorObservation[]>
  findObservationsById(id: string): Promise<IndicatorObservation[]>
  saveLatestObservations(obs: IndicatorObservation[]): Promise<void>
}

export interface IndicatorApiResponse {
  fecha: string,
  valor: number
}

export enum IndicatorNames {
  COUNTRY_RISK = "riesgo-pais",
  MONTHLY_INFLATION = "inflacion",
  YEARLY_INFLATION = "inflacionInteranual",
}

export interface IndicatorUseCase {
  exec(param:
    IndicatorObservation |
    IndicatorObservation[] |
    string
  ): Promise<
      Indicator |  
      Indicator[] |  
      IndicatorObservation |
      IndicatorObservation[] |
      void
    >
}