import { Request, Response, NextFunction } from "express"
import { CedearService } from "../../app/services/Cedear.service"
import { success } from "../../../../../../views/views"
import { CustomError } from "../../../../../../errors/CustomError"
import { isValidInstrumentId } from "../validators/CedearValidators"

class CedearController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const cedears = await CedearService.findAllDetails()

      return success(res, {
        data: cedears,
        message: "All cedears"
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

      const detail = await CedearService.findDetailByInstrument(instrumentId)

      return success(res, {
        data: detail,
        message: `Cedear detail for ${instrumentId}`
      })
    } catch(error) {
      next(error)
    }
  }

  async findCurrentPrices(req: Request, res: Response, next: NextFunction) {
    try {
      const { instrumentId } = req.params
      if(!isValidInstrumentId(instrumentId)) {
        throw new CustomError({ httpCode: 400, message: "Invalid instrument id" })
      }

      const currentPrices = await CedearService.findCurrentPrices(instrumentId)

      return success(res, {
        data: currentPrices,
        message: "Instrument current prices"
      })
    } catch(error) {
      next(error)
    }
  }

  async findPrices(req: Request, res: Response, next: NextFunction) {
    try {
      const { instrumentId } = req.params
      if(!isValidInstrumentId(instrumentId)) {
        throw new CustomError({ httpCode: 400, message: "Invalid instrument id" })
      }

      const prices = await CedearService.findPricesByInstrument(instrumentId)

      return success(res, {
        data: prices,
        message: `Instrument prices for ${instrumentId}`
      })
    } catch(error) {
      next(error)
    }
  }
}

export default new CedearController()
