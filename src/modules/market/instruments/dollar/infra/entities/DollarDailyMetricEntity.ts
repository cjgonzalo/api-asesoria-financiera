import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity({ name: "dollar_daily_metrics" })
@Unique("uq_dollar_daily_metrics_listing_date_house", ["listingId", "date", "houseId"])
export class DollarDailyMetricEntity {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: string

  @Column({ name: "listing_id", type: "bigint" })
  listingId: string

  @Column({ type: "date" })
  date: Date

  @Column({ name: "house_id", type: "smallint" })
  houseId: number
}
