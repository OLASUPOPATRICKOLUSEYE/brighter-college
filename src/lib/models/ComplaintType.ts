import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface IComplaintType extends Document {
  complainttypeId: string;
  complainttype: string;
  description?: string;
}

const complaintTypeSchema = new Schema<IComplaintType>(
  {
    complainttypeId: { type: String, required: true, unique: true },
    complainttype: { type: String, required: true, trim: true, minlength: 5 },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

const ComplaintType: Model<IComplaintType> = models.ComplaintType || mongoose.model<IComplaintType>("ComplaintType", complaintTypeSchema);
export default ComplaintType;
