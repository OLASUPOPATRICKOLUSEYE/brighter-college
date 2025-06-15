import mongoose, { Schema, models } from "mongoose";

const PostalDispatchSchema = new Schema(
  {
    toTitle: { type: String, required: true },
    referenceNo: { type: String },
    address: { type: String, required: true },
    note: { type: String },
    fromTitle: { type: String, required: true },
    date: { type: String, required: true },
    attachment: { type: String },
  },
  { timestamps: true }
);

export default models.PostalDispatch || mongoose.model("PostalDispatch", PostalDispatchSchema);
