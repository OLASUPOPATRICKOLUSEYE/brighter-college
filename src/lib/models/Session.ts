import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface ISession extends Document {
  session: string;
  description?: string;
  sessionId: string;
}

const SessionSchema = new Schema<ISession>(
  {
    session: { type: String, required: true, minlength: 9 },
    description: { type: String },
    sessionId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Session: Model<ISession> =
  models.Session || mongoose.model<ISession>("Session", SessionSchema);

export default Session;
