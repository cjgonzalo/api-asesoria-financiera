import { Router } from "express"
import userController from "./controllers/users.controllers"

const router = Router()

router.route("/")
  .get(userController.findAll)
  .post(userController.createUser)

router.route("{/:id}")
  .get(userController.findById)

export default router