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

export const purposeSchema = z.object({
  purpose: z.string().min(5, "Purpose is required"),
  description: z.string().min(5, "Description is required"),
});
