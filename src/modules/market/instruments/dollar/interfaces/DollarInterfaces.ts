export interface DollarHouse {
  id: number
  house: string
}

export interface DollarPrice {
  house: string | number
  date: Date
  bidPrice: number
  askPrice: number
}

export interface DollarRepository {
  findCurrentPrices(): Promise<DollarPrice[]>
  findPricesByHouse(house: number): Promise<DollarPrice[]>
  savePrices(dollar: DollarPrice[]): Promise<void>
}

export interface DollarUseCase {
  exec(param:
    DollarPrice |
    number |
    null
  ): Promise<DollarPrice | DollarPrice[] | void>
}

export interface DolarApiResponse {
  casa: string
  compra: number
  venta: number
  fechaActualizacion: string
}