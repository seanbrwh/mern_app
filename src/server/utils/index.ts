import mongoose from "mongoose";
import { Request, Response, NextFunction, Router } from "express";
import RoleModel from "../models/role.model";

const { MG_URI } = process.env;

type Wrapper = (router: Router) => void;

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

type Route = {
  path: string;
  method: string;
  handler: Handler | Handler[];
};

export const applyRoutes = (routes: Route[], router: Router) => {
  for (const route of routes) {
    const { method, path, handler } = route;
    (router as any)[method](path, handler);
  }
};

export const applyMiddleware = (
  middlewareWrapper: Wrapper[],
  router: Router
) => {
  for (const wrapper of middlewareWrapper) {
    wrapper(router);
  }
};

export const connectDB = () => {
  mongoose
    .connect(MG_URI)
    .then(() => {
      console.info("Connected to database");
      init();
    })
    .catch((err) => {
      console.error({ mongooseConnectionError: err });
    });
};

function init() {
  RoleModel.estimatedDocumentCount({}, (err, count) => {
    if (!err && count === 0) {
      new RoleModel({
        name: "user",
      }).save((err) => {
        if (err) {
          console.error({ errorMsg: err });
        }
        console.log("added 'user' to roles collection");
      });
      if (!err && count === 0) {
        new RoleModel({ name: "user" });
      }
      new RoleModel({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new RoleModel({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    } else {
      console.info("looks like roles collections already exists");
    }
  });
}
