import jwt from "jsonwebtoken";
import model from "../models";

export const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ msg: "token req" });
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("unauthorized");
    }
    req.userId = decoded.id;
    next();
  });
};

export const isAdmin = (req, res, next) => {
  model.UserModel.findOne(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
    }
    model.RoleModel.find({ _id: { $in: user.roles } }, (err, roles) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({ message: "Admin Role Required" });
    });
  });
};

export const isMod = (req, res, next) => {
  model.UserModel.findOne(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    model.RoleModel.find({ _id: { $in: user.roles } }, (err, roles) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") next();
        return;
      }
      res.status(403).send({ message: "Mode role required" });
    });
  });
};

export default { verifyToken, isAdmin, isMod };
