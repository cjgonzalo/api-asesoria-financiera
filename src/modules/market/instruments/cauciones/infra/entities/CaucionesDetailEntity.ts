import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity({ name: "cauciones_details" })
@Unique("uq_cauciones_details_instrument", ["instrumentId"])
export class CaucionesDetailEntity {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: string

  @Column({ name: "instrument_id", type: "bigint" })
  instrumentId: string

  @Column({ type: "smallint" })
  term: number

  @Column({ type: "varchar", length: 20, nullable: true })
  type?: string
}
