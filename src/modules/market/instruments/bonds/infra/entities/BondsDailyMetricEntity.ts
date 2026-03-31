import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity({ name: "bonds_daily_metrics" })
@Unique("uq_bonds_daily_metrics_listing_date", ["listingId", "date"])
export class BondsDailyMetricEntity {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: string

  @Column({ name: "listing_id", type: "bigint" })
  listingId: string

  @Column({ type: "date" })
  date: Date

  @Column({ type: "numeric", nullable: true })
  ytm?: number

  @Column({ name: "modified_duration", type: "numeric", nullable: true })
  modifiedDuration?: number

  @Column({ type: "numeric", nullable: true })
  parity?: number

  @Column({ name: "accrued_interest", type: "numeric", nullable: true })
  accruedInterest?: number

  @Column({ name: "technical_value", type: "numeric", nullable: true })
  technicalValue?: number

  @Column({ name: "residual_value", type: "numeric", nullable: true })
  residualValue?: number

  @Column({ name: "days_to_maturity", type: "date", nullable: true })
  daysToMaturity?: Date
}
