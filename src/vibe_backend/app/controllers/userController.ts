import { Request, Response } from "express";
import { User } from "Database/entities/user";
import UserRegisterValidator from "../validators/userRegisterValidator";
import UserLoginValidator from "../validators/userLoginValidator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ic } from "azle";

const JWT_SECRET = "your_jwt_secret"; // Replace with your actual secret

export default class UserController {
  static async me(request: Request, response: Response) {
    try {
      const user = await User.findOneBy({
        id: Number(ic.caller().toText()),
      });

      if (!user) {
        response.status(404);
        return response.json({
          status: 0,
          message: "User not found.",
        });
      }

      return response.json({
        status: 1,
        data: user,
      });
    } catch (error: any) {
      response.status(400);
      return response.json({
        status: 0,
        message: error.message,
      });
    }
  }

  static async register(request: Request, response: Response) {
    const { data, success, error } = UserRegisterValidator.validate(
      request.body
    );

    if (!success) {
        response.status(400);
        const { path, message } = error.issues?.[0];
  
        return response.json({
          status: 0,
          message: `${path?.join('.')}: ${message}`,
        });
      }

  }
}
