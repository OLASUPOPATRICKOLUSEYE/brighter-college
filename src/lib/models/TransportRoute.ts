import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface ITransportRoute extends Document {
  routeName: string;
  description: string;
}

const TransportRouteSchema = new Schema<ITransportRoute>(
  {
    routeName: { type: String, required: true, minlength: 3 },
    description: { type: String, required: true, minlength: 3 },
  },
  { timestamps: true }
);

const TransportRoute: Model<ITransportRoute> = models.TransportRoute || mongoose.model<ITransportRoute>("TransportRoute", TransportRouteSchema);

export default TransportRoute;
