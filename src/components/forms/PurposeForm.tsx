"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField";

const schema = z.object({
  purpose: z.string().min(5, "Purpose is required"),
  description: z.string().min(5, "Description is required"),
});

type Inputs = z.infer<typeof schema>;

const PurposeForm = ({ type, data }: { type: "create" | "update"; data?: any }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: data || {},
  });

  const onSubmit = async (formData: Inputs) => {
    try {
      const res = await fetch(
        type === "create" ? "/api/purpose" : `/api/purpose/${data?._id}`,
        {
          method: type === "create" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Something went wrong!");
      router.refresh();
      router.back();
    } catch (err) {
      alert((err as any).message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Add Purpose" : "Update Purpose"}
      </h1>

      <InputField label="Purpose *" name="purpose" register={register} error={errors.purpose} />

      <div className="flex flex-col">
        <label className="text-xs font-medium mb-1">Description *</label>
        <textarea
          rows={3}
          className="p-2 border rounded-md text-sm"
          {...register("description")}
        ></textarea>
        {errors.description && <span className="text-xs text-red-400">{errors.description.message}</span>}
      </div>

      <div className="flex justify-end">
        <button type="submit" disabled={isSubmitting} className="bg-gray-700 text-white px-6 py-2 rounded">
          {isSubmitting ? "Submitting..." : type === "create" ? "Save" : "Update"}
        </button>
      </div>
    </form>
  );
};

export default PurposeForm;
