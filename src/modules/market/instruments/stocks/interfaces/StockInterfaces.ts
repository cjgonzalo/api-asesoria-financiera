import { InstrumentPrice } from "../../shared/interfaces/InstrumentInterfaces"

export interface StockDetail {
  id: string
  instrumentId: string
  sector?: string
  industry?: string
}

export interface StockDailyMetric {
  id: string
  listingId: string
  date: Date
  marketCap?: number
  peRatio?: number
  dividendYield?: number
}

export interface StockRepository {
  findAllDetails(): Promise<StockDetail[]>
  findDetailByInstrument(instrumentId: string): Promise<StockDetail | null>
}

export interface StockUseCase {
  exec(param: string | null): Promise<StockDetail | StockDetail[] | InstrumentPrice[] | null>
}
