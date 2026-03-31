import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity({ name: "stocks_daily_metrics" })
@Unique("uq_stocks_daily_metrics_listing_date", ["listingId", "date"])
export class StocksDailyMetricEntity {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: string

  @Column({ name: "listing_id", type: "bigint" })
  listingId: string

  @Column({ type: "date" })
  date: Date

  @Column({ name: "market_cap", type: "numeric", nullable: true })
  marketCap?: number

  @Column({ name: "pe_ratio", type: "numeric", nullable: true })
  peRatio?: number

  @Column({ name: "dividend_yield", type: "numeric", nullable: true })
  dividendYield?: number
}
