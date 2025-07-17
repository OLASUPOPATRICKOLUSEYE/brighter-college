import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  role?: "admin" | "teacher" | "receptionist" | "librarian" | "accountant" | "student" | "parent";
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    role: {
      type: String,
      enum: ["admin", "teacher", "receptionist", "librarian", "accountant", "student", "parent"],
      default: "student",
    },
  },
  { timestamps: true }
);

const User: Model<IUser> = models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
