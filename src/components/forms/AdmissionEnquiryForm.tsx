"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { formatDate } from "@/lib/utils";
import InputField from "../InputField";
import { admissionEnquirySchema } from "@/lib/validation/validationSchemas";
import { z } from "zod";

type FormData = z.infer<typeof admissionEnquirySchema>;

type OptionType = {
  _id: string;
  reference?: string;
  source?: string;
};

export default function AdmissionEnquiryForm({
  type,
  data,
  onClose,
  onSuccess,
}: {
  type: "create" | "update";
  data?: any;
  onClose?: () => void;
  onSuccess?: () => void;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [references, setReferences] = useState<OptionType[]>([]);
  const [sources, setSources] = useState<OptionType[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(admissionEnquirySchema),
    defaultValues: data || {
      date: formatDate(new Date()).split(" ")[0],
      nextfollowupdate: formatDate(new Date()).split(" ")[0],
    },
  });

  useEffect(() => {
    if (type === "update" && data) {
      Object.keys(data).forEach((key) => {
        if (key in data) {
          setValue(key as keyof FormData, data[key]);
        }
      });
    }
  }, [type, data, setValue]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [refRes, srcRes] = await Promise.all([
          fetch("/api/reference"),
          fetch("/api/source"),
        ]);
        const refData = await refRes.json();
        const srcData = await srcRes.json();

        setReferences(Array.isArray(refData.data) ? refData.data : []);
        setSources(Array.isArray(srcData.data) ? srcData.data : []);
      } catch (err) {
        toast.error("Failed to fetch reference or source");
      }
    };

    fetchOptions();
  }, []);

  const onSubmit = async (formData: FormData) => {
    setLoading(true);
    const toastId = toast.loading(type === "create" ? "Submitting..." : "Updating...");

    try {
      const res = await fetch(
        type === "create"
          ? "/api/admissionenquiry"
          : `/api/admissionenquiry/${data?._id}`,
        {
          method: type === "create" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Something went wrong");

      toast.success(
        type === "create" ? "Submitted Successfully!" : "Updated Successfully!",
        { id: toastId }
      );

      onClose?.();
      onSuccess?.();
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Submission failed!", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col text-black space-y-4 text-sm">
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Add Admission Enquiry" : "Update Admission Enquiry"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
        <InputField label="Name *" name="name" register={register} error={errors.name} />
        <InputField label="Phone *" name="phone" register={register} error={errors.phone} />
        <InputField label="Email *" name="email" register={register} error={errors.email} />
        <InputField label="Address *" name="address" register={register} error={errors.address} />
        <InputField label="Date *" name="date" type="date" register={register} error={errors.date} />
        <InputField
          label="Next Follow Up Date *"
          name="nextfollowupdate"
          type="date"
          register={register}
          error={errors.nextfollowupdate}
        />
        <InputField
          label="Assigned Staff *"
          name="assignedstaff"
          register={register}
          error={errors.assignedstaff}
        />
        <InputField 
          label="Class *" 
          name="class" 
          register={register} 
          error={errors.class} 
        />
        <InputField
          label="Number of Child *"
          name="numberofchild"
          type="number"
          register={register}
          error={errors.numberofchild}
        />

        {/* Reference Select */}
        <div className="flex flex-col">
          <label className="text-[16px] font-medium text-black mb-1">Reference *</label>
          <select
            {...register("reference")}
            className="p-2 border rounded-md text-sm"
            defaultValue=""
          >
            <option value="">Select Reference</option>
            {references.map((ref) => (
              <option key={ref._id} value={ref.reference}>
                {ref.reference}
              </option>
            ))}
          </select>
          {errors.reference && (
            <span className="text-xs text-red-400">{errors.reference.message}</span>
          )}
        </div>

        {/* Source Select */}
        <div className="flex flex-col">
          <label className="text-[16px] font-medium text-black mb-1">Source *</label>
          <select
            {...register("source")}
            className="p-2 border rounded-md text-sm"
            defaultValue=""
          >
            <option value="">Select Source</option>
            {sources.map((src) => (
              <option key={src._id} value={src.source}>
                {src.source}
              </option>
            ))}
          </select>
          {errors.source && (
            <span className="text-xs text-red-400">{errors.source.message}</span>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label className="text-[16px] font-medium text-black mb-1">Description *</label>
        <textarea
          rows={3}
          className="p-2 border rounded-md text-sm"
          {...register("description")}
        ></textarea>
        {errors.description && (
          <span className="text-xs text-red-400">{errors.description.message}</span>
        )}
      </div>

      {/* Note */}
      <div className="flex flex-col">
        <label className="text-[16px] font-medium text-black mb-1">Note *</label>
        <textarea
          rows={3}
          className="p-2 border rounded-md text-sm"
          {...register("note")}
        ></textarea>
        {errors.note && (
          <span className="text-xs text-red-400">{errors.note.message}</span>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-start">
        <button
          type="submit"
          disabled={loading}
          className="bg-lamaYellow text-white px-6 py-2 rounded-md font-semibold disabled:bg-gray-400"
        >
          {loading
            ? type === "create"
              ? "Submitting..."
              : "Updating..."
            : type === "create"
            ? "Submit"
            : "Update"}
        </button>
      </div>
    </form>
  );
}
