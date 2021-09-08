import express, { Router, Application } from "express";
import cors from "cors";
import parser from "body-parser";
import compress from "compression";
import morgan from "morgan";
import path from "path";
import session from "express-session";

const { NODE_ENV } = process.env;

export const handleCors = (router: Router) => {
  router.use(
    cors({ origin: ["http://localhost:3015", "http://localhost:4000"] })
  );
};
export const handleBodyRequestParsing = (router: Router) => {
  router.use(express.urlencoded({ extended: true, limit: "50mb" }));
  router.use(express.json());
  router.use(express.json({ type: "application/json" }));
};
export const handleCompression = (router: Router) => {
  router.use(compress());
};
export const handleLogging = (router: Router) => {
  router.use(morgan("tiny"));
};
export const setBasePath = (router: Application) => {
  router.set("views", path.join(__dirname, "../views"));
};
export const setViewEngine = (router: Application) => {
  router.set("view engine", "ejs");
};
export const setStaticPath = (router: Router) => {
  router.use("/dist", express.static(path.join(__dirname, "../../dist")));
};
export const setSession = (router: Router) => {
  router.use(
    session({
      secret: "ASDFASDFASDFASDF",
      resave: false,
      saveUninitialized: false,
    })
  );
};

export const serveIndex = (router: Router) => {
  router.use("*", (req, res, next) => {
    if (
      req.originalUrl.includes("/api") ||
      req.baseUrl.includes("/api") ||
      req.url.includes("/api")
    ) {
      return next();
    } else {
      res.setHeader("Cache-Control", "no-store");
      res.render("index", {
        jsMainFile:
          NODE_ENV === "development"
            ? `http://localhost:3015/mern_app.js`
            : require("../../dist/static/manifest.json")["mern_app.js"],
      });
    }
  });
};
