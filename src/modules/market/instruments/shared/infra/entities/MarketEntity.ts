import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "markets" })
export class MarketEntity {
  @PrimaryGeneratedColumn("increment", { type: "smallint" })
  id: number

  @Column({ type: "varchar", length: 10 })
  name: string

  @Column({ name: "desc", type: "varchar", length: 20, nullable: true })
  description?: string
}
