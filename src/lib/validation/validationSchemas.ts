import { z } from "zod";

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
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  date: z.string().min(1, "Date is required"),
  description: z.string().optional(),
  nextFollowUpDate: z.string().optional(),
  duration: z.string().optional(),
  callType: z.string().optional(),
  note: z.string().optional(),
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