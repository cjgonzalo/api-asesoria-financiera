import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity({ name: "bonds_details" })
@Unique("uq_bonds_details_instrument", ["instrumentId"])
@Unique("uq_bonds_details_isin", ["isin"])
export class BondsDetailEntity {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: string

  @Column({ name: "instrument_id", type: "bigint" })
  instrumentId: string

  @Column({ name: "rent_type_id", type: "smallint" })
  rentTypeId: number

  @Column({ type: "varchar", length: 20, nullable: true })
  isin?: string

  @Column({ name: "maturity_date", type: "date", nullable: true })
  maturityDate?: Date
}
