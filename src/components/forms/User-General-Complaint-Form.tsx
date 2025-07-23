"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { userGeneralComplaintSchema } from "@/lib/validation/validationSchemas";
import { z } from "zod";
import InputField from "@/components/InputField";

type FormData = z.infer<typeof userGeneralComplaintSchema>;

export default function UserGeneralComplaintForm({
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
    resolver: zodResolver(userGeneralComplaintSchema),
    defaultValues: data || { date: new Date() },
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
    const toastId = toast.loading(type === "create" ? "User General Complaint Submitting..." : "User General Complaint Updating...");

    try {
      const res = await fetch(
        type === "create"
          ? "/api/usergeneralcomplaint"
          : `/api/usergeneralcomplaint/${data?._id}`,
        {
          method: type === "create" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Something Went Wrong");

      toast.success(
        type === "create" ? "User General Complaint Submitted Successfully!" : "User General Complaint Updated Successfully!",
        { id: toastId }
      );

      onClose?.();
      onSuccess?.();
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Submission Failed!", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="bg-white py-12 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-32 2xl:px-48 w-full"
  >
    <h1 className="text-xl sm:text-2xl font-semibold text-center sm:text-left">
      {type === "create" ? "Users Complaint" : "Update Users Complaint"}
    </h1>

    {/* Grid Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 text-start">
      <InputField label="Name *" name="name" register={register} error={errors.name} />
      <InputField label="Email *" name="email" register={register} error={errors.email} />
      <InputField label="Date *" name="date" type="date" register={register} error={errors.date} />
      <InputField label="Subject *" name="subject" register={register} error={errors.subject} />
    </div>

    {/* Description */}
    <div className="flex flex-col pt-2 text-start">
      <label className="text-base font-medium text-black mb-1">Description *</label>
      <textarea
        rows={4}
        className="p-3 border border-gray-300 rounded-md resize-none text-sm focus:outline-none focus:ring-2 focus:ring-black"
        {...register("description")}
      />
      {errors.description && (
        <span className="text-xs text-red-500 mt-1">{errors.description.message}</span>
      )}
    </div>

    {/* Submit Button */}
    <div className="flex justify-start sm:justify-start pt-2">
      <button
        type="submit"
        disabled={loading}
        className="bg-lamaYellow text-white px-6 py-2 rounded-md font-semibold disabled:bg-gray-400 transition-colors duration-200"
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
