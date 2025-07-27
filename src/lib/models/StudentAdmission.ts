import mongoose, { Schema, Document, Model, models } from "mongoose";

export interface IStudentAdmission extends Document {
  // Student Details
  studentadmissionId: string;
  studentName: string;
  gender: string;
  dateofBirth: Date;
  category: string;
  religion: string;
  session: string;
  className: string;
  caste: string;
  phoneNumber: string;
  email: string;
  admissionDate: Date;
  studentAttachment: string[];
  bloodGroup: string; 
  genotype: string;
  studenthouse: string;
  height: string;
  weight: string;
  measurementDate: Date;
  medicalHistory: string;
  address: string;

  siblingClass: string;
  siblingSession: string;
  siblingName: string;

  // Transport Details
  routeName: string;
  pickuppoint: string;
  feesMonth: string;
  // Hostel Detail
  hostelName: string;
  roomName: string;
  // Fees Details
  feeDetails: string;
  // Fees Discount Details
  feeDiscountDetail: string;
  // Parent/Guardian Details
  fatherName: string;
  fatherPhone: string;
  fatherOccupation: string;
  fatherAttachment: string[];
  motherName: string;
  motherPhone: string;
  motherOccupation: string;
  motherAttachment: string[];
  guardianIs: string;
  guardianName: string;
  guardianRelation: string;
  guardianEmail: string;
  guardianPhone: string;
  guardianOccupation: string;
  guardianAddress: string;
  guardianAttachment: string[];
  guardianSameAsCurrent: boolean;
  permanentSameAsCurrent: boolean;
  permanentAddress: string;
  // Miscellaneous Details
  accountNumber: string;
  bankName: string;
  sortCode: string;
  nin: string;
  previousSchoolDetails: string;
  note: string;
  // Other Documents
  title1: string;
  title1Attachment: string[];
  title2: string;
  title2Attachment: string[];
  title3: string;
  title3Attachment: string[];
  title4: string;
  title4Attachment: string[];
}

const StudentAdmissionSchema = new Schema<IStudentAdmission>(
  {
    // Student Details
    studentadmissionId: { type: String, required: true, unique: true },
    studentName: { type: String },
    gender: { type: String },
    dateofBirth: { type: Date },
    category: { type: String },
    religion: { type: String },
    session: { type: String },
    className: { type: String },
    caste: { type: String },
    phoneNumber: { type: String },
    email: { type: String },
    admissionDate: { type: Date },
    studentAttachment: {
    type: [String],
    required: false,
    default: undefined,
    },
    bloodGroup: { type: String },
    genotype: { type: String },
    studenthouse: { type: String },
    height: { type: String },
    weight: { type: String },
    measurementDate: { type: Date },
    medicalHistory: { type: String },
    address: { type: String },

    // Sibling
    siblingClass: { type: String },
    siblingSession: { type: String },
    siblingName: { type: String },

    // Transport Details
    routeName: { type: String },
    pickuppoint: { type: String },
    feesMonth: { type: String },
    // Hostel Detail
    hostelName: { type: String },
    roomName: { type: String },
    // Fees Details
    feeDetails: { type: String },
    // Fees Discount Details
    feeDiscountDetail: { type: String },
    // Parent/Guardian Details
    fatherName: { type: String },
    fatherPhone: { type: String },
    fatherOccupation: { type: String },
    fatherAttachment: {
    type: [String],
    required: false,
    default: undefined,
    },
    motherName: { type: String },
    motherPhone: { type: String },
    motherOccupation: { type: String },
    motherAttachment: {
    type: [String],
    required: false,
    default: undefined,
    },
    guardianIs: { type: String },
    guardianName: { type: String },
    guardianRelation: { type: String },
    guardianEmail: { type: String },
    guardianPhone: { type: String },
    guardianOccupation: { type: String },
    guardianAddress: { type: String },    
    guardianAttachment: {
    type: [String],
    required: false,
    default: undefined,
    },
    guardianSameAsCurrent: { type: Boolean },
    permanentSameAsCurrent: { type: Boolean },
    permanentAddress: { type: String },    
    // Miscellaneous Details
    accountNumber: { type: String },
    bankName: { type: String },
    sortCode: { type: String },
    nin: { type: String },
    previousSchoolDetails: { type: String },
    note: { type: String },    
    // Other Documents
    title1: { type: String },
    title1Attachment: {
    type: [String],
    required: false,
    default: undefined,
    },
    title2: { type: String },
    title2Attachment: {
    type: [String],
    required: false,
    default: undefined,
    },
    title3: { type: String },
    title3Attachment: {
    type: [String],
    required: false,
    default: undefined,
    },
    title4: { type: String },    
    title4Attachment: {
    type: [String],
    required: false,
    default: undefined,
    },

  },
  { timestamps: true }
);

const StudentAdmission: Model<IStudentAdmission> =
  models.StudentAdmission ||
  mongoose.model<IStudentAdmission>("StudentAdmission", StudentAdmissionSchema);

export default StudentAdmission;
