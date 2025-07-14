import { z } from "zod";

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
  numberofchild: z.number().min(1, "Number of Child is required"),
});

export const visitorSchema = z.object({
  name: z.string().min(1),
  meetingWith: z.enum(["student", "staff"]),
  studentName: z.string().optional(),
  studentSession: z.string().optional(),
  staffName: z.string().optional(),
  phone: z.string().min(1),
  idCard: z.string().optional(),
  numberOfPersons: z.number().min(1),
  date: z.string().min(1),
  inTime: z.string().min(1),
  outTime: z.string().min(1),
  attachment: z.string().optional(),
  note: z.string().optional(),
});

export const phoneCallLogSchema = z.object({
  name: z.string().min(5, "Name is required"),
  phone: z.string().min(5, "Phone number is required"),
  date: z.string().min(1, "Date is required"), 
  description: z.string().min(5, "Description is required"),
  nextfollowupdate: z.string().min(1, "Next follow-up date is required"), 
  callduration: z.string().min(1, "Call duration is required"),
  note: z.string().min(5, "Note is required"),
  calltype: z.enum(["incoming", "outgoing"], { required_error: "Call type is required" }),
});



export const complaintSchema = z.object({
  sno: z.string().min(1, "S/No is required"),
  complaintType: z.string().min(1, "Complaint Type is required"),
  source: z.string().min(1, "Source is required"),
  complainBy: z.string().min(5, "Complain By is required"),
  phone: z.string().min(5, "Phone is required").regex(/^\+?[0-9]{7,15}$/, "Invalid phone number"),
  date: z.string().min(5, "Date is required"),
  description: z.string().min(5, "Description is required"),
  actionTaken: z.string().min(5, "Action Taken is required"),
  assign: z.string().min(5, "Assign is required"),
  note: z.string().min(5, "Note is required"),
  attachDocument: z.any().refine((file) => file instanceof File, {
    message: "Attach Document is required",
  }),
});

export const purposeSchema = z.object({
  purpose: z.string().min(3, "Purpose is required"),
  description: z.string().optional(), 
});

export const complaintTypeSchema = z.object({
  complainttype: z.string().min(3, "Complaint Type is required"),
  description: z.string().optional(),
});

export const sourceSchema = z.object({
  source: z.string().min(3, "Source is required"),
  description: z.string().optional(),
});

export const referenceSchema = z.object({
  reference: z.string().min(3, "Reference is required"),
  description: z.string().optional(),
});




