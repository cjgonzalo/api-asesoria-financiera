import "dotenv/config"
import { getDataSource, connectToPostgre } from "../../db/db-connection"
import { IndicatorService } from "../../modules/market/indicators/shared/app/services/IndicatorService"

const fetchAndInsertObservations = async () => {
  if(!getDataSource()) {
    await connectToPostgre()
  }

  await IndicatorService.saveLatestObservations()
  console.log("Latest observations succesfully saved")
}

fetchAndInsertObservations()
  .catch(error => console.error(error))
  .finally(() => process.exit(0))