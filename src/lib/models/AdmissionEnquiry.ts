import mongoose, { Schema, Document, Model, models } from "mongoose";

export interface IAdmissionEnquiry extends Document {
  name: string;
  phone: string;
  email: string;
  address: string;
  description: string;
  note: string;
  date: Date; 
  nextfollowupdate: Date; 
  assignedstaff: string;
  reference: string;
  source: string;
  class: string;
  numberofchild: number;
}

const AdmissionEnquirySchema = new Schema<IAdmissionEnquiry>(
  {
    name: { type: String, required: true, minlength: 5 },
    phone: { type: String, required: true, minlength: 5 },
    email: { type: String, required: true, minlength: 5 },
    address: { type: String, required: true, minlength: 5 },
    description: { type: String, required: true, minlength: 5 },
    note: { type: String, required: true, minlength: 5 },
    date: { type: Date, required: true, minlength: 5 },
    nextfollowupdate: { type: Date, required: true, minlength: 5 },
    assignedstaff: { type: String, required: true, minlength: 5 },
    reference: { type: String, required: true, minlength: 1 },
    source: { type: String, required: true, minlength: 1 },
    class: { type: String, required: true, minlength: 2 },
    numberofchild: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

const AdmissionEnquiry: Model<IAdmissionEnquiry> =
  models.AdmissionEnquiry || mongoose.model<IAdmissionEnquiry>("AdmissionEnquiry", AdmissionEnquirySchema);

export default AdmissionEnquiry;
