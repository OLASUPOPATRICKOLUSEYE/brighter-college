// models/category.ts
import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface ICategory extends Document {
  category: string;
  description?: string;
  categoryId: string;
}

const CategorySchema = new Schema<ICategory>(
  {
    category: { type: String, required: true, minlength: 3 },
    description: { type: String },
    categoryId: { type: String, required: true },
  },
  { timestamps: true }
);

const Category: Model<ICategory> =
  models.Category || mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
