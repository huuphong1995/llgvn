import { compare, hash } from "bcryptjs";
import { Model, Schema, model, models } from "mongoose";

export interface UserDocument {
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

UserSchema.pre("save", async function preSave() {
  if (!this.isModified("password")) return;
  this.password = await hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function comparePassword(
  candidate: string,
) {
  return compare(candidate, this.password);
};

const User: Model<UserDocument> =
  models.User || model<UserDocument>("User", UserSchema);

export default User;
