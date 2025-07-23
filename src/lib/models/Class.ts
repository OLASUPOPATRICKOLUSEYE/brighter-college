import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface IClass extends Document {
  className: string;
  description?: string;
  classId: string;
}

const ClassSchema = new Schema<IClass>(
  {
    className: { type: String, required: true, minlength: 2 },
    description: { type: String },
    classId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Class: Model<IClass> =
  models.Class || mongoose.model<IClass>("Class", ClassSchema);

export default Class;
