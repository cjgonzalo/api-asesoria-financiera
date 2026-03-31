export interface InstrumentPrice {
  listingId: string
  instrumentId: string
  date: Date
  openPrice?: number | null
  closePrice?: number | null
  previousClosingPrice?: number | null
  highestPrice?: number | null
  lowestPrice?: number | null
  lastAskPrice?: number | null
  lastBidPrice?: number | null
  tradesCount?: number | null
  tradeVolume?: number | null
  imbalance?: number | null
  vwap?: number | null
  symbol: string
  marketId: number
  currencyId: number
  settlementTypeId: number
  securityTypeId: number
}

export interface InstrumentRepository {
  findCurrentPrices(instrumentId: string): Promise<InstrumentPrice[]>
  findPricesByInstrument(instrumentId: string): Promise<InstrumentPrice[]>
}

export interface InstrumentUseCase {
  exec(instrumentId: string): Promise<InstrumentPrice[]>
}
