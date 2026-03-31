import { InstrumentPrice } from "../../shared/interfaces/InstrumentInterfaces"

export interface CedearDetail {
  id: string
  instrumentId: string
  underlyingSymbol: string
  ratio: number
  underlyingMarket: string
  sector?: string
  industry?: string
  underlyingCurrency?: string
}

export interface CedearDailyMetric {
  id: string
  listingId: string
  date: Date
  impliedPrice?: number
  cclRate?: number
}

export interface CedearRepository {
  findAllDetails(): Promise<CedearDetail[]>
  findDetailByInstrument(instrumentId: string): Promise<CedearDetail | null>
}

export interface CedearUseCase {
  exec(param: string | null): Promise<CedearDetail | CedearDetail[] | InstrumentPrice[] | null>
}
