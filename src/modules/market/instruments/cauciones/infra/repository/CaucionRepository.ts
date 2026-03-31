import { Repository } from "typeorm"
import { getDataSource } from "../../../../../../db/db-connection"
import { CaucionDetail, CaucionDailyMetric, CaucionRepository } from "../../interfaces/CaucionInterfaces"
import { CaucionesDetailEntity } from "../entities/CaucionesDetailEntity"
import { CaucionesDailyMetricEntity } from "../entities/CaucionesDailyMetricEntity"
import { InstrumentListingEntity } from "../../../shared/infra/entities/InstrumentListingEntity"

export class PgCaucionRepository implements CaucionRepository {
  private readonly detailRepo: Repository<CaucionesDetailEntity>
  private readonly metricRepo: Repository<CaucionesDailyMetricEntity>

  constructor() {
    const ds = getDataSource()!
    this.detailRepo = ds.getRepository(CaucionesDetailEntity)
    this.metricRepo = ds.getRepository(CaucionesDailyMetricEntity)
  }

  async findAllDetails(): Promise<CaucionDetail[]> {
    return await this.detailRepo.find()
  }

  async findDetailByInstrument(instrumentId: string): Promise<CaucionDetail | null> {
    return await this.detailRepo.findOne({
      where: { instrumentId }
    })
  }

  async findCurrentMetrics(instrumentId: string): Promise<CaucionDailyMetric[]> {
    return await this.metricRepo
      .createQueryBuilder("cm")
      .innerJoin(InstrumentListingEntity, "il", "il.id = cm.listing_id")
      .where("il.instrument_id = :instrumentId", { instrumentId })
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select("MAX(sub.date)", "maxDate")
          .addSelect("sub.listing_id", "listingId")
          .from(CaucionesDailyMetricEntity, "sub")
          .groupBy("sub.listing_id")
          .getQuery()

        return `(cm.listing_id, cm.date) IN (${subQuery})`
      })
      .orderBy("cm.date", "DESC")
      .getMany()
  }

  async findMetricsByInstrument(instrumentId: string): Promise<CaucionDailyMetric[]> {
    return await this.metricRepo
      .createQueryBuilder("cm")
      .innerJoin(InstrumentListingEntity, "il", "il.id = cm.listing_id")
      .where("il.instrument_id = :instrumentId", { instrumentId })
      .orderBy("cm.date", "DESC")
      .getMany()
  }
}
