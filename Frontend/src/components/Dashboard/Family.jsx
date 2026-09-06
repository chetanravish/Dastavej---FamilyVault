import { Users, Trash2 } from "lucide-react";
import { deleteFamilyMember } from "../../api/devvault.api";
import DeleteConfirmModel from "./DeleteConfirmModel";
import { useState } from "react";


export default function Family({ members, selectedMember, onSelect, onAddClick, onDelete }) {
    const [deleteMember, setDeleteMember] = useState(null);

    return (
        <div className="space-y-5 sm:space-y-6">
            <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                    <h1 className="text-xl sm:text-2xl font-bold text-white">Family Members</h1>
                    <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                        {members.length} of 10 members
                    </p>
                </div>

                <button
                    onClick={onAddClick}
                    disabled={members.length >= 10}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed px-3.5 sm:px-4 py-2 rounded-xl text-white text-sm sm:text-base font-medium shrink-0 active:scale-[0.98] transition"
                >
                    + Add Member
                </button>
            </div>

            {members.length === 0 ? (
                <div className="bg-[#131826] border border-dashed border-white/10 rounded-2xl py-12 sm:py-16 px-4 text-center">
                    <Users className="w-8 h-8 sm:w-10 sm:h-10 mx-auto text-gray-500 mb-3" />
                    <h2 className="text-white text-sm sm:text-base font-semibold">No family members yet</h2>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1">
                        Add your first family member to get started.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-5">
                    {members.map((member) => (
                        <div
                            key={member._id}
                            onClick={() =>
                                onSelect(
                                    selectedMember?._id === member._id ? null : member
                                )
                            }
                            className={`relative cursor-pointer rounded-xl sm:rounded-2xl p-4 sm:p-5 border transition ${selectedMember?._id === member._id
                                ? "border-blue-500 bg-blue-500/10"
                                : "border-white/10 bg-[#131826] hover:border-blue-500/30"
                                }`}
                        >
                            {!member.isOwner && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDeleteMember(member);
                                    }}
                                    className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}

                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-500/20 flex items-center justify-center text-lg sm:text-xl font-bold text-blue-400">
                                {member.name.charAt(0).toUpperCase()}
                            </div>

                            {/* Info */}
                            <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-white truncate pr-8">
                                {member.name}
                            </h3>

                            <p className="text-sm sm:text-base text-gray-400 truncate">{member.relation}</p>
                        </div>
                    ))}
                </div>
            )}
            <DeleteConfirmModel
                isOpen={!!deleteMember}
                name={deleteMember?.name}
                onCancel={() => setDeleteMember(null)}
                onConfirm={async () => {
                    await deleteFamilyMember(deleteMember._id);
                    onDelete(deleteMember._id);
                    setDeleteMember(null);
                }}
            />
        </div>


    );


}