import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface IRoom extends Document {
  roomName: string;
}

const RoomSchema = new Schema<IRoom>(
  {
    roomName: { type: String, required: true, minlength: 2 },
  },
  { timestamps: true }
);

const Room: Model<IRoom> = models.Room || mongoose.model<IRoom>("Room", RoomSchema);

export default Room;
