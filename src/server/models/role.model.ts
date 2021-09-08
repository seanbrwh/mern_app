import { Schema, model, Model } from "mongoose";

interface IRole {
  _id: Schema.Types.ObjectId;
  name: string;
}

const schema = new Schema<IRole>({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
});

const RoleModel = model<IRole>("Role", schema);

export default RoleModel;
