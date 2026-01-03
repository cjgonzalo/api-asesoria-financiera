import { UpdateResult } from "typeorm"

export interface User {
  id: string
  email: string
  cuit: string
  password: string
  name: string
  lastname: string
  birthdate: Date
  phone: string
  updatedAt?: Date
  deletedAt?: Date
}

export type NonIdUser = Omit<User, "id">

export interface UserRepository {
  findById(id: string): Promise<User>
  findByEmail(email: string): Promise<User>
  findAll(): Promise<User[]>
  createUser(data: User): Promise<void>
  updateUser(id: string, data: Partial<User>): Promise<UpdateResult>
  softDeleteUser(id: string): Promise<User>
  hardDeleteUser(id: string): Promise<User>
}

export interface UserUseCase {
  exec(param:
    User | 
    NonIdUser |
    null | 
    string
  ): Promise<void | User | User[]>
}