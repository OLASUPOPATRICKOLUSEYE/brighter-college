import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface IReference extends Document {
  referenceId: string;
  reference: string;
  description?: string;
}

const ReferenceSchema = new Schema<IReference>(
  {
    reference: { type: String, required: true, trim: true, minlength: 5 },
    description: { type: String, default: "" },
    referenceId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Reference: Model<IReference> = models.Reference || mongoose.model<IReference>("Reference", ReferenceSchema);
export default Reference;
