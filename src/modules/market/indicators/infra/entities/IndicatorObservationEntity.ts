import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { IndicatorEntity } from "./IndicatorEntity"

@Entity({ name: "indicator_observations" })
export class IndicatorObservationEntity {
  @PrimaryColumn("uuid", { name: "indicator_id" })
  indicatorId: string

  @ManyToOne(() => IndicatorEntity, { nullable: false })
  @JoinColumn({ name: "indicator_id", referencedColumnName: "id" })
  indicator: IndicatorEntity

  @PrimaryColumn({ type: "date" })
  date: Date

  @Column({ type: "numeric" })
  value: number
}