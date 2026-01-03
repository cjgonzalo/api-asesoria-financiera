import { PgUserRepository } from "../../infra/repository/users.repository";
import { User, UserRepository, UserUseCase } from "../../interfaces/users.interfaces";

export class UserFindById implements UserUseCase {
  private readonly repo: UserRepository
  
  constructor() {
    this.repo = new PgUserRepository()
  }

  async exec(id: string): Promise<User> {
    return await this.repo.findById(id)
  }
}