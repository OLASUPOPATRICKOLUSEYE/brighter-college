"use client";

import React, { useEffect, useState } from "react";
import NextImage from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField";
import { z } from "zod";
import Image from "next/image";
import { studentAdmissionSchema } from "@/lib/validation/validationSchemas";
import { FaFileImport } from "react-icons/fa";
import { BiDownArrowCircle, BiUpArrowCircle } from "react-icons/bi";
import ImportStudentModal from "./ImportStudentModal";


const CollapsibleSection = ({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border rounded-md overflow-hidden transition-all duration-300">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-100 px-4 py-3 text-left font-semibold text-[16px] flex justify-between items-center"
      >
        {title}
        <span>{isOpen ? <BiUpArrowCircle /> : <BiDownArrowCircle />}</span>
      </button>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};


type FormData = z.infer<typeof studentAdmissionSchema>;

interface SelectOption {
  value: string;
  label: string;
}

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (data: {
    classId: string;
    sessionId: string;
    file: File;
  }) => void;
  classOptions: SelectOption[]; 
  sessionOptions: SelectOption[]; 
}

type OptionType = {
  _id: string;
  category?: string;
  session?: string;
  className?: string;
  bloodGroup?: string;
  genotype?: string;
  studenthouse?: string;
  routeName?: string;
  pickuppoint?: string;
  hostelName?: string;
  roomName?: string;
  siblingClass?: string;
  siblingSession?: string;
  // siblingName?: string;
};

