import mongoose, { Mongoose } from "mongoose";
import UserModel from "./user.model";
import RoleModel from "./role.model";

mongoose.Promise = global.Promise;

export default { UserModel, RoleModel };
