"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { feesPayableSchema } from "@/lib/validation/validationSchemas";
import InputField from "../InputField";

type FormData = z.infer<typeof feesPayableSchema>;

export default function FeesPayableForm({
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
    resolver: zodResolver(feesPayableSchema),
    defaultValues: {
      feeName: "",
      monthly: false,
      description: "",
    },
  });

  useEffect(() => {
    if (type === "update" && data) {
      setValue("feeName", data.feeName || "");
      setValue("monthly", data.monthly || false);
      setValue("description", data.description || "");
    }
  }, [type, data, setValue]);

  const onSubmit = async (formData: FormData) => {
    setLoading(true);
    const toastId = toast.loading(
      type === "create" ? "Submitting Fee..." : "Updating Fee..."
    );

    try {
      const res = await fetch(
        type === "create"
          ? "/api/feespayable"
          : `/api/feespayable/${data?._id}`,
        {
          method: type === "create" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Something Went Wrong");

      toast.success(
        type === "create"
          ? "Fee Submitted Successfully!"
          : "Fee Updated Successfully!",
        { id: toastId }
      );

      onClose?.();
      onSuccess?.();
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed To Submit", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col text-black space-y-4 text-sm"
    >
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create Fee Payable" : "Update Fee Payable"}
      </h1>

      <div className="grid grid-cols-1 gap-5 pt-4">
        <InputField
          label="Fees Name *"
          name="feeName" 
          register={register}
          error={errors.feeName}
        />

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="monthly"
            {...register("monthly")}
            className="w-4 h-4"
          />
          <label htmlFor="monthly" className="text-sm">
            Monthly Fee?
          </label>
        </div>
        {errors.monthly && (
          <span className="text-xs text-red-400">
            {errors.monthly.message}
          </span>
        )}
      </div>
      {/* Description */}
      <div className="flex flex-col">
        <label className="text-[16px] font-medium mb-1">Description *</label>
        <textarea
          rows={3}
          className="p-2 border rounded-md text-sm"
          {...register("description")}
        ></textarea>
        {errors.description && (
          <span className="text-xs text-red-400">
            {errors.description.message}
          </span>
        )}
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
