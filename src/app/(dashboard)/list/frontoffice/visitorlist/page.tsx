import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, visitorsData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import FormModal from "@/components/FormModal";

type Visitor = {
  id: string;
  purpose: string;
  meetingWith: string;
  staffName: string;
  visitorName: string;
  phone: string;
  idCard: string;
  numberOfPersons: number;
  date: string;
  inTime: string;
  outTime: string;
  attachments?: string[];
  note?: string;
};

const columns = [
  { header: "Visitor Info", accessor: "visitorInfo", className: "min-w-[180px]" },
  { header: "Purpose", accessor: "purpose", className: "min-w-[120px]" },
  { header: "Meeting With", accessor: "meetingWith", className: "min-w-[140px]" },
  { header: "Phone", accessor: "phone", className: "min-w-[120px]" },
  { header: "Date", accessor: "date", className: "min-w-[120px]" },
  { header: "In/Out Time", accessor: "inOutTime", className: "min-w-[140px]" },
  { header: "Attachments", accessor: "attachments", className: "min-w-[150px]" },
  { header: "Action", accessor: "action", className: "min-w-[130px]" },
];

const VisitorListPage = () => {
  const renderRow = (item: Visitor) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="p-4 min-w-[180px]">
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold">{item.visitorName}</h3>
          <p className="text-xs text-gray-500">ID Card: {item.idCard}</p>
          <p className="text-xs text-gray-500">Persons: {item.numberOfPersons}</p>
          {item.note && <p className="text-xs italic text-gray-400">Note: {item.note}</p>}
        </div>
      </td>

      <td className="p-4 min-w-[120px]">{item.purpose}</td>
      <td className="p-4 min-w-[140px]">{item.meetingWith} - {item.staffName}</td>
      <td className="p-4 min-w-[120px]">{item.phone}</td>
      <td className="p-4 min-w-[120px]">{item.date}</td>
      <td className="p-4 min-w-[140px]">{item.inTime} / {item.outTime}</td>

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

      <td className="p-4 min-w-[130px]">
        <div className="flex items-center gap-2">
          <Link href={`/list/visitors/view/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaGrayLight hover:bg-lamaGray">
              <Image src="/eye.jpg" alt="View" width={16} height={16} />
            </button>
          </Link>

          {role === "admin" && (
            <>
              <Link href={`/list/visitors/${item.id}`}>
                <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaGrayLight hover:bg-lamaGray">
                  <Image src="/update.png" alt="Update" width={16} height={16} />
                </button>
              </Link>

              <FormModal table="visitor" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 mt-0">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
        <h1 className="text-lg font-semibold">All Visitors</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="visitor" type="create" />}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table columns={columns} renderRow={renderRow} data={visitorsData} />
      </div>

      <Pagination />
    </div>
  );
};

export default VisitorListPage;
