"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Link from "next/link";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { ITEM_PER_PAGE } from "@/lib/settings";

const columns = [
  { header: "Purpose", accessor: "purpose", className: "min-w-[300px]" },
  { header: "Description", accessor: "description", className: "min-w-[300px]" },
  { header: "Action", accessor: "action", className: "min-w-[300px]" },
];

const Purpose = () => {
  const [purposes, setPurposes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [total, setTotal] = useState<number>(0);

  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page")) || 1;

  const fetchPurposes = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append("search", searchTerm);
      queryParams.append("page", page.toString());

      const res = await fetch(`/api/purpose?${queryParams.toString()}`);
      if (!res.ok) throw new Error("Purposes Not Found");
      const data = await res.json();

      setPurposes(data.data || []);
      setTotal(data.total || 0);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      setPurposes([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurposes();
  }, [searchTerm, page]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete?")) return;
    try {
      await fetch(`/api/purpose/${id}`, { method: "DELETE" });
      fetchPurposes(); // Refresh after delete
    } catch (err) {
      console.error(err);
      alert("Failed to delete purpose.");
    }
  };

  const renderRow = (item: any) => (
    <tr
      key={item._id}
      className="border-b border-gray-200 text-sm hover:bg-slate-100"
    >
      <td className="p-4">{item.purpose}</td>
      <td className="p-4">{item.description}</td>
      <td className="p-4">
        <div className="flex gap-2">
          <Link href={"/"}>
            <button className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
              <FiEye size={16} />
            </button>
          </Link>
          <Link href={"/"}>
            <button className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
              <FiEdit size={16} />
            </button>
          </Link>
          <button
            onClick={() => handleDelete(item._id)}
            className="w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1">
      <div className="flex justify-between mb-4 items-center">
        <h1 className="text-lg font-semibold">All Purposes</h1>
        <div className="flex flex-row gap-2 items-center">
          <TableSearch value={searchTerm} onChange={setSearchTerm} />
          <FormModal table="purpose" type="create" />
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <Table columns={columns} data={purposes} renderRow={renderRow} />
        </div>
      )}

      {!loading && total > ITEM_PER_PAGE && (
        <Pagination page={page} count={total} />
      )}
    </div>
  );
};

export default Purpose;
