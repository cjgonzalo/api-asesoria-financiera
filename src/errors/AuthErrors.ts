import { HttpError } from "./CustomError"

export const INVALID_TOKEN: HttpError = {
  httpCode: 401,
  message: "Token invalido o vencido"
}