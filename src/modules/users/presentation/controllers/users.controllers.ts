import { NextFunction, Request, Response } from "express";
import { UserService } from "../../app/services/users.service";
import { NonIdUser } from "../../interfaces/users.interfaces";
import { success } from "../../../../views/views";
import { UserValidator } from "../validators/UserValidator";

class UsersController {

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = UserValidator.parse(req.body);
      await UserService.createUser(validatedData as NonIdUser)
      return success(res, { message: "Usuario creado correctamente", code: 201 })

    } catch(error) {
      next(error)
    }
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.findAll()

      return success(res, { data: users })
    } catch(error) {
      next(error)
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const user = await UserService.findById(id)

      return success(res, { data: user })
    } catch(error) {
      next(error)
    }
  }

  async findByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.query
      const user = await UserService.findByEmail(email as string)

      return success(res, { data: user })
    } catch(error) {
      next(error)
    }
  }
}

export default new UsersController()