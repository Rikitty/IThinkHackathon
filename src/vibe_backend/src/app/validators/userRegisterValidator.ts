import { z } from 'zod';

export default class UserRegisterValidator {
  static schema = z.object({
    communityName: z.string({ required_error: "Community name required" }),
    userName: z.string({ required_error: "Username is required" }),
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(4, { message: "Minimum of 4 characters" }),
  });

  static validate = this.schema.safeParse;
}