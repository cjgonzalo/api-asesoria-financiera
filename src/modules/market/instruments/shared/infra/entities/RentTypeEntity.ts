import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "rent_types" })
export class RentTypeEntity {
  @PrimaryGeneratedColumn("increment", { type: "smallint" })
  id: number

  @Column({ type: "varchar", length: 10 })
  type: string

  @Column({ name: "desc", type: "varchar", length: 50, nullable: true })
  description?: string
}
