import { z } from "zod"

export const isValidInstrumentId = (value: string) =>
  z
    .coerce
    .number()
    .int()
    .min(1)
    .safeParse(value)
    ?.error
    ? false
    : true
