import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface ITransportPickup extends Document {
  pickupPoint: string;
  description?: string;
  pickupId: string;
}

const TransportPickupSchema = new Schema<ITransportPickup>(
  {
    pickupPoint: { type: String, required: true, minlength: 3 },
    description: { type: String },
    pickupId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const TransportPickup: Model<ITransportPickup> =
  models.TransportPickup || mongoose.model<ITransportPickup>("TransportPickup", TransportPickupSchema);

export default TransportPickup;
