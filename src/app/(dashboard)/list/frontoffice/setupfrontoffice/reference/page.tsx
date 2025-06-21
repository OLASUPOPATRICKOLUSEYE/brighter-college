"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TableSearch from "@/components/TableSearch";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import { ITEM_PER_PAGE } from "@/lib/settings";

const Reference = () => {
  const [references, setReferences] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [total, setTotal] = useState<number>(0);

  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;

  const fetchReferences = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append("search", searchTerm);
      queryParams.append("page", page.toString());

      const res = await fetch(`/api/reference?${queryParams.toString()}`);
      if (!res.ok) throw new Error("References Not Found");
      const data = await res.json();

      setReferences(data.data || []);
      setTotal(data.total || 0);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch data");
      setReferences([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, page]);

  useEffect(() => {
    fetchReferences();
  }, [fetchReferences]);

  const handleSuccess = () => {
    fetchReferences();
    router.refresh();
  };

  const renderRow = (item: any) => (
    <tr key={item._id} className="border-b border-gray-200 text-sm hover:bg-slate-100">
      <td className="p-4">{item.reference}</td>
      <td className="hidden md:table-cell p-4">{item.description}</td>
      <td className="p-4">
        <div className="flex gap-2">
          <FormModal table="reference" type="view" data={item} onSuccess={handleSuccess} />
          <FormModal table="reference" type="update" data={item} onSuccess={handleSuccess} />
          <FormModal table="reference" type="delete" id={item._id} onSuccess={handleSuccess} />
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1">
      <div className="flex flex-col md:flex-row md:justify-between mb-4 gap-2 md:gap-0 md:text-left">
        <h1 className="text-lg font-semibold">All References</h1>

        <div className="flex flex-col sm:flex-row gap-2 items-center">
          <TableSearch value={searchTerm} onChange={setSearchTerm} />
          <FormModal table="reference" type="create" onSuccess={handleSuccess} />
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse mt-4 table-fixed">
            <thead>
              <tr className="text-left text-gray-500 text-sm">
                <th className="p-4">Reference</th>
                <th className="hidden md:table-cell p-4">Description</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>{references.map((item) => renderRow(item))}</tbody>
          </table>
        </div>
      )}

      {!loading && total > ITEM_PER_PAGE && (
        <Pagination page={page} count={total} />
      )}
    </div>
  );
};

export default Reference;
