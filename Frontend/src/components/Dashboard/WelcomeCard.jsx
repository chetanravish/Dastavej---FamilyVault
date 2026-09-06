import { Shield } from "lucide-react";

export default function WelcomeCard({ user }) {
  return (
    <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-linear-to-r from-blue-600 via-blue-700 to-indigo-700 p-4 md:p-8">
      {/* Background glow */}
      <div className="absolute -top-16 right-6 h-40 w-40 md:-top-24 md:right-10 md:h-72 md:w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-24 w-48 md:h-40 md:w-96 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="relative flex items-center justify-between gap-3">
        {/* Left */}
        <div className="max-w-md">
          <p className="text-blue-100 text-xs md:text-lg mb-1 md:mb-2 flex items-center gap-1.5">
            Welcome back, {user?.username || "User"} 👋
          </p>

          <h1 className="text-xl sm:text-2xl md:text-5xl font-bold text-white leading-snug md:leading-tight mb-1.5 md:mb-3">
            Your secure family vault
          </h1>

          <p className="hidden sm:block text-blue-100 text-sm md:text-base leading-6 md:leading-7">
            Store, organize and access important family documents securely from
            anywhere.
          </p>
        </div>

        {/* Icon: compact badge on mobile, full illustration on desktop */}
        <div className="flex-shrink-0 flex items-center justify-center lg:hidden">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-white/10 blur-lg" />
            <div className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
              <Shield className="w-5 h-5 sm:w-7 sm:h-7 text-white" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Desktop illustration only */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-white/10 blur-2xl" />
            <div className="relative w-36 h-36 rounded-3xl bg-white/10 backdrop-blur flex items-center justify-center">
              <Shield className="w-16 h-16 text-white" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}