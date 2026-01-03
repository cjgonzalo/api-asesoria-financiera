import { HttpError } from "./CustomError";

export const INEXISTENT_USER: HttpError = {
  httpCode: 400,
  message: "No existe el usuario solicitado"
}