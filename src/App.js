import React, { useState } from "react";

import SalesOrder from "./domains/sales/SalesOrder";
import AdminTimesheet from "./domains/timesheet/AdminTimesheet";
import KontrolLapangan from "./domains/operational/KontrolLapangan";

export default function App() {
  const [role, setRole] = useState("sales");

  const roles = [
    {
      id: "sales",
      label: "Sales",
      icon: "📋",
    },
    {
      id: "timesheet",
      label: "Admin Timesheet",
      icon: "⏱️",
    },
    {
      id: "operational",
      label: "Kontrol Lapangan",
      icon: "🚜",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">

      {/* HEADER */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-4">

          <div>
            <div className="text-xs text-amber-400 font-bold uppercase tracking-widest">
              Delta Perkasa Rental
            </div>

            <h1 className="text-xl md:text-2xl font-black">
              CV CHANDRA DELTA PERKASA
            </h1>

            <p className="text-xs text-slate-400">
              Sistem Operasional Rental Alat Berat
            </p>
          </div>

          {/* ROLE SWITCH */}
          <div className="flex flex-wrap gap-2">
            {roles.map((item) => (
              <button
                key={item.id}
                onClick={() => setRole(item.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  role === item.id
                    ? "bg-blue-600 text-white"
                    : "bg-slate-950 border border-slate-700 text-slate-400"
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </div>

        </div>
      </header>

      {/* DOMAIN */}
      <main className="max-w-7xl mx-auto p-6">

        {role === "sales" && (
          <SalesOrder />
        )}

        {role === "timesheet" && (
          <AdminTimesheet />
        )}

        {role === "operational" && (
          <KontrolLapangan />
        )}

      </main>

    </div>
  );
}
