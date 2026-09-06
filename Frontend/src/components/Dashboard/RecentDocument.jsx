import { MoreVertical } from "lucide-react";

export default function RecentDocuments({ documents, search, onView }) {
  const filtered = documents.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  const formatSize = (bytes) => {
    if (bytes > 1024 * 1024)
      return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
    return `${Math.round(bytes / 1024)} KB`;
  };

  return (
    <div className="bg-[#131826] border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden">
      <div className="px-4 sm:px-6 py-3.5 sm:py-5 border-b border-white/5">
        <h2 className="text-base sm:text-xl font-semibold text-white">
          Recent Documents
        </h2>
      </div>

      {filtered.map((doc) => (
        <div
          key={doc._id}
          className="flex items-center justify-between gap-2 px-4 sm:px-6 py-3 sm:py-4 hover:bg-white/5 border-b border-white/5 last:border-0"
        >
          <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
            <div className="w-9 h-10 sm:w-12 sm:h-14 rounded-md sm:rounded-lg bg-white flex items-center justify-center shrink-0">
              {doc.mimeType === "application/pdf" ? (
                <span className="text-red-600 text-[9px] sm:text-xs font-bold">PDF</span>
              ) : (
                <span className="text-green-600 text-[9px] sm:text-xs font-bold">PNG</span>
              )}
            </div>

            <div className="min-w-0">
              <h3 className="text-white text-sm sm:text-base font-semibold truncate">
                {doc.name}
              </h3>

              <p className="text-xs sm:text-sm text-gray-400 truncate">
                {doc.member?.relation || "Unassigned"} • {formatSize(doc.size)}{" "}
                <span className="hidden sm:inline">
                  • {doc.mimeType.includes("pdf") ? "PDF" : "PNG"}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-5 shrink-0">
            <p className="hidden sm:block text-sm text-gray-400 whitespace-nowrap">
              {new Date(doc.createdAt).toLocaleDateString()}
            </p>

            <button onClick={() => onView(doc)}>
              <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-white" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}