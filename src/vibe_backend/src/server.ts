import * as cors from "cors";
import * as express from "express";

import ExceptionHandler from "./app/exceptions/handler";
import { routes } from "./start/routes";

export function CreateServer() {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: "1.5mb" }));
  app.use(ExceptionHandler);
  app.use(routes);

  // Guard routes
  app.use((request, response) => {
    response.status(404);
    return response.json({
      status: 0,
      message: "Route not found!",
    });
  });

  return app.listen();
}