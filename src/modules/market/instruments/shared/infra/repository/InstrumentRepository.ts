import { Repository } from "typeorm"
import { getDataSource } from "../../../../../../db/db-connection"
import { DailyPriceEntity } from "../entities/DailyPriceEntity"
import { InstrumentListingEntity } from "../entities/InstrumentListingEntity"
import { InstrumentPrice, InstrumentRepository } from "../../interfaces/InstrumentInterfaces"

export class PgInstrumentRepository implements InstrumentRepository {
  private readonly dailyRepo: Repository<DailyPriceEntity>

  constructor() {
    this.dailyRepo = getDataSource()!.getRepository(DailyPriceEntity)
  }

  async findCurrentPrices(instrumentId: string): Promise<InstrumentPrice[]> {
    const qb = this.dailyRepo
      .createQueryBuilder("dp")
      .innerJoin(InstrumentListingEntity, "listing", "listing.id = dp.listing_id")
      .where("listing.instrument_id = :instrumentId", { instrumentId })
      .andWhere((subQb) => {
        const subQuery = subQb
          .subQuery()
          .select("MAX(sub.date)", "maxDate")
          .addSelect("sub.listing_id", "listingId")
          .from(DailyPriceEntity, "sub")
          .innerJoin(InstrumentListingEntity, "subListing", "subListing.id = sub.listing_id")
          .where("subListing.instrument_id = :instrumentId")
          .groupBy("sub.listing_id")
          .getQuery()

        return `(dp.listing_id, dp.date) IN (${subQuery})`
      })
      .select([
        "dp.listing_id AS \"listingId\"",
        "listing.instrument_id AS \"instrumentId\"",
        "dp.date AS \"date\"",
        "dp.open_price AS \"openPrice\"",
        "dp.close_price AS \"closePrice\"",
        "dp.previous_closing_price AS \"previousClosingPrice\"",
        "dp.highest_price AS \"highestPrice\"",
        "dp.lowest_price AS \"lowestPrice\"",
        "dp.last_ask_price AS \"lastAskPrice\"",
        "dp.last_bid_price AS \"lastBidPrice\"",
        "dp.trades_count AS \"tradesCount\"",
        "dp.trade_volume AS \"tradeVolume\"",
        "dp.imbalance AS \"imbalance\"",
        "dp.vwap AS \"vwap\"",
        "listing.symbol AS \"symbol\"",
        "listing.market_id AS \"marketId\"",
        "listing.currency_id AS \"currencyId\"",
        "listing.settlement_type_id AS \"settlementTypeId\"",
        "listing.security_type_id AS \"securityTypeId\"",
      ])
      .orderBy("dp.date", "DESC")
      .setParameter("instrumentId", instrumentId)

    return await qb.getRawMany()
  }

  async findPricesByInstrument(instrumentId: string): Promise<InstrumentPrice[]> {
    return await this.dailyRepo
      .createQueryBuilder("dp")
      .innerJoin(InstrumentListingEntity, "listing", "listing.id = dp.listing_id")
      .where("listing.instrument_id = :instrumentId", { instrumentId })
      .select([
        "dp.listing_id AS \"listingId\"",
        "listing.instrument_id AS \"instrumentId\"",
        "dp.date AS \"date\"",
        "dp.open_price AS \"openPrice\"",
        "dp.close_price AS \"closePrice\"",
        "dp.previous_closing_price AS \"previousClosingPrice\"",
        "dp.highest_price AS \"highestPrice\"",
        "dp.lowest_price AS \"lowestPrice\"",
        "dp.last_ask_price AS \"lastAskPrice\"",
        "dp.last_bid_price AS \"lastBidPrice\"",
        "dp.trades_count AS \"tradesCount\"",
        "dp.trade_volume AS \"tradeVolume\"",
        "dp.imbalance AS \"imbalance\"",
        "dp.vwap AS \"vwap\"",
        "listing.symbol AS \"symbol\"",
        "listing.market_id AS \"marketId\"",
        "listing.currency_id AS \"currencyId\"",
        "listing.settlement_type_id AS \"settlementTypeId\"",
        "listing.security_type_id AS \"securityTypeId\"",
      ])
      .orderBy("dp.date", "DESC")
      .getRawMany()
  }
}
