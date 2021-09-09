import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleLogging,
  setBasePath,
  setViewEngine,
  setStaticPath,
  serveIndex,
  setSession,
} from "./common";

export { deserializeUser } from "./deserializeUser";
export { requiresUser } from "./requireUser";
export { validateRequest } from "./validateRequest";

export default [
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleLogging,
  setBasePath,
  setViewEngine,
  setStaticPath,
  serveIndex,
  setSession,
];
