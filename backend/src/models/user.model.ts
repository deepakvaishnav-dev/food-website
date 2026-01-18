import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  email: string;
  password?: string;
  googleId?: string;
  name?: string;
  isAdmin: boolean;
  isBlocked: boolean;
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  googleId: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
