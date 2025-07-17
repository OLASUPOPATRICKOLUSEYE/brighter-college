"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { referenceSchema } from "@/lib/validation/validationSchemas";
import InputField from "../InputField";


type FormData = z.infer<typeof referenceSchema>;

export default function ReferenceForm({
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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(referenceSchema),
    defaultValues: {},
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

  const onSubmit = async (formData: FormData) => {
    setLoading(true);
    const toastId = toast.loading(type === "create" ? "Submitting..." : "Updating...");

    try {
      const res = await fetch(
        type === "create" ? "/api/reference" : `/api/reference/${data?._id}`,
        {
          method: type === "create" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Something went wrong");

      toast.success(
        type === "create"
          ? "Reference Submitted successfully!"
          : "Reference Updated successfully!",
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
        {type === "create" ? "Add Reference" : "Update Reference"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-5 pt-4">
        <InputField label="Reference *" name="reference" register={register} error={errors.reference} />        
        
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
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="bg-lamaYellow text-white px-6 py-2 rounded font-semibold disabled:bg-gray-400"
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
