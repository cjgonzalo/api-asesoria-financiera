import { Response } from "express"
import { CustomError } from "../errors/CustomError"
import { INTERNAL_SERVER_ERROR } from "../errors/ServerErrors"

type SuccessResponse<T> = {
  data: T
  message: string
  code: number
}

type ErrorResponse = {
  error: Error | CustomError
}

export const success = (res: Response, {
  data,
  message,
  code
}: SuccessResponse<any>) => {
  return res.status(code).json({ ...data, message })
}

export const errorView = (res: Response, { error }: ErrorResponse) => {
  const retError = error instanceof CustomError
    ? error
    : new CustomError(INTERNAL_SERVER_ERROR)
    
  const { message, stack } = error
  console.error("Detalle de error", { message, stack })
  
  return res.status(retError.httpCode).json(retError.getError())
}