"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const schema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Valid email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password too long"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export default function AdminForm({
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
      setValue("name", data.name || "");
      setValue("email", data.email || "");
      setValue("password", "");
      setValue("bio", data.bio || "");
    }
  }, [type, data, setValue]);

  const onSubmit = async (formData: FormData) => {
    setLoading(true);
    const toastId = toast.loading(type === "create" ? "Creating Admin..." : "Updating Admin...");

    try {
      const res = await fetch(
        type === "create" ? "/api/admin" : `/api/admin/${data?._id}`,
        {
          method: type === "create" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Something went wrong");

      toast.success(
        type === "create" ? "Admin created successfully!" : "Admin updated successfully!",
        { id: toastId }
      );

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
        <label className="font-semibold">Admin Name</label>
        <input {...register("name")} className="border p-2 w-full rounded" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label className="font-semibold">Admin Email</label>
        <input
          {...register("email")}
          type="email"
          className="border p-2 w-full rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label className="font-semibold">Password</label>
        <input
          {...register("password")}
          type="password"
          className="border p-2 w-full rounded"
          autoComplete="new-password"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <div>
        <label className="font-semibold">Bio</label>
        <textarea
          {...register("bio")}
          className="border p-2 w-full rounded"
          rows={4}
        />
        {errors.bio && <p className="text-red-500 text-sm">{errors.bio.message}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-pascalBlue hover:bg-blue-700 text-white px-4 py-2 rounded font-bold disabled:opacity-50"
      >
        {loading
          ? type === "create"
            ? "Creating..."
            : "Updating..."
          : type === "create"
          ? "Create Admin"
          : "Update Admin"}
      </button>
    </form>
  );
}
