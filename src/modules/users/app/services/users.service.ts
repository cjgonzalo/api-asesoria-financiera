import { UserCreate } from "../../app/usecases/UserCreate";
import { UserFindByEmail } from "../usecases/UserFindByEmail";
import { UserFindById } from "../../app/usecases/UserFindById";
import { NonIdUser, User } from "../../interfaces/users.interfaces";
import { UserFindAll } from "../usecases/UserFindAll";

export const UserService = {
  async createUser(user: NonIdUser): Promise<void> {
    return await new UserCreate().exec(user)
  },

  async findAll(): Promise<User[]> {
    return await new UserFindAll().exec()
  },

  async findByEmail(email: string): Promise<User> {
    return await new UserFindByEmail().exec(email)
  },

  async findById(id: string): Promise<User> {
    return await new UserFindById().exec(id)
  }
}
