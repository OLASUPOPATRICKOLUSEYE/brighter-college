import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface IClass extends Document {
  className: string;
}

const ClassSchema = new Schema<IClass>(
  {
    className: { type: String, required: true, minlength: 2 },
  },
  { timestamps: true }
);

const Class: Model<IClass> = models.Class || mongoose.model<IClass>("Class", ClassSchema);

export default Class;
