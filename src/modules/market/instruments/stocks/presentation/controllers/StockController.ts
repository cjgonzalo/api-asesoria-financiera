import { Request, Response, NextFunction } from "express"
import { StockService } from "../../app/services/Stock.service"
import { success } from "../../../../../../views/views"
import { CustomError } from "../../../../../../errors/CustomError"
import { isValidInstrumentId } from "../validators/StockValidators"

class StockController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const stocks = await StockService.findAllDetails()

      return success(res, {
        data: stocks,
        message: "All stocks"
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

      const detail = await StockService.findDetailByInstrument(instrumentId)

      return success(res, {
        data: detail,
        message: `Stock detail for ${instrumentId}`
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

      const currentPrices = await StockService.findCurrentPrices(instrumentId)

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

      const prices = await StockService.findPricesByInstrument(instrumentId)

      return success(res, {
        data: prices,
        message: `Instrument prices for ${instrumentId}`
      })
    } catch(error) {
      next(error)
    }
  }
}

export default new StockController()
