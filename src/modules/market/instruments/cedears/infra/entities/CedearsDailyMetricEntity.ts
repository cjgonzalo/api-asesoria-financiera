import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity({ name: "cedears_daily_metrics" })
@Unique("uq_cedears_daily_metrics_listing_date", ["listingId", "date"])
export class CedearsDailyMetricEntity {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: string

  @Column({ name: "listing_id", type: "bigint" })
  listingId: string

  @Column({ type: "date" })
  date: Date

  @Column({ name: "implied_price", type: "numeric", nullable: true })
  impliedPrice?: number

  @Column({ name: "ccl_rate", type: "numeric", nullable: true })
  cclRate?: number
}
