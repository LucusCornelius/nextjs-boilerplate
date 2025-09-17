"use client";
import { useRouter } from "next/navigation";
import AccountCard from "./AccountCard";

export default function Sidebar() {
  const router = useRouter();

  return (
    <div className="w-64 bg-white/10 text-white/90 rounded-3xl shadow-md p-4">
      <h1 className="text-xl font-bold mb-4">Hallo Ferran</h1>
      <AccountCard name="Lucas" role="Admin" />

      {/* Menu items */}
      <div
        className="flex items-center gap-2 p-2 text-sm hover:bg-gray-100 rounded-2xl cursor-pointer"
        onClick={() => router.push("/dashboard/admin/uren-registratie")}
      >
        <img src="/assets/clock.svg" alt="clock" className="w-6 h-auto" />
        <span>Uren Registratie</span>
      </div>
    </div>
  );
}
