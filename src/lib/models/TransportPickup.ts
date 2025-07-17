import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface ITransportPickup extends Document {
  pickupPoint: string;
  description: string;
}

const TransportPickupSchema = new Schema<ITransportPickup>(
  {
    pickupPoint: { type: String, required: true, minlength: 3 },
    description: { type: String, required: true, minlength: 3 },
  },
  { timestamps: true }
);

const TransportPickup: Model<ITransportPickup> = models.TransportPickup || mongoose.model<ITransportPickup>("TransportPickup", TransportPickupSchema);

export default TransportPickup;
