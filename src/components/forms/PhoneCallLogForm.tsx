"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { phoneCallLogSchema } from "@/lib/validation/validationSchemas";

type FormData = z.infer<typeof phoneCallLogSchema>;

export default function PhoneCallLogForm({
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
    resolver: zodResolver(phoneCallLogSchema),
  });

  useEffect(() => {
    if (type === "update" && data) {
      setValue("name", data.name || "");
      setValue("phone", data.phone || "");
      setValue("date", data.date ? new Date(data.date).toISOString().slice(0, 10) : "");
      setValue("description", data.description || "");
      setValue("nextfollowupdate", data.nextfollowupdate ? new Date(data.nextfollowupdate).toISOString().slice(0, 10) : "");
      setValue("callduration", data.callduration || "");
      setValue("note", data.note || "");
      setValue("calltype", data.calltype || "incoming");
    }
  }, [type, data, setValue]);

  const onSubmit = async (formData: FormData) => {
    setLoading(true);
    const toastId = toast.loading(type === "create" ? "Submitting..." : "Updating...");

    try {
      const res = await fetch(type === "create" ? "/api/phonecalllog" : `/api/phonecalllog/${data?._id}`, {
        method: type === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Something went wrong");

      toast.success(type === "create" ? "Phone Call Log Submitted successfully!" : "Phone Call Log Updated successfully!", { id: toastId });
      onClose && onClose();
      onSuccess && onSuccess();
    } catch (err: any) {
      toast.error(err.message || "Submission failed!", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Row 1 */}
        <div>
          <label className="block font-medium">Name</label>
          <input {...register("name")} className="border p-2 w-full rounded" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Phone</label>
          <input {...register("phone")} className="border p-2 w-full rounded" />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Date</label>
          <input type="date" {...register("date")} className="border p-2 w-full rounded" />
          {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
        </div>

        {/* Row 2 */}
        <div>
          <label className="block font-medium">Call Type</label>
          <select {...register("calltype")} className="border p-2 w-full rounded">
            <option value="incoming">Incoming</option>
            <option value="outgoing">Outgoing</option>
          </select>
          {errors.calltype && <p className="text-red-500 text-sm">{errors.calltype.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Next Follow-up Date</label>
          <input type="date" {...register("nextfollowupdate")} className="border p-2 w-full rounded" />
          {errors.nextfollowupdate && <p className="text-red-500 text-sm">{errors.nextfollowupdate.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Call Duration</label>
          <input {...register("callduration")} className="border p-2 w-full rounded" placeholder="e.g. 5 mins" />
          {errors.callduration && <p className="text-red-500 text-sm">{errors.callduration.message}</p>}
        </div>
      </div>

      {/* Row 3 - Full width */}
      <div>
        <label className="block font-medium">Description</label>
        <textarea {...register("description")} className="border p-2 w-full rounded" rows={3} />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Note</label>
        <textarea {...register("note")} className="border p-2 w-full rounded" rows={3} />
        {errors.note && <p className="text-red-500 text-sm">{errors.note.message}</p>}
      </div>

      {/* Button */}
      <div>
        <button
          type="submit"
          disabled={loading}
          className="bg-lamaYellow text-white px-6 py-2 rounded font-semibold disabled:bg-gray-400"
        >
          {loading ? (type === "create" ? "Submitting..." : "Updating...") : type === "create" ? "Submit" : "Update"}
        </button>
      </div>
    </form>
  );
}
