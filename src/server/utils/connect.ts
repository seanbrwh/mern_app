import mongoose from "mongoose";

const { MG_URI } = process.env;

export const connectDB = () => {
  mongoose
    .connect(MG_URI)
    .then(() => {
      console.info("Connected to database");
    })
    .catch((err) => {
      console.error({ mongooseConnectionError: err });
    });
};
