import express, { Request, Response, Router } from "express";
import { getDb } from "../../db";
import {
  countLikes,
  createLike,
  deleteLike,
  getLike,
  getLikes,
  updateLike,
} from "./db";

export function getRouter(): Router {
  const router = express.Router();
  const db = getDb();

  // Get all likes with pagination
  router.get(
    "/",
    (req: Request<any, any, any, { limit?: string; offset?: string }>, res) => {
      const limit = Number(req.query.limit ?? -1);
      const offset = Number(req.query.offset ?? 0);

      const likes = getLikes(db, limit, offset);
      res.json(likes);
    }
  );

  // Get like count
  router.get("/count", (_req, res) => {
    res.json(countLikes(db));
  });

  // Get like by ID
  router.get("/:id", (req, res) => {
    const { id } = req.params;
    const like = getLike(db, Number(id));
    res.json(like);
  });

  // Create a new like
  router.post(
    "/",
    (req: Request<any, any, { userId: number; eventId: number }>, res) => {
      const { userId, eventId } = req.body;
      try {
        const like = createLike(db, { userId, eventId });
        res.json(like);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  );

  // Update like
  router.put("/", updateHandler);

  // Partially update like
  router.patch("/", updateHandler);

  // Delete like
  router.delete("/", (req: Request<any, any, { id: number }>, res) => {
    const { id } = req.body;
    try {
      const deletedId = deleteLike(db, id);
      res.json(deletedId);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  return router;
}

async function updateHandler(
  req: Request<any, any, { id: number; userId?: number; eventId?: number }>,
  res: Response
): Promise<void> {
  const { id, userId, eventId } = req.body;
  const db = getDb();
  try {
    const updatedLike = await updateLike(db, { id, userId, eventId });
    res.json(updatedLike);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
