import { Request, Response, NextFunction } from "express";
import { DollarPricesService } from "../../app/services/DollarPrices.service";
import { success } from "../../../../../../views/views";
import { UUID } from "crypto";
import { CustomError } from "../../../../../../errors/CustomError";
import { isValidUUID } from "../validators/DollarValidators";

class DollarPricesController {
  async findCurrentPrices(_req: Request, res: Response, next: NextFunction) {
    try {
      const currentPrices = await DollarPricesService.findCurrentPrices()

      return success(res, {
        data: currentPrices,
        message: "Dollar current prices"
      })
    } catch(error) {
      next(error)
    }
  }

  async findByHouse(req: Request, res: Response, next: NextFunction) {
    try {
      const { house } = req.params
      if(!isValidUUID(house)) {
        throw new CustomError({ httpCode: 400, message: "Invalid UUID" })
      }
      
      const pricesByHouse = await DollarPricesService.findPircesByHouse(house.toString().toUpperCase() as UUID)

      return success(res, {
        data: pricesByHouse,
        message: `Dollar prices for house ${house}`
      })
    } catch(error) {
      next(error)
    }
  }
}

export default new DollarPricesController()