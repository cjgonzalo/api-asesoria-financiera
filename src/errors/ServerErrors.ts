import { HttpError } from "./CustomError";

export const INTERNAL_SERVER_ERROR: HttpError = {
  httpCode: 500,
  message: "Internal server error"
}

export const ROUTE_NOT_FOUND: HttpError = {
  httpCode: 404,
  message: "404 - Not Found :("
}