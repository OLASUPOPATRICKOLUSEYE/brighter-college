import mongoose, { Schema, models } from "mongoose";

const ComplaintSchema = new Schema(
  {
    complaintType: { type: String, enum: ["fees", "hostel", "transport"], required: true },
    source: { type: String },
    complainBy: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String },
    actionTaken: { type: String },
    assigned: { type: String },
    note: { type: String },
    attachment: { type: String },
  },
  { timestamps: true }
);

export default models.Complaint || mongoose.model("Complaint", ComplaintSchema);
