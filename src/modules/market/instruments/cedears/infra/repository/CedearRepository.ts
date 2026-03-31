import { Repository } from "typeorm"
import { getDataSource } from "../../../../../../db/db-connection"
import { CedearDetail, CedearRepository } from "../../interfaces/CedearInterfaces"
import { CedearsDetailEntity } from "../entities/CedearsDetailEntity"

export class PgCedearRepository implements CedearRepository {
  private readonly detailRepo: Repository<CedearsDetailEntity>

  constructor() {
    this.detailRepo = getDataSource()!.getRepository(CedearsDetailEntity)
  }

  async findAllDetails(): Promise<CedearDetail[]> {
    return await this.detailRepo.find()
  }

  async findDetailByInstrument(instrumentId: string): Promise<CedearDetail | null> {
    return await this.detailRepo.findOne({
      where: { instrumentId }
    })
  }
}
