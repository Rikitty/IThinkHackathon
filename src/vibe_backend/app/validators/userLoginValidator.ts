import { z } from "zod";

export default class UserLoginValidator {
  static schema = z.object({
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(4, { message: "Minimum of 4 characters" }),
  });

  static validate = this.schema.safeParse;
}
