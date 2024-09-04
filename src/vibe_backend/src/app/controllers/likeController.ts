import { Request, Response } from "express";
import { Like } from "../../database/entities/like";
import { User } from "../../database/entities/user";
import { Event } from "../../database/entities/event";
import { ic } from "azle";

export default class LikeController {
  static async likeEvent(request: Request, response: Response) {
    try {
      const { eventId } = request.params;

      const user = await User.findOneBy({
        principal_id: ic.caller().toText(),
      });

      if (user === null) {
        return response.status(404).json({
          status: 0,
          message: "User not found.",
        });
      }

      const event = await Event.findOneBy({ id: parseInt(eventId) });

      if (event === null) {
        return response.status(404).json({
          status: 0,
          message: "Event not found.",
        });
      }

      // Check if the like already exists
      const existingLike = await Like.findOneBy({ user, event });

      if (existingLike) {
        return response.status(400).json({
          status: 0,
          message: "You have already liked this event.",
        });
      }

      // Create a new like
      const like = new Like();
      like.user = user;
      like.event = event;
      await like.save();

      return response.json({
        status: 1,
        message: "Event liked successfully.",
      });
    } catch (error: any) {
      return response.status(400).json({
        status: 0,
        message: error.message,
      });
    }
  }

  static async unlikeEvent(request: Request, response: Response) {
    try {
      const { eventId } = request.params;

      const user = await User.findOneBy({
        principal_id: ic.caller().toText(),
      });

      if (user === null) {
        return response.status(404).json({
          status: 0,
          message: "User not found.",
        });
      }

      const event = await Event.findOneBy({ id: parseInt(eventId) });

      if (event === null) {
        return response.status(404).json({
          status: 0,
          message: "Event not found.",
        });
      }

      // Find and remove the like
      const like = await Like.findOneBy({ user, event });

      if (like === null) {
        return response.status(400).json({
          status: 0,
          message: "You have not liked this event.",
        });
      }

      await Like.remove(like);

      return response.json({
        status: 1,
        message: "Event unliked successfully.",
      });
    } catch (error: any) {
      return response.status(400).json({
        status: 0,
        message: error.message,
      });
    }
  }
}