import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface IRoom extends Document {
  roomName: string;
  description?: string;
  roomId: string;
}

const RoomSchema = new Schema<IRoom>(
  {
    roomName: { type: String, required: true, minlength: 2 },
    description: { type: String },
    roomId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Room: Model<IRoom> =
  models.Room || mongoose.model<IRoom>("Room", RoomSchema);

export default Room;