const StudentAdmissionForm = ({
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
    const [studentFiles, setStudentFiles] = useState<File[]>([]);
    const [fatherFiles, setFatherFiles] = useState<File[]>([]);
    const [motherFiles, setMotherFiles] = useState<File[]>([]);
    const [guardianFiles, setGuardianFiles] = useState<File[]>([]);
    const [title1Files, setTitle1Files] = useState<File[]>([]);
    const [title2Files, setTitle2Files] = useState<File[]>([]);
    const [title3Files, setTitle3Files] = useState<File[]>([]);
    const [title4Files, setTitle4Files] = useState<File[]>([]);
    const [studentImages, setStudentImages] = useState<string[]>([]);
    const [fatherImages, setFatherImages] = useState<string[]>([]);
    const [motherImages, setMotherImages] = useState<string[]>([]);
    const [guardianImages, setGuardianImages] = useState<string[]>([]);
    const [title1Images, setTitle1Images] = useState<string[]>([]);
    const [title2Images, setTitle2Images] = useState<string[]>([]);
    const [title3Images, setTitle3Images] = useState<string[]>([]);
    const [title4Images, setTitle4Images] = useState<string[]>([]);
 
    const [classOptions, setClassOptions] = useState<SelectOption[]>([]);
    const [sessionOptions, setSessionOptions] = useState<SelectOption[]>([]);

    const [categories, setCategories] = useState<OptionType[]>([]);
    const [sessions, setSessions] = useState<OptionType[]>([]);
    const [classes, setClasses] = useState<OptionType[]>([]);
    const [bloodGroups, setBloodGroups] = useState<OptionType[]>([]);
    const [genotypes, setGenotypes] = useState<OptionType[]>([]);
    const [houses, setHouses] = useState<OptionType[]>([]);
    const [routesName, setRoutesName] = useState<OptionType[]>([]);
    const [pickups, setPickups] = useState<OptionType[]>([]);
    const [hostels, setHostels] = useState<OptionType[]>([]);
    const [rooms, setRooms] = useState<OptionType[]>([]);
    const [siblingsessions, setSiblingSessions] = useState<OptionType[]>([]);
    const [siblingclasses, setSiblingClasses] = useState<OptionType[]>([]);

    
    const [showSibling, setShowSibling] = useState(false);
    const [siblings, setSiblings] = useState<
    { siblingClass: string; siblingSession: string; siblingName: string }[]
    >([]);


  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

const handleImportStudents = async ({
  classId,
  sessionId,
  file,
}: {
  classId: string;
  sessionId: string;
  file: File;
}) => {
  // ✅ Prevent import if any field is missing
  if (!classId || !sessionId || !file) {
    toast.error("Please fill class, session, and upload a CSV file.");
    return;
  }

  const toastId = toast.loading("Importing students...");

  try {
    const formData = new FormData();
    formData.append("classId", classId);
    formData.append("sessionId", sessionId);
    formData.append("file", file);

    const res = await fetch("/api/uploadexcel", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Import failed");
    }

    toast.success("Students imported successfully!", { id: toastId });
    router.refresh();
  } catch (err: any) {
    toast.error(err.message || "An error occurred during import", {
      id: toastId,
    });
  }
};


const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(studentAdmissionSchema),
    defaultValues: data || {
      dateofBirth: new Date(),
      admissionDate: new Date(),
      measurementDate: new Date(),
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
      const [
        catRes, sesRes, clsRes, bgRes, genoRes,
        houseRes, routeRes, pickupRes, hostelRes, roomRes,
      ] = await Promise.all([
        fetch("/api/studentcategory"),
        fetch("/api/session"),
        fetch("/api/class"),
        fetch("/api/bloodgroup"),
        fetch("/api/genotype"),
        fetch("/api/studenthouse"),
        fetch("/api/transportroute"),
        fetch("/api/transportpickup"),
        fetch("/api/hostel"),
        fetch("/api/room"),
      ]);

      const [
        catData, sesData, clsData, bgData, genoData,
        houseData, routeData, pickupData, hostelData, roomData,
      ] = await Promise.all([
        catRes.json(), sesRes.json(), clsRes.json(), bgRes.json(), genoRes.json(),
        houseRes.json(), routeRes.json(), pickupRes.json(), hostelRes.json(), roomRes.json(),
      ]);

      setCategories(catData.data || []);
      setSessions(sesData.data || []);
      setClasses(clsData.data || []);
      setBloodGroups(bgData.data || []);
      setGenotypes(genoData.data || []);
      setHouses(houseData.data || []);
      setRoutesName(routeData.data || []);
      setPickups(pickupData.data || []);
      setHostels(hostelData.data || []);
      setRooms(roomData.data || []);
    } catch (err) {
      toast.error("Failed to fetch one or more dropdown options");
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

    const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "student" | "father" | "mother" | "guardian" | "title1" | "title2" | "title3" | "title4"   
    ) => {
    if (e.target.files) {
        const imageFiles = Array.from(e.target.files).filter((file) =>
        file.type.startsWith("image/")
        );

        switch (type) {
        case "student":
            setStudentFiles(imageFiles);
            setValue("studentAttachment", [...studentImages, ...imageFiles]);
            break;
        case "father":
            setFatherFiles(imageFiles);
            setValue("fatherAttachment", [...fatherImages, ...imageFiles]);
            break;
        case "mother":
            setMotherFiles(imageFiles);
            setValue("motherAttachment", [...motherImages, ...imageFiles]);
            break;
        case "guardian":
            setGuardianFiles(imageFiles);
            setValue("guardianAttachment", [...guardianImages, ...imageFiles]);
            break;
        case "title1":
            setTitle1Files(imageFiles);
            setValue("title1Attachment", [...title1Images, ...imageFiles]);
            break;
        case "title2":
            setTitle2Files(imageFiles);
            setValue("title2Attachment", [...title2Images, ...imageFiles]);
            break;
        case "title3":
            setTitle3Files(imageFiles);
            setValue("title3Attachment", [...title3Images, ...imageFiles]);
            break;
        case "title4":
            setTitle4Files(imageFiles);
            setValue("title4Attachment", [...title4Images, ...imageFiles]);
            break;
        }
    }
    };

    const handleRemoveImage = (
    index: number,
    type: "student" | "father" | "mother" | "guardian" | "title1" | "title2" | "title3" | "title4"
    ) => {
    let updated: string[] = [];
    switch (type) {
        case "student":
        updated = studentImages.filter((_, i) => i !== index);
        setStudentImages(updated);
        setValue("studentAttachment", [...updated, ...studentFiles]);
        break;
        case "father":
        updated = fatherImages.filter((_, i) => i !== index);
        setFatherImages(updated);
        setValue("fatherAttachment", [...updated, ...fatherFiles]);
        break;
        case "mother":
        updated = motherImages.filter((_, i) => i !== index);
        setMotherImages(updated);
        setValue("motherAttachment", [...updated, ...motherFiles]);
        break;
        case "guardian":
        updated = guardianImages.filter((_, i) => i !== index);
        setGuardianImages(updated);
        setValue("guardianAttachment", [...updated, ...guardianFiles]);
        break;
        case "title1":
        updated = title1Images.filter((_, i) => i !== index);
        setTitle1Images(updated);
        setValue("title1Attachment", [...updated, ...title1Files]);
        break;  
        case "title2":
        updated = title2Images.filter((_, i) => i !== index);
        setTitle2Images(updated);
        setValue("title2Attachment", [...updated, ...title2Files]);
        break;                
        case "title3":
        updated = title3Images.filter((_, i) => i !== index);
        setTitle3Images(updated);
        setValue("title3Attachment", [...updated, ...title3Files]);
        break;          
        case "title4":
        updated = title4Images.filter((_, i) => i !== index);
        setTitle4Images(updated);
        setValue("title4Attachment", [...updated, ...title4Files]);
        break;          
    }
    };

  const onSubmit = async (formData: FormData) => {
    try {
    //   if (existingImages.length === 0 && selectedFiles.length === 0) {
    //     toast.error("Please select at least one image");
    //     return;
    //   }

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

      toast.loading(type === "create" ? "Student Admission Saving..." : "Student Admission Updating...", {
        id: toastId,
      });

      const payload = {
        ...formData,
        attachment: uploadedUrls,
        siblings: siblings,
      };

      const response = await fetch(
        type === "create"
          ? "/api/studentadmission"
          : `/api/studentadmission/${data?._id}`,
        {
          method: type === "create" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Submission Failed");

      toast.success(
        `Student Admission ${
          type === "create" ? "Submitted" : "Updated"
        } Successfully!`,
        { id: toastId }
      );

      onClose?.();
      onSuccess?.();

      if (!onClose && !onSuccess) {
        router.push("/dashboard/studentadmission");
        router.refresh();
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  useEffect(() => {
  const fetchOptions = async () => {
    const classRes = await fetch("/api/class");
    const sessionRes = await fetch("/api/session");

    {classOptions.map((cls) => (
      <option key={cls.value} value={cls.value}>{cls.label}</option>
    ))}

    {sessionOptions.map((s) => (
      <option key={s.value} value={s.value}>{s.label}</option>
    ))}

  };
    fetchOptions();
  }, []);

  return (
    <form
      className="flex flex-col text-black space-y-4 text-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center justify-between w-full md:w-auto pt-4">
        <h1 className="text-xl font-semibold">
            {type === "create" ? "Add Student Admission" : "Update Student Admission"}
        </h1>
        <button
          type="button"
          onClick={() => setIsImportModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-600"
        >
          <FaFileImport /> Import Students
        </button>
        <ImportStudentModal
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
          onImport={handleImportStudents}
          classes={classes}
          sessions={sessions}
        />
      </div>
      <hr className="w-full my-4" />

          {/* STUDENT DETIAILS */}
        <CollapsibleSection title="Student Details">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
                {/* 1st Row */}
                <InputField label="Student Name *" name="studentName" register={register} error={errors.studentName} />
                <InputField label="Gender *" name="gender" register={register} error={errors.gender} />
                <InputField label="Date of Birth *" name="dateofBirth" type="date" register={register} error={errors.dateofBirth} />
                {/* CATEGORY */}
                <div className="flex flex-col">
                  <label className="text-[16px] font-medium text-black mb-1">Category *</label>
                  <select {...register("category")} className="p-2 border rounded-md text-sm" defaultValue="">
                    <option value="">Select Category</option>
                    {categories.map((item) => (
                      <option key={item._id} value={item.category}>{item.category}</option>
                    ))}
                  </select>
                  {errors.category && <span className="text-xs text-red-400">{errors.category.message}</span>}
                </div>
                {/* 2nd Row */}
                <InputField label="Religion *" name="religion" register={register} error={errors.religion} />
                {/* SESSION */}
                <div className="flex flex-col">
                  <label className="text-[16px] font-medium text-black mb-1">Session *</label>
                  <select {...register("session")} className="p-2 border rounded-md text-sm" defaultValue="">
                    <option value="">Select Session</option>
                    {sessions.map((item) => (
                      <option key={item._id} value={item.session}>{item.session}</option>
                    ))}
                  </select>
                  {errors.session && <span className="text-xs text-red-400">{errors.session.message}</span>}
                </div>
                {/* CLASS */}
                <div className="flex flex-col">
                  <label className="text-[16px] font-medium text-black mb-1">Class *</label>
                  <select {...register("className")} className="p-2 border rounded-md text-sm" defaultValue="">
                    <option value="">Select Class</option>
                    {classes.map((item) => (
                      <option key={item._id} value={item.className}>{item.className}</option>
                    ))}
                  </select>
                  {errors.className && <span className="text-xs text-red-400">{errors.className.message}</span>}
                </div>
                <InputField label="Caste *" name="caste" register={register} error={errors.caste} />
                {/* 3rd Row */}
                <InputField label="Phone Number *" name="phoneNumber" register={register} error={errors.phoneNumber} />
                <InputField label="Email *" name="email" type="email" register={register} error={errors.email} />
                <InputField label="Admission Date *" name="admissionDate" type="date" register={register} error={errors.admissionDate} />
                {/* BLOOD GROUP */}
                <div className="flex flex-col">
                  <label className="text-[16px] font-medium text-black mb-1">Blood Group *</label>
                  <select {...register("bloodGroup")} className="p-2 border rounded-md text-sm" defaultValue="">
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map((item) => (
                      <option key={item._id} value={item.bloodGroup}>{item.bloodGroup}</option>
                    ))}
                  </select>
                  {errors.bloodGroup && <span className="text-xs text-red-400">{errors.bloodGroup.message}</span>}
                </div>
                {/* GENOTYPE */}
                <div className="flex flex-col">
                  <label className="text-[16px] font-medium text-black mb-1">Genotype *</label>
                  <select {...register("genotype")} className="p-2 border rounded-md text-sm" defaultValue="">
                    <option value="">Select Genotype</option>
                    {genotypes.map((item) => (
                      <option key={item._id} value={item.genotype}>{item.genotype}</option>
                    ))}
                  </select>
                  {errors.genotype && <span className="text-xs text-red-400">{errors.genotype.message}</span>}
                </div>
                {/* 4th Row */}
                {/* HOUSE */}
                <div className="flex flex-col">
                  <label className="text-[16px] font-medium text-black mb-1">House *</label>
                  <select {...register("studenthouse")} className="p-2 border rounded-md text-sm" defaultValue="">
                    <option value="">Select House</option>
                    {houses.map((item) => (
                      <option key={item._id} value={item.studenthouse}>{item.studenthouse}</option>
                    ))}
                  </select>
                  {errors.studenthouse && <span className="text-xs text-red-400">{errors.studenthouse.message}</span>}
                </div>
                <InputField label="Height (cm) *" name="height" register={register} error={errors.height} />
                <InputField label="Weight (kg) *" name="weight" register={register} error={errors.weight} />
                <InputField label="Measurement Date *" name="measurementDate" type="date" register={register} error={errors.measurementDate} />

                {/* 5th Row */}
                <InputField label="Medical History *" name="medicalHistory" register={register} error={errors.medicalHistory} />
                <InputField label="Address *" name="address" register={register} error={errors.address} />

                <div className="flex flex-col col-span-1 lg:col-span-1">
                    <label className="text-[16px] font-medium mb-1">Student Image *</label>
                    <label
                        htmlFor="studentAttachment"
                        className="flex items-center gap-2 border border-dashed p-3 rounded-md text-xs cursor-pointer"
                    >
                        <NextImage src="/upload.png" alt="upload" width={20} height={20} />
                        Drag and drop or click to upload
                    </label>
                    <input
                        type="file"
                        id="studentAttachment"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => handleFileChange(e, "student")}
                    />
                    {errors.studentAttachment && (
                        <span className="text-xs text-red-400">
                        {errors.studentAttachment.message as string}
                        </span>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {studentImages.map((url, idx) => (
                        <div key={`student-existing-${idx}`} className="relative w-[80px] h-[80px]">
                        <Image
                            src={url}
                            alt={`Student ${idx}`}
                            fill
                            className="object-cover rounded border"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveImage(idx, "student")}
                            className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full -translate-y-1/2 translate-x-1/2"
                            title="Remove"
                        >
                            ✕
                        </button>
                        </div>
                        ))}
                        {studentFiles.map((file, idx) => (
                        <Image
                            key={`student-selected-${idx}`}
                            src={URL.createObjectURL(file)}
                            alt={`New Student ${idx}`}
                            width={80}
                            height={80}
                            className="object-cover rounded border"
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
                    {/* Sibling Button */}
                <div className="flex items-center justify-center min-h-[90px] col-span-1 lg:col-span-1">
                  <button
                    type="button"
                    onClick={() => setShowSibling((prev) => !prev)}
                    className="bg-gray-300 text-center text-sm font-medium text-black rounded-md px-4 py-2 cursor-pointer hover:bg-gray-400"
                  >
                    {showSibling ? "Hide Sibling" : "Add Sibling"}
                  </button>
                </div>
                {showSibling && (
                  <>
                  {/* SIBLING CLASS */}
                  <div className="flex flex-col">
                    <label className="text-[16px] font-medium text-black mb-1">Sibling Class *</label>
                    <select {...register("siblingClass")} className="p-2 border rounded-md text-sm" defaultValue="">
                      <option value="">Select Sibling Class</option>
                      {classes.map((item) => (
                        <option key={item._id} value={item.className}>{item.className}</option>
                      ))}
                    </select>
                    {errors.siblingClass && <span className="text-xs text-red-400">{errors.siblingClass.message}</span>}
                  </div>
                  {/* SIBLING SESSION */}
                  <div className="flex flex-col">
                    <label className="text-[16px] font-medium text-black mb-1">Sibling Session *</label>
                    <select {...register("siblingSession")} className="p-2 border rounded-md text-sm" defaultValue="">
                      <option value="">Select Sibling Session</option>
                      {sessions.map((item) => (
                        <option key={item._id} value={item.session}>{item.session}</option>
                      ))}
                    </select>
                    {errors.siblingSession && <span className="text-xs text-red-400">{errors.siblingSession.message}</span>}
                  </div>                  
                    <InputField
                      label="Sibling Name"
                      name="siblingName"
                      register={register}
                      error={errors.siblingName}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const siblingClass = watch("siblingClass");
                        const siblingSession = watch("siblingSession");
                        const siblingName = watch("siblingName");

                        if (!siblingClass || !siblingSession || !siblingName) {
                          toast.error("Please fill all sibling fields");
                          return;
                        }

                        setSiblings([
                          ...siblings,
                          { siblingClass, siblingSession, siblingName },
                        ]);

                        // Optionally reset fields after adding
                        setValue("siblingClass", "");
                        setValue("siblingSession", "");
                        setValue("siblingName", "");
                      }}
                      className="bg-lamaYellow text-white px-6 py-2 rounded-md font-semibold disabled:bg-gray-400"
                    >
                      Add Sibling
                    </button>
                  </>
                )}

            </div>
        </CollapsibleSection>
        
        {/* TRANSPORT ROUTE */}
        <CollapsibleSection title="Trasnport Details">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">        
            {/* TRANSPORT ROUTE */}
            <div className="flex flex-col">
              <label className="text-[16px] font-medium text-black mb-1">Transport Route *</label>
              <select {...register("routeName")} className="p-2 border rounded-md text-sm" defaultValue="">
                <option value="">Select Transport Route</option>
                {routesName.map((item) => (
                  <option key={item._id} value={item.routeName}>{item.routeName}</option>
                ))}
              </select>
              {errors.routeName && <span className="text-xs text-red-400">{errors.routeName.message}</span>}
            </div>
            {/* TRANSPORT PICK UP */}
            <div className="flex flex-col">
              <label className="text-[16px] font-medium text-black mb-1">Transport Pick Up *</label>
              <select {...register("pickuppoint")} className="p-2 border rounded-md text-sm" defaultValue="">
                <option value="">Select Pick Up Point</option>
                {pickups.map((item) => (
                  <option key={item._id} value={item.pickuppoint}>{item.pickuppoint}</option>
                ))}
              </select>
              {errors.pickuppoint && <span className="text-xs text-red-400">{errors.pickuppoint.message}</span>}
            </div>
            <InputField label="Fees Month (comma separated) *" name="feesMonth" register={register} error={errors.feesMonth} />
            </div>
        </CollapsibleSection>    

        {/* HOSTEL DETAILS */}
        <CollapsibleSection title="Hostel Details">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">        
            {/* HOSTEL */}
            <div className="flex flex-col">
              <label className="text-[16px] font-medium text-black mb-1">Hostel *</label>
              <select {...register("hostelName")} className="p-2 border rounded-md text-sm" defaultValue="">
                <option value="">Select Hostel</option>
                {hostels.map((item) => (
                  <option key={item._id} value={item.hostelName}>{item.hostelName}</option>
                ))}
              </select>
              {errors.hostelName && <span className="text-xs text-red-400">{errors.hostelName.message}</span>}
            </div>

            {/* ROOM */}
            <div className="flex flex-col">
              <label className="text-[16px] font-medium text-black mb-1">Room *</label>
              <select {...register("roomName")} className="p-2 border rounded-md text-sm" defaultValue="">
                <option value="">Select Room</option>
                {rooms.map((item) => (
                  <option key={item._id} value={item.roomName}>{item.roomName}</option>
                ))}
              </select>
              {errors.roomName && <span className="text-xs text-red-400">{errors.roomName.message}</span>}
            </div>
            </div>
        </CollapsibleSection>

        {/* FEES DETAIL */}
        <CollapsibleSection title="Fess Details">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">        
            <InputField label="Fees Details *" name="feeDetails" register={register} error={errors.feeDetails} />
            </div>
        </CollapsibleSection>
            
        {/* FEES DISCOUNT DETAILS */}
        <CollapsibleSection title="Fess Discount Details">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">        
            <InputField label="Fees Discount Details *" name="feeDiscountDetail" register={register} error={errors.feeDiscountDetail} />
            </div>
        </CollapsibleSection>

        {/* PARENT GUARDIAN DETAILS */}
        <CollapsibleSection title="Parent/Guardian Details">        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">        
            <InputField label="Father Name *" name="fatherName" register={register} error={errors.fatherName} />
            <InputField label="Father Phone *" name="fatherPhone" register={register} error={errors.fatherPhone} />
            <InputField label="Father Occupation *" name="fatherOccupation" register={register} error={errors.fatherOccupation} />
                <div className="flex flex-col col-span-1 lg:col-span-1">
                    <label className="text-[16px] font-medium mb-1">Father Image *</label>
                    <label
                        htmlFor="fatherAttachment"
                        className="flex items-center gap-2 border border-dashed p-3 rounded-md text-xs cursor-pointer"
                    >
                        <NextImage src="/upload.png" alt="upload" width={20} height={20} />
                        Drag and drop or click to upload
                    </label>
                    <input
                        type="file"
                        id="fatherAttachment"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => handleFileChange(e, "father")}
                    />
                    {errors.fatherAttachment && (
                        <span className="text-xs text-red-400">
                        {errors.fatherAttachment.message as string}
                        </span>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {fatherImages.map((url, idx) => (
                        <div key={`father-existing-${idx}`} className="relative w-[80px] h-[80px]">
                        <Image
                            src={url}
                            alt={`Father ${idx}`}
                            fill
                            className="object-cover rounded border"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveImage(idx, "father")}
                            className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full -translate-y-1/2 translate-x-1/2"
                            title="Remove"
                        >
                            ✕
                        </button>
                        </div>
                        ))}
                        {fatherFiles.map((file, idx) => (
                        <Image
                            key={`father-selected-${idx}`}
                            src={URL.createObjectURL(file)}
                            alt={`New Father ${idx}`}
                            width={80}
                            height={80}
                            className="object-cover rounded border"
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
            <InputField label="Mother Name *" name="motherName" register={register} error={errors.motherName} />
            <InputField label="Mother Phone *" name="motherPhone" register={register} error={errors.motherPhone} />
            <InputField label="Mother Occupation *" name="motherOccupation" register={register} error={errors.motherOccupation} />
                <div className="flex flex-col col-span-1 lg:col-span-1">
                    <label className="text-[16px] font-medium mb-1">Mother Image *</label>
                    <label
                        htmlFor="motherAttachment"
                        className="flex items-center gap-2 border border-dashed p-3 rounded-md text-xs cursor-pointer"
                    >
                        <NextImage src="/upload.png" alt="upload" width={20} height={20} />
                        Drag and drop or click to upload
                    </label>
                    <input
                        type="file"
                        id="motherAttachment"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => handleFileChange(e, "mother")}
                    />
                    {errors.motherAttachment && (
                        <span className="text-xs text-red-400">
                        {errors.motherAttachment.message as string}
                        </span>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {motherImages.map((url, idx) => (
                        <div key={`mother-existing-${idx}`} className="relative w-[80px] h-[80px]">
                        <Image
                            src={url}
                            alt={`Mother ${idx}`}
                            fill
                            className="object-cover rounded border"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveImage(idx, "mother")}
                            className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full -translate-y-1/2 translate-x-1/2"
                            title="Remove"
                        >
                            ✕
                        </button>
                        </div>
                        ))}
                        {motherFiles.map((file, idx) => (
                        <Image
                            key={`mother-selected-${idx}`}
                            src={URL.createObjectURL(file)}
                            alt={`New Mother ${idx}`}
                            width={80}
                            height={80}
                            className="object-cover rounded border"
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
            <div className="flex flex-col gap-2">
              <label htmlFor="guardianIs" className="text-sm font-medium text-black">
                If Guardian Is <span className="">*</span>
              </label>
              <select
                id="guardianIs"
                {...register("guardianIs", { required: "Please select guardian" })}
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              >
                <option value="">Select</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Other">Other</option>
              </select>
              {errors.guardianIs && (
                <p className="text-red-500 text-sm mt-1">{errors.guardianIs.message}</p>
              )}
            </div>
            <InputField label="Guardian Name *" name="guardianName" register={register} error={errors.guardianName} />
            <InputField label="Guardian Relation *" name="guardianRelation" register={register} error={errors.guardianRelation} />
            <InputField label="Guardian Email *" name="guardianEmail" type="email" register={register} error={errors.guardianEmail} />
            <InputField label="Guardian Phone *" name="guardianPhone" register={register} error={errors.guardianPhone} />
            <InputField label="Guardian Occupation *" name="guardianOccupation" register={register} error={errors.guardianOccupation} />
            <InputField label="Guardian Address *" name="guardianAddress" register={register} error={errors.guardianAddress} />
                <div className="flex flex-col col-span-1 lg:col-span-1">
                    <label className="text-[16px] font-medium mb-1">Guardian Image *</label>
                    <label
                        htmlFor="guardianAttachment"
                        className="flex items-center gap-2 border border-dashed p-3 rounded-md text-xs cursor-pointer"
                    >
                        <NextImage src="/upload.png" alt="upload" width={20} height={20} />
                        Drag and drop or click to upload
                    </label>
                    <input
                        type="file"
                        id="guardianAttachment"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => handleFileChange(e, "guardian")}
                    />
                    {errors.guardianAttachment && (
                        <span className="text-xs text-red-400">
                        {errors.guardianAttachment.message as string}
                        </span>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {guardianImages.map((url, idx) => (
                        <div key={`guardian-existing-${idx}`} className="relative w-[80px] h-[80px]">
                        <Image
                            src={url}
                            alt={`Guardian ${idx}`}
                            fill
                            className="object-cover rounded border"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveImage(idx, "guardian")}
                            className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full -translate-y-1/2 translate-x-1/2"
                            title="Remove"
                        >
                            ✕
                        </button>
                        </div>
                        ))}
                        {guardianFiles.map((file, idx) => (
                        <Image
                            key={`guardian-selected-${idx}`}
                            src={URL.createObjectURL(file)}
                            alt={`New Guardian ${idx}`}
                            width={80}
                            height={80}
                            className="object-cover rounded border"
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
        </CollapsibleSection>    

        {/* ADD MORE */}
        <CollapsibleSection title="Add More">
          <div className="flex flex-col w-full">
              <div className="w-full bg-gray-100 px-4 py-3 text-left font-bold text-[16px] items-center">Student Address</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 pt-4">        
              {/* Guardian Address */}
              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-medium space-x-2">
                  <input type="checkbox" {...register("guardianSameAsCurrent")} />
                  <span className="text-[16px] font-medium">If Guardian Address Is Current Address *</span>
                </label>

                {!watch("guardianSameAsCurrent") && (
                  <>
                    <label htmlFor="guardianAddress" className="text-[16px] font-medium mb-1">
                      Guardian Address <span className="">*</span>
                    </label>
                    <input
                      id="guardianAddress"
                      {...register("guardianAddress", { required: "Guardian address is required" })}
                      className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                    />
                    {errors.guardianAddress && (
                      <p className="text-red-500 text-sm">{errors.guardianAddress.message}</p>
                    )}
                  </>
                )}
              </div>

              {/* Permanent Address */}
              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-medium space-x-2">
                  <input type="checkbox" {...register("permanentSameAsCurrent")} />
                  <span className="text-[16px] font-medium">If Permanent Address Is Current Address *</span>
                </label>

                {!watch("permanentSameAsCurrent") && (
                  <>
                    <label htmlFor="permanentAddress" className="text-[16px] font-medium mb-1">
                      Permanent Address <span className="">*</span>
                    </label>
                    <input
                      id="permanentAddress"
                      {...register("permanentAddress", { required: "Permanent address is required" })}
                      className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                    />
                    {errors.permanentAddress && (
                      <p className="text-red-500 text-sm">{errors.permanentAddress.message}</p>
                    )}
                  </>
                )}
              </div>

            </div>

            <div className="flex flex-col w-full mt-4">
                <div className="w-full bg-gray-100 px-4 py-3 text-left font-bold text-[16px] items-center">Miscellaneous Details</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 pt-4">        
                <InputField label="Bank Account Number *" name="accountNumber" register={register} error={errors.accountNumber} />
                <InputField label="Bank Name *" name="bankName" register={register} error={errors.bankName} />
                <InputField label="Bank Sort Code *" name="sortCode" register={register} error={errors.sortCode} />
                <InputField label="National Identification Number *" name="nin" register={register} error={errors.nin} />
              </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 pt-4">                        
                  {/* previousSchoolDetails */}
                  <div className="flex flex-col">
                    <label className="text-[16px] font-medium text-black mb-1">Previous School Details *</label>
                    <textarea
                      rows={3}
                      className="p-2 border rounded-md text-sm"
                      {...register("previousSchoolDetails")}
                    ></textarea>
                    {errors.previousSchoolDetails && (
                      <span className="text-xs text-red-400">{errors.previousSchoolDetails.message}</span>
                    )}
                  </div>
                  {/* Note */}
                  <div className="flex flex-col">
                    <label className="text-[16px] font-medium text-black mb-1">Previous School Details *</label>
                    <textarea
                      rows={3}
                      className="p-2 border rounded-md text-sm"
                      {...register("note")}
                    ></textarea>
                    {errors.note && (
                      <span className="text-xs text-red-400">{errors.note.message}</span>
                    )}
                  </div>
                </div>              
            </div>

            <div className="flex flex-col w-full mt-4">
                <div className="w-full bg-gray-100 px-4 py-3 text-left font-bold text-[16px] items-center">Upload Other Documents</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-4">        
                <InputField label="Title 1 *" name="title1" register={register} error={errors.title1} />
                <div className="flex flex-col col-span-1 lg:col-span-1">
                    <label className="text-[16px] font-medium mb-1">1st Document Image *</label>
                    <label
                        htmlFor="title1Attachment"
                        className="flex items-center gap-2 border border-dashed p-3 rounded-md text-xs cursor-pointer"
                    >
                        <NextImage src="/upload.png" alt="upload" width={20} height={20} />
                        Drag and drop or click to upload
                    </label>
                    <input
                        type="file"
                        id="title1Attachment"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => handleFileChange(e, "title1")}
                    />
                    {errors.title1Attachment && (
                        <span className="text-xs text-red-400">
                        {errors.title1Attachment.message as string}
                        </span>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {title1Images.map((url, idx) => (
                        <div key={`title1-existing-${idx}`} className="relative w-[80px] h-[80px]">
                        <Image
                            src={url}
                            alt={`Title1 ${idx}`}
                            fill
                            className="object-cover rounded border"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveImage(idx, "title1")}
                            className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full -translate-y-1/2 translate-x-1/2"
                            title="Remove"
                        >
                            ✕
                        </button>
                        </div>
                        ))}
                        {title1Files.map((file, idx) => (
                        <Image
                            key={`title1-selected-${idx}`}
                            src={URL.createObjectURL(file)}
                            alt={`New Title1 ${idx}`}
                            width={80}
                            height={80}
                            className="object-cover rounded border"
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

                <InputField label="Title 2 *" name="title2" register={register} error={errors.title2} />
                 <div className="flex flex-col col-span-1 lg:col-span-1">
                    <label className="text-[16px] font-medium mb-1">2nd Document Image *</label>
                    <label
                        htmlFor="title2Attachment"
                        className="flex items-center gap-2 border border-dashed p-3 rounded-md text-xs cursor-pointer"
                    >
                        <NextImage src="/upload.png" alt="upload" width={20} height={20} />
                        Drag and drop or click to upload
                    </label>
                    <input
                        type="file"
                        id="title2Attachment"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => handleFileChange(e, "title2")}
                    />
                    {errors.title2Attachment && (
                        <span className="text-xs text-red-400">
                        {errors.title2Attachment.message as string}
                        </span>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {title2Images.map((url, idx) => (
                        <div key={`title2-existing-${idx}`} className="relative w-[80px] h-[80px]">
                        <Image
                            src={url}
                            alt={`Title2 ${idx}`}
                            fill
                            className="object-cover rounded border"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveImage(idx, "title2")}
                            className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full -translate-y-1/2 translate-x-1/2"
                            title="Remove"
                        >
                            ✕
                        </button>
                        </div>
                        ))}
                        {title2Files.map((file, idx) => (
                        <Image
                            key={`title2-selected-${idx}`}
                            src={URL.createObjectURL(file)}
                            alt={`New Title2 ${idx}`}
                            width={80}
                            height={80}
                            className="object-cover rounded border"
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

                <InputField label="Title 3 *" name="title3" register={register} error={errors.title3} />
                 <div className="flex flex-col col-span-1 lg:col-span-1">
                    <label className="text-[16px] font-medium mb-1">3rd Document Image *</label>
                    <label
                        htmlFor="title3Attachment"
                        className="flex items-center gap-2 border border-dashed p-3 rounded-md text-xs cursor-pointer"
                    >
                        <NextImage src="/upload.png" alt="upload" width={20} height={20} />
                        Drag and drop or click to upload
                    </label>
                    <input
                        type="file"
                        id="title3Attachment"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => handleFileChange(e, "title3")}
                    />
                    {errors.title3Attachment && (
                        <span className="text-xs text-red-400">
                        {errors.title3Attachment.message as string}
                        </span>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {title3Images.map((url, idx) => (
                        <div key={`title3-existing-${idx}`} className="relative w-[80px] h-[80px]">
                        <Image
                            src={url}
                            alt={`Title3 ${idx}`}
                            fill
                            className="object-cover rounded border"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveImage(idx, "title3")}
                            className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full -translate-y-1/2 translate-x-1/2"
                            title="Remove"
                        >
                            ✕
                        </button>
                        </div>
                        ))}
                        {title3Files.map((file, idx) => (
                        <Image
                            key={`title3-selected-${idx}`}
                            src={URL.createObjectURL(file)}
                            alt={`New Title3 ${idx}`}
                            width={80}
                            height={80}
                            className="object-cover rounded border"
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

                <InputField label="Title 4 *" name="title4" register={register} error={errors.title4} />
                <div className="flex flex-col col-span-1 lg:col-span-1">
                    <label className="text-[16px] font-medium mb-1">4th Document Image *</label>
                    <label
                        htmlFor="title4Attachment"
                        className="flex items-center gap-2 border border-dashed p-3 rounded-md text-xs cursor-pointer"
                    >
                        <NextImage src="/upload.png" alt="upload" width={20} height={20} />
                        Drag and drop or click to upload
                    </label>
                    <input
                        type="file"
                        id="title4Attachment"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => handleFileChange(e, "title4")}
                    />
                    {errors.title4Attachment && (
                        <span className="text-xs text-red-400">
                        {errors.title4Attachment.message as string}
                        </span>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {title4Images.map((url, idx) => (
                        <div key={`title4-existing-${idx}`} className="relative w-[80px] h-[80px]">
                        <Image
                            src={url}
                            alt={`Title4 ${idx}`}
                            fill
                            className="object-cover rounded border"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveImage(idx, "title4")}
                            className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full -translate-y-1/2 translate-x-1/2"
                            title="Remove"
                        >
                            ✕
                        </button>
                        </div>
                        ))}
                        {title4Files.map((file, idx) => (
                        <Image
                            key={`title4-selected-${idx}`}
                            src={URL.createObjectURL(file)}
                            alt={`New Title4 ${idx}`}
                            width={80}
                            height={80}
                            className="object-cover rounded border"
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
            </div>
          </div>
        </CollapsibleSection>

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

export default StudentAdmissionForm;
