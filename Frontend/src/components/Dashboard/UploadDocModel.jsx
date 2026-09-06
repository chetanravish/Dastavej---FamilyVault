import { useState } from "react";
import { X, Upload, FileText, Image as ImageIcon } from "lucide-react";
import { uploadDocument } from "../../api/devvault.api";

const categories = [
    "Identity",
    "Education",
    "Finance",
    "Health",
    "Travel",
    "Other",
];

export default function UploadDocumentModal({ isOpen, onClose, onSuccess, members = [] }) {
    const [file, setFile] = useState(null);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("Identity");
    const [memberId, setMemberId] = useState("");

    if (!isOpen) return null;

    const handleFile = (e) => {
        const selected = e.target.files[0];
        if (!selected) return;

        setFile(selected);

        if (!name) {
            setName(selected.name.split(".")[0]);
        }
    };

    const handleClose = () => {
        setFile(null);
        setName("");
        setCategory("Identity");
        setMemberId("");
        onClose();
    };
    const handleUpload = async () => {

        if (!memberId) {
            return alert("Please select a family member");
        }
        const formData = new FormData();

        formData.append("file", file);
        formData.append("name", name);
        formData.append("category", category);
        formData.append("memberId", memberId);


        try {
            const data = await uploadDocument(formData);
            onSuccess(data.document);
            handleClose();
        } catch (err) {
            alert(err.response?.data?.message || "Upload failed");
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={handleClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full sm:max-w-lg h-[92vh] sm:h-auto sm:max-h-[90vh] rounded-t-3xl sm:rounded-3xl bg-[#131826] border border-white/10 overflow-hidden flex flex-col"
            >
                {/* Mobile drag handle */}
                <div
                    className="sm:hidden w-10 h-1 rounded-full bg-white/15 mx-auto mt-3 shrink-0"
                    style={{ marginTop: "calc(0.75rem + env(safe-area-inset-top))" }}
                />

                {/* Header */}
                <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-white/5 shrink-0">
                    <h2 className="text-lg sm:text-xl font-semibold text-white">
                        Upload Document
                    </h2>

                    <button
                        onClick={handleClose}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl hover:bg-white/5 flex items-center justify-center shrink-0"
                    >
                        <X className="w-5 h-5 text-gray-300" />
                    </button>
                </div>

                {/* Body - scrollable */}
                <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 sm:space-y-5">

                    {/* File Picker */}
                    <label className="block">
                        <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 sm:p-8 text-center hover:border-blue-500/40 transition cursor-pointer">
                            {file ? (
                                <div className="space-y-2.5 sm:space-y-3">
                                    {file.type.includes("pdf") ? (
                                        <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400 mx-auto" />
                                    ) : (
                                        <ImageIcon className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-400 mx-auto" />
                                    )}

                                    <p className="text-white text-sm sm:text-base font-medium truncate px-2">{file.name}</p>
                                    <p className="text-xs text-gray-400">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-2.5 sm:space-y-3">
                                    <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto" />
                                    <p className="text-white text-sm sm:text-base font-medium">
                                        Click to choose a file
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        PDF, JPG or PNG
                                    </p>
                                </div>
                            )}
                        </div>

                        <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFile}
                            className="hidden"
                        />
                    </label>

                    {/* Name */}
                    <div>
                        <label className="text-sm text-gray-400 block mb-2">
                            Document Name
                        </label>

                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Aadhar Card"
                            className="w-full rounded-xl bg-[#0B0F19] border border-white/10 px-4 py-3 text-white text-base focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="text-sm text-gray-400 block mb-2">
                            Category
                        </label>

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full rounded-xl bg-[#0B0F19] border border-white/10 px-4 py-3 text-white text-base focus:outline-none"
                        >
                            {categories.map((item) => (
                                <option key={item}>{item}</option>
                            ))}
                        </select>
                    </div>

                    <select
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                        className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3 text-white text-base"
                        required
                    >
                        <option value="">Select Family Member</option>

                        {members.map((member) => (
                            <option key={member._id} value={member._id}>
                                {member.name} ({member.relation})
                            </option>
                        ))}
                    </select>

                </div>

                {/* Footer - always visible, never overlapped */}
                <div
                    className="px-5 sm:px-6 py-4 border-t border-white/5 flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5 sm:gap-3 shrink-0"
                    style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
                >
                    <button
                        onClick={handleClose}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 active:scale-[0.98] transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleUpload}
                        disabled={!file || !name || !memberId}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-black font-medium flex items-center justify-center gap-2 active:scale-[0.98] transition"
                    >
                        <Upload className="w-4 h-4" />
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
}