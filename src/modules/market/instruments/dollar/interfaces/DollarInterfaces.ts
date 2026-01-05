import { UUID } from "crypto"

export interface DollarHouse {
  id: string
  house: string
}

export interface DollarPrice {
  house: string
  date: Date
  bidPrice: number
  askPrice: number
}

export interface DollarRepository {
  findCurrentPrices(): Promise<DollarPrice[]>
  findPricesByHouse(house: string): Promise<DollarPrice[]>
  savePrices(dollar: DollarPrice[]): Promise<void>
}

export interface DollarUseCase {
  exec(param:
    DollarPrice |
    UUID |
    null
  ): Promise<DollarPrice | DollarPrice[] | void>
}

export interface DolarApiResponse {
  casa: string
  compra: number
  venta: number
  fechaActualizacion: string
}