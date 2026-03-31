import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity({ name: "cauciones_daily_metrics" })
@Unique("uq_cauciones_daily_metrics_listing_date", ["listingId", "date"])
export class CaucionesDailyMetricEntity {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: string

  @Column({ name: "listing_id", type: "bigint" })
  listingId: string

  @Column({ type: "date" })
  date: Date

  @Column({ name: "open_rate", type: "numeric", nullable: true })
  openRate?: number

  @Column({ name: "close_rate", type: "numeric", nullable: true })
  closeRate?: number

  @Column({ name: "high_rate", type: "numeric", nullable: true })
  highRate?: number

  @Column({ name: "low_rate", type: "numeric", nullable: true })
  lowRate?: number

  @Column({ type: "smallint", nullable: true })
  term?: number

  @Column({ name: "traded_amount", type: "numeric", nullable: true })
  tradedAmount?: number

  @Column({ name: "trades_count", type: "numeric", nullable: true })
  tradesCount?: number
}
