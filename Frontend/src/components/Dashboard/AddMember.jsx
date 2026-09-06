import { useState } from "react";
import { X } from "lucide-react";
import { addFamilyMember } from "../../api/devvault.api";

const RELATIONS = [
  "Father",
  "Mother",
  "Brother",
  "Sister",
  "Spouse",
  "Son",
  "Daughter",
  "Other",
];

export default function AddMemberModal({
  isOpen,
  onClose,
  onSuccess,
  memberCount,
}) {
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("Father");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = await addFamilyMember(name, relation);

      onSuccess(data.member);

      setName("");
      setRelation("Father");
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-md bg-[#131826] rounded-t-3xl sm:rounded-2xl border border-white/10 p-5 sm:p-6 max-h-[90vh] overflow-y-auto"
      >
        {/* Mobile drag handle */}
        <div className="sm:hidden w-10 h-1 rounded-full bg-white/15 mx-auto mb-4" />

        <div className="flex items-center justify-between mb-5 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-white">
            Add Family Member
          </h2>

          <button
            onClick={onClose}
            className="w-9 h-9 -mr-1.5 flex items-center justify-center rounded-full hover:bg-white/5"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-gray-400 mb-4">
          {memberCount}/10 members added
        </p>

        {error && (
          <p className="text-red-400 text-sm mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Member name"
            className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-blue-500/50"
          />

          <select
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
            className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-blue-500/50"
          >
            {RELATIONS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>

          <button
            disabled={loading || memberCount >= 10}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl py-3.5 sm:py-3 font-medium active:scale-[0.98] transition"
          >
            {loading ? "Adding..." : "Add Member"}
          </button>
        </form>
      </div>
    </div>
  );
}