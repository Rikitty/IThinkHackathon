import express, { Request, Response, Router } from "express";
import { v4 } from "uuid";
import bcrypt from "bcrypt";

import { getDb } from "../../db";
import {
  countUsers,
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  loginUser,
} from "./db";

export function getRouter(): Router {
  const router = express.Router();
  const db = getDb();

  // Get all users with pagination
  router.get(
    "/",
    (req: Request<any, any, any, { limit?: string; offset?: string }>, res) => {
      const limit = Number(req.query.limit ?? -1);
      const offset = Number(req.query.offset ?? 0);

      const users = getUsers(db, limit, offset);
      res.json(users);
    }
  );

  // Get user count
  router.get("/count", (_req, res) => {
    res.json(countUsers(db));
  });

  // Get user by ID
  router.get("/:id", (req, res) => {
    const { id } = req.params;
    const user = getUser(db, Number(id));
    res.json(user);
  });

  // Create a new user
  router.post(
    "/",
    async (
      req: Request<
        any,
        any,
        {
          communityName: string;
          userName: string;
          email: string;
          password: string;
        }
      >,
      res
    ) => {
      const { communityName, userName, email, password } = req.body;
      try {
        const user = await createUser(db, {
          communityName,
          userName,
          email,
          password,
        });
        res.json(user);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  );

  // Create multiple users in a batch
  router.post("/batch/:num", (req, res) => {
    const num = Number(req.params.num);
    for (let i = 0; i < num; i++) {
      createUser(db, {
        communityName: `community${v4()}`,
        userName: `user${i}`,
        email: `user${i}@example.com`,
        password: `password${i}`,
      });
    }
    res.json({ success: `${num} users created` });
  });

  // Update user
  router.put("/", updateHandler);

  // Partially update user
  router.patch("/", updateHandler);

  // Delete user
  router.delete("/", (req: Request<any, any, { id: number }>, res) => {
    const { id } = req.body;
    try {
      const deletedId = deleteUser(db, id);
      res.json(deletedId);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Login user
  router.post(
    "/login",
    async (
      req: Request<any, any, { email: string; password: string }>,
      res
    ) => {
      const { email, password } = req.body;
      try {
        const user = await loginUser(db, email, password);
        if (user) {
          res.json(user);
        } else {
          res.status(401).json({ error: "Invalid email or password" });
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  );

  return router;
}

async function updateHandler(
  req: Request<
    any,
    any,
    {
      id: number;
      communityName?: string;
      userName?: string;
      email?: string;
      password?: string;
    }
  >,
  res: Response
): Promise<void> {
  const { id, communityName, userName, email, password } = req.body;
  const db = getDb();
  try {
    const updatedUser = await updateUser(db, {
      id,
      communityName,
      userName,
      email,
      password,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
