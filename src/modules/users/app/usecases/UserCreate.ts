import { PgUserRepository } from "../../infra/repository/users.repository";
import { NonIdUser, UserRepository, UserUseCase } from "../../interfaces/users.interfaces";
import { randomUUID, hash } from 'crypto'

export class UserCreate implements UserUseCase {
  private readonly repo: UserRepository
  
  constructor() {
    this.repo = new PgUserRepository()
  }

  async exec(data: NonIdUser): Promise<void> {
    return await this.repo.createUser({
      ...data,
      id: randomUUID(),
      password: hash("sha512", data.password),
      updatedAt: new Date()
    })
  }
}