import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface IPhoneCallLog extends Document {
  name: string;
  phone: string;
  date: Date;
  description: string;
  nextfollowupdate: Date;
  callduration: string;
  note: string;
  calltype: "incoming" | "outgoing";
}

const PhoneCallLogSchema = new Schema<IPhoneCallLog>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    nextfollowupdate: { type: Date, required: true },
    callduration: { type: String, required: true },
    note: { type: String, required: true },
    calltype: { type: String, enum: ["incoming", "outgoing"], required: true },
  },
  { timestamps: true }
);

const PhoneCallLog: Model<IPhoneCallLog> =
  models.PhoneCallLog || mongoose.model<IPhoneCallLog>("PhoneCallLog", PhoneCallLogSchema);

export default PhoneCallLog;
