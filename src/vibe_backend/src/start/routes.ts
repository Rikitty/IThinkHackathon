import { Router } from "express";

import UserController from "../app/controllers/userController";
import EventController from "../app/controllers/eventController";
import LikeController from "../app/controllers/likeController";
import isAuth from "../app/middleware/auth";

const Route = Router();

// Authenticated Routes

// User
Route.get("/user/me", isAuth, UserController.me);
Route.post("/user/register", UserController.register);
Route.post("/user/login", UserController.login);

// Event
Route.post("/event/create", isAuth, EventController.create);
Route.put("/event/update/:eventId", isAuth, EventController.update); // Use PUT for updates and add eventId as a parameter
Route.delete("/event/delete/:eventId", isAuth, EventController.delete); // Use DELETE for deletions and add eventId as a parameter

// Like
Route.post("/like/event/:eventId", isAuth, LikeController.likeEvent);
Route.delete("/like/event/:eventId", isAuth, LikeController.unlikeEvent); // Use DELETE for unliking events

export { Route as routes };