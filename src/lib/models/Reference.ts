import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface IReference extends Document {
  reference: string;
  description?: string;
}

const ReferenceSchema = new Schema<IReference>(
  {
    reference: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

const Reference: Model<IReference> = models.Reference || mongoose.model<IReference>("Reference", ReferenceSchema);
export default Reference;
