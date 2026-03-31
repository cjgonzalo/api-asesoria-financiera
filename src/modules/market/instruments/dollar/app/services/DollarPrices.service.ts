import { InstrumentPricesService } from "../../../shared/app/services/InstrumentPrices.service"
import { SaveDollarPrice } from "../usecases/SaveDollarPrice"


export const DollarPricesService = {
  async findCurrentPrices(instrumentId: string) {
    return await InstrumentPricesService.findCurrentPrices(instrumentId)
  },

  async findPricesByInstrument(instrumentId: string) {
    return await InstrumentPricesService.findPricesByInstrument(instrumentId)
  },

  async saveCurrentPrices() {
    return await new SaveDollarPrice().exec()
  }
}
