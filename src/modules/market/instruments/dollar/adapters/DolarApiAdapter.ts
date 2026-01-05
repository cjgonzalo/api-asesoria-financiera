import { DolarApiResponse, DollarPrice } from "../interfaces/DollarInterfaces"

export class DolarApiAdapter {
  private readonly dolarApiBaseUrl: string

  constructor() {
    this.dolarApiBaseUrl = "https://dolarapi.com/v1/dolares"
  }

  async getCurrentPrices(): Promise<DollarPrice[]> {
    const res = await fetch(this.dolarApiBaseUrl)
    const dolarApiResponse = await res.json() as DolarApiResponse[]

    return dolarApiResponse.map(elem => {
      const house = elem.casa === "contadoconliqui"
        ? "CCL"
        : elem.casa.toUpperCase()

      const strDate = elem.fechaActualizacion.split("T").at(0)!

      return {
        house,
        date: new Date(strDate),
        askPrice: elem.compra,
        bidPrice: elem.venta
      }
    })
  }
}