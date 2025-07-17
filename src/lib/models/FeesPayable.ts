import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface IFeesPayable extends Document {
  feeName: string;
  monthly: boolean;
}

const FeesPayableSchema = new Schema<IFeesPayable>(
  {
    feeName: { type: String, required: true, minlength: 3 },
    monthly: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const FeesPayable: Model<IFeesPayable> = models.FeesPayable || mongoose.model<IFeesPayable>("FeesPayable", FeesPayableSchema);

export default FeesPayable;
