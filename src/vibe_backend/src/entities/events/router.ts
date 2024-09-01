import express, { Request, Response, Router } from "express";

import { getDb } from "../../db";
import {
  countEvents,
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEvent,
} from "./db";

export function getRouter(): Router {
  const router = express.Router();
  const db = getDb();

  // Get all events with pagination
  router.get(
    "/",
    (req: Request<any, any, any, { limit?: string; offset?: string }>, res) => {
      const limit = Number(req.query.limit ?? -1);
      const offset = Number(req.query.offset ?? 0);

      const events = getEvents(db, limit, offset);
      res.json(events);
    }
  );

  // Get event count
  router.get("/count", (_req, res) => {
    res.json(countEvents(db));
  });

  // Get event by ID
  router.get("/:id", (req, res) => {
    const { id } = req.params;
    const event = getEvent(db, Number(id));
    res.json(event);
  });

  // Create a new event
  router.post(
    "/",
    (
      req: Request<
        any,
        any,
        {
          title: string;
          location: string;
          description: string;
          startDate: string;
          endDate: string;
          imageUrl?: string;
          userId: number;
        }
      >,
      res
    ) => {
      const {
        title,
        location,
        description,
        startDate,
        endDate,
        imageUrl,
        userId,
      } = req.body;
      try {
        const event = createEvent(db, {
          title,
          location,
          description,
          startDate,
          endDate,
          imageUrl: imageUrl || "",
          userId,
        });
        res.json(event);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  );

  // Update event
  router.put("/", updateHandler);

  // Partially update event
  router.patch("/", updateHandler);

  // Delete event
  router.delete("/", (req: Request<any, any, { id: number }>, res) => {
    const { id } = req.body;
    try {
      const deletedId = deleteEvent(db, id);
      res.json(deletedId);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  return router;
}

async function updateHandler(
  req: Request<
    any,
    any,
    {
      id: number;
      title?: string;
      location?: string;
      description?: string;
      startDate?: string;
      endDate?: string;
      imageUrl?: string;
      userId?: number;
    }
  >,
  res: Response
): Promise<void> {
  const {
    id,
    title,
    location,
    description,
    startDate,
    endDate,
    imageUrl,
    userId,
  } = req.body;
  const db = getDb();
  try {
    const updatedEvent = await updateEvent(db, {
      id,
      title,
      location,
      description,
      startDate,
      endDate,
      imageUrl,
      userId,
    });
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
