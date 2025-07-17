import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface IGenotype extends Document {
  genotype: string;
  description?: string;
}

const GenotypeSchema = new Schema<IGenotype>(
  {
    genotype: { type: String, required: true, minlength: 2 },
    description: { type: String },
  },
  { timestamps: true }
);

const Genotype: Model<IGenotype> = models.Genotype || mongoose.model<IGenotype>("Genotype", GenotypeSchema);

export default Genotype;
