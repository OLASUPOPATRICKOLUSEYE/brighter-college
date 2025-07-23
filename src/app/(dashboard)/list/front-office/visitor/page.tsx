"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TableSearch from "@/components/TableSearch";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Image from "next/image";
import TableNotFound from "@/components/TableNotFound";
import TableLoading from "@/components/TableLoading";
import { useUserRole } from "@/lib/hooks/useUserRole";

const VisitorListPage = () => {
  const { isAdmin } = useUserRole();
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [visitors, setVisitors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [total, setTotal] = useState<number>(0);

  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;

  const fetchVisitors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append("search", searchTerm);
      queryParams.append("page", page.toString());
      queryParams.append("sortBy", sortBy);
      queryParams.append("sortOrder", sortOrder);

      const res = await fetch(`/api/visitors?${queryParams.toString()}`);
      if (!res.ok) throw new Error("Visitors Not Found");
      const data = await res.json();

      setVisitors(data.data || []);
      setTotal(data.total || 0);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch data");
      setVisitors([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, page, sortBy, sortOrder]);

  useEffect(() => {
    fetchVisitors();
  }, [fetchVisitors]);

  const handleSuccess = () => {
    fetchVisitors();
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

  const colCount = isAdmin ? 8 : 7;

  return (
    <div className="bg-white rounded-md flex-1">
      {/* Header */}
      <div className="flex px-4 pt-4 flex-col md:flex-row md:justify-between mb-4 gap-2 md:gap-0 md:text-left">
        <h1 className="text-lg font-semibold">All Visitors</h1>

        <div className="flex flex-col sm:flex-row gap-2 items-center">
          <TableSearch value={searchTerm} onChange={setSearchTerm} />
          <FormModal table="visitor" type="create" onSuccess={handleSuccess} />
        </div>
      </div>

      {/* Table */}
        <div className="overflow-x-auto w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <table className="min-w-[700px] w-full border-collapse mt-4 text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th
                  className="p-4 whitespace-nowrap cursor-pointer select-none"
                  onClick={() => handleSort("visitorDetails")}
                >
                  Visitor Details{" "}
                  <span className={sortBy === "visitorDetails" ? "text-black" : "text-gray-300"}>
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                </th>
                <th
                  className="p-4 whitespace-nowrap cursor-pointer select-none"
                  onClick={() => handleSort("purpose")}
                >
                  Purpose{" "}
                  <span className={sortBy === "purpose" ? "text-black" : "text-gray-300"}>
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                </th>
                <th
                  className="p-4 whitespace-nowrap cursor-pointer select-none"
                  onClick={() => handleSort("meetingWith")}
                >
                  Meeting With{" "}
                  <span className={sortBy === "meetingWith" ? "text-black" : "text-gray-300"}>
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                </th>
                <th
                  className="p-4 whitespace-nowrap cursor-pointer select-none"
                  onClick={() => handleSort("phone")}
                >
                  Phone{" "}
                  <span className={sortBy === "phone" ? "text-black" : "text-gray-300"}>
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                </th>
                <th
                  className="p-4 whitespace-nowrap cursor-pointer select-none"
                  onClick={() => handleSort("date")}
                >
                  Date{" "}
                  <span className={sortBy === "date" ? "text-black" : "text-gray-300"}>
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                </th>
                <th
                  className="p-4 whitespace-nowrap cursor-pointer select-none"
                  onClick={() => handleSort("time")}
                >
                  InTime/OutTime{" "}
                  <span className={sortBy === "time" ? "text-black" : "text-gray-300"}>
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                </th>
                <th
                  className="p-4 whitespace-nowrap cursor-pointer select-none"
                  onClick={() => handleSort("attachment")}
                >
                  Attachment{" "}
                  <span className={sortBy === "attachment" ? "text-black" : "text-gray-300"}>
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                </th>
                {isAdmin && 
                  <th className="p-4 whitespace-nowrap text-right">Action</th>
                }
              </tr>
            </thead>

            <tbody>
            {loading && (
              <tr>
                <td colSpan={colCount} className="p-6 text-center">
                  <TableLoading message="Fetching Visitors..." />
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

            {!loading && !error && visitors.length === 0 && (
              <tr>
                <td colSpan={colCount} className="p-6 text-center">
                  <TableNotFound message="No Visitors Available." />
                </td>
              </tr>
            )}

            {!loading && !error &&
              visitors.map((item) => (
                <tr key={item._id} className="border-b border-gray-200 text-sm hover:bg-slate-100">
                  <td className="p-4 break-words">
                    <div className="flex flex-col gap-1">
                      <h3 className="font-semibold">{item.visitorName}</h3>
                      <p className="text-xs text-gray-500">ID Card: {item.idCard}</p>
                      <p className="text-xs text-gray-500">Persons: {item.numberOfPersons}</p>
                      {item.note && <p className="text-xs italic text-gray-400">Note: {item.note}</p>}
                    </div>
                  </td>
                  <td className="p-4 break-words">{item.purpose}</td>
                  <td className="p-4 break-words">{item.meetingWith} - {item.staffName}</td>
                  <td className="p-4 break-words">{item.phone}</td>
                  <td className="p-4 break-words">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="p-4 break-words">{item.inTime} / {item.outTime}</td>
                  <td className="p- break-words">
                    {Array.isArray(item.attachment) && item.attachment.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {item.attachment.map((file: string, i: number) => (
                            <Image
                            key={i}
                            src={file}
                            alt={`Attachment ${i + 1}`}
                            height={64}
                            width={64}
                            className="w-16 h-16 object-cover rounded border"
                          />
                        ))}
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  {isAdmin && (
                    <td className="p-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <FormModal table="visitor" type="view" data={item} onSuccess={handleSuccess} />
                      <FormModal table="visitor" type="update" data={item} onSuccess={handleSuccess} />
                      <FormModal table="visitor" type="delete" id={item._id} onSuccess={handleSuccess} />
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

export default VisitorListPage;
