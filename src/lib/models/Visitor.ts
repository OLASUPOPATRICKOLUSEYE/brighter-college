import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface IVisitor extends Document {
  purpose: string;
  meetingWith: string;
  visitorName: string;
  phone: string;
  idCard: string;
  numberOfPerson: number;
  date: Date;
  inTime: string;
  outTime: string;
  attachment: string[];
  note: string;
}

const VisitorSchema = new Schema<IVisitor>(
  {
    purpose: {
      type: String,
      required: [true, "Purpose is required"],
      minlength: 1,
      trim: true,
    },
    meetingWith: {
      type: String,
      required: [true, "Meeting With is required"],
      minlength: 1,
      trim: true,
    },
    visitorName: {
      type: String,
      required: [true, "Visitor Name is required"],
      minlength: 5,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    idCard: {
      type: String,
      required: [true, "ID Card is required"],
      minlength: 3,
      trim: true,
    },
    numberOfPerson: { 
      type: Number, 
      required: true, 
      min: 1,      
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      trim: true,
      minlength: 5,
    },
    inTime: {
      type: String,
      required: [true, "In Time is required"],
      trim: true,
      minlength: 5,
    },
    outTime: {
      type: String,
      required: [true, "Out Time is required"],
      trim: true,
      minlength: 5,
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
    note: {
      type: String,
      required: [true, "Note is required"],
      minlength: 5,
      trim: true,
    },
  },
  { timestamps: true }
);

const Visitor: Model<IVisitor> =
  models.Visitor || mongoose.model<IVisitor>("Visitor", VisitorSchema);

export default Visitor;
