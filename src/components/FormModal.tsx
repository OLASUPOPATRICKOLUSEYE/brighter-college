"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";

const VisitorForm = dynamic(() => import("./forms/VisitorForm"), { loading: () => <h1>Loading.......</h1>, });
const PhoneCallLogForm = dynamic(() => import("./forms/PhoneCallLogForm"), { loading: () => <h1>Loading.......</h1>, });
const PostalDispatchForm = dynamic(() => import("./forms/PostalDispatchForm"), { loading: () => <h1>Loading.......</h1>, });
const PostalReceiveForm = dynamic(() => import("./forms/PostalReceiveForm"), { loading: () => <h1>Loading.......</h1>, });
const PurposeForm = dynamic(() => import("./forms/PurposeForm"), { loading: () => <h1>Loading.......</h1>, });



const forms: { [key: string]: (props: { type: "create" | "update"; data?: any }) => JSX.Element; } = {
  visitor: ({ type, data }) => <VisitorForm type={type} data={data} />,
  phonecalllog: ({ type, data }) => <PhoneCallLogForm type={type} data={data} />,
  postaldispatch: ({ type, data }) => <PostalDispatchForm type={type} data={data} />,
  postalreceive: ({ type, data }) => <PostalReceiveForm type={type} data={data} />,
  purpose: ({ type, data }) => <PurposeForm type={type} data={data} />,
  
};

interface FormModalProps {
  table:
    | "visitor"
    | "phonecalllog"
    | "postaldispatch"
    | "postalreceive"
    | "purpose"

  type: "create" | "update" | "delete";
  data?: any;
  id?: Number;
}

const FormModal = ({ table, type, data, id }: FormModalProps) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";

  const bgColor =
    type === "create"
      ? "bg-lamaYellow text-white"
      : type === "update"
      ? "bg-lamaSky text-white"
      : "bg-lamaGrayLight hover:bg-lamaGray text-white";

  const [open, setOpen] = useState(false);

  const Form = () => {
    if (type === "delete" && id) {
      return (
        <form action="" className="p-4 flex flex-col gap-4">
          <span className="text-center font-medium">
            All data in {table} will be permanently deleted and cannot be reversed. Are you sure?
          </span>
          <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
            Delete
          </button>
        </form>
      );
    }

    if ((type === "create" || type === "update") && typeof forms[table] === "function") {
      return forms[table]({ type, data });
    }

    return <div className="text-center text-red-500">Form Not Found for "{table}"</div>;
  };

  const renderIcon = () => {
    if (type === "create") return <FiPlus size={20} />;
    if (type === "update") return <FiEdit2 size={20} />;
    if (type === "delete") return <FiTrash2 size={20} />;
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
