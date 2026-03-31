import { FindAllCauciones } from "../usecases/FindAllCauciones"
import { FindCaucionDetail } from "../usecases/FindCaucionDetail"
import { FindCaucionMetrics } from "../usecases/FindCaucionMetrics"
import { FindCurrentCaucionMetrics } from "../usecases/FindCurrentCaucionMetrics"

export const CaucionService = {
  async findAllDetails() {
    return await new FindAllCauciones().exec()
  },

  async findDetailByInstrument(instrumentId: string) {
    return await new FindCaucionDetail().exec(instrumentId)
  },

  async findCurrentMetrics(instrumentId: string) {
    return await new FindCurrentCaucionMetrics().exec(instrumentId)
  },

  async findMetricsByInstrument(instrumentId: string) {
    return await new FindCaucionMetrics().exec(instrumentId)
  },
}
