import { Schema, model, Model } from "mongoose";

export interface IRole {
  _id: string;
  name: string;
}

const schema = new Schema<IRole>({
  _id: String,
  name: { type: String, required: true },
});

const RoleModel = model<IRole>("Role", schema);

export default RoleModel;
