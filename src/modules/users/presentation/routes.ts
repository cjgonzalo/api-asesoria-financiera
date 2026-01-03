import { Router } from "express"
import userController from "./controllers/users.controllers"

const router = Router()

router.route("/users")
  .get(userController.findAll)
  .post(userController.createUser)

router.route("/users{/:id}")
  .get(userController.findById)

export default router