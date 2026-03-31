import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "instruments" })
export class InstrumentEntity {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: string

  @Column({ name: "currency_id", type: "smallint" })
  currencyId: number

  @Column({ name: "instrument_type_id", type: "smallint" })
  instrumentTypeId: number

  @Column({ type: "varchar", length: 100, nullable: true })
  description?: string
}
