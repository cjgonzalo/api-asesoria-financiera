import { Router } from "express";
import IndicatorController from "./controllers/IndicatorController"

const indicatorsRouter = Router()

indicatorsRouter.get("/", IndicatorController.getAllIndicators)

indicatorsRouter.get("/observations", IndicatorController.getAllObservations)
indicatorsRouter.get("/observations{/:id}", IndicatorController.getObservationsById)

indicatorsRouter.get("{/:indicatorName}", IndicatorController.getIndicatorByName)

export default indicatorsRouter