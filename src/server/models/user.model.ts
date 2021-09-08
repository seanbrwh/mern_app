import mongoose, { Schema, model } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
  roles: Array<{ type: mongoose.Schema.Types.ObjectId; ref: string }>;
}

const schema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minlength: 8 },
  roles: [
    {
      _id: Schema.Types.ObjectId,
      name: String,
    },
  ],
});

const UserModel = model<IUser>("User", schema);

export default UserModel;
