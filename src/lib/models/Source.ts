import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface ISource extends Document {
  sourceId: string;
  source: string;
  description?: string;
}

const SourceSchema = new Schema<ISource>(
  {
    sourceId: { type: String, required: true, unique: true },
    source: { type: String, required: true, trim: true, minlength: 5 },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

const Source: Model<ISource> = models.Source || mongoose.model<ISource>("Source", SourceSchema);
export default Source;
