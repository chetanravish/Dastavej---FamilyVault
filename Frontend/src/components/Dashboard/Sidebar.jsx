import {
  FileText,
  Users,
  NotebookPen,
  FileCog,
  Settings,
  LogOut,
  Shield,
  X,
} from "lucide-react";

const menuItems = [
  { id: "documents", label: "Documents", icon: FileText },
  { id: "family", label: "Family", icon: Users },
  { id: "notes", label: "Secure Notes", icon: NotebookPen },
  { id: "tools", label: "PDF Tools", icon: FileCog },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar({
  user,
  activeTab,
  setActiveTab,
  onLogout,
  isOpen,
  onClose,
}) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 w-64 h-screen bg-[#131826] border-r border-white/5 flex flex-col transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div className="px-6 py-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>

            <div>
              <h1 className="font-semibold">Dastavej</h1>
              <p className="text-xs text-gray-500">Personal Vault</p>
            </div>
          </div>

          <button onClick={onClose} className="md:hidden">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold">
              {user?.username?.charAt(0).toUpperCase() || "U"}
            </div>

            <div>
              <p className="font-medium">{user?.username}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl
                ${
                  activeTab === item.id
                    ? "bg-blue-500/10 text-blue-400"
                    : "text-gray-400 hover:bg-white/5"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/5">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}