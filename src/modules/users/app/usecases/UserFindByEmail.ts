import { PgUserRepository } from "../../infra/repository/users.repository";
import { User, UserRepository, UserUseCase } from "../../interfaces/users.interfaces";

export class UserFindByEmail implements UserUseCase {
  private readonly repo: UserRepository

  constructor() {
    this.repo = new PgUserRepository()
  }

  async exec(email: string): Promise<User> {
    return await this.repo.findByEmail(email)
  }
}
