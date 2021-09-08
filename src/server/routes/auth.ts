import middleware from "../middleware";
import { applyMiddleware } from "../utils";
import { signIn, singup } from "../controllers/auth.controller";

const auth = middleware.auth;

export default [
  {
    method: "POST",
    path: "/api/auth/signup",
    handler: (req, res) => {
      singup;
    },
  },
  {
    method: "POST",
    path: "/api/auth/signin",
    handler: (req, res) => {
      signIn;
    },
  },
];
dd;
