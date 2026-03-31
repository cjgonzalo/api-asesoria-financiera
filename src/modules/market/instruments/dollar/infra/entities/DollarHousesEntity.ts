import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { DollarPriceEntity } from "./DollarPricesEntity";

@Entity({ name: "dollar_houses" })
export class DollarHouseEntity {
  @PrimaryGeneratedColumn("increment", { type: "smallint" })
  id: number

  @Column({ type: "varchar", length: 10 })
  house: string

  @OneToMany(() => DollarPriceEntity, (p) => p.dollarHouse)
  dollarPrices: DollarPriceEntity[];
}
