import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity({ name: "cedears_details" })
@Unique("uq_cedears_details_instrument", ["instrumentId"])
export class CedearsDetailEntity {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: string

  @Column({ name: "instrument_id", type: "bigint" })
  instrumentId: string

  @Column({ name: "underlying_symbol", type: "varchar", length: 10 })
  underlyingSymbol: string

  @Column({ type: "numeric" })
  ratio: number

  @Column({ name: "underlying_market", type: "varchar", length: 10 })
  underlyingMarket: string

  @Column({ type: "varchar", length: 50, nullable: true })
  sector?: string

  @Column({ type: "varchar", length: 50, nullable: true })
  industry?: string

  @Column({ name: "underlying_currency", type: "varchar", length: 5, nullable: true })
  underlyingCurrency?: string
}
