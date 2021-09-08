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

import { checkRolesExisted, checkDuplicateUsernameOrEmail } from "./auth";
import { verifyToken, isAdmin, isMod } from "./authjwt";

export default {
  common: [
    handleCors,
    handleBodyRequestParsing,
    handleCompression,
    handleLogging,
    setBasePath,
    setViewEngine,
    setStaticPath,
    serveIndex,
    setSession,
  ],
  auth: {
    checkRolesExisted,
    checkDuplicateUsernameOrEmail,
    verifyToken,
    isAdmin,
    isMod,
  },
};
