import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import model from "../models";

export const singup = (req, res) => {
  const { username, email, password } = req.body;
  const user = new model.UserModel({
    username: username,
    email: email,
    password: bcrypt.hashSync(password, 8),
    roles: [],
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
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({ message: "User was registered successfully!" });
        });
      });
    } else {
      model.RoleModel.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({ message: "User was registered successfully" });
        });
      });
    }
  });
};

export const signIn = (req, res) => {
  model.UserModel.findOne({ username: req.body.username })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res
          .status(401)
          .send({ accessToken: null, message: "Invalid password" });
      }
      var token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 86400,
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    });
};
