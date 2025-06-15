import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, postalReceiveData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import FormModal from "@/components/FormModal";

type PostalReceive = {
  id: string;
  fromTitle: string;
  referenceNo: string;
  address: string;
  note: string;
  toTitle: string;
  date: string;
  attachments?: string[];
};

const columns = [
  { header: "From Title", accessor: "fromTitle", className: "min-w-[160px]" },
  { header: "Reference No", accessor: "referenceNo", className: "min-w-[140px]" },
  { header: "Address", accessor: "address", className: "min-w-[200px]" },
  { header: "Note", accessor: "note", className: "min-w-[200px]" },
  { header: "To Title", accessor: "toTitle", className: "min-w-[160px]" },
  { header: "Date", accessor: "date", className: "min-w-[120px]" },
  { header: "Attachment Document", accessor: "attachment", className: "min-w-[180px]" },
  { header: "Action", accessor: "action", className: "min-w-[130px]" },
];

const PostalReceiveListPage = () => {
  const renderRow = (item: PostalReceive) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
    <td className="p-4">{item.fromTitle}</td>
    <td className="p-4">{item.referenceNo}</td>
    <td className="p-4">{item.address}</td>
    <td className="p-4">{item.note}</td>
    <td className="p-4">{item.toTitle}</td>
      <td className="p-4">{item.date}</td>
      {/* Attachments as image thumbnails */}
      <td className="p-4 min-w-[150px]">
        {item.attachments && item.attachments.length > 0 ? (
          <div className="flex gap-1 flex-wrap">
            {item.attachments.map((file, index) => (
              <a
                key={index}
                href={file}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-12 h-12 border rounded overflow-hidden"
              >
              <Image
                src={
                  file.startsWith("http") ? file : file.startsWith("/") ? file : `/${file}`
                }
                alt={`Attachment ${index + 1}`}
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
              </a>
            ))}
          </div>
        ) : (
          <span className="text-xs text-gray-400">No Image File Upload</span>
        )}
      </td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <Link href={`/list/postalreceive/view/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaGrayLight hover:bg-lamaGray">
              <Image src="/eye.jpg" alt="View" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <Link href={`/list/postalreceive/${item.id}`}>
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaGrayLight hover:bg-lamaGray">
                <Image src="/update.png" alt="Update" width={16} height={16} />
              </button>
            </Link>
          )}
          {role === "admin" && (
            <FormModal table="postalreceive" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 mt-0">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
        <h1 className="text-lg font-semibold">All Postal Received</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="postalreceive" type="create" />}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <Table columns={columns} renderRow={renderRow} data={postalReceiveData} />
      </div>

      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default PostalReceiveListPage;
