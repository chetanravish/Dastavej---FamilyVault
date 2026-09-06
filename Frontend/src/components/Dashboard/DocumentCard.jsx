import { FileText, Image, Download, Eye } from "lucide-react";

export default function DocumentCard({ document, onView }) {
  return (
    <div className="bg-[#131826] border border-white/5 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 hover:border-blue-500/20 transition-all">
      <div className="flex items-start justify-between gap-2">
        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
          {document.type === "pdf" ? (
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
          ) : (
            <Image className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
          )}
        </div>

        <span className="text-[10px] sm:text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400 truncate max-w-[40%]">
          {document.category}
        </span>
      </div>

      <h3 className="mt-3 sm:mt-4 text-sm sm:text-base text-white font-medium truncate">
        {document.name}
      </h3>

      {document.member ? (
        <div className="inline-flex items-center gap-1.5 mt-2.5 sm:mt-3 px-2.5 sm:px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-[11px] sm:text-xs font-medium max-w-full truncate">
          <span>👤</span>
          <span className="truncate">
            {document.member.name} ({document.member.relation})
          </span>
        </div>
      ) : (
        <div className="inline-flex items-center gap-1.5 mt-2.5 sm:mt-3 px-2.5 sm:px-3 py-1 rounded-full bg-gray-500/10 text-gray-400 text-[11px] sm:text-xs font-medium">
          <span>👤</span>
          <span>Unassigned</span>
        </div>
      )}

      <div className="mt-2 text-xs sm:text-sm text-gray-400 space-y-0.5 sm:space-y-1">
        <p>{document.size}</p>
        <p>{document.uploadedAt}</p>
      </div>

      <div className="mt-4 sm:mt-5 flex gap-2">
        <button
          onClick={onView}
          className="flex-1 flex items-center justify-center gap-1 py-2 sm:py-2 text-sm sm:text-base rounded-lg bg-blue-500 text-black font-medium hover:bg-blue-400 active:scale-[0.98] transition"
        >
          <Eye className="w-4 h-4" />
          View
        </button>

        <button className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center active:scale-[0.98] transition">
          <Download className="w-4 h-4 text-gray-300" />
        </button>
      </div>
    </div>
  );
}