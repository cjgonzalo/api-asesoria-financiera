import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "security_types" })
export class SecurityTypeEntity {
  @PrimaryGeneratedColumn("increment", { type: "smallint" })
  id: number

  @Column({ type: "varchar", length: 5 })
  name: string

  @Column({ name: "desc", type: "varchar", length: 20, nullable: true })
  description?: string
}
