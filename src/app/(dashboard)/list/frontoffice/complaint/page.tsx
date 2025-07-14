"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TableSearch from "@/components/TableSearch";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import { ITEM_PER_PAGE } from "@/lib/settings";

const Complaint = () => {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [total, setTotal] = useState<number>(0);

  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;

  const fetchComplaints = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append("search", searchTerm);
      queryParams.append("page", page.toString());

      const res = await fetch(`/api/complaint?${queryParams.toString()}`);
      if (!res.ok) throw new Error("Complaints Not Found");
      const data = await res.json();

      setComplaints(data.data || []);
      setTotal(data.total || 0);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch data");
      setComplaints([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, page]);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  const handleSuccess = () => {
    fetchComplaints();
    router.refresh();
  };

  const renderRow = (item: any) => (
    <tr key={item._id} className="border-b border-gray-200 text-sm hover:bg-slate-100">
      <td className="p-4">{item.sno}</td>
      <td className="p-4">{item.complaintType}</td>
      <td className="p-4">{item.source}</td>
      <td className="p-4">{item.complainBy}</td>
      <td className="p-4">{item.phone}</td>
      <td className="p-4">{item.date}</td>
      <td className="p-4">{item.description}</td>
      <td className="p-4">{item.actionTaken}</td>
      <td className="p-4">{item.assign}</td>
      <td className="p-4">{item.note}</td>
      <td className="p-4">
        {item.attachDocument ? (
          <a
            href={item.attachDocument}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View
          </a>
        ) : (
          "-"
        )}
      </td>
      <td className="p-2">
        <div className="flex gap-2">
          <FormModal table="complaint" type="view" data={item} onSuccess={handleSuccess} />
          <FormModal table="complaint" type="update" data={item} onSuccess={handleSuccess} />
          <FormModal table="complaint" type="delete" id={item._id} onSuccess={handleSuccess} />
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white rounded-md flex-1 overflow-x-auto">
      <div className="flex px-4 pt-4 flex-col md:flex-row md:justify-between mb-4 gap-2 md:gap-0 md:text-left">
        <h1 className="text-lg font-semibold">All Complaints</h1>

        <div className="flex flex-col sm:flex-row gap-2 items-center">
          <TableSearch value={searchTerm} onChange={setSearchTerm} />
          <FormModal table="complaint" type="create" onSuccess={handleSuccess} />
        </div>
      </div>

      {loading && <p className="px-4">Loading...</p>}
      {error && <p className="text-red-500 px-4">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse mt-4 table-auto text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="p-4">S/No</th>
                <th className="p-4">Complaint Type</th>
                <th className="p-4">Source</th>
                <th className="p-4">Complain By</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Date</th>
                <th className="p-4">Description</th>
                <th className="p-4">Action Taken</th>
                <th className="p-4">Assigned</th>
                <th className="p-4">Note</th>
                <th className="p-4">Attach Document</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>{complaints.map((item) => renderRow(item))}</tbody>
          </table>
        </div>
      )}

      {!loading && total > ITEM_PER_PAGE && (
        <Pagination page={page} count={total} />
      )}
    </div>
  );
};

export default Complaint;
