import mongoose, { Schema, Document, Model, models } from "mongoose";

export interface IUserGeneralComplaint extends Document {
  name: string;
  email: string;
  subject: string;
  description: string;
  date: Date;
}

const UserGeneralComplaintSchema = new Schema<IUserGeneralComplaint>(
  {
    name: { type: String, required: true, minlength: 5 },
    email: { type: String, required: true, minlength: 5 },
    subject: { type: String, required: true, minlength: 5 },
    description: { type: String, required: true, minlength: 5 },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const UserGeneralComplaint: Model<IUserGeneralComplaint> =
  models.UserGeneralComplaint || mongoose.model<IUserGeneralComplaint>("UserGeneralComplaint", UserGeneralComplaintSchema);

export default UserGeneralComplaint;
