import "dotenv/config"
import { connectToPostgre, getDataSource } from "../../db/db-connection"
import { DollarPricesService } from "../../modules/market/instruments/dollar/app/services/DollarPrices.service"

const fetchAndInsertPrices = async () => {
  try {
    if(!getDataSource()) {
      await connectToPostgre()
    }

    await DollarPricesService.saveCurrentPrices()
    console.log("Prices succesfully updated")
  } catch(error) {
    console.error(error)
  }
}

const main = async () => {
  // Update dollar prices every minute
  setInterval(fetchAndInsertPrices, 1000 * 60 * 2)
}

main()
  .catch(error => console.error(error))
  .finally(() => process.exit(0))