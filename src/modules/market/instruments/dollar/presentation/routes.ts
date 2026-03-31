import { Router } from "express";
import DollarPricesController from "./controllers/DollarPricesController";

const router = Router()

router.get("/dollar/:instrumentId/current", DollarPricesController.findCurrentPrices)
router.get("/dollar/:instrumentId", DollarPricesController.findByInstrument)

export default router