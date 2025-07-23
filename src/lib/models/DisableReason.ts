import mongoose, { Schema, Document, Model, models } from "mongoose";

export interface IDisableReason extends Document {
  disablereason: string;
  description?: string;
  disablereasonId: string;
}

const DisableReasonSchema = new Schema<IDisableReason>(
  {
    disablereason: { type: String, required: true, minlength: 3 },
    description: { type: String },
    disablereasonId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const DisableReason: Model<IDisableReason> =
  models.DisableReason || mongoose.model<IDisableReason>("DisableReason", DisableReasonSchema);

export default DisableReason;
