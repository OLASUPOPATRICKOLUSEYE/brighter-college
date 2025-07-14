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
  assign: string;
  note: string;
  attachDocument: string[]; // ✅ Should be array of URLs now
}

const ComplaintSchema = new Schema<IComplaint>(
  {
    sno: { type: String, required: true, minlength: 1 },
    complaintType: { type: String, required: true, minlength: 1 },
    source: { type: String, required: true,  minlength: 1},
    complainBy: { type: String, required: true, minlength: 5 },
    phone: { type: String, required: true, minlength: 5 },
    date: { type: String, required: true, minlength: 5 },
    description: { type: String, required: true, minlength: 5 },
    actionTaken: { type: String, required: true, minlength: 5 },
    assign: { type: String, required: true, minlength: 5 },
    note: { type: String, required: true, minlength: 5 },
    attachDocument: { type: [String], required: true },
  },
  { timestamps: true }
);

const Complaint: Model<IComplaint> = models.Complaint || mongoose.model<IComplaint>("Complaint", ComplaintSchema);
export default Complaint;
