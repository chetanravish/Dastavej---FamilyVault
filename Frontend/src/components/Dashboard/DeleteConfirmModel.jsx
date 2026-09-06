import { Trash2, X } from "lucide-react";

export default function DeleteConfirmModel({
  isOpen,
  name,
  onCancel,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-md bg-[#131826] border border-white/10 rounded-t-3xl sm:rounded-2xl p-5 sm:p-6"
      >
        {/* Mobile drag handle */}
        <div className="sm:hidden w-10 h-1 rounded-full bg-white/15 mx-auto mb-4" />

        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-500/10 flex items-center justify-center mb-3.5 sm:mb-4">
          <Trash2 className="w-6 h-6 sm:w-7 sm:h-7 text-red-400" />
        </div>

        <h2 className="text-lg sm:text-xl font-semibold text-white">
          Delete Family Member
        </h2>

        <p className="text-sm sm:text-base text-gray-400 mt-2">
          Are you sure you want to delete{" "}
          <span className="text-white font-medium">{name}</span>?
        </p>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5 sm:gap-3 mt-6">
          <button
            onClick={onCancel}
            className="w-full sm:w-auto px-4 py-3 sm:py-2 rounded-xl bg-white/5 border border-white/10 text-white active:scale-[0.98] transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="w-full sm:w-auto px-4 py-3 sm:py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white active:scale-[0.98] transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}