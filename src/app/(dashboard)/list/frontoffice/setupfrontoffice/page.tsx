"use client";

import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import Link from "next/link";
import Image from "next/image";
import FormModal from "@/components/FormModal";

const columns = [
  { header: "Purpose", accessor: "purpose", className: "min-w-[300px]" },
  { header: "Description", accessor: "description", className: "min-w-[300px]" },
  { header: "Action", accessor: "action", className: "min-w-[300px]" },
];

const PurposeListPage = () => {
  const [purposes, setPurposes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPurposes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/purpose`);
      if (!res.ok) throw new Error("Failed to fetch purposes");
      const data = await res.json();
      setPurposes(data.data || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      setPurposes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete?")) return;
    try {
      await fetch(`/api/purpose/${id}`, { method: "DELETE" });
      fetchPurposes();
    } catch (err) {
      console.error(err);
      alert("Failed to delete purpose.");
    }
  };

  useEffect(() => {
    fetchPurposes();
  }, []);

  const renderRow = (item: any) => (
    <tr key={item._id} className="border-b border-gray-200 text-sm hover:bg-slate-100">
      <td className="p-4">{item.purpose}</td>
      <td className="p-4">{item.description}</td>
      <td className="p-4">
        <div className="flex gap-2">
          <Link href={`/list/purpose/view/${item._id}`}>
            <button className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
              <Image src="/eye.jpg" alt="View" width={16} height={16} />
            </button>
          </Link>
          <Link href={`/list/purpose/${item._id}`}>
            <button className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
              <Image src="/update.png" alt="Update" width={16} height={16} />
            </button>
          </Link>
          <button
            onClick={() => handleDelete(item._id)}
            className="w-7 h-7 rounded-full bg-red-400 hover:bg-red-500 text-white flex items-center justify-center"
          >
            X
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1">
      <div className="flex justify-between mb-4">
        <h1 className="text-lg font-semibold">All Purposes</h1>
        <FormModal table="purpose" type="create" />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <Table columns={columns} data={purposes} renderRow={renderRow} />
        </div>
      )}

      <Pagination />
    </div>
  );
};

export default PurposeListPage;
