import mongoose, { Schema, models } from "mongoose";

const PhoneCallLogSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String },
    nextFollowUpDate: { type: String },
    callDuration: { type: String },
    note: { type: String },
    callType: { type: String, enum: ["incoming", "outgoing"], required: true },
  },
  { timestamps: true }
);

export default models.PhoneCallLog || mongoose.model("PhoneCallLog", PhoneCallLogSchema);
