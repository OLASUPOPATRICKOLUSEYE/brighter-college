import mongoose, { Schema, Document, Model, models } from "mongoose";

export interface IStudentHouse extends Document {
  studenthouse: string;
  description?: string;
  houseId: string;
}

const StudentHouseSchema = new Schema<IStudentHouse>(
  {
    studenthouse: { type: String, required: true, minlength: 3 },
    description: { type: String },
    houseId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const StudentHouse: Model<IStudentHouse> =
  models.StudentHouse || mongoose.model<IStudentHouse>("StudentHouse", StudentHouseSchema);

export default StudentHouse;
