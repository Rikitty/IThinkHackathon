import { Request, Response } from "express";
import { User } from "../../database/entities/user";
import UserRegisterValidator from "../validators/userRegisterValidator";
import UserLoginValidator from "../validators/userLoginValidator";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { ic } from "azle";

const JWT_SECRET = process.env.JWT_SECRET_KEY || "VIBE"; // Replace with your actual secret

export default class UserController {
  static async me(request: Request, response: Response) {
    try {
      const user = await User.findOneBy({
        principal_id: ic.caller().toText(),
      });

      if (user === null) {
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
        message: `${path?.join(".")}: ${message}`,
      });
    }

    const { email, communityName, userName } = data;

    const userData: Partial<User> = {
      email,
      communityName,
      userName,
      principal_id: ic.caller().toString(),
    };

    try {
        const isUserExists = await User.findOne({
          where: [{ email }, { principal_id: ic.caller().toText() }, { userName }],
        });
  
        if (isUserExists) {
          response.status(400);
          return response.json({
            status: 0,
            message: 'Username/Email/Identity already taken.',
          });
        }
  
        await User.save(userData);
  
        return response.json({
          status: 1,
          message: 'Registration success!',
        });
      } catch (error: any) {
        response.status(400);
        return response.json({
          status: 0,
          message: error.message,
        });
      }
  }

  static async login(request: Request, response: Response) {
    const { data, success, error } = UserLoginValidator.validate(request.body);

    if (!success) {
      response.status(400);
      const { path, message } = error.issues?.[0];

      return response.json({
        status: 0,
        message: `${path?.join(".")}: ${message}`,
      });
    }

    const { email, password } = data;

    try {
      const user = await User.findOneBy({ email });

      if (!user) {
        return response.status(400).json({
          status: 0,
          message: "Invalid email or password.",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return response.status(400).json({
          status: 0,
          message: "Invalid email or password.",
        });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

      return response.json({
        status: 1,
        message: "Login successful!",
        token,
      });
    } catch (error: any) {
      return response.status(500).json({
        status: 0,
        message: error.message,
      });
    }
  }
}