import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface IBloodGroup extends Document {
  bloodGroup: string;
  description?: string;
  bloodGroupId: string;
}

const BloodGroupSchema = new Schema<IBloodGroup>(
  {
    bloodGroup: { type: String, required: true, minlength: 2 },
    description: { type: String },
    bloodGroupId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const BloodGroup: Model<IBloodGroup> =
  models.BloodGroup || mongoose.model<IBloodGroup>("BloodGroup", BloodGroupSchema);

export default BloodGroup;
