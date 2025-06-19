"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import toast from "react-hot-toast";

const schema = z.object({
  purpose: z.string().min(3, "Purpose is required"),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function PurposeForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    const toastId = toast.loading("Submitting Purpose...");

    try {
      const res = await fetch("/api/purpose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Something went wrong");

      toast.success("Purpose Submitted Successfully!", { id: toastId });

      // Navigate to Purpose List after slight delay
      setTimeout(() => {
        router.push("/list/purpose");
      }, 800);
    } catch (err: any) {
      toast.error(err.message || "Submission failed!", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Purpose</label>
        <input {...register("purpose")} className="border p-2 w-full" />
        {errors.purpose && <p className="text-red-500 text-sm">{errors.purpose.message}</p>}
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
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
