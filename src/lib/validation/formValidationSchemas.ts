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
  name: z.string().min(1),
  phone: z.string().min(1),
  date: z.string().min(1),
  description: z.string().optional(),
  nextFollowUpDate: z.string().optional(),
  callDuration: z.string().optional(),
  note: z.string().optional(),
  callType: z.enum(["incoming", "outgoing"]),
});

export const postalReceiveSchema = z.object({
  toTitle: z.string().min(1),
  referenceNo: z.string().optional(),
  address: z.string().min(1),
  note: z.string().optional(),
  fromTitle: z.string().min(1),
  date: z.string().min(1),
  attachment: z.string().optional(),
});

export const postalDispatchSchema = z.object({
  toTitle: z.string().min(1),
  referenceNo: z.string().optional(),
  address: z.string().min(1),
  note: z.string().optional(),
  fromTitle: z.string().min(1),
  date: z.string().min(1),
  attachment: z.string().optional(),
});

export const complaintSchema = z.object({
  complaintType: z.enum(["fees", "hostel", "transport"]),
  source: z.string().optional(),
  complainBy: z.string().min(1),
  phone: z.string().min(1),
  date: z.string().min(1),
  description: z.string().optional(),
  actionTaken: z.string().optional(),
  assigned: z.string().optional(),
  note: z.string().optional(),
  attachment: z.string().optional(),
});

export const admissionEnquirySchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  address: z.string().optional(),
  description: z.string().optional(),
  note: z.string().optional(),
  date: z.string().min(1),
  nextFollowUpDate: z.string().optional(),
  assignedTeacher: z.string().optional(),
  reference: z.enum(["student", "staff", "partnerschool", "self"]),
  source: z.string().optional(),
  class: z.string().optional(),
  numberOfChild: z.number().optional(),
});
