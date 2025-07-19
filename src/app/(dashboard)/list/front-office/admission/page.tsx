"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TableSearch from "@/components/TableSearch";
import Pagination from "@/components/Pagination";
import { ITEM_PER_PAGE } from "@/lib/settings";
import FormModal from "@/components/FormModal";
import { useUser } from "@clerk/nextjs";



const AdmissionEnquiry = () => {

  const { user } = useUser();
  const role = user?.publicMetadata?.role;


  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [total, setTotal] = useState<number>(0);

  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append("search", searchTerm);
      queryParams.append("page", page.toString());

      const res = await fetch(`/api/admissionenquiry?${queryParams.toString()}`);
      if (!res.ok) throw new Error("Admission Enquiries Not Found");
      const data = await res.json();

      setEnquiries(data.data || []);
      setTotal(data.total || 0);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch data");
      setEnquiries([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, page]);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  const handleSuccess = () => {
    fetchEnquiries();
    router.refresh();
  };

    const renderRow = (item: any) => (
      <tr key={item._id} className="border-b border-gray-200 text-sm hover:bg-slate-100">
        <td className="p-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-xs text-gray-700">Phone: {item.phone}</p>
            <p className="text-xs text-gray-800">Email: {item.email}</p>
            {item.numberofchild && <p className="text-xs italic text-red-500">No. of Child: {item.numberofchild}</p>}
          </div>
        </td>
        <td className="p-4">{item.address}</td>
        <td className="p-4">{item.description}</td>
        <td className="p-4">{item.note}</td>
        <td className="p-4">{item.date}</td>
        <td className="p-4">{item.nextfollowupdate}</td>
        <td className="p-4">{item.assignedstaff}</td>
        <td className="p-4">{item.reference}</td>
        <td className="p-4">{item.source}</td>
        <td className="p-4">{item.class}</td>
        <td className="p-4 whitespace-nowrap">
          <div className="flex gap-4">
            {role === "admin" && (
              <>
                <FormModal table="admissionenquiry" type="view" data={item} onSuccess={handleSuccess} />
                <FormModal table="admissionenquiry" type="update" data={item} onSuccess={handleSuccess} />
                <FormModal table="admissionenquiry" type="delete" id={item._id} onSuccess={handleSuccess} />
              </>
            )}
          </div>
        </td>
      </tr>
    );

  return (
    <div className="bg-white rounded-md flex-1">
      {/* Header */}
      <div className="flex flex-col px-4 pt-4 md:flex-row md:justify-between mb-4 gap-4 md:gap-0 md:text-left">
        <h1 className="text-lg font-semibold">All Admission Enquiries</h1>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <TableSearch value={searchTerm} onChange={setSearchTerm} />
          <FormModal table="admissionenquiry" type="create" onSuccess={handleSuccess} />
        </div>
      </div>

      {/* Loading / Error */}
      {loading && <p className="px-4">Loading...</p>}
      {error && <p className="text-red-500 px-4">{error}</p>}

      {/* Table */}
      {!loading && !error && (
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse mt-4 text-xs sm:text-sm min-w-[1200px]">
            <thead>
              <tr className="text-left text-gray-500 whitespace-nowrap">
                <th className="p-4">Details</th>
                <th className="p-4">Address</th>
                <th className="p-4">Description</th>
                <th className="p-4">Note</th>
                <th className="p-4">Date</th>
                <th className="p-4">Next Follow Up</th>
                <th className="p-4">Assigned Staff</th>
                <th className="p-4">Reference</th>
                <th className="p-4">Source</th>
                <th className="p-4">Class</th>
                {role === "admin" && <th className="p-4">Action</th>}
              </tr>
            </thead>
            <tbody>{enquiries.map((item) => renderRow(item))}</tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!loading && total > ITEM_PER_PAGE && (
        <Pagination page={page} count={total} />
      )}
    </div>
  );
};

export default AdmissionEnquiry;
