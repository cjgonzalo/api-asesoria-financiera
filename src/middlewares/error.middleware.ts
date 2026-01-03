import { NextFunction, Request, Response } from "express"
import { errorView } from "../views/views"
import { CustomError } from "../errors/CustomError"

export const errorMiddleware = (error: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  return errorView(res, { error })
}