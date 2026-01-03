import { z } from "zod"

const emailRegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

export const UserValidator = z.object({
  id: z.uuid().optional(),
  email: z.email().regex(emailRegExp),
  cuit: z.string().max(11),
  password: z.string().max(128),
  name: z.string().max(64),
  lastname: z.string().max(64),
  birthdate: z.preprocess((arg) => {
    if (typeof arg === "string") {
      const d = new Date(arg);
      return isNaN(d.getTime()) ? arg : d;
    }
    return arg;
  }, z.date()),
  phone: z.string().max(15),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional()
})