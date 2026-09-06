import { X, FileText, Image, Download } from "lucide-react";

export default function DocumentModal({ document, onClose }) {
  if (!document) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 sm:px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-3xl h-[92vh] sm:h-auto sm:max-h-[90vh] bg-[#131826] rounded-t-3xl sm:rounded-3xl border border-white/10 overflow-hidden flex flex-col"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        {/* Mobile drag handle */}
        <div className="sm:hidden w-10 h-1 rounded-full bg-white/15 mx-auto mt-3 shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-4 sm:py-5 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
              {document.type === "pdf" ? (
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              ) : (
                <Image className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
              )}
            </div>

            <div className="min-w-0">
              <h2 className="text-white text-sm sm:text-base font-semibold truncate">
                {document.name}
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 truncate">
                {document.category} • {document.size}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl hover:bg-white/5 flex items-center justify-center shrink-0"
          >
            <X className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="h-56 sm:h-96 rounded-2xl bg-[#0B0F19] border border-dashed border-white/10 flex flex-col items-center justify-center px-4">
            {document.type === "pdf" ? (
              <FileText className="w-14 h-14 sm:w-20 sm:h-20 text-blue-400 mb-3 sm:mb-4" />
            ) : (
              <Image className="w-14 h-14 sm:w-20 sm:h-20 text-emerald-400 mb-3 sm:mb-4" />
            )}

            <p className="text-white text-sm sm:text-base font-medium text-center truncate max-w-full">
              {document.name}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 text-center">
              Preview will appear here after S3 integration
            </p>
          </div>
        </div>

        {/* Footer - always visible, never overlapped */}
        <div
          className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5 sm:gap-3 px-4 sm:px-6 py-4 border-t border-white/5 shrink-0"
          style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
        >
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 active:scale-[0.98] transition"
          >
            Close
          </button>

          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-black font-medium active:scale-[0.98] transition">
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}