export default function Pagination({ page, totalPages, totalData, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-between items-center py-4 px-4 bg-gray-50 rounded">
      <div className="text-gray-700">
        Total: {totalData} items
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 border rounded 
              ${p === page ? "bg-blue-600 text-white border-blue-600" : "bg-white hover:bg-gray-100"}`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
