import { Repository } from "typeorm";
import { getDataSource } from "../../../../../../db/db-connection";
import { IndicatorEntity } from "../entities/IndicatorEntity";
import { IndicatorObservationEntity } from "../entities/IndicatorObservationEntity";
import { Indicator, IndicatorObservation, IndicatorRepository } from "../../interfaces/IndicatorInterfaces";

export class PgIndicatorRepository implements IndicatorRepository {
  private readonly obsRepo: Repository<IndicatorObservationEntity>
  private readonly indicatorRepo: Repository<IndicatorEntity>

  constructor() {
    this.obsRepo = getDataSource()!.getRepository(IndicatorObservationEntity)
    this.indicatorRepo = getDataSource()!.getRepository(IndicatorEntity)
  }

  async findAllIndicators(): Promise<Indicator[]> {
    return await this.indicatorRepo.find()
  }

  async findIndicatorById(id: string): Promise<Indicator | null> {
    return await this.indicatorRepo.findOneBy({ id })
  }

  async findIndicatorByName(name: string): Promise<Indicator | null> {
    return await this.indicatorRepo.findOneBy({ name })
  }

  async findAllObservations(): Promise<IndicatorObservation[]> {
    return await this.obsRepo.find({ relations: { indicator: true } })
  }

  async findObservationsById(indicatorId: string): Promise<IndicatorObservation[]> {
    return await this.obsRepo.find({
      where: { indicatorId },
      relations: { indicator: true },
    })
  }

  async saveObservations(indicators: IndicatorObservation[]): Promise<void> {
    if (indicators.length) {
      await this.obsRepo.upsert(indicators, ["indicator_id"])
    }
  }
}
