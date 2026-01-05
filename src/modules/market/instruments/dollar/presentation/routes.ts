import { Router } from "express";
import DollarPricesController from "./controllers/DollarPricesController";

const router = Router()

router.get("/dollar/current", DollarPricesController.findCurrentPrices)
router.get("/dollar{/:house}", DollarPricesController.findByHouse)

export default router