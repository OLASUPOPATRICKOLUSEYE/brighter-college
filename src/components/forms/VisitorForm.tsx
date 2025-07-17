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
import { visitorSchema } from "@/lib/validation/validationSchemas";

type FormData = z.infer<typeof visitorSchema>;

type PurposeType = {
  _id: string;
  purpose: string;
};

const VisitorForm = ({
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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [purposes, setPurposes] = useState<PurposeType[]>([]);


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(visitorSchema),
    defaultValues: data || {
      date: formatDate(new Date()).split(" ")[0],
      inTime: new Date().toTimeString().slice(0, 5),
      outTime: new Date().toTimeString().slice(0, 5),
    },
  });

  useEffect(() => {
    if (type === "update" && data?.attachment) {
      setExistingImages(data.attachment);
    }
  }, [type, data]);

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
        file.type.startsWith("image/") || file.type === "application/pdf"
      );
      setSelectedFiles(imageFiles);
      setValue("attachment", [...existingImages, ...imageFiles]);
    }
  };

  useEffect(() => {
  const fetchPurposes = async () => {
    try {
      const res = await fetch("/api/purpose");
      const data = await res.json();

      if (res.ok) {
        setPurposes(Array.isArray(data.data) ? data.data : []);
      } else {
        throw new Error(data.error || "Failed to fetch purposes");
      }
    } catch (err) {
      toast.error("Failed to load purposes");
    }
  };

  fetchPurposes();
}, []);


  const handleRemoveExistingImage = (index: number) => {
    const updated = existingImages.filter((_, i) => i !== index);
    setExistingImages(updated);
    setValue("attachment", [...updated, ...selectedFiles]);
  };

  const onSubmit = async (formData: FormData) => {
    try {
      if (existingImages.length === 0 && selectedFiles.length === 0) {
        toast.error("Please select at least one document");
        return;
      }

      const toastId = toast.loading("Uploading Files...");
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

      toast.loading(type === "create" ? "Saving..." : "Updating...", {
        id: toastId,
      });

      const payload = {
        ...formData,
        attachment: uploadedUrls,
      };

      const response = await fetch(
        type === "create"
          ? "/api/visitors"
          : `/api/visitors/${data?._id}`,
        {
          method: type === "create" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Submission failed");

      toast.success(
        `Visitor info ${type === "create" ? "created" : "updated"} successfully!`,
        { id: toastId }
      );

      onClose?.();
      onSuccess?.();
      if (!onClose && !onSuccess) {
        router.push("/dashboard/visitor");
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
        {type === "create" ? "Add Visitor" : "Update Visitor"}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
        <div className="flex flex-col">
          <label className="text-[16px] font-medium mb-1">Purpose *</label>
          <select
            {...register("purpose")}
            className="p-2 border rounded-md text-sm"
            defaultValue=""
          >
            <option value="" disabled>Select Purpose</option>
            {purposes.map((item) => (
              <option key={item._id} value={item.purpose}>
                {item.purpose}
              </option>
            ))}
          </select>
          {errors.purpose && (
            <span className="text-xs text-red-400">{errors.purpose.message}</span>
          )}
        </div>
        <InputField label="Meeting With *" name="meetingWith" register={register} error={errors.meetingWith} />
        <InputField label="Visitor Name *" name="visitorName" register={register} error={errors.visitorName} />
        <InputField label="Phone *" name="phone" register={register} error={errors.phone} />
        <InputField label="ID Card *" name="idCard" register={register} error={errors.idCard} />
        <InputField label="Number Of Person *" name="numberOfPerson" type="number" register={register} error={errors.numberOfPerson} />
        <InputField label="Date *" name="date" type="date" register={register} error={errors.date} />
        <InputField label="In Time *" name="inTime" type="time" register={register} error={errors.inTime} />
        <InputField label="Out Time *" name="outTime" type="time" register={register} error={errors.outTime} />

        {/* File Upload */}
        <div className="flex flex-col col-span-1 lg:col-span-1">
          <label className="text-[16px] font-medium mb-1">Attach Document *</label>
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
            accept="image/*,.pdf"
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
                <img
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
              <img
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

export default VisitorForm;
