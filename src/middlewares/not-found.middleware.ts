import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/CustomError";
import { ROUTE_NOT_FOUND } from "../errors/ServerErrors";

export const notFoundMiddleware = async (_req: Request, _res: Response, next: NextFunction) => {
  next(new CustomError(ROUTE_NOT_FOUND))
}