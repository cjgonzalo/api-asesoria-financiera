import { InstrumentPricesService } from "../../../shared/app/services/InstrumentPrices.service"
import { FindAllCedears } from "../usecases/FindAllCedears"
import { FindCedearDetail } from "../usecases/FindCedearDetail"

export const CedearService = {
  async findAllDetails() {
    return await new FindAllCedears().exec()
  },

  async findDetailByInstrument(instrumentId: string) {
    return await new FindCedearDetail().exec(instrumentId)
  },

  async findCurrentPrices(instrumentId: string) {
    return await InstrumentPricesService.findCurrentPrices(instrumentId)
  },

  async findPricesByInstrument(instrumentId: string) {
    return await InstrumentPricesService.findPricesByInstrument(instrumentId)
  },
}
