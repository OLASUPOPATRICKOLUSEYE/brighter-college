"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiEye } from "react-icons/fi";
import toast from "react-hot-toast";

const VisitorForm = dynamic(() => import("./forms/VisitorForm"), { loading: () => <h1>Loading.......</h1> });
const PhoneCallLogForm = dynamic(() => import("./forms/PhoneCallLogForm"), { loading: () => <h1>Loading.......</h1> });
const PostalDispatchForm = dynamic(() => import("./forms/PostalDispatchForm"), { loading: () => <h1>Loading.......</h1> });
const PostalReceiveForm = dynamic(() => import("./forms/PostalReceiveForm"), { loading: () => <h1>Loading.......</h1> });
const PurposeForm = dynamic(() => import("./forms/PurposeForm"), { loading: () => <h1>Loading.......</h1> });
const ComplaintTypeForm = dynamic(() => import("./forms/ComplaintTypeForm"), { loading: () => <h1>Loading.......</h1> });
const SourceForm = dynamic(() => import("./forms/SourceForm"), { loading: () => <h1>Loading.......</h1> });
const ReferenceForm = dynamic(() => import("./forms/ReferenceForm"), { loading: () => <h1>Loading.......</h1> });



const forms: {
  [key: string]: (props: { type: "create" | "update"; data?: any; onClose?: () => void; onSuccess?: () => void }) => JSX.Element;
} = {
  visitor: ({ type, data, onClose, onSuccess }) => <VisitorForm type={type} data={data} onClose={onClose} onSuccess={onSuccess} />,
  phonecalllog: ({ type, data, onClose, onSuccess }) => <PhoneCallLogForm type={type} data={data} onClose={onClose} onSuccess={onSuccess} />,
  postaldispatch: ({ type, data, onClose, onSuccess }) => <PostalDispatchForm type={type} data={data} onClose={onClose} onSuccess={onSuccess} />,
  postalreceive: ({ type, data, onClose, onSuccess }) => <PostalReceiveForm type={type} data={data} onClose={onClose} onSuccess={onSuccess} />,
  purpose: ({ type, data, onClose, onSuccess }) => <PurposeForm type={type} data={data} onClose={onClose} onSuccess={onSuccess} />,
  complainttype: ({ type, data, onClose, onSuccess }) => <ComplaintTypeForm type={type} data={data} onClose={onClose} onSuccess={onSuccess} />,
  source: ({ type, data, onClose, onSuccess }) => <SourceForm type={type} data={data} onClose={onClose} onSuccess={onSuccess} />,
  reference: ({ type, data, onClose, onSuccess }) => <ReferenceForm type={type} data={data} onClose={onClose} onSuccess={onSuccess} />,


};


const ViewModalContent = ({ data }: { data: any }) => {
  if (!data) return <div>No data available to view.</div>;

  return (
    <div className="space-y-2">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="flex gap-2">
          <span className="font-semibold capitalize">{key}:</span>
          <span>{typeof value === "string" || typeof value === "number" ? value : JSON.stringify(value)}</span>
        </div>
      ))}
    </div>
  );
};

interface FormModalProps {
  table: "visitor" | "phonecalllog" | "postaldispatch" | "postalreceive" | "purpose" | "complainttype" | "source" | "reference";
  type: "create" | "update" | "delete" | "view";
  data?: any;
  id?: string;
  onSuccess?: () => void;
}

const FormModal = ({ table, type, data, id, onSuccess }: FormModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!id) return;
    setLoading(true);
    const toastId = toast.loading("Deleting...");
    try {
      const res = await fetch(`/api/${table}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Deleted successfully", { id: toastId });
      if (onSuccess) onSuccess();
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to delete", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const Form = () => {
    if (type === "delete" && id) {
      return (
        <div className="p-4 flex flex-col gap-4">
          <span className="text-center font-medium">
            All data in <b>{table}</b> will be permanently deleted and cannot be reversed. Are you sure?
          </span>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center"
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      );
    }

    if (type === "view") {
      return (
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4 capitalize">View {table} Details</h2>
          <ViewModalContent data={data} />
        </div>
      );
    }

    if ((type === "create" || type === "update") && typeof forms[table] === "function") {
      return forms[table]({ type, data, onClose: () => setOpen(false), onSuccess });
    }

    return <div className="text-center text-red-500">Form Not Found for "{table}"</div>;
  };

  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow text-white"
      : type === "update"
      ? "bg-lamaGrayLight hover:bg-lamaGray text-white"
      : type === "delete"
      ? "bg-red-500 hover:bg-red-700 text-white"
      : "bg-lamaGrayLight hover:bg-lamaGray text-white";

  const renderIcon = () => {
    if (type === "create") return <FiPlus size={20} />;
    if (type === "update") return <FiEdit2 size={20} />;
    if (type === "delete") return <FiTrash2 size={20} />;
    if (type === "view") return <FiEye size={20} />;
    return null;
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        {renderIcon()}
      </button>

      {open && (
        <div className="w-screen h-screen fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md relative w-[95%] md:w-[90%] lg:w-[80%] xl:w-[70%] 2xl:w-[60%] max-h-[95vh] overflow-y-auto">
            <Form />
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              title="Close"
            >
              <FiX size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
