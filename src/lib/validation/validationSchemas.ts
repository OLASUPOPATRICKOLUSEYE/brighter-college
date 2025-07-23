import { z } from "zod";


  // FRONT OFFICE VALIDATION
export const admissionEnquirySchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters"),
  phone: z.string().min(5, "Phone must be at least 5 characters"),
  email: z.string().min(5, "Email must be at least 5 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  description: z.string().min(5, "Description must be at least 2 characters"),
  note: z.string().min(5, "Note must be at least 5 characters"),
  date: z.union([z.string(), z.date()]).transform(val => new Date(val)),
  nextfollowupdate: z.union([z.string(), z.date()]).transform(val => new Date(val)),
  assignedstaff: z.string().min(5, "Assigned Staff is required"),
  reference: z.string().min(1, "Reference is required"),
  source: z.string().min(1, "Source is required"),
  classenquiry: z.string().min(2, "Class is required"),
  numberofchild: z.coerce.number().min(1, "Number of Child is required"),
});

export const visitorSchema = z.object({
  purpose: z.string().min(1, "Purpose is required"),
  meetingWith: z.string().min(1, "Meeting With is required"),
  visitorName: z.string().min(5, "Visitor Name is required"),
  phone: z.string().min(5, "Phone number is required"),
  idCard: z.string().min(3, "ID Card is required"),
  numberOfPerson: z.coerce.number().min(1, "Number of Child is required"),
  date: z.union([z.string(), z.date()]).transform(val => new Date(val)),
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
  date: z.union([z.string(), z.date()]).transform(val => new Date(val)),
  nextfollowupdate: z.union([z.string(), z.date()]).transform(val => new Date(val)),
  description: z.string().min(5, "Description is required"),
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
  date: z.union([z.string(), z.date()]).transform(val => new Date(val)),
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
  date: z.union([z.string(), z.date()]).transform(val => new Date(val)),
  attachment: z
    .array(z.union([z.string(), z.instanceof(File)]))
    .min(1, "At least one image is required"),
});

export const complaintSchema = z.object({
  complaintType: z.string().min(1, "Complaint Type is required"),
  source: z.string().min(1, "Source is required"),
  complainBy: z.string().min(5, "Complain By is required"),
  phone: z.string().min(5, "Phone is required").regex(/^\+?[0-9]{7,15}$/, "Invalid phone number"),
  date: z.union([z.string(), z.date()]).transform(val => new Date(val)),
  description: z.string().min(2, "Description must be at least 2 characters"),
  actionTaken: z.string().min(5, "Action Taken is required"),
  assignedStaff: z.string().min(5, "Assign is required"),
  note: z.string().min(5, "Note is required"),
  attachment: z
    .array(z.union([z.string(), z.instanceof(File)]))
    .min(1, "At least one image is required"),
});

export const purposeSchema = z.object({
  purpose: z.string().min(5, "Purpose is required"),
  description: z.string().min(2, "Description must be at least 2 characters"),
});

export const complaintTypeSchema = z.object({
  complainttype: z.string().min(5, "Complaint Type is required"),
  description: z.string().min(2, "Description must be at least 2 characters"),
});

export const sourceSchema = z.object({
  source: z.string().min(5, "Source is required"),
  description: z.string().min(2, "Description must be at least 2 characters"),
});

export const referenceSchema = z.object({
  reference: z.string().min(5, "Reference is required"),
  description: z.string().min(2, "Description must be at least 2 characters"),
});

// STUDENT INFORMATION

export const studentCategorySchema = z.object({
  category: z.string().min(3, "Category is required"),
  description: z.string().min(2, "Description must be at least 2 characters"),
});

export const studentHouseSchema = z.object({
  studenthouse: z.string().min(3, "Student House name is required"),
  description: z.string().min(2, "Description must be at least 2 characters"),
});

export const disableReasonSchema = z.object({
  disablereason: z.string().min(3, "Disable Reason is required"),
  description: z.string().min(2, "Description must be at least 2 characters"),
});

export const classSchema = z.object({
  className: z.string().min(2, "Class name is required"),
  description: z.string().min(2, "Description must be at least 2 characters"),
});

export const sessionSchema = z.object({
  session: z.string().min(9, "Session is required and must be in the format e.g., 2012/2013"),
  description: z.string().min(2, "Description must be at least 2 characters"),
});

export const bloodGroupSchema = z.object({
  bloodGroup: z.string().min(2, "Blood group is required"),
  description: z.string().min(2, "Description must be at least 2 characters"),
});

export const genotypeSchema = z.object({
  genotype: z.string().min(2, "Genotype is required"),
  description: z.string().min(2, "Description must be at least 2 characters"),
});

export const transportRouteSchema = z.object({
  routeName: z.string().min(3, "Route name is required"),
  description: z.string().min(2, "Description must be at least 2 characters"),
});

export const transportPickupSchema = z.object({
  pickupPoint: z.string().min(3, "Pickup point is required"),
  description: z.string().min(2, "Description must be at least 2 characters"),
});

export const feesPayableSchema = z.object({
  feeName: z.string().min(3, "Fee name is required"),
  description: z.string().min(2, "Description must be at least 2 characters"),
  monthly: z.boolean().optional(), // ✅ Add this
});

export const roomSchema = z.object({
  roomName: z.string().min(2, "Room name is required"),
  description: z.string().min(2, "Description must be at least 2 characters"),
});

export const hostelSchema = z.object({
  hostelName: z.string().min(2, "Hostel name is required"),
  description: z.string().min(2, "Description must be at least 2 characters"),
});















// USER PANEL
export const userGeneralComplaintSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters"),
  email: z.string().min(5, "Email must be at least 5 characters"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  date: z.union([z.string(), z.date()]).transform(val => new Date(val)),
});
