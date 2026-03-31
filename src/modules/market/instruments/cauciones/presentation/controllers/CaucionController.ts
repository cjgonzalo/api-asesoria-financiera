import { Request, Response, NextFunction } from "express"
import { CaucionService } from "../../app/services/Caucion.service"
import { success } from "../../../../../../views/views"
import { CustomError } from "../../../../../../errors/CustomError"
import { isValidInstrumentId } from "../validators/CaucionValidators"

class CaucionController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const cauciones = await CaucionService.findAllDetails()

      return success(res, {
        data: cauciones,
        message: "All cauciones"
      })
    } catch(error) {
      next(error)
    }
  }

  async findDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const { instrumentId } = req.params
      if(!isValidInstrumentId(instrumentId)) {
        throw new CustomError({ httpCode: 400, message: "Invalid instrument id" })
      }

      const detail = await CaucionService.findDetailByInstrument(instrumentId)

      return success(res, {
        data: detail,
        message: `Caucion detail for ${instrumentId}`
      })
    } catch(error) {
      next(error)
    }
  }

  async findCurrentMetrics(req: Request, res: Response, next: NextFunction) {
    try {
      const { instrumentId } = req.params
      if(!isValidInstrumentId(instrumentId)) {
        throw new CustomError({ httpCode: 400, message: "Invalid instrument id" })
      }

      const metrics = await CaucionService.findCurrentMetrics(instrumentId)

      return success(res, {
        data: metrics,
        message: "Current caucion metrics"
      })
    } catch(error) {
      next(error)
    }
  }

  async findMetrics(req: Request, res: Response, next: NextFunction) {
    try {
      const { instrumentId } = req.params
      if(!isValidInstrumentId(instrumentId)) {
        throw new CustomError({ httpCode: 400, message: "Invalid instrument id" })
      }

      const metrics = await CaucionService.findMetricsByInstrument(instrumentId)

      return success(res, {
        data: metrics,
        message: `Caucion metrics for ${instrumentId}`
      })
    } catch(error) {
      next(error)
    }
  }
}

export default new CaucionController()
