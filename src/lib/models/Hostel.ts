import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface IHostel extends Document {
  hostelName: string;
}

const HostelSchema = new Schema<IHostel>(
  {
    hostelName: { type: String, required: true, minlength: 2 },
  },
  { timestamps: true }
);

const Hostel: Model<IHostel> = models.Hostel || mongoose.model<IHostel>("Hostel", HostelSchema);

export default Hostel;
