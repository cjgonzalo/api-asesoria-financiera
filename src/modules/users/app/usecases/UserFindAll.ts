import { PgUserRepository } from "../../infra/repository/users.repository";
import { User, UserRepository, UserUseCase } from "../../interfaces/users.interfaces";

export class UserFindAll implements UserUseCase {
  private readonly repo: UserRepository
  
  constructor() {
    this.repo = new PgUserRepository()
  }

  async exec(): Promise<User[]> {
    return await this.repo.findAll()
  }
}