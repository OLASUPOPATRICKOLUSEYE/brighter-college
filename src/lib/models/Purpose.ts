import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface IPurpose extends Document {
  purposeId: string;
  purpose: string;
  description?: string;
}

const PurposeSchema = new Schema<IPurpose>(
  {
    purposeId: { type: String, required: true, unique: true },
    purpose: { type: String, required: true, minlength: 5 },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

const Purpose: Model<IPurpose> = models.Purpose || mongoose.model<IPurpose>("Purpose", PurposeSchema);
export default Purpose;
