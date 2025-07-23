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
    const toastId = toast.loading(type === "create" ? "Fees Payable Submitting..." : "Fees Payable Updating...");


    try {
      const res = await fetch(
        type === "create" ? "/api/feespayable" : `/api/feespayable/${data?._id}`,
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
          ? "Fees Payable Submitted Successfully!"
          : "Fees Payable Updated Successfully!",
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col text-black space-y-4 text-sm">
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Fees Payable" : "Update Fees Payable"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-5 pt-4">
        <InputField
          label="Fee Name *"
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
          <span className="text-xs text-red-400">{errors.monthly.message}</span>
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
