import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface IPhoneCallLog extends Document {
  phonecalllogId: string;
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
    phonecalllogId: { type: String, required: true, unique: true },
    name: { type: String, required: true, minlength: 5 },
    phone: { type: String, required: true, minlength: 5 },
    date: { type: Date, required: true, minlength: 5 },
    description: { type: String, required: true, minlength: 5 },
    nextfollowupdate: { type: Date, required: true, minlength: 5 },
    callduration: { type: String, required: true, minlength: 5 },
    note: { type: String, required: true, minlength: 5 },
    calltype: { type: String, enum: ["incoming", "outgoing"], required: true, minlength: 1 },
  },
  { timestamps: true }
);

const PhoneCallLog: Model<IPhoneCallLog> =
  models.PhoneCallLog || mongoose.model<IPhoneCallLog>("PhoneCallLog", PhoneCallLogSchema);

export default PhoneCallLog;
