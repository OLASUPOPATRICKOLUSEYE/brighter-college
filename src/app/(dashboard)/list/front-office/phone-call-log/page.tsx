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
import Image from "next/image";

const PhoneCallLogPage = () => {
  const { isAdmin, isReceptionist } = useUserRole();
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [phonecalllogs, setPhoneCallLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [total, setTotal] = useState<number>(0);

  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;

  const fetchPhoneCallLogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append("search", searchTerm);
      queryParams.append("page", page.toString());
      queryParams.append("sortBy", sortBy);
      queryParams.append("sortOrder", sortOrder);

      const res = await fetch(`/api/phonecalllog?${queryParams.toString()}`);
      if (!res.ok) throw new Error("Phone Call Logs Not Found");
      const data = await res.json();

      setPhoneCallLogs(data.data || []);
      setTotal(data.total || 0);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch data");
      setPhoneCallLogs([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, page, sortBy, sortOrder]);

  useEffect(() => {
    fetchPhoneCallLogs();
  }, [fetchPhoneCallLogs]);

  const handleSuccess = () => {
    fetchPhoneCallLogs();
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

  const colCount = isAdmin ? 10 : 9;

  return (
    <div className="bg-white rounded-md flex-1">
      {/* Header */}
      <div className="flex px-4 pt-4 flex-col md:flex-row md:justify-between mb-4 gap-2 md:gap-0 md:text-left">
        <h1 className="text-lg font-semibold">All Phone Call Logs</h1>

        <div className="flex flex-col sm:flex-row gap-2 items-center">
          <TableSearch value={searchTerm} onChange={setSearchTerm} />
            <div className="flex items-center gap-4 self-center">
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                <Image src="/filter.png" alt="" width={14} height={14} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                <Image src="/sort.png" alt="" width={14} height={14} />
              </button> 
              {(isAdmin || isReceptionist) && (
                <FormModal table="phonecalllog" type="create" onSuccess={handleSuccess} />
              )}
            </div>
        </div>
      </div>

      {/* Table */}
        <div className="overflow-x-auto w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <table className="min-w-[700px] w-full border-collapse mt-4 text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th
                  className="p-4 whitespace-nowrap cursor-pointer select-none"
                  onClick={() => handleSort("phonecalllogId")}
                >
                  Phone Call Log ID{" "}
                  <span className={sortBy === "phonecalllogId" ? "text-black" : "text-gray-300"}>
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                </th>                
                <th
                  className="p-4 whitespace-nowrap cursor-pointer select-none"
                  onClick={() => handleSort("name")}
                >
                  Name{" "}
                  <span className={sortBy === "name" ? "text-black" : "text-gray-300"}>
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
                  onClick={() => handleSort("description")}
                >
                  Description{" "}
                  <span className={sortBy === "description" ? "text-black" : "text-gray-300"}>
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                </th>
                <th
                  className="p-4 whitespace-nowrap cursor-pointer select-none"
                  onClick={() => handleSort("nextFollowUp")}
                >
                  Next Follow-up{" "}
                  <span className={sortBy === "nextFollowUp" ? "text-black" : "text-gray-300"}>
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                </th>
                <th
                  className="p-4 whitespace-nowrap cursor-pointer select-none"
                  onClick={() => handleSort("callDuration")}
                >
                  Call Duration{" "}
                  <span className={sortBy === "callDuration" ? "text-black" : "text-gray-300"}>
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                </th>
                <th
                  className="p-4 whitespace-nowrap cursor-pointer select-none"
                  onClick={() => handleSort("note")}
                >
                  Note{" "}
                  <span className={sortBy === "note" ? "text-black" : "text-gray-300"}>
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                </th>
                <th
                  className="p-4 whitespace-nowrap cursor-pointer select-none"
                  onClick={() => handleSort("type")}
                >
                  Type{" "}
                  <span className={sortBy === "type" ? "text-black" : "text-gray-300"}>
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                </th>
                {isAdmin && ( 
                  <th className="p-4 whitespace-nowrap text-right">Action</th> 
                )}
              </tr>
            </thead>

            <tbody>
            {loading && (
              <tr>
                <td colSpan={colCount} className="p-6 text-center">
                  <TableLoading message="Fetching All Phone Calls Log..." />
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

            {!loading && !error && phonecalllogs.length === 0 && (
              <tr>
                <td colSpan={colCount} className="p-6 text-center">
                  <TableNotFound message="No Phone Calls Log." />
                </td>
              </tr>
            )}
            {!loading && !error &&
              phonecalllogs.map((item) => (
              <tr key={item._id} className="border-b border-gray-200 text-sm hover:bg-slate-100">
                <td className="p-4 break-words">{item.phonecalllogId}</td>
                <td className="p-4 break-words">{item.name}</td>
                <td className="p-4 break-words">{item.phone}</td>
                <td className="p-4 break-words">{new Date(item.date).toLocaleDateString()}</td>
                <td className="p-4 break-words">{item.description}</td>
                <td className="p-4 break-words">{new Date(item.nextfollowupdate).toLocaleDateString()}</td>
                <td className="p-4 break-words">{item.callduration}</td>
                <td className="p-4 break-words">{item.note}</td>
                <td className="p-4 break-words">{item.calltype}</td>
                {isAdmin && (
                  <td className="p-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <FormModal table="phonecalllog" type="view" data={item} onSuccess={handleSuccess} />
                    <FormModal table="phonecalllog" type="update" data={item} onSuccess={handleSuccess} />
                    <FormModal table="phonecalllog" type="delete" id={item._id} onSuccess={handleSuccess} />
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

export default PhoneCallLogPage;
