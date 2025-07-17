import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface IComplaint extends Document {
  sno: string;
  complaintType: string;
  source: string;
  complainBy: string;
  phone: string;
  date: string;
  description: string;
  actionTaken: string;
  assignedStaff: string;
  note: string;
  attachment: string[]; // Array of uploaded document/image URLs
}

const ComplaintSchema = new Schema<IComplaint>(
  {
    complaintType: {
      type: String,
      required: [true, "Complaint Type is required"],
      minlength: 1,
      trim: true,
    },
    source: {
      type: String,
      required: [true, "Source is required"],
      minlength: 1,
      trim: true,
    },
    complainBy: {
      type: String,
      required: [true, "Complain By is required"],
      minlength: 5,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      minlength: 5,
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Date is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: 5,
      trim: true,
    },
    actionTaken: {
      type: String,
      required: [true, "Action Taken is required"],
      minlength: 5,
      trim: true,
    },
    assignedStaff: {
      type: String,
      required: [true, "Assigned is required"],
      minlength: 5,
      trim: true,
    },
    note: {
      type: String,
      required: [true, "Note is required"],
      minlength: 5,
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

const Complaint: Model<IComplaint> =
  models.Complaint || mongoose.model<IComplaint>("Complaint", ComplaintSchema);

export default Complaint;
