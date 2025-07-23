import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface IFeesPayable extends Document {
  feeName: string;
  monthly: boolean;
  feesId: string;
}

const FeesPayableSchema = new Schema<IFeesPayable>(
  {
    feeName: { type: String, required: true, minlength: 3 },
    monthly: { type: Boolean, required: true },
    feesId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const FeesPayable: Model<IFeesPayable> =
  models.FeesPayable || mongoose.model<IFeesPayable>("FeesPayable", FeesPayableSchema);

export default FeesPayable;
