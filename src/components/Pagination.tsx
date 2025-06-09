
const Pagination = () => {
  return (
    <div className="p-4 px-1 flex items-center justify-between text-gray-500 ">
      <button disabled className="px-4 py-2 bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
        Previous
      </button>
      <div className="flex items-center gap-1 text-sm">
          <button className="px-2 rounded-sm bg-lamaSky">1</button>
          <button className="px-2 rounded-sm">2</button>
          <button className="px-2 rounded-sm">...</button>
          <button className="px-2 rounded-sm">10</button>
      </div>
      <button disabled className="px-4 py-2 bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
        Next
      </button>
    </div>
  );
};

export default Pagination;