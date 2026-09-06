import { FileText, Users, NotebookPen } from "lucide-react";

export default function StatsCards({
  totalDocs,
  familyMembers,
  secureNotes,
}) {
  const cards = [
    {
      title: "Documents",
      value: totalDocs,
      icon: FileText,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Family",
      value: familyMembers,
      icon: Users,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Secure Notes",
      value: secureNotes,
      icon: NotebookPen,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2.5 sm:gap-4 md:gap-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-[#131826] border border-white/5 rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 hover:border-white/10 transition"
          >
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl ${card.bg} flex items-center justify-center`}
            >
              <Icon className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${card.color}`} />
            </div>

            <h3 className="mt-2 sm:mt-3 md:mt-4 text-lg sm:text-2xl md:text-3xl font-bold text-white">
              {card.value}
            </h3>

            <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs md:text-sm text-gray-400 truncate">
              {card.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}