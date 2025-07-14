"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const schema = z.object({
  name: z.string().min(5, "Name is required"),
  phone: z.string().min(5, "Phone is required"),
  email: z.string().min(5, "Email is required"),
  address: z.string().min(5, "Address is required"),
  description: z.string().min(5, "Description is required"),
  note: z.string().min(5, "Note is required"),
  date: z.string().min(5, "Date is required"),
  nextfollowupdate: z.string().min(5, "Next Follow Up Date is required"),
  assignedstaff: z.string().min(5, "Assigned Staff is required"),
  reference: z.string().min(1, "Reference is required"),
  source: z.string().min(1, "Source is required"),
  class: z.string().min(2, "Class is required"),
  numberofchild: z.coerce.number().min(1, "Number of Child is required"),
});

type FormData = z.infer<typeof schema>;

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
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [refRes, srcRes] = await Promise.all([
          fetch("/api/reference"),
          fetch("/api/source"),
        ]);
        const refData = await refRes.json();
        const srcData = await srcRes.json();

        setReferences(Array.isArray(refData) ? refData : refData.data || []);
        setSources(Array.isArray(srcData) ? srcData : srcData.data || []);
      } catch (err) {
        toast.error("Failed to fetch reference or source");
      }
    };

    fetchOptions();
  }, []);

  useEffect(() => {
    if (type === "update" && data) {
      Object.keys(data).forEach((key) => {
        if (key in data) setValue(key as keyof FormData, data[key]);
      });
    }
  }, [type, data, setValue]);

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* ✅ Regular Inputs */}
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Phone", name: "phone", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Address", name: "address", type: "text" },
          { label: "Date", name: "date", type: "date" },
          { label: "Next Follow Up Date", name: "nextfollowupdate", type: "date" },
          { label: "Assigned Staff", name: "assignedstaff", type: "text" },
          { label: "Class", name: "class", type: "text" },
          { label: "Number of Child", name: "numberofchild", type: "number" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block mb-1 font-medium">{field.label}</label>
            <input
              type={field.type}
              {...register(field.name as keyof FormData)}
              className="border p-2 w-full rounded"
            />
            {errors[field.name as keyof FormData] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[field.name as keyof FormData]?.message}
              </p>
            )}
          </div>
        ))}

        {/* ✅ Reference select (Corrected) */}
        <div>
          <label className="block mb-1 font-medium">Reference</label>
          <select {...register("reference")} className="border p-2 w-full rounded">
            <option value="">Select Reference</option>
            {references.map((ref) => (
              <option key={ref._id} value={ref.reference}>
                {ref.reference}
              </option>
            ))}
          </select>
          {errors.reference && (
            <p className="text-red-500 text-xs mt-1">{errors.reference.message}</p>
          )}
        </div>

        {/* ✅ Source select (Corrected) */}
        <div>
          <label className="block mb-1 font-medium">Source</label>
          <select {...register("source")} className="border p-2 w-full rounded">
            <option value="">Select Source</option>
            {sources.map((src) => (
              <option key={src._id} value={src.source}>
                {src.source}
              </option>
            ))}
          </select>
          {errors.source && (
            <p className="text-red-500 text-xs mt-1">{errors.source.message}</p>
          )}
        </div>
      </div>

      {/* ✅ Description */}
      <div className="lg:col-span-3">
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          {...register("description")}
          className="border p-2 w-full rounded"
          rows={3}
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
        )}
      </div>

      {/* ✅ Note */}
      <div className="lg:col-span-3">
        <label className="block mb-1 font-medium">Note</label>
        <textarea
          {...register("note")}
          className="border p-2 w-full rounded"
          rows={3}
        />
        {errors.note && (
          <p className="text-red-500 text-xs mt-1">{errors.note.message}</p>
        )}
      </div>

      {/* ✅ Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="bg-lamaYellow text-white px-4 py-2 rounded font-bold disabled:bg-gray-400"
      >
        {loading
          ? type === "create"
            ? "Submitting..."
            : "Updating..."
          : type === "create"
          ? "Submit"
          : "Update"}
      </button>
    </form>
  );
}
