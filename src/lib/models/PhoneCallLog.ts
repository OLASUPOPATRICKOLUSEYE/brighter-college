import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface IPhoneCall extends Document {
  name: string;
  phone: string;
  date: string;
  description?: string;
  nextFollowUpDate?: string;
  duration?: string;          // CHANGED from callDuration to duration
  note?: string;
  callType: "Incoming" | "Outgoing"; // match casing if possible
}

const PhoneCallLogSchema = new Schema<IPhoneCall>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String },
    nextFollowUpDate: { type: String },
    duration: { type: String },          // CHANGED from callDuration to duration
    note: { type: String },
    callType: { type: String, enum: ["Incoming", "Outgoing"], required: true }, // match form
  },
  { timestamps: true }
);

const PhoneCallLog: Model<IPhoneCall> =
  models.PhoneCallLog || mongoose.model<IPhoneCall>("PhoneCallLog", PhoneCallLogSchema);

export default PhoneCallLog;
