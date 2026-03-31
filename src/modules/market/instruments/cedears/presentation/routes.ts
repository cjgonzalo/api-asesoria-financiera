import { Router } from "express"
import CedearController from "./controllers/CedearController"

const router = Router()

router.get("/cedears/", CedearController.findAll)
router.get("/cedears/:instrumentId", CedearController.findDetail)
router.get("/cedears/:instrumentId/prices", CedearController.findPrices)
router.get("/cedears/:instrumentId/current", CedearController.findCurrentPrices)

export default router
