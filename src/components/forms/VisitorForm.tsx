"use client";
import NextImage from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import InputField from "@/components/InputField";

const Schema = z.object({
  visitorName: z.string().min(1, "Visitor Name is required"),
  phone: z.string().min(1, "Phone is required"),
  note: z.string().min(1, "Note is required"),
  idCard: z.string().min(1, "ID Card is required"),
  numberOfPersons: z.string().min(1, "Number of Persons is required"),
  date: z.string().min(1, "Date is required"),
  inTime: z.string().min(1, "In Time is required"),
  outTime: z.string().min(1, "Out Time is required"),
  purpose: z.enum([
    "Student Meeting",
    "Staff Meeting",
    "Marketing",
    "Parent Teacher Meeting",
    "Event Meeting",
  ]),
  meetingWith: z.enum(["Student", "Staff"]),
  studentName: z.string().optional(),
  studentSection: z.string().optional(),
  staffName: z.string().optional(),
  img: z
    .any()
    .refine((files) => files?.length > 0, "At least one image is required"),
});

// Refinement for conditional required fields
const schema = Schema.superRefine((data, ctx) => {
  if (data.meetingWith === "Student") {
    if (!data.studentName || data.studentName.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Student Name is required",
        path: ["studentName"],
      });
    }
    if (!data.studentSection || data.studentSection.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Student Section is required",
        path: ["studentSection"],
      });
    }
  }
});

type Inputs = z.infer<typeof schema>;

const VisitorForm = ({ type, data }: { type: "create" | "update"; data?: any }) => {
  const [meetingWith, setMeetingWith] = useState<"Student" | "Staff" | "">("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (formData: Inputs) => {
    console.log(formData);
  };

  const handleMeetingWithChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "Student" | "Staff" | "";
    setMeetingWith(value);
    resetField("studentName");
    resetField("studentSection");
    resetField("staffName");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const imageFiles = filesArray.filter((file) => file.type.startsWith("image/")); // ✅ Filter only images
      setSelectedFiles(imageFiles);
      setValue("img", imageFiles);
    }
  };

  return (
    <form className="flex flex-col gap-6 text-gray-500" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold">{type === "create" ? "Add Visitor" : "Update Visitor"}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Purpose */}
        <div className="flex flex-col">
          <label className="text-xs font-medium mb-1">Purpose *</label>
          <select className="p-2 border rounded-md text-sm" {...register("purpose")}>
            <option value="">Select</option>
            <option value="Student Meeting">Student Meeting</option>
            <option value="Staff Meeting">Staff Meeting</option>
            <option value="Marketing">Marketing</option>
            <option value="Parent Teacher Meeting">Parent Teacher Meeting</option>
            <option value="Event Meeting">Event Meeting</option>
          </select>
          {errors.purpose && <span className="text-xs text-red-400">{errors.purpose.message}</span>}
        </div>

        {/* Meeting With */}
        <div className="flex flex-col">
          <label className="text-xs font-medium mb-1">Meeting With *</label>
          <select
            className="p-2 border rounded-md text-sm"
            {...register("meetingWith")}
            onChange={handleMeetingWithChange}
          >
            <option value="">Select</option>
            <option value="Student">Student</option>
            <option value="Staff">Staff</option>
          </select>
          {errors.meetingWith && <span className="text-xs text-red-400">{errors.meetingWith.message}</span>}
        </div>

        {/* Conditional Inputs */}
        {meetingWith === "Student" && (
          <>
            <InputField
              label="Student Name *"
              name="studentName"
              register={register}
              error={errors.studentName}
            />
            <InputField
              label="Student Section *"
              name="studentSection"
              register={register}
              error={errors.studentSection}
            />
          </>
        )}
        {meetingWith === "Staff" && (
          <InputField
            label="Staff Name *"
            name="staffName"
            register={register}
            error={errors.staffName}
          />
        )}

        {/* Visitor Name */}
        <InputField label="Visitor Name *" name="visitorName" register={register} error={errors.visitorName} />
        <InputField label="Phone *" name="phone" register={register} error={errors.phone} />
        <InputField label="ID Card *" name="idCard" register={register} error={errors.idCard} />
        <InputField label="Number Of Person *" name="numberOfPersons" register={register} error={errors.numberOfPersons} />
        <InputField label="Date *" name="date" type="date" register={register} error={errors.date} />
        <InputField label="In Time *" name="inTime" type="time" register={register} error={errors.inTime} />
        <InputField label="Out Time *" name="outTime" type="time" register={register} error={errors.outTime} />

        {/* Upload Files */}
        <div className="flex flex-col col-span-1 lg:col-span-1">
          <label htmlFor="img" className="text-xs font-medium mb-1">Attach Images *</label>
          <label
            htmlFor="img"
            className="flex items-center gap-2 border border-dashed p-3 rounded-md text-xs text-gray-500 cursor-pointer"
          >
            <NextImage src="/upload.png" alt="upload" width={20} height={20} />
            Drag and drop images here or click
          </label>
          <input
            type="file"
            id="img"
            accept="image/*" // ✅ Accept images only
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          {errors.img && <span className="text-xs text-red-400">{errors.img.message as string}</span>}
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedFiles.map((file, idx) => (
              <span key={idx} className="text-xs border rounded px-2 py-1 bg-gray-100">
                {file.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="flex flex-col">
        <label className="text-xs font-medium mb-1">Note *</label>
        <textarea
          rows={3}
          className="p-2 border rounded-md text-sm"
          {...register("note")}
        ></textarea>
        {errors.note && <span className="text-xs text-red-400">{errors.note.message}</span>}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button type="submit" className="bg-gray-600 text-white rounded px-5 py-2">
          {type === "create" ? "Save" : "Update"}
        </button>
      </div>
    </form>
  );
};

export default VisitorForm;
