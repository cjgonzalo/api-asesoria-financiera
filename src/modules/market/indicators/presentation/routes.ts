import { Router } from "express";
import IndicatorController from "./controllers/IndicatorController"

const indicatorsRouter = Router()

indicatorsRouter.get("/indicators", IndicatorController.getAllIndicators)

indicatorsRouter.get("/indicators/observations", IndicatorController.getAllObservations)
indicatorsRouter.get("/indicators/observations{/:id}", IndicatorController.getObservationsById)

indicatorsRouter.get("/indicators{/:indicatorName}", IndicatorController.getIndicatorByName)

export default indicatorsRouter