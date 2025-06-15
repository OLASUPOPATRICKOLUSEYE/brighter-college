"use client";
import NextImage from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import InputField from "@/components/InputField";

const schema = z.object({
  toTitle: z.string().min(5, "Title is required"),
  referenceNo: z.string().min(1, "Reference Number is required"),
  address: z.string().min(3, "Address is required"),
  note: z.string().min(3, "Note is required"),
  fromTitle: z.string().min(3, "From Title is required"),
  date: z.string().min(1, "Date is required"),
  img: z
    .any()
    .refine((files) => files?.length > 0, "At least one image is required"),
});

type Inputs = z.infer<typeof schema>;

const PostalDispatchForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (formData: Inputs) => {
    console.log(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const imageFiles = filesArray.filter((file) =>
        file.type.startsWith("image/")
      );
      setSelectedFiles(imageFiles);
      setValue("img", imageFiles);
    }
  };

  return (
    <form
      className="flex flex-col gap-6 text-gray-500"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Add Postal Dispatch" : "Update Postal Dispatch"}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <InputField
          label="To Title Name *"
          name="toTitle"
          register={register}
          error={errors.toTitle}
        />
        <InputField
          label="Reference Number *"
          name="referenceNo"
          register={register}
          error={errors.referenceNo}
        />
        <InputField
          label="Address *"
          name="address"
          register={register}
          error={errors.address}
        />
        <InputField
          label="From Title Name *"
          name="fromTitle"
          register={register}
          error={errors.fromTitle}
        />
        <InputField
          label="Date *"
          name="date"
          type="date"
          register={register}
          error={errors.date}
        />

        {/* Upload Files */}
        <div className="flex flex-col col-span-1 lg:col-span-1">
          <label htmlFor="img" className="text-xs font-medium mb-1">
            Attach Images *
          </label>
          <label
            htmlFor="img"
            className="flex items-center gap-2 border border-dashed p-3 rounded-md text-xs text-gray-500 cursor-pointer"
          >
            <NextImage src="/upload.png" alt="upload" width={20} height={20} />
            Drag and drop images here or click
          </label>
          <input
            type="file"
            id="img"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          {errors.img && (
            <span className="text-xs text-red-400">
              {errors.img.message as string}
            </span>
          )}
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedFiles.map((file, idx) => (
              <span
                key={idx}
                className="text-xs border rounded px-2 py-1 bg-gray-100"
              >
                {file.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="flex flex-col">
        <label className="text-xs font-medium mb-1">Note *</label>
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
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-gray-600 text-white rounded px-5 py-2"
        >
          {type === "create" ? "Save" : "Update"}
        </button>
      </div>
    </form>
  );
};

export default PostalDispatchForm;
