"use strict";
import express from "express";
import http from "http";

import { applyMiddleware, applyRoutes, connectDB } from "./utils";

import middleware from "./middleware";
import routes from "./routes";

const { SERVER_PORT } = process.env;

const router = express();
applyMiddleware(middleware.common, router);
connectDB();
applyRoutes(routes, router);

const server = http.createServer(router);

server.listen(SERVER_PORT, () => {
  console.info(
    `Application is being served here http://localhost:${SERVER_PORT}`
  );
});
