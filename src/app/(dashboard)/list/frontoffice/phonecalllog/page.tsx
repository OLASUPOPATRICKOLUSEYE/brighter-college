import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, phoneCallLogData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import FormModal from "@/components/FormModal";

type PhoneCallLog = {
  id: string;
  name: string;
  phone: string;
  date: string;
  description: string;
  nextFollowUpDate: string;
  duration: string;
  callType: string;
  note?: string;
};

// Updated columns for Phone Call Logs
const columns = [
  { header: "Name", accessor: "name", className: "min-w-[160px]" },
  { header: "Phone", accessor: "phone", className: "min-w-[140px]" },
  { header: "Date", accessor: "date", className: "min-w-[120px]" },
  { header: "Description", accessor: "description", className: "min-w-[200px]" },
  { header: "Next Follow Up", accessor: "nextFollowUpDate", className: "min-w-[140px]" },
  { header: "Duration", accessor: "duration", className: "min-w-[100px]" },
  { header: "Note", accessor: "note", className: "min-w-[200px]" }, // 👈 Add this
  { header: "Call Type", accessor: "callType", className: "min-w-[100px]" },
  { header: "Action", accessor: "action", className: "min-w-[130px]" },
];

const PhoneCallLogListPage = () => {
  const renderRow = (item: PhoneCallLog) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
    <td className="p-4">{item.name}</td>
    <td className="p-4">{item.phone}</td>
    <td className="p-4">{item.date}</td>
    <td className="p-4">{item.description}</td>
    <td className="p-4">{item.nextFollowUpDate}</td>
    <td className="p-4">{item.duration}</td>
    <td className="p-4">{item.note}</td>           {/* 👈 Now matches Note column */}
    <td className="p-4">{item.callType}</td>
    <td className="p-4">
        <div className="flex items-center gap-2">
        <Link href={`/list/phonecalllogs/view/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaGrayLight hover:bg-lamaGray">
            <Image src="/eye.jpg" alt="View" width={16} height={16} />
            </button>
        </Link>
        {role === "admin" && (
            <Link href={`/list/phonecalllogs/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaGrayLight hover:bg-lamaGray">
                <Image src="/update.png" alt="Update" width={16} height={16} />
            </button>
            </Link>
        )}
        {role === "admin" && (
            <FormModal table="phonecalllog" type="delete" id={item.id} />
        )}
        </div>
    </td>
    </tr>
    );

  return (
    <div className="bg-white p-4 rounded-md flex-1 mt-0">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
        <h1 className="text-lg font-semibold">All Phone Call Logs</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            {role === "admin" && (
              <FormModal table="phonecalllog" type="create" />
            )}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <Table columns={columns} renderRow={renderRow} data={phoneCallLogData} />
      </div>

      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default PhoneCallLogListPage;
