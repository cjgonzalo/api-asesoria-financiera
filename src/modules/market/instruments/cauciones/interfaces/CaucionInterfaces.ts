export interface CaucionDetail {
  id: string
  instrumentId: string
  term: number
  type?: string
}

export interface CaucionDailyMetric {
  id: string
  listingId: string
  date: Date
  openRate?: number
  closeRate?: number
  highRate?: number
  lowRate?: number
  term?: number
  tradedAmount?: number
  tradesCount?: number
}

export interface CaucionRepository {
  findAllDetails(): Promise<CaucionDetail[]>
  findDetailByInstrument(instrumentId: string): Promise<CaucionDetail | null>
  findCurrentMetrics(instrumentId: string): Promise<CaucionDailyMetric[]>
  findMetricsByInstrument(instrumentId: string): Promise<CaucionDailyMetric[]>
}

export interface CaucionUseCase {
  exec(param: string | null): Promise<CaucionDetail | CaucionDetail[] | CaucionDailyMetric[] | null>
}
