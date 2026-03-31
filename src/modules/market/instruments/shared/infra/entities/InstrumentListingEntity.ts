import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity({ name: "instrument_listings" })
@Unique("uq_instrument_listings_scope", [
  "instrumentId",
  "marketId",
  "currencyId",
  "settlementTypeId",
  "securityTypeId",
])
@Unique("uq_instrument_listings_symbol_scope", [
  "symbol",
  "marketId",
  "currencyId",
  "settlementTypeId",
  "securityTypeId",
])
export class InstrumentListingEntity {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: string

  @Column({ name: "instrument_id", type: "bigint" })
  instrumentId: string

  @Column({ name: "market_id", type: "smallint" })
  marketId: number

  @Column({ name: "currency_id", type: "smallint" })
  currencyId: number

  @Column({ name: "settlement_type_id", type: "smallint" })
  settlementTypeId: number

  @Column({ name: "security_type_id", type: "smallint" })
  securityTypeId: number

  @Column({ type: "varchar", length: 10 })
  symbol: string
}
