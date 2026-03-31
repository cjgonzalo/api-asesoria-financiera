import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "currencies" })
export class CurrencyEntity {
  @PrimaryGeneratedColumn("increment", { type: "smallint" })
  id: number

  @Column({ type: "varchar", length: 5 })
  name: string

  @Column({ name: "desc", type: "varchar", length: 20, nullable: true })
  description?: string
}
