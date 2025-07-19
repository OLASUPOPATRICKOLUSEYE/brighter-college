// "use client";

// import { ITEM_PER_PAGE } from "@/lib/settings";
// import { useRouter, useSearchParams } from "next/navigation";

// const Pagination = ({ page, count }: { page: number; count: number }) => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const hasPrev = page > 1;
//   const hasNext = page < Math.ceil(count / ITEM_PER_PAGE);

//   const changePage = (newPage: number) => {
//     const params = new URLSearchParams(searchParams);
//     params.set("page", newPage.toString());
//     router.push(`${window.location.pathname}?${params.toString()}`);
//   };

//   return (
//     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-gray-500 p-3">
//       <button
//         disabled={!hasPrev}
//         className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
//         onClick={() => changePage(page - 1)}
//       >
//         Prev
//       </button>

//       {/* On small screens, show fewer buttons or compact */}
//       <div className="flex flex-wrap justify-center gap-2 text-sm">
//         {Array.from({ length: Math.ceil(count / ITEM_PER_PAGE) }, (_, index) => {
//           const pageIndex = index + 1;
//           return (
//             <button
//               key={pageIndex}
//               className={`px-3 py-2 rounded-md ${
//                 page === pageIndex
//                   ? "bg-lamaYellow text-white"
//                   : "bg-gray-300 text-gray-700"
//               } text-xs`}
//               onClick={() => changePage(pageIndex)}
//             >
//               {pageIndex}
//             </button>
//           );
//         })}
//       </div>

//       <button
//         disabled={!hasNext}
//         className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
//         onClick={() => changePage(page + 1)}
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default Pagination;






"use client";

import { ITEM_PER_PAGE } from "@/lib/settings";
import { useRouter } from "next/navigation";

const Pagination = ({ page, count }: { page: number; count: number }) => {
  const router = useRouter();

  const hasPrev = ITEM_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < count;

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  };
  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        disabled={!hasPrev}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => {
          changePage(page - 1);
        }}
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        {Array.from(
          { length: Math.ceil(count / ITEM_PER_PAGE) },
          (_, index) => {
            const pageIndex = index + 1;
            return (
              <button
                key={pageIndex}
                className={`px-2 rounded-sm ${
                  page === pageIndex ? "bg-lamaSky" : ""
                }`}
                onClick={() => {
                  changePage(pageIndex);
                }}
              >
                {pageIndex}
              </button>
            );
          }
        )}
      </div>
      <button
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!hasNext}
        onClick={() => {
          changePage(page + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
