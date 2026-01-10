import { FindAllIndicators } from "../usecases/FindAllIndicators"
import { FindAllObservations } from "../usecases/FindAllObservations"
import { FindIndicatorById } from "../usecases/FindIndicatorById"
import { FindIndicatorByName } from "../usecases/FindIndicatorByName"
import { FindObservationsById } from "../usecases/FindObservationsById"
import { SaveLatestObservations } from "../usecases/SaveLatestObservations"

export const IndicatorService = {
  async getAllIndicators() {
    return await new FindAllIndicators().exec()
  },

  async getIndicatorById(id: string) {
    return await new FindIndicatorById().exec(id)
  },

  async getIndicatorByName(name: string) {
    return await new FindIndicatorByName().exec(name)
  },

  async getAllObservations() {
    return await new FindAllObservations().exec()
  },

  async getObservationsById(id: string) {
    return await new FindObservationsById().exec(id)
  },

  async saveLatestObservations() {
    return await new SaveLatestObservations().exec()
  },
}