import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "instrument_types" })
export class InstrumentTypeEntity {
  @PrimaryGeneratedColumn("increment", { type: "smallint" })
  id: number

  @Column({ type: "varchar", length: 10 })
  type: string
}
