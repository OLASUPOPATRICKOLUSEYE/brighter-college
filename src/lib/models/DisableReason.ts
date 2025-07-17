import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface IDisableReason extends Document {
  description?: string;
}

const DisableReasonSchema = new Schema<IDisableReason>(
  {
    description: { type: String, required: true, minlength: 5 },
  },
  { timestamps: true }
);

const DisableReason: Model<IDisableReason> = models.DisableReason || mongoose.model<IDisableReason>("DisableReason", DisableReasonSchema);

export default DisableReason;