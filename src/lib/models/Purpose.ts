import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface IPurpose extends Document {
  purpose: string;
  description?: string;
}

const PurposeSchema = new Schema<IPurpose>(
  {
    purpose: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

const Purpose: Model<IPurpose> = models.Purpose || mongoose.model<IPurpose>("Purpose", PurposeSchema);
export default Purpose;
