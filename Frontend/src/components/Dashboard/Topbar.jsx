import {
  Search,
  Bell,
  Upload,
  Menu,
} from "lucide-react";

export default function Topbar({
  search,
  setSearch,
  user,
  onUpload,
  onMenu,
}) {
  return (
    <header className="flex items-center gap-2 sm:gap-3 mb-6">
      {/* Hamburger */}
      <button
        onClick={onMenu}
        className="md:hidden w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#131826] border border-white/10 flex items-center justify-center shrink-0"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Search */}
      <div className="relative flex-1 min-w-0">
        <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full bg-[#131826] border border-white/10 rounded-xl pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base"
        />
      </div>

      {/* Upload desktop */}
      <button
        onClick={onUpload}
        className="hidden md:flex items-center gap-2 bg-blue-600 px-5 py-3 rounded-xl shrink-0"
      >
        <Upload className="w-4 h-4" />
        Upload
      </button>

      {/* Upload mobile (icon only) */}
      <button
        onClick={onUpload}
        className="md:hidden w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-600 flex items-center justify-center shrink-0"
      >
        <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <button className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#131826] border border-white/10 flex items-center justify-center shrink-0">
        <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm sm:text-base shrink-0">
        {user?.username?.charAt(0).toUpperCase() || "U"}
      </div>
    </header>
  );
}