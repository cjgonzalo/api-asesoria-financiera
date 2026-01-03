import { Repository } from "typeorm"
import { getDataSource } from "../../../../db/db-connection"
import { User, UserRepository } from "../../interfaces/users.interfaces"
import { UserEntity } from "../entities/UserEntity"

export class PgUserRepository implements UserRepository {
  private userRepo: Repository<UserEntity>

  constructor() {
    this.userRepo = getDataSource()!.getRepository(UserEntity)
  }

  async createUser(user: User): Promise<void> {
    await this.userRepo.insert(user)
  }

  async findAll(): Promise<User[]> {
    return await this.userRepo.find()
  }

  async findById(id: string): Promise<User> {
    return (await this.userRepo.findBy({ id })).at(0)!
  }

  async findByEmail(email: string): Promise<User> {
    return (await this.userRepo.findBy({ email })).at(0)!
  }

  async updateUser(id: string, data: Partial<User>) {
    return await this.userRepo.update(id, data)
  }

  async softDeleteUser(id: string) {
    const userToDelete = await this.findById(id) as UserEntity
    return await this.userRepo.softRemove(userToDelete)
  }

  async hardDeleteUser(id: string) {
    const userToDelete = await this.findById(id) as UserEntity
    return await this.userRepo.remove(userToDelete)
  }
}