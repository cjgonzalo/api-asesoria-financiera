import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "indicators" })
export class IndicatorEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", length: 20 })
  name: string

  @Column({ type: "varchar", length: 5 })
  unit: string
}