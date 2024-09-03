import { Request, Response } from "express";
import { Event } from "../../database/entities/event";
import { User } from "../../database/entities/user"; 
import { ic } from "azle";
import CreateEventValidator from "../validators/createEventValidator";
import EditEventValidator from "../validators/editEventValidator";

export default class EventController {
  static async create(request: Request, response: Response) {
    try {
      const { data, success, error } = CreateEventValidator.validate(
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

      const findUser = await User.findOneBy({
        principal_id: ic.caller().toText(),
      });

      if (!findUser) {
        response.status(400);
        return response.json({
          status: 0,
          message: "User not found.",
        });
      }

      // check by title since ID is primary generated
      const findEvent = await Event.findOneBy({ title: data.title });

      if (findEvent) {
        response.status(400);
        return response.json({
          status: 0,
          message: "Event already exists.",
        });
      }

      const eventData: Partial<Event> = {
        ...data,
        startDate: data.startDate.toString(),
        endDate: data.endDate.toString(),
        user: findUser,
      };

      await Event.save(eventData);
    } catch (error: Error) {
      response.status(400);
      return response.json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async update(request: Request, response: Response) {
    try {
      const { eventId } = request.params;
      const { data, success, error } = EditEventValidator.validate(
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

      const findUser = await User.findOneBy({
        principal_id: ic.caller().toText(),
      });

      if (!findUser) {
        response.status(400);
        return response.json({
          status: 0,
          message: "User not found.",
        });
      }

      const { title, location, description, startDate, endDate, imageUrl } =
        data;

      const findEvent = await Event.findOneBy({
        id: eventId as unknown as number,
        user: findUser,
      });

      if (!findEvent) {
        response.status(400);
        return response.json({
          status: 0,
          message: "Event not found.",
        });
      }

      if (title) {
        findEvent.title = title;
      }

      if (location) {
        findEvent.location = location;
      }
      if (description) {
        findEvent.description = description;
      }
      if (startDate) {
        findEvent.startDate = startDate.toString();
      }
      if (endDate) {
        findEvent.endDate = endDate.toString();
      }
      if (imageUrl) {
        findEvent.imageUrl = imageUrl;
      }
      await findEvent.save();
      return response.json({
        status: 1,
        message: "Event updated successfully!",
      });
    } catch (error) {
      response.status(400);
      return response.json({
        status: 0,
        message: error.message,
      });
    }
  }

  static async delete(request: Request, response: Response) {
    try {
      const { eventId } = request.params;

      // Find the authenticated user by principal ID
      const findUser = await User.findOneBy({
        principal_id: ic.caller().toText(),
      });

      if (!findUser) {
        response.status(400);
        return response.json({
          status: 0,
          message: "User not found.",
        });
      }

      // Find the event by ID and check if it belongs to the user
      const findEvent = await Event.findOneBy({
        id: eventId as unknown as number,
        user: findUser,
      });

      if (!findEvent) {
        response.status(400);
        return response.json({
          status: 0,
          message:
            "Event not found or you do not have permission to delete it.",
        });
      }

      // Delete the event
      await findEvent.remove();

      return response.json({
        status: 1,
        message: "Event deleted successfully!",
      });
    } catch (error) {
      response.status(400);
      return response.json({
        status: 0,
        message: error.message,
      });
    }
  }
}