import { connectDB } from "./mongodb";
import mongoose, { Model, Document } from "mongoose";

export const getAll = async <T extends Document>(
  Model: Model<T>,
  filter = {},
  { search = "", page = 1, limit = 10 } = {}
) => {
  await connectDB();
  const query = search ? { purpose: { $regex: search, $options: "i" } } : {};
  const skip = (page - 1) * limit;

  const data = await Model.find({ ...filter, ...query }).skip(skip).limit(limit).lean();
  const count = await Model.countDocuments({ ...filter, ...query });

  return { data, count };
};

export const createItem = async <T extends Document>(Model: Model<T>, data: any) => {
  await connectDB();
  const item = new Model(data);
  await item.save();
  return item;
};

export const getById = async <T extends Document>(Model: Model<T>, id: string) => {
  await connectDB();
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid ID");
  return await Model.findById(id);
};

export const updateItem = async <T extends Document>(Model: Model<T>, id: string, data: any) => {
  await connectDB();
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid ID");
  return await Model.findByIdAndUpdate(id, data, { new: true });
};

export const deleteItem = async <T extends Document>(Model: Model<T>, id: string) => {
  await connectDB();
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid ID");
  return await Model.findByIdAndDelete(id);
};
