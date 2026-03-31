import { Router } from "express"
import StockController from "./controllers/StockController"

const router = Router()

router.get("/stocks/", StockController.findAll)
router.get("/stocks/:instrumentId", StockController.findDetail)
router.get("/stocks/:instrumentId/prices", StockController.findPrices)
router.get("/stocks/:instrumentId/current", StockController.findCurrentPrices)

export default router
