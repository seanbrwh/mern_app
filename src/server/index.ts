"use strict";
import express from "express";
import http from "http";

const { SERVER_PORT } = process.env;

const router = express();

const server = http.createServer(router);

server.listen(SERVER_PORT, () => {
  console.info(
    `Application is being served here http://localhost:${SERVER_PORT}`
  );
});
