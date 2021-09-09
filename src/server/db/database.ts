import mongoose from "mongoose";
import { log } from "../utils";

const { MG_URI } = process.env;

export const connectDB = () => {
  mongoose
    .connect(MG_URI)
    .then(() => {
      log.info("Connected to database");
    })
    .catch((err) => {
      log.error({ mongooseConnectionError: err });
      process.exit(1);
    });
};
