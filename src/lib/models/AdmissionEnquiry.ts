import mongoose, { Schema, models } from "mongoose";

const AdmissionEnquirySchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String },
    description: { type: String },
    note: { type: String },
    date: { type: String, required: true },
    nextFollowUpDate: { type: String },
    assignedTeacher: { type: String },
    reference: { type: String, enum: ["student", "staff", "partnerschool", "self"], required: true },
    source: { type: String },
    class: { type: String },
    numberOfChild: { type: Number },
  },
  { timestamps: true }
);

export default models.AdmissionEnquiry || mongoose.model("AdmissionEnquiry", AdmissionEnquirySchema);
