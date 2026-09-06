import { useState } from "react";
import { Users, Plus, X } from "lucide-react";

const colors = [
  "bg-pink-500",
  "bg-green-500",
  "bg-violet-500",
  "bg-yellow-500",
  "bg-cyan-500",
  "bg-red-500",
];

export default function FamilyFilter({
  members,
  documents,
  selectedMember,
  onSelect,
  onAddClick,
}) {
  const [showMore, setShowMore] = useState(false);

  const countDocs = (id) =>
    documents.filter((doc) => doc.member?._id === id).length;

  const visibleMembers = members.slice(0, 8);
  const hiddenMembers = members.slice(8);

  return (
    <div className="flex items-start gap-3 sm:gap-5 md:gap-6 overflow-x-auto py-2 scrollbar-hide">

      {/* ALL */}
      <button
        onClick={() => {
          onSelect(null);
          setShowMore(false);
        }}
        className="flex flex-col items-center min-w-14 sm:min-w-16 md:min-w-18 shrink-0"
      >
        <div
          className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border-2 transition ${
            selectedMember === null
              ? "border-blue-500 shadow-[0_0_20px_rgba(59,130,246,.45)]"
              : "border-white/10"
          } bg-blue-600`}
        >
          <Users className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
        </div>

        <p className="mt-1.5 sm:mt-2 text-white text-xs sm:text-sm font-medium">All</p>

        <span className="mt-0.5 sm:mt-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-white/10 text-[10px] sm:text-xs text-gray-300">
          {documents.length}
        </span>
      </button>

      {/* VISIBLE MEMBERS */}
      {visibleMembers.map((member, index) => (
        <button
          key={member._id}
          onClick={() => {
            onSelect(
              selectedMember?._id === member._id ? null : member
            );
            setShowMore(false);
          }}
          className="flex flex-col items-center min-w-14 sm:min-w-16 md:min-w-18 shrink-0"
        >
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white text-base sm:text-xl md:text-2xl font-bold border-2 transition ${
              selectedMember?._id === member._id
                ? "border-blue-500 shadow-[0_0_20px_rgba(59,130,246,.45)]"
                : "border-white/10"
            } ${colors[index % colors.length]}`}
          >
            {member.name.charAt(0).toUpperCase()}
          </div>

          <p className="mt-1.5 sm:mt-2 text-white text-xs sm:text-sm font-medium truncate w-full text-center">
            {member.name}
          </p>

          <p className="text-gray-400 text-[10px] sm:text-xs">
            {member.relation}
          </p>

          <span className="mt-0.5 sm:mt-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-white/10 text-[10px] sm:text-xs text-gray-300">
            {countDocs(member._id)}
          </span>
        </button>
      ))}

      {/* MORE MEMBERS */}
      {hiddenMembers.length > 0 ? (
        <div className="relative shrink-0">
          <button
            onClick={() => setShowMore(!showMore)}
            className="flex flex-col items-center min-w-14 sm:min-w-16 md:min-w-18"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center hover:border-blue-500 transition">
              <span className="text-lg sm:text-xl md:text-2xl text-white">•••</span>
            </div>

            <p className="mt-1.5 sm:mt-2 text-white text-xs sm:text-sm font-medium">
              +{hiddenMembers.length}
            </p>
          </button>

          {showMore && (
            <>
              {/* Mobile: bottom sheet (avoids clipping from the scrollable row's overflow) */}
              <div
                className="sm:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end"
                onClick={() => setShowMore(false)}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="w-full bg-[#131826] border-t border-white/10 rounded-t-3xl p-4 max-h-[70vh] overflow-y-auto"
                  style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
                >
                  <div className="w-10 h-1 rounded-full bg-white/15 mx-auto mb-4" />

                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-semibold">More Members</h3>
                    <button
                      onClick={() => setShowMore(false)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {hiddenMembers.map((member, index) => (
                      <button
                        key={member._id}
                        onClick={() => {
                          onSelect(member);
                          setShowMore(false);
                        }}
                        className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/5"
                      >
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 ${
                            colors[(index + 4) % colors.length]
                          }`}
                        >
                          {member.name.charAt(0)}
                        </div>

                        <div className="text-left min-w-0">
                          <p className="text-white text-xs truncate">
                            {member.name}
                          </p>
                          <p className="text-gray-400 text-[10px]">
                            {member.relation}
                          </p>
                        </div>
                      </button>
                    ))}

                    {members.length < 10 && (
                      <button
                        onClick={() => {
                          setShowMore(false);
                          onAddClick();
                        }}
                        className="col-span-2 mt-1 p-2.5 rounded-xl border border-dashed border-white/10 hover:border-blue-500 text-blue-400 text-sm font-medium"
                      >
                        + Add Member
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Desktop/tablet: dropdown */}
              <div className="hidden sm:grid absolute top-20 md:top-24 right-0 w-64 sm:w-72 bg-[#131826] border border-white/10 rounded-2xl p-2.5 sm:p-3 grid-cols-2 gap-2.5 sm:gap-3 shadow-2xl z-50">

                {hiddenMembers.map((member, index) => (
                  <button
                    key={member._id}
                    onClick={() => {
                      onSelect(member);
                      setShowMore(false);
                    }}
                    className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/5"
                  >
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white text-sm sm:text-base font-bold shrink-0 ${
                        colors[(index + 4) % colors.length]
                      }`}
                    >
                      {member.name.charAt(0)}
                    </div>

                    <div className="text-left min-w-0">
                      <p className="text-white text-xs sm:text-sm truncate">
                        {member.name}
                      </p>
                      <p className="text-gray-400 text-[10px] sm:text-xs">
                        {member.relation}
                      </p>
                    </div>
                  </button>
                ))}

                {members.length < 10 && (
                  <button
                    onClick={() => {
                      setShowMore(false);
                      onAddClick();
                    }}
                    className="col-span-2 mt-1 p-2 rounded-xl border border-dashed border-white/10 hover:border-blue-500 text-blue-400 text-xs sm:text-sm font-medium"
                  >
                    + Add Member
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      ) : (
        <button
          onClick={onAddClick}
          disabled={members.length >= 10}
          className="flex flex-col items-center min-w-14 sm:min-w-16 md:min-w-18 shrink-0 disabled:opacity-50"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center hover:border-blue-500 transition">
            <Plus className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-gray-400" />
          </div>

          <p className="mt-1.5 sm:mt-2 text-white text-xs sm:text-sm font-medium text-center">
            Add Member
          </p>
        </button>
      )}
    </div>
  );
}