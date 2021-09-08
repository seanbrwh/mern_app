import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import model from "../models";

exports.singup = (req, res) => {
  const { username, email, password } = req.body;
  const user = new model.UserModel({
    username: username,
    email: email,
    password: bcrypt.hashSync(password, 8),
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.roles) {
      model.RoleModel.find({ name: { $in: req.body.roles } }, (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.roles = roles.map((role) => role._id);
      });
    }
  });
};
