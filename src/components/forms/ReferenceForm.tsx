"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const schema = z.object({
  reference: z.string().min(3, "Reference is required"),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

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
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (type === "update" && data) {
      setValue("reference", data.reference || "");
      setValue("description", data.description || "");
    }
  }, [type, data, setValue]);

  const onSubmit = async (formData: FormData) => {
    setLoading(true);
    const toastId = toast.loading(type === "create" ? "Submitting Reference..." : "Updating Reference...");

    try {
      const res = await fetch(type === "create" ? "/api/reference" : `/api/reference/${data?._id}`, {
        method: type === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Something went wrong");

      toast.success(type === "create" ? "Reference Submitted Successfully!" : "Reference Updated Successfully!", {
        id: toastId,
      });

      if (onClose) onClose();
      if (onSuccess) onSuccess();
    } catch (err: any) {
      toast.error(err.message || "Submission failed!", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Reference</label>
        <input {...register("reference")} className="border p-2 w-full" />
        {errors.reference && <p className="text-red-500 text-sm">{errors.reference.message}</p>}
      </div>

      <div>
        <label>Description</label>
        <textarea {...register("description")} className="border p-2 w-full" rows={4} />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-lamaYellow text-white px-4 py-2 rounded font-bold disabled:bg-lamaPurple"
      >
        {loading ? (type === "create" ? "Submitting..." : "Updating...") : type === "create" ? "Submit" : "Update"}
      </button>
    </form>
  );
}
