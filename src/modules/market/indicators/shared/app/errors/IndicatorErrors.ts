import { HttpError } from "../../../../../../errors/CustomError";

export const INDICATOR_NOT_FOUND: HttpError = {
  httpCode: 400,
  message: "Indicator not found"
}

export const OBSERVATIONS_NOT_FOUND: HttpError = {
  httpCode: 400,
  message: "Observations not found"
}

export const SAVE_OBSERVATION_ERROR: HttpError = {
  httpCode: 400,
  message: "There was an error saving the observation"
}