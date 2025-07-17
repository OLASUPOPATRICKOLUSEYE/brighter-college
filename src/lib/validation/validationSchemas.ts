import { z } from "zod";


  // FRONT OFFICE VALIDATION
export const admissionEnquirySchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters"),
  phone: z.string().min(5, "Phone must be at least 5 characters"),
  email: z.string().min(5, "Email must be at least 5 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  note: z.string().min(5, "Note must be at least 5 characters"),
  date: z.string().min(5, "Date is required"),
  nextfollowupdate: z.string().min(5, "Next Follow Up Date is required"),
  assignedstaff: z.string().min(5, "Assigned Staff is required"),
  reference: z.string().min(1, "Reference is required"),
  source: z.string().min(1, "Source is required"),
  class: z.string().min(2, "Class is required"),
  numberofchild: z.coerce.number().min(1, "Number of Child is required"),
});

export const visitorSchema = z.object({
  purpose: z.string().min(1, "Purpose is required"),
  meetingWith: z.string().min(1, "Meeting With is required"),
  visitorName: z.string().min(5, "Visitor Name is required"),
  phone: z
    .string(),
  idCard: z.string().min(3, "ID Card is required"),
  numberOfPerson: z.coerce.number().min(1, "Number of Child is required"),
  date: z.string().min(5, "Date is required"),
  inTime: z.string().min(5, "In Time is required"),
  outTime: z.string().min(5, "Out Time is required"),
  attachment: z
    .array(z.union([z.string(), z.instanceof(File)]))
    .min(1, "At least one image is required"),
  note: z.string().min(5, "Note is required"),
});

export const phoneCallLogSchema = z.object({
  name: z.string().min(5, "Name is required"),
  phone: z.string().min(5, "Phone number is required"),
  date: z.string().min(1, "Date is required"), 
  description: z.string().min(5, "Description is required"),
  nextfollowupdate: z.string().min(5, "Next follow-up date is required"), 
  callduration: z.string().min(5, "Call duration is required"),
  note: z.string().min(5, "Note is required"),
  calltype: z.enum(["incoming", "outgoing"], { required_error: "Call type is required" }),
});

export const postalDispatchSchema = z.object({
  toTitle: z.string().min(5, "To Title is required"),
  referenceNo: z.string().min(5, "Reference No is required"),
  address: z.string().min(5, "Address is required"),
  note: z.string().min(5, "Note is required"),
  fromTitle: z.string().min(5, "From Title is required"),
  date: z.string().min(5, "Date is required"),
  attachment: z
    .array(z.union([z.string(), z.instanceof(File)]))
    .min(1, "At least one image is required"),
});

export const postalReceiveSchema = z.object({
  fromTitle: z.string().min(5, "To Title is required"),
  referenceNo: z.string().min(5, "Reference No is required"),
  address: z.string().min(5, "Address is required"),
  note: z.string().min(5, "Note is required"),
  toTitle: z.string().min(5, "From Title is required"),
  date: z.string().min(5, "Date is required"),
  attachment: z
    .array(z.union([z.string(), z.instanceof(File)]))
    .min(1, "At least one image is required"),
});

export const complaintSchema = z.object({
  complaintType: z.string().min(1, "Complaint Type is required"),
  source: z.string().min(1, "Source is required"),
  complainBy: z.string().min(5, "Complain By is required"),
  phone: z.string().min(5, "Phone is required").regex(/^\+?[0-9]{7,15}$/, "Invalid phone number"),
  date: z.string().min(5, "Date is required"),
  description: z.string().min(5, "Description is required"),
  actionTaken: z.string().min(5, "Action Taken is required"),
  assignedStaff: z.string().min(5, "Assign is required"),
  note: z.string().min(5, "Note is required"),
  attachment: z
    .array(z.union([z.string(), z.instanceof(File)]))
    .min(1, "At least one image is required"),
});

export const purposeSchema = z.object({
  purpose: z.string().min(5, "Purpose is required"),
  description: z.string().optional(), 
});

export const complaintTypeSchema = z.object({
  complainttype: z.string().min(5, "Complaint Type is required"),
  description: z.string().optional(),
});

export const sourceSchema = z.object({
  source: z.string().min(5, "Source is required"),
  description: z.string().optional(),
});

export const referenceSchema = z.object({
  reference: z.string().min(5, "Reference is required"),
  description: z.string().optional(),
});

// STUDENT INFORMATION

export const studentCategorySchema = z.object({
  category: z.string().min(3, "Description is required"),
  description: z.string().optional(),
  categoryId: z.string().min(1, "House ID is required"),
});

export const studentHouseSchema = z.object({
  studenthouse: z.string().min(3, "Student House name is required"),
  description: z.string().optional(),
  houseId: z.string().min(1, "House ID is required"),
});

export const disableReasonSchema = z.object({
  description: z.string().min(3, "Description is required"),
});

export const classSchema = z.object({
  className: z.string().min(2, "Class name is required"),
});

export const sessionSchema = z.object({
  session: z.string().min(9, "Session is required and must be in the format e.g., 2012/2013"),
});

export const bloodGroupSchema = z.object({
  bloodGroup: z.string().min(2, "Blood group is required"),
});

export const genotypeSchema = z.object({
  genotype: z.string().min(2, "Genotype is required"),
  description: z.string().optional(),
});

export const transportRouteSchema = z.object({
  routeName: z.string().min(3, "Route name is required"),
  description: z.string().min(3, "Description is required"),
});

export const transportPickupSchema = z.object({
  pickupPoint: z.string().min(3, "Pickup point is required"),
  description: z.string().min(3, "Description is required"),
});

export const feesPayableSchema = z.object({
  feeName: z.string().min(3, "Fee name is required"),
  monthly: z.boolean({ required_error: "Monthly selection is required" }),
});

export const roomSchema = z.object({
  roomName: z.string().min(2, "Room name is required"),
});

export const hostelSchema = z.object({
  hostelName: z.string().min(2, "Hostel name is required"),
});








export const userLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 6 characters"),
  role: z.enum(["admin", "teacher", "receptionist", "librarian", "accountant", "student", "parent"]).optional(),
});
