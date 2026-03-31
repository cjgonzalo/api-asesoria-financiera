import { InstrumentPricesService } from "../../../shared/app/services/InstrumentPrices.service"
import { FindAllStocks } from "../usecases/FindAllStocks"
import { FindStockDetail } from "../usecases/FindStockDetail"

export const StockService = {
  async findAllDetails() {
    return await new FindAllStocks().exec()
  },

  async findDetailByInstrument(instrumentId: string) {
    return await new FindStockDetail().exec(instrumentId)
  },

  async findCurrentPrices(instrumentId: string) {
    return await InstrumentPricesService.findCurrentPrices(instrumentId)
  },

  async findPricesByInstrument(instrumentId: string) {
    return await InstrumentPricesService.findPricesByInstrument(instrumentId)
  },
}
