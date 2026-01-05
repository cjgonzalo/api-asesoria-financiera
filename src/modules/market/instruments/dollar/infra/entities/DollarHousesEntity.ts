import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { DollarPriceEntity } from "./DollarPricesEntity";

@Entity({ name: "dollar_houses" })
export class DollarHouseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", length: 20 })
  house: string

  @OneToMany(() => DollarPriceEntity, (p) => p.house)
  dollarPrices: DollarPriceEntity[];
}
