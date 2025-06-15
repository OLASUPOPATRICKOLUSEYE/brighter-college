import mongoose, { Schema, models } from "mongoose";

const PostalReceiveSchema = new Schema(
  {
    toTitle: { type: String, required: true },
    referenceNo: { type: String, required: true },
    address: { type: String, required: true },
    note: { type: String, required: true },
    fromTitle: { type: String, required: true },
    date: { type: String, required: true },
    attachment: { type: String }, // URL of file in Cloudinary or local
  },
  { timestamps: true }
);

const PostalReceive = models.PostalReceive || mongoose.model("PostalReceive", PostalReceiveSchema);

export default PostalReceive;
