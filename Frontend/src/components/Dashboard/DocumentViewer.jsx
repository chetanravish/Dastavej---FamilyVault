import { useEffect, useState } from "react";
import {
    X,
    Trash2,
    FileText,
    Calendar,
    HardDrive,
    Pencil,
    Save,
    Download
} from "lucide-react";
import {
    viewDocument,
    deleteDocument,
    updateDocument,
    downloadDocument
} from "../../api/devvault.api";
import DeleteConfirmModel from "./DeleteConfirmModel";

const categories = [
    "Identity",
    "Education",
    "Finance",
    "Health",
    "Travel",
    "Other",
];

export default function DocumentViewer({
    document,
    onClose,
    onDelete,
    onUpdate,
}) {
    const [fileUrl, setFileUrl] = useState("");
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {
        const loadDocument = async () => {
            if (!document) return;

            try {
                const url = await viewDocument(document._id);
                setFileUrl(url);
            } catch (err) {
                console.error(err);
            }
        };

        loadDocument();

        return () => setFileUrl("");
    }, [document]);

    useEffect(() => {
        if (!document) return;

        setName(document.name);
        setCategory(document.category);
        setEditing(false);
    }, [document]);

    if (!document) return null;

    const handleDelete = async () => {
        await deleteDocument(document._id);
        onDelete(document._id);
        setShowDelete(false);
    };

    const handleDownload = async () => {
        const url = await downloadDocument(document._id);

        const link = window.document.createElement("a");
        link.href = url;
        link.download = document.fileName;
        window.document.body.appendChild(link);
        link.click();
        link.remove();
    };

    const handleSave = async () => {
        const data = await updateDocument(document._id, {
            name,
            category,
        });

        onUpdate(data.document);
        setEditing(false);
    };

    const size =
        document.size > 1024 * 1024
            ? `${(document.size / (1024 * 1024)).toFixed(1)} MB`
            : `${(document.size / 1024).toFixed(0)} KB`;

    return (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center sm:p-6">
            <div
                className="w-full h-full sm:h-[90vh] sm:max-w-6xl bg-[#111827] rounded-none sm:rounded-3xl overflow-hidden border-0 sm:border border-white/10 shadow-2xl flex flex-col"
            >
                {/* Header */}
                <div
                    className="border-b border-white/10 bg-[#131826] shrink-0"
                    style={{ paddingTop: "env(safe-area-inset-top)" }}
                >
                    <div className="px-4 sm:px-6 py-3.5 sm:py-4">

                        {/* Row 1: icon + title/edit-fields + close */}
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex gap-3 sm:gap-4 flex-1 min-w-0">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                                </div>

                                {editing ? (
                                    <div className="flex-1 space-y-2 min-w-0">
                                        <input
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-[#0B0F19] border border-white/10 rounded-lg px-3 py-2 text-white text-sm sm:text-base outline-none"
                                        />

                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full sm:w-auto bg-[#0B0F19] border border-white/10 rounded-lg px-3 py-2 text-white text-sm sm:text-base outline-none"
                                        >
                                            {categories.map((item) => (
                                                <option key={item}>{item}</option>
                                            ))}
                                        </select>
                                    </div>
                                ) : (
                                    <div className="min-w-0">
                                        <h2 className="text-base sm:text-xl font-semibold text-white truncate">
                                            {document.name}
                                        </h2>

                                        <div className="flex flex-wrap gap-x-3 gap-y-1 sm:gap-4 mt-1.5 sm:mt-2 text-[11px] sm:text-xs text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <HardDrive className="w-3.5 h-3.5" />
                                                {size}
                                            </span>

                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {new Date(document.createdAt).toLocaleDateString()}
                                            </span>

                                            <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                                                {document.category}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={onClose}
                                className="p-2 rounded-xl hover:bg-white/10 transition shrink-0"
                            >
                                <X className="w-5 h-5 text-gray-300" />
                            </button>
                        </div>

                        {/* Row 2: actions - own row, never competes with title/close */}
                        <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-0.5 [&::-webkit-scrollbar]:hidden">
                            {editing ? (
                                <button
                                    onClick={handleSave}
                                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm shrink-0"
                                >
                                    <Save className="w-4 h-4" />
                                    Save
                                </button>
                            ) : (
                                <button
                                    onClick={() => setEditing(true)}
                                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm shrink-0"
                                >
                                    <Pencil className="w-4 h-4" />
                                    Edit
                                </button>
                            )}

                            <button
                                onClick={handleDownload}
                                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 text-sm shrink-0"
                            >
                                <Download className="w-4 h-4" />
                                <span className="hidden xs:inline">Download</span>
                            </button>

                            <button
                                onClick={() => setShowDelete(true)}
                                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition text-sm shrink-0"
                            >
                                <Trash2 className="w-4 h-4" />
                                <span className="hidden xs:inline">Delete</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Viewer */}
                <div className="flex-1 min-h-0 bg-[#0B0F19] flex items-center justify-center">
                    {!fileUrl ? (
                        <p className="text-gray-400 text-sm sm:text-base">Loading document...</p>
                    ) : document.mimeType === "application/pdf" ? (
                        <iframe
                            src={fileUrl}
                            title={document.name}
                            className="w-full h-full"
                        />
                    ) : (
                        <img
                            src={fileUrl}
                            alt={document.name}
                            className="max-w-full max-h-full object-contain"
                        />
                    )}
                </div>
            </div>

            <DeleteConfirmModel
                isOpen={showDelete}
                name={document.name}
                onCancel={() => setShowDelete(false)}
                onConfirm={handleDelete}
            />
        </div>
    );
}