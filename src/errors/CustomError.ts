export interface HttpError extends Omit<Error, "name"> { httpCode: number }

export class CustomError {
  public httpCode: number
  public message: string
  public stack: string | undefined
  
  constructor({ httpCode, message, stack }: HttpError) {
    this.httpCode = httpCode
    this.message = message
    this.stack = stack
  }

  getError(): HttpError {
    return { httpCode: this.httpCode, message: this.message }
  }
}