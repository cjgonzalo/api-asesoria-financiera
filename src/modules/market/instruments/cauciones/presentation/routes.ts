import { Router } from "express"
import CaucionController from "./controllers/CaucionController"

const router = Router()

router.get("/cauciones/", CaucionController.findAll)
router.get("/cauciones/:instrumentId", CaucionController.findDetail)
router.get("/cauciones/:instrumentId/metrics", CaucionController.findMetrics)
router.get("/cauciones/:instrumentId/current", CaucionController.findCurrentMetrics)

export default router
