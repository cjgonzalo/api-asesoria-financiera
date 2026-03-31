import { FindCurrentPrices } from "../usecases/FindCurrentPrices"
import { FindPricesByInstrument } from "../usecases/FindPricesByInstrument"

export const InstrumentPricesService = {
  async findCurrentPrices(instrumentId: string) {
    return await new FindCurrentPrices().exec(instrumentId)
  },

  async findPricesByInstrument(instrumentId: string) {
    return await new FindPricesByInstrument().exec(instrumentId)
  },
}
