import { z } from "zod"

export const isValidUUID = (s: string) => z.uuid(s).safeParse(s)?.error ? false : true