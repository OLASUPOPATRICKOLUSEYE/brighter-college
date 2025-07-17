import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface ISession extends Document {
  session: string;
}

const SessionSchema = new Schema<ISession>(
  {
    session: { type: String, required: true, minlength: 9 },
  },
  { timestamps: true }
);

const Session: Model<ISession> = models.Session || mongoose.model<ISession>("Session", SessionSchema);

export default Session;
