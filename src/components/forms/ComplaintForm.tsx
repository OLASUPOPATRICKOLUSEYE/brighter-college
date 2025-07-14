"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { complaintSchema } from "@/lib/validation/validationSchemas";

type FormData = z.infer<typeof complaintSchema>;

type OptionType = {
  _id: string;
  source?: string;
  complainttype?: string;
};

export default function ComplaintForm({
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
  const [sources, setSources] = useState<OptionType[]>([]);
  const [complainttypes, setComplaintTypes] = useState<OptionType[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(complaintSchema),
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [srcRes, typeRes] = await Promise.all([
          fetch("/api/source"),
          fetch("/api/complainttype"),
        ]);
        const srcData = await srcRes.json();
        const typeData = await typeRes.json();

        setSources(Array.isArray(srcData) ? srcData : srcData.data || []);
        setComplaintTypes(Array.isArray(typeData) ? typeData : typeData.data || []);
      } catch (err) {
        toast.error("Failed to fetch source or complaint types");
      }
    };

    fetchOptions();
  }, []);

  useEffect(() => {
    if (type === "update" && data) {
      Object.keys(data).forEach((key) => {
        if (key !== "attachDocument" && key in data) {
          setValue(key as keyof FormData, data[key]);
        }
      });
    }
  }, [type, data, setValue]);

  const onSubmit = async (formData: FormData) => {
    setLoading(true);
    setUploadProgress(0);
    const toastId = toast.loading(type === "create" ? "Submitting..." : "Updating...");

    try {
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "attachDocument" && value instanceof File) {
          formDataObj.append(key, value);
        } else {
          formDataObj.append(key, value as string);
        }
      });

      const req = new XMLHttpRequest();
      req.open(type === "create" ? "POST" : "PUT", type === "create" ? "/api/complaint" : `/api/complaint/${data?._id}`);

      req.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percentComplete);
        }
      };

      req.onload = () => {
        if (req.status >= 200 && req.status < 300) {
          toast.success(type === "create" ? "Submitted Successfully!" : "Updated Successfully!", {
            id: toastId,
          });
          onClose?.();
          onSuccess?.();
          router.refresh();
        } else {
          const errorResponse = JSON.parse(req.responseText);
          toast.error(errorResponse?.error || "Submission failed!", { id: toastId });
        }
        setLoading(false);
        setUploadProgress(0);
      };

      req.onerror = () => {
        toast.error("Network error", { id: toastId });
        setLoading(false);
        setUploadProgress(0);
      };

      req.send(formDataObj);
    } catch (err: any) {
      toast.error(err.message || "Submission failed!", { id: toastId });
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* ✅ Regular Inputs */}
        {[
          { label: "S/No", name: "sno", type: "text" },
          { label: "Complain By", name: "complainBy", type: "text" },
          { label: "Phone", name: "phone", type: "tel" },
          { label: "Date", name: "date", type: "date" },
          { label: "Action Taken", name: "actionTaken", type: "text" },
          { label: "Assign", name: "assign", type: "text" },
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

        {/* ✅ Complaint Type Select */}
        <div>
          <label className="block mb-1 font-medium">Complaint Type</label>
          <select {...register("complaintType")} className="border p-2 w-full rounded">
            <option value="">Select Complaint Type</option>
            {complainttypes.map((type) => (
              <option key={type._id} value={type.complainttype}>
                {type.complainttype}
              </option>
            ))}
          </select>
          {errors.complaintType && (
            <p className="text-red-500 text-xs mt-1">{errors.complaintType.message}</p>
          )}
        </div>

        {/* ✅ Source Select */}
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

      {/* ✅ Attach Document */}
      <div className="lg:col-span-3">
        <label className="block mb-1 font-medium">Attach Document</label>
        <input
          type="file"
          {...register("attachDocument")}
          className="border p-2 w-full rounded"
        />
        {errors.attachDocument && (
          <p className="text-red-500 text-xs mt-1">{errors.attachDocument.message}</p>
        )}
      </div>

      {/* ✅ Tailored Upload Progress Bar */}
      {loading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}

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
