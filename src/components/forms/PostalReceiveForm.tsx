"use client";

import React, { useEffect, useState } from "react";
import NextImage from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import InputField from "@/components/InputField";
import { postalReceiveSchema } from "@/lib/validation/validationSchemas";
import { z } from "zod";
import Image from "next/image";

type FormData = z.infer<typeof postalReceiveSchema>;

const PostalReceiveForm = ({
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
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(postalReceiveSchema),
    defaultValues: data || {
      date: new Date(),
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

      toast.loading(type === "create" ? "Saving..." : "Updating...", {
        id: toastId,
      });

      const payload = {
        ...formData,
        attachment: uploadedUrls,
      };

      const response = await fetch(
        type === "create"
          ? "/api/postalreceive"
          : `/api/postalreceive/${data?._id}`,
        {
          method: type === "create" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Submission failed");

      toast.success(
        `Postal Receive ${
          type === "create" ? "created" : "updated"
        } successfully!`,
        { id: toastId }
      );

      onClose?.();
      onSuccess?.();

      if (!onClose && !onSuccess) {
        router.push("/dashboard/postalreceive");
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
        {type === "create" ? "Add Postal Receive" : "Update Postal Receive"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
        <InputField label="From Title *" name="fromTitle" register={register} error={errors.fromTitle} />
        <InputField label="Reference No *" name="referenceNo" register={register} error={errors.referenceNo} />
        <InputField label="Address *" name="address" register={register} error={errors.address} />
        <InputField label="To Title *" name="toTitle" register={register} error={errors.toTitle} />
        <InputField label="Date *" name="date" type="date" register={register} error={errors.date} />

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

      {/* Note Field */}
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

      <div className="flex justify-start">
        <button
          type="submit"
          className="bg-lamaYellow text-white px-6 py-2 rounded-md font-semibold disabled:bg-gray-400"
        >
          {type === "create" ? "Submit" : "Update"}
        </button>
      </div>
    </form>
  );
};

export default PostalReceiveForm;
