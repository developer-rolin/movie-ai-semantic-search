import type { PaginationProps } from "./Pagination.types";

export function Pagination({
  currentPage,
  onPageChange,
  totalPages,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-10">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition cursor-pointer"
      >
        Previous
      </button>

      <span className="text-sm text-slate-400 font-medium flex items-center gap-1">
        Page <strong className="text-white">{currentPage}</strong> of{" "}
        <strong className="text-white">{totalPages}</strong>
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition cursor-pointer"
      >
        Next
      </button>
    </div>
  );
}
