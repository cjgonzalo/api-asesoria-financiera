import { UUID } from "crypto"
import { FindCurrentPrices } from "../usecases/FindCurrentPrices"
import { FindPricesByHouse } from "../usecases/FindPricesByHouse"
import { SaveDollarPrice } from "../usecases/SaveDollarPrice"


export const DollarPricesService = {
  async findCurrentPrices() {
    return await new FindCurrentPrices().exec()
  },

  async findPircesByHouse(house: UUID) {
    return await new FindPricesByHouse().exec(house)
  },

  async saveCurrentPrices() {
    return await new SaveDollarPrice().exec()
  }
}