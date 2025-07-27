"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TableSearch from "@/components/TableSearch";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import { ITEM_PER_PAGE } from "@/lib/settings";
import TableNotFound from "@/components/TableNotFound";
import TableLoading from "@/components/TableLoading";
import { useUserRole } from "@/lib/hooks/useUserRole";
import IconButton from "@/components/TableActionButton";
import { FiCopy } from "react-icons/fi";
import { AiFillFilePdf, AiOutlineFileExcel } from "react-icons/ai";
import { VscFileBinary } from "react-icons/vsc";
import { MdPrint } from "react-icons/md";

const StudentAdmissionPage = () => {
  const { isAdmin, isReceptionist } = useUserRole();
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [total, setTotal] = useState<number>(0);

  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;

  const fetchAdmissions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append("search", searchTerm);
      queryParams.append("page", page.toString());
      queryParams.append("sortBy", sortBy);
      queryParams.append("sortOrder", sortOrder);

      const res = await fetch(`/api/studentadmission?${queryParams.toString()}`);
      if (!res.ok) throw new Error("Student Admission Data Not Found");
      const data = await res.json();

      setStudents(data.data || []);
      setTotal(data.total || 0);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch data");
      setStudents([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, page, sortBy, sortOrder]);

  useEffect(() => {
    fetchAdmissions();
  }, [fetchAdmissions]);

  const handleSuccess = () => {
    fetchAdmissions();
    router.refresh();
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const colCount = isAdmin ? 9 : 8;

  return (
    <div className="bg-white rounded-md flex-1">
      <div className="flex flex-col md:flex-row gap-2 items-stretch px-4 pt-4 w-full max-w-[1600px] mx-auto">
        <input
          type="text"
          placeholder="First Input"
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Second Input"
          className="border p-2 rounded w-full"
        />
        <button className="bg-lamaYellow text-white px-4 py-2 rounded hover:bg-lamaGray w-full md:w-auto">
          Search
        </button>
      </div>
      <hr className="w-full px-4 bg-lamaYellow my-5" />
      {/* Header */}
      <div className="flex px-4 pt-4 flex-col md:flex-row md:justify-between mb-4 gap-2 md:gap-0 md:text-left">
        <h1 className="text-lg font-semibold">All Student Admissions</h1>
        <div className="flex flex-col sm:flex-row gap-2 items-center">
          <TableSearch value={searchTerm} onChange={setSearchTerm} />
          <div className="flex items-center gap-4 self-center flex-wrap justify-center">
            <IconButton icon={<FiCopy className="text-sm" />} title="Copy" />
            <IconButton icon={<AiOutlineFileExcel className="text-sm" />} title="Export to Excel" />
            <IconButton icon={<VscFileBinary className="text-sm" />} title="Export as CSV" />
            <IconButton icon={<AiFillFilePdf className="text-sm" />} title="Export as PDF" />
            <IconButton icon={<MdPrint className="text-sm" />} title="Print" />
            {(isAdmin || isReceptionist) && (
              <FormModal table="studentadmission" type="create" onSuccess={handleSuccess} />
            )}
          </div>
        </div>
      </div>

      {/* Table */}
            <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
              <table className="min-w-[900px] w-full border-collapse mt-4 text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th
                      className="p-4 whitespace-nowrap cursor-pointer select-none"
                      onClick={() => handleSort("studentadmissionId")}
                    >
                      Admission ID{" "}
                      <span className={sortBy === "studentadmissionId" ? "text-black" : "text-gray-300"}>
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    </th>
                    <th
                      className="p-4 whitespace-nowrap cursor-pointer select-none"
                      onClick={() => handleSort("studentName")}
                    >
                      Student Name{" "}
                      <span className={sortBy === "studentName" ? "text-black" : "text-gray-300"}>
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    </th>
                    <th
                      className="p-4 whitespace-nowrap cursor-pointer select-none"
                      onClick={() => handleSort("admissionClass")}
                    >
                      Class{" "}
                      <span className={sortBy === "admissionClass" ? "text-black" : "text-gray-300"}>
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    </th>
                    <th
                      className="p-4 whitespace-nowrap cursor-pointer select-none"
                      onClick={() => handleSort("dateofBirth")}
                    >
                      Date of Birth{" "}
                      <span className={sortBy === "dateofBirth" ? "text-black" : "text-gray-300"}>
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    </th>   
                    <th
                      className="p-4 whitespace-nowrap cursor-pointer select-none"
                      onClick={() => handleSort("gender")}
                    >
                      Gender{" "}
                      <span className={sortBy === "gender" ? "text-black" : "text-gray-300"}>
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    </th> 
                    <th
                      className="p-4 whitespace-nowrap cursor-pointer select-none"
                      onClick={() => handleSort("category")}
                    >
                      Category{" "}
                      <span className={sortBy === "category" ? "text-black" : "text-gray-300"}>
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    </th>                                
                    <th
                      className="p-4 whitespace-nowrap cursor-pointer select-none"
                      onClick={() => handleSort("phoneNumber")}
                    >
                      Mobile Number{" "}
                      <span className={sortBy === "phoneNumber" ? "text-black" : "text-gray-300"}>
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    </th>    
                    <th
                      className="p-4 whitespace-nowrap cursor-pointer select-none"
                      onClick={() => handleSort("email")}
                    >
                      Email{" "}
                      <span className={sortBy === "email" ? "text-black" : "text-gray-300"}>
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    </th>                                                                
                    { isAdmin && (
                      <th className="p-4 whitespace-nowrap text-right">Action</th> 
                    )}
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan={colCount} className="p-6 text-center">
                        <TableLoading message="Fetching All Student Admissions..." />
                      </td>
                    </tr>
                  )}

                  {!loading && error && (
                    <tr>
                      <td colSpan={colCount} className="p-6 text-center">
                        <TableNotFound message={error} />
                      </td>
                    </tr>
                  )}

                  {!loading && !error && students.length === 0 && (
                    <tr>
                      <td colSpan={colCount} className="p-6 text-center">
                        <TableNotFound message="No Student Admissions Found." />
                      </td>
                    </tr>
                  )}

                  {!loading &&
                    !error &&
                    students.map((item) => (
                      <tr key={item._id} className="border-b text-sm hover:bg-slate-100">
                        <td className="p-4">{item.studentadmissionId}</td>
                        <td className="p-4">{item.studentName}</td>
                        <td className="p-4">{item.admissionClass}</td>
                        <td className="p-4">{item.dateofBirth}</td>
                        <td className="p-4">{item.gender}</td>
                        <td className="p-4">{item.category}</td>
                        <td className="p-4">{item.phoneNumber}</td>
                        <td className="p-4">{item.email}</td>
                        {isAdmin && (
                          <td className="p-4">
                            <div className="flex gap-2 justify-end">
                              <FormModal table="studentadmission" type="view" data={item} onSuccess={handleSuccess} />
                              <FormModal table="studentadmission" type="update" data={item} onSuccess={handleSuccess} />
                              <FormModal table="studentadmission" type="delete" id={item._id} onSuccess={handleSuccess} />
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

      {/* Pagination */}
      {!loading && total > ITEM_PER_PAGE && (
        <Pagination page={page} count={total} />
      )}
    </div>
  );
};

export default StudentAdmissionPage;
