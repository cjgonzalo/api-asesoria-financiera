import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm"
import { DollarHouseEntity } from "./DollarHousesEntity"
import { DollarPrice } from "../../interfaces/DollarInterfaces"

@Entity({ name: "dollar_prices" })
export class DollarPriceEntity implements DollarPrice {
  @PrimaryColumn({ type: "smallint", name: "house_id" })
  house: number

  @ManyToOne(
    () => DollarHouseEntity,
    (h) => h.dollarPrices,
    { nullable: false })
  @JoinColumn({ name: "house_id", referencedColumnName: "id" })
  dollarHouse: DollarHouseEntity

  @PrimaryColumn({ type: "date" })
  date: Date

  @Column({ type: "numeric", name: "bid_price" })
  bidPrice: number

  @Column({ type: "numeric", name: "ask_price" })
  askPrice: number
}
