import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"
import { User } from "../../interfaces/users.interfaces"

@Entity({ name: "users" })
export class UserEntity implements User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", length: 128 })
  email: string

  @Column({ type: "varchar", length: 11 })
  cuit: string

  @Column({ name: "password_hash", type: "varchar", length: 128 })
  password: string

  @Column({ type: "varchar", length: 64 })
  name: string

  @Column({ type: "varchar", length: 64 })
  lastname: string

  @Column({ type: "date" })
  birthdate: Date

  @Column({ type: "varchar", length: 12 })
  phone: string

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date

  @DeleteDateColumn({ name: "deleted_at", default: null })
  deletedAt: Date
}
