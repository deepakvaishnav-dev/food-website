import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  email: string;
  password?: string;
  googleId?: string;
  name?: string;
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
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
