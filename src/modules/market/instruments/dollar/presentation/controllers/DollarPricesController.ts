import { Request, Response, NextFunction } from "express";
import { DollarPricesService } from "../../app/services/DollarPrices.service";
import { success } from "../../../../../../views/views";
import { CustomError } from "../../../../../../errors/CustomError";
import { isValidInstrumentId } from "../validators/DollarValidators";

class DollarPricesController {
  async findCurrentPrices(req: Request, res: Response, next: NextFunction) {
    try {
      const { instrumentId } = req.params
      if(!isValidInstrumentId(instrumentId)) {
        throw new CustomError({ httpCode: 400, message: "Invalid instrument id" })
      }

      const currentPrices = await DollarPricesService.findCurrentPrices(instrumentId)

      return success(res, {
        data: currentPrices,
        message: "Instrument current prices"
      })
    } catch(error) {
      next(error)
    }
  }

  async findByInstrument(req: Request, res: Response, next: NextFunction) {
    try {
      const { instrumentId } = req.params
      if(!isValidInstrumentId(instrumentId)) {
        throw new CustomError({ httpCode: 400, message: "Invalid instrument id" })
      }
      
      const pricesByInstrument = await DollarPricesService.findPricesByInstrument(instrumentId)

      return success(res, {
        data: pricesByInstrument,
        message: `Instrument prices for ${instrumentId}`
      })
    } catch(error) {
      next(error)
    }
  }
}

export default new DollarPricesController()
