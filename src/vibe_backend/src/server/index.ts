import express from "express";

import { getRouter as getRouterUsers } from "../entities/users/router";
import { getRouter as getRouterEvents } from "../entities/events/router";
import { getRouter as getRouterLikes } from "../entities/likes/router";

export function initServer() {
  let app = express();

  app.use(express.json());

  app.use("/users", getRouterUsers());
  app.use("/events", getRouterEvents());
  app.use("/likes", getRouterLikes());

  app.get("/init-called", (_req, res) => {
    res.json(globalThis._azleInitCalled);
  });
  app.get("/post-upgrade-called", (_req, res) => {
    res.json(globalThis._azlePostUpgradeCalled);
  });

  return app.listen();
}
