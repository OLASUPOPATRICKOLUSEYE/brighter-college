"use client";

import React, { useEffect, useState } from "react";
import NextImage from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import InputField from "../InputField";
import { complaintSchema } from "@/lib/validation/validationSchemas";
import Image from "next/image";

type FormData = z.infer<typeof complaintSchema>;

type OptionType = {
  _id: string;
  complainttype?: string;
  source?: string;
};

const ComplaintForm = ({
  type,
  data,
  onClose,
  onSuccess,
}: {
  type: "create" | "update";
  data?: any;
  onClose?: () => void;
  onSuccess?: () => void;
}) => {
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [complaintTypes, setComplaintTypes] = useState<OptionType[]>([]);
  const [sources, setSources] = useState<OptionType[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(complaintSchema),
    defaultValues: data || {
      date: new Date(),
    },
  });

  useEffect(() => {
    if (type === "update" && data?.attachment) {
      setExistingImages(data.attachment);
    }
  }, [type, data]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [typeRes, sourceRes] = await Promise.all([
          fetch("/api/complainttype"),
          fetch("/api/source"),
        ]);
        const typeData = await typeRes.json();
        const sourceData = await sourceRes.json();
        setComplaintTypes(Array.isArray(typeData.data) ? typeData.data : []);
        setSources(Array.isArray(sourceData.data) ? sourceData.data : []);
      } catch (err) {
        toast.error("Failed to fetch complaint type or source");
      }
    };
    fetchOptions();
  }, []);

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imageFiles = Array.from(e.target.files).filter((file) =>
        file.type.startsWith("image/")
      );
      setSelectedFiles(imageFiles);
      setValue("attachment", [...existingImages, ...imageFiles]);
    }
  };

  const handleRemoveExistingImage = (index: number) => {
    const updated = existingImages.filter((_, i) => i !== index);
    setExistingImages(updated);
    setValue("attachment", [...updated, ...selectedFiles]);
  };

  const onSubmit = async (formData: FormData) => {
    try {
      if (existingImages.length === 0 && selectedFiles.length === 0) {
        toast.error("Please select at least one image");
        return;
      }

      const toastId = toast.loading("Uploading Images...");
      const uploadedUrls: string[] = [...existingImages];

      for (let i = 0; i < selectedFiles.length; i++) {
        const base64 = await toBase64(selectedFiles[i]);
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file: base64 }),
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || "Upload Failed");
        uploadedUrls.push(result.url);
        setUploadProgress(Math.round(((i + 1) / selectedFiles.length) * 100));
      }

      toast.loading(type === "create" ? "Submitting..." : "Updating...", { id: toastId });

      const payload = {
        ...formData,
        attachment: uploadedUrls,
      };

      const response = await fetch(
        type === "create"
          ? "/api/complaint"
          : `/api/complaint/${data?._id}`,
        {
          method: type === "create" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Submission failed");

      toast.success(
        `Complaint ${type === "create" ? "created" : "updated"} successfully!`,
        { id: toastId }
      );

      onClose?.();
      onSuccess?.();
      if (!onClose && !onSuccess) {
        router.push("/dashboard/complaint");
        router.refresh();
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <form
      className="flex flex-col text-black space-y-4 text-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Add Complaint" : "Update Complaint"}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
        {/* Complaint Type */}
        <div className="flex flex-col">
          <label className="text-[16px] font-medium mb-1">Complaint Type *</label>
          <select
            {...register("complaintType")}
            className="p-2 border rounded-md text-sm"
            defaultValue=""
          >
            <option value="">Select Complaint Type</option>
            {complaintTypes.map((item) => (
              <option key={item._id} value={item.complainttype}>
                {item.complainttype}
              </option>
            ))}
          </select>
          {errors.complaintType && (
            <span className="text-xs text-red-400">{errors.complaintType.message}</span>
          )}
        </div>

        {/* Source */}
        <div className="flex flex-col">
          <label className="text-[16px] font-medium mb-1">Source *</label>
          <select
            {...register("source")}
            className="p-2 border rounded-md text-sm"
            defaultValue=""
          >
            <option value="">Select Source</option>
            {sources.map((src) => (
              <option key={src._id} value={src.source}>
                {src.source}
              </option>
            ))}
          </select>
          {errors.source && (
            <span className="text-xs text-red-400">{errors.source.message}</span>
          )}
        </div>

        <InputField label="Complain By *" name="complainBy" register={register} error={errors.complainBy} />
        <InputField label="Phone *" name="phone" register={register} error={errors.phone} />
        <InputField label="Date *" name="date" type="date" register={register} error={errors.date} />
        <InputField label="Action Taken *" name="actionTaken" register={register} error={errors.actionTaken} />
        <InputField label="Assigned Staff *" name="assignedStaff" register={register} error={errors.assignedStaff} />

        {/* File Upload */}
        <div className="flex flex-col col-span-1 lg:col-span-1">
          <label className="text-[16px] font-medium mb-1">Attach Images *</label>
          <label
            htmlFor="attachment"
            className="flex items-center gap-2 border border-dashed p-3 rounded-md text-xs cursor-pointer"
          >
            <NextImage src="/upload.png" alt="upload" width={20} height={20} />
            Drag and drop or click to upload
          </label>
          <input
            type="file"
            id="attachment"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          {errors.attachment && (
            <span className="text-xs text-red-400">
              {errors.attachment.message as string}
            </span>
          )}
          <div className="flex flex-wrap gap-2 mt-2">
            {existingImages.map((url, idx) => (
              <div key={`existing-${idx}`} className="relative">
                <Image
                  src={url}
                  alt={`Existing ${idx}`}
                  className="w-20 h-20 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveExistingImage(idx)}
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full"
                >
                  ✕
                </button>
              </div>
            ))}
            {selectedFiles.map((file, idx) => (
              <Image
                key={`selected-${idx}`}
                src={URL.createObjectURL(file)}
                alt={`New ${idx}`}
                className="w-20 h-20 object-cover rounded border"
              />
            ))}
          </div>

          {uploadProgress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-yellow-500 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}
        </div>
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
          <span className="text-xs text-red-400">{errors.description.message}</span>
        )}
      </div>

      {/* Note */}
      <div className="flex flex-col">
        <label className="text-[16px] font-medium mb-1">Note *</label>
        <textarea
          rows={3}
          className="p-2 border rounded-md text-sm"
          {...register("note")}
        ></textarea>
        {errors.note && (
          <span className="text-xs text-red-400">{errors.note.message}</span>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-start">
        <button
          type="submit"
          disabled={loading}
          className="bg-lamaYellow text-white px-6 py-2 rounded-md font-semibold disabled:bg-gray-400"
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
};

export default ComplaintForm;
