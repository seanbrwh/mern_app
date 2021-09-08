import mongoose, { Schema, model, ObjectId } from "mongoose";
import { IRole } from "./role.model";

export interface IUser {
  username: string;
  email: string;
  password: string;
  roles: Array<any>;
}

const schema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minlength: 8 },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

const UserModel = model<IUser>("User", schema);

export default UserModel;
