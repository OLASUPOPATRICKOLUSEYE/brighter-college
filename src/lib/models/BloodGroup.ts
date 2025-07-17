import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface IBloodGroup extends Document {
  bloodGroup: string;
}

const BloodGroupSchema = new Schema<IBloodGroup>(
  {
    bloodGroup: { type: String, required: true, minlength: 2 },
  },
  { timestamps: true }
);

const BloodGroup: Model<IBloodGroup> = models.BloodGroup || mongoose.model<IBloodGroup>("BloodGroup", BloodGroupSchema);

export default BloodGroup;
