"use strict";
import express from "express";
import http from "http";
import swaggerUI from "swagger-ui-express";

import { applyMiddleware, log } from "./utils";
import { connectDB } from "./db";
import middleware from "./middleware";
import { routes } from "./routes";
import swaggerConfig from "./swagger.json";

const { SERVER_PORT } = process.env;

const router = express();
applyMiddleware(middleware, router);
connectDB();
routes(router);

router.use("/api-docs", swaggerUI.serve);
router.get("/api-docs", swaggerUI.setup(swaggerConfig));

const server = http.createServer(router);

server.listen(SERVER_PORT, () => {
  log.info(`Application is being served here http://localhost:${SERVER_PORT}`);
});
