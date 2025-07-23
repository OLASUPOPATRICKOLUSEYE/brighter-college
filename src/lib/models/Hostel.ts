import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface IHostel extends Document {
  hostelName: string;
  description?: string;
  hostelId: string;
}

const HostelSchema = new Schema<IHostel>(
  {
    hostelName: { type: String, required: true, minlength: 2 },
    description: { type: String },
    hostelId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Hostel: Model<IHostel> =
  models.Hostel || mongoose.model<IHostel>("Hostel", HostelSchema);

export default Hostel;
