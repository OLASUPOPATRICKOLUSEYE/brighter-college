"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/InputField";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  date: z.string().min(1, "Date is required"),
  description: z.string().min(1, "Description is required"),
  nextFollowUp: z.string().min(1, "Next Follow Up is required"),
  duration: z.string().min(1, "Duration is required"),
  callType: z.enum(["Incoming", "Outgoing"], { required_error: "Call Type is required" }),
  note: z.string().min(1, "Note is required"),
});

type Inputs = z.infer<typeof schema>;

const PhoneCallLogForm = ({ type, data }: { type: "create" | "update"; data?: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: data || {},
  });

  const onSubmit = (formData: Inputs) => {
    console.log(formData);
  };

  return (
    <form className="flex flex-col gap-6 text-gray-500" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold">{type === "create" ? "Add Phone Call Log" : "Update Phone Call Log"}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <InputField label="Name *" name="name" register={register} error={errors.name} />
        <InputField label="Phone *" name="phone" register={register} error={errors.phone} />
        <InputField label="Date *" name="date" type="date" register={register} error={errors.date} />
        <InputField label="Duration *" name="duration" register={register} error={errors.duration} />
        <InputField label="Next Follow Up *" name="nextFollowUp" type="date" register={register} error={errors.nextFollowUp} />

        <div className="flex flex-col">
          <label className="text-xs font-medium mb-1">Call Type *</label>
          <select className="p-2 border rounded-md text-sm" {...register("callType")}>
            <option value="">Select</option>
            <option value="Incoming">Incoming</option>
            <option value="Outgoing">Outgoing</option>
          </select>
          {errors.callType && <span className="text-xs text-red-400">{errors.callType.message}</span>}
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label className="text-xs font-medium mb-1">Description *</label>
        <textarea rows={3} className="p-2 border rounded-md text-sm" {...register("description")}></textarea>
        {errors.description && <span className="text-xs text-red-400">{errors.description.message}</span>}
      </div>

      {/* Note */}
      <div className="flex flex-col">
        <label className="text-xs font-medium mb-1">Note *</label>
        <textarea rows={3} className="p-2 border rounded-md text-sm" {...register("note")}></textarea>
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

export default PhoneCallLogForm;
