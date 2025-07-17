"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TableSearch from "@/components/TableSearch";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import { ITEM_PER_PAGE } from "@/lib/settings";

const PostalReceivePage = () => {
  const [postalReceives, setPostalReceives] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [total, setTotal] = useState<number>(0);

  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;

  const fetchPostalReceives = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append("search", searchTerm);
      queryParams.append("page", page.toString());

      const res = await fetch(`/api/postalreceive?${queryParams.toString()}`);
      if (!res.ok) throw new Error("Postal Receive Not Found");
      const data = await res.json();

      setPostalReceives(data.data || []);
      setTotal(data.total || 0);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch data");
      setPostalReceives([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, page]);

  useEffect(() => {
    fetchPostalReceives();
  }, [fetchPostalReceives]);

  const handleSuccess = () => {
    fetchPostalReceives();
    router.refresh();
  };

  const renderRow = (item: any) => (
    <tr key={item._id} className="border-b border-gray-200 text-sm hover:bg-slate-100">
      <td className="p-4">{item.fromTitle}</td>
      <td className="p-4">{item.referenceNo}</td>
      <td className="p-4">{item.address}</td>
      <td className="p-4">{item.note}</td>
      <td className="p-4">{item.toTitle}</td>
      <td className="p-4">{new Date(item.date).toLocaleDateString()}</td>
<td className="p-4">
  {Array.isArray(item.attachment) && item.attachment.length > 0 ? (
    <div className="flex flex-wrap gap-2">
      {item.attachment.map((file: string, i: number) => (
        <img
          key={i}
          src={file}
          alt={`Attachment ${i + 1}`}
          className="w-16 h-16 object-cover rounded border"
        />
      ))}
    </div>
  ) : (
    "-"
  )}
</td>

      <td className="p-4">
        <div className="flex gap-2">
          <FormModal table="postalreceive" type="view" data={item} onSuccess={handleSuccess} />
          <FormModal table="postalreceive" type="update" data={item} onSuccess={handleSuccess} />
          <FormModal table="postalreceive" type="delete" id={item._id} onSuccess={handleSuccess} />
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white rounded-md flex-1">
      {/* Header */}
      <div className="flex px-4 pt-4 flex-col md:flex-row md:justify-between mb-4 gap-2 md:gap-0 md:text-left">
        <h1 className="text-lg font-semibold">All Postal Received</h1>

        <div className="flex flex-col sm:flex-row gap-2 items-center">
          <TableSearch value={searchTerm} onChange={setSearchTerm} />
          <FormModal table="postalreceive" type="create" onSuccess={handleSuccess} />
        </div>
      </div>

      {/* Loading or Error */}
      {loading && <p className="px-4">Loading...</p>}
      {error && <p className="text-red-500 px-4">{error}</p>}

      {/* Table */}
      {!loading && !error && (
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse mt-4 text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="p-4">From Title</th>
                <th className="p-4">Reference No</th>
                <th className="p-4">Address</th>
                <th className="p-4">Note</th>
                <th className="p-4">To Title</th>
                <th className="p-4">Date</th>
                <th className="p-4">Attachment</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>{postalReceives.map((item) => renderRow(item))}</tbody>
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

export default PostalReceivePage;
