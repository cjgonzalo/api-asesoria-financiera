import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity({ name: "stocks_details" })
@Unique("uq_stocks_details_instrument", ["instrumentId"])
export class StocksDetailEntity {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: string

  @Column({ name: "instrument_id", type: "bigint" })
  instrumentId: string

  @Column({ type: "varchar", length: 50, nullable: true })
  sector?: string

  @Column({ type: "varchar", length: 50, nullable: true })
  industry?: string
}
