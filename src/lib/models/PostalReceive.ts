import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface IPostalReceive extends Document {
  fromTitle: string;
  referenceNo: string;
  address: string;
  note: string;
  toTitle: string;
  date: string;
  attachment: string[]; // Array of uploaded document/image URLs
}

const PostalReceiveSchema = new Schema<IPostalReceive>(
  {
    fromTitle: {
      type: String,
      required: [true, "To Title is required"],
      minlength: 5,
      trim: true,
    },
    referenceNo: {
      type: String,
      required: [true, "Reference No is required"],
      minlength: 5,
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      minlength: 5,
      trim: true,
    },
    note: {
      type: String,
      required: [true, "Note is required"],
      minlength: 5,
      trim: true,
    },
    toTitle: {
      type: String,
      required: [true, "From Title is required"],
      minlength: 5,
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Date is required"],
      trim: true,
    },
    attachment: {
      type: [String],
      required: [true, "Attachment is required"],
      validate: {
        validator: function (val: string[]) {
          return Array.isArray(val) && val.length > 0;
        },
        message: "At least one document/image must be uploaded",
      },
    },
  },
  { timestamps: true }
);

const PostalReceive: Model<IPostalReceive> =
  models.PostalReceive || mongoose.model<IPostalReceive>("PostalReceive", PostalReceiveSchema);

export default PostalReceive;
