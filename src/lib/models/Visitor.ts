import mongoose, { Schema, models } from "mongoose";

const VisitorSchema = new Schema(
  {
    name: { type: String, required: true },
    meetingWith: { type: String, enum: ["student", "staff"], required: true },
    studentName: { type: String },
    studentSession: { type: String },
    staffName: { type: String },
    phone: { type: String, required: true },
    idCard: { type: String },
    numberOfPersons: { type: Number, required: true },
    date: { type: String, required: true },
    inTime: { type: String, required: true },
    outTime: { type: String, required: true },
    attachment: { type: String },
    note: { type: String },
  },
  { timestamps: true }
);

export default models.Visitor || mongoose.model("Visitor", VisitorSchema);
