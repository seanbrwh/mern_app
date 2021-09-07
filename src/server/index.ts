"use strict";
import express from "express";
import http from "http";

import { applyMiddleware } from "./utils";

import middleware from "./middleware";

import { connectDB } from "./utils/connect";

const { SERVER_PORT } = process.env;

const router = express();
applyMiddleware(middleware, router);
connectDB();

const server = http.createServer(router);

server.listen(SERVER_PORT, () => {
  console.info(
    `Application is being served here http://localhost:${SERVER_PORT}`
  );
});
