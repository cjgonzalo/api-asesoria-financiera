import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity({ name: "daily_prices" })
@Unique("uq_daily_prices_listing_date", ["listingId", "date"])
export class DailyPriceEntity {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: string

  @Column({ name: "listing_id", type: "bigint" })
  listingId: string

  @Column({ type: "date" })
  date: Date

  @Column({ name: "open_price", type: "numeric", nullable: true })
  openPrice?: number

  @Column({ name: "close_price", type: "numeric", nullable: true })
  closePrice?: number

  @Column({ name: "previous_closing_price", type: "numeric", nullable: true })
  previousClosingPrice?: number

  @Column({ name: "highest_price", type: "numeric", nullable: true })
  highestPrice?: number

  @Column({ name: "lowest_price", type: "numeric", nullable: true })
  lowestPrice?: number

  @Column({ name: "last_ask_price", type: "numeric", nullable: true })
  lastAskPrice?: number

  @Column({ name: "last_bid_price", type: "numeric", nullable: true })
  lastBidPrice?: number

  @Column({ name: "trades_count", type: "numeric", nullable: true })
  tradesCount?: number

  @Column({ name: "trade_volume", type: "numeric", nullable: true })
  tradeVolume?: number

  @Column({ type: "numeric", nullable: true })
  imbalance?: number

  @Column({ type: "numeric", nullable: true })
  vwap?: number
}