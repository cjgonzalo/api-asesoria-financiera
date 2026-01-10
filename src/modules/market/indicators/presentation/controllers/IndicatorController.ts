import { NextFunction, Request, Response } from "express";
import { IndicatorService } from "../../app/services/IndicatorService";
import { success } from "../../../../../views/views";

class IndicatorController {

  async getAllIndicators(_req: Request, res: Response, next: NextFunction) {
    try {
      const indicators = await IndicatorService.getAllIndicators()

      return success(res, {
        data: indicators,
        message: "Country indicators" 
      })

    } catch(error) {
      next(error)
    }
  }

  async getIndicatorByName(req: Request, res: Response, next: NextFunction) {
    try {
      const { indicatorName } = req.params
      const indicator = await IndicatorService.getIndicatorByName(indicatorName)

      return success(res, {
        data: indicator,
        message: `Full ${indicatorName} data` 
      })

    } catch(error) {
      next(error)
    }
  }

  async getAllObservations(_req: Request, res: Response, next: NextFunction) {
    try {
      const observations = await IndicatorService.getAllObservations()

      return success(res, {
        data: observations,
        message: "Indicators observations" 
      })

    } catch(error) {
      next(error)
    }
  }

  async getObservationsById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const observations = await IndicatorService.getObservationsById(id)

      return success(res, {
        data: observations,
        message: `Observations for ${observations.at(0)?.indicatorId} indicator` 
      })

    } catch(error) {
      next(error)
    }
  }

}

export default new IndicatorController()