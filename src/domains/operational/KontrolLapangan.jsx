import React, { useState } from "react";

export default function KontrolLapangan() {
  const [orders, setOrders] = useState([
    {
      id: "SO-7208",
      customer: "PT Mahligai Artha Sejahtera",
      proyek: "Land Clearing 44",
      sales: "ANS",
      jenisAlat: "Excavator 20 Ton - Bucket",
      jumlahUnit: 1,
      kodeUnit: "EXC.08",
      operator: "Baharuddin",
      hmAwal: "1240.5",
      statusUnit: "Working",
      statusLogistik: "🚚 Dalam Perjalanan (OTW)",
      catatan: "Bawa breaker & selang hidrolik cadangan.",
      fotoMuat: null,
      fotoTiba: null,
    },
  ]);

  const updateOrder = (id, field, value) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? {
              ...order,
              [field]: value,
            }
          : order
      )
    );
  };

  const handleWhatsAppLogistik = (order) => {
    const text = `Halo Logistik,\n\nUpdate untuk Order *${order.id}*:\nCustomer: ${order.customer}\nProyek: ${order.proyek}\nUnit: ${order.jenisAlat} (${order.kodeUnit})\nOperator: ${order.operator}\nStatus Logistik: ${order.statusLogistik}\nCatatan: ${order.catatan}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleWhatsAppSales = (order) => {
    const text = `Halo Sales (${order.sales}),\n\nUpdate Lapangan Order *${order.id}* (${order.customer}):\nStatus Unit: ${order.statusUnit}\nHM Awal: ${order.hmAwal}\nStatus Logistik: ${order.statusLogistik}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* HEADER WITH LOGO */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/5 border border-slate-700 rounded-2xl flex items-center justify-center p-2 shadow-inner">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
              <polygon points="50,10 90,85 10,85" fill="#991b1b" />
              <polygon points="50,30 75,75 25,75" fill="#dc2626" opacity="0.3" />
              <circle cx="50" cy="50" r="8" fill="#ffffff" />
            </svg>
          </div>
          <div>
            <div className="text-xs text-amber-400 font-bold tracking-wider uppercase">
              Delta Perkasa Rental
            </div>
            <h2 className="text-2xl font-black text-white">
              🚜 Kontrol Lapangan & Logistik
            </h2>
            <p className="text-xs text-slate-400">
              Pengendalian unit, operator, HM, mobilisasi, dokumentasi, dan status lapangan.
            </p>
          </div>
        </div>
        <div className="bg-slate-950 px-4 py-2 border border-slate-800 rounded-xl text-xs font-bold text-slate-300">
          Total Unit Dipantau: <span className="text-amber-400 font-black">{orders.length}</span>
        </div>
      </div>

      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
        >
          {/* TOP BADGE / DECORATION LINE */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-blue-500 to-purple-600"></div>

          {/* HEADER ORDER */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800/80 pb-5 mb-6 gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 font-black text-xs rounded-lg">
                  {order.id}
                </span>
                <span className="text-xs font-bold text-slate-400 px-2 py-0.5 bg-slate-950 rounded border border-slate-800">
                  {order.jenisAlat}
                </span>
              </div>
              <h3 className="text-xl font-black text-white mt-1">
                {order.customer}
              </h3>
              <div className="text-sm font-semibold text-amber-400 flex items-center gap-1.5 mt-0.5">
                📍 {order.proyek}
              </div>
            </div>

            <div className="bg-slate-950 px-4 py-3 rounded-2xl border border-slate-800 text-right w-full md:w-auto">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Sales PIC
              </div>
              <div className="font-black text-blue-400 text-sm">
                {order.sales}
              </div>
            </div>
          </div>

          {/* KONTROL UNIT GRID */}
          <div className="grid md:grid-cols-4 gap-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800/60">
            <div>
              <label className="block text-xs text-slate-400 font-bold mb-1.5">
                Kode Unit
              </label>
              <input
                value={order.kodeUnit}
                onChange={(e) =>
                  updateOrder(order.id, "kodeUnit", e.target.value)
                }
                className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm font-bold text-amber-400 focus:outline-none focus:border-amber-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 font-bold mb-1.5">
                Operator
              </label>
              <input
                value={order.operator}
                onChange={(e) =>
                  updateOrder(order.id, "operator", e.target.value)
                }
                className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 font-bold mb-1.5">
                HM Awal
              </label>
              <input
                value={order.hmAwal}
                onChange={(e) =>
                  updateOrder(order.id, "hmAwal", e.target.value)
                }
                className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm font-bold text-teal-400 focus:outline-none focus:border-teal-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 font-bold mb-1.5">
                Status Unit
              </label>
              <select
                value={order.statusUnit}
                onChange={(e) =>
                  updateOrder(order.id, "statusUnit", e.target.value)
                }
                className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-blue-500 transition-all"
              >
                <option value="Ready">🟢 Ready</option>
                <option value="Working">🟡 Working</option>
                <option value="Breakdown">🔴 Breakdown</option>
                <option value="Standby">🔵 Standby</option>
              </select>
            </div>
          </div>

          {/* LOGISTIK SECTION */}
          <div className="mt-6 p-5 bg-slate-950 rounded-2xl border border-slate-800">
            <h4 className="font-black text-purple-400 text-sm mb-3 flex items-center gap-2">
              🚚 Instruksi & Status Logistik
            </h4>

            <div className="grid md:grid-cols-2 gap-4">
              <textarea
                value={order.catatan}
                onChange={(e) =>
                  updateOrder(order.id, "catatan", e.target.value)
                }
                rows="3"
                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-purple-500 transition-all resize-none"
                placeholder="Tulis instruksi khusus logistik..."
              />

              <select
                value={order.statusLogistik}
                onChange={(e) =>
                  updateOrder(order.id, "statusLogistik", e.target.value)
                }
                className="w-full px-3 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-purple-300 focus:outline-none focus:border-purple-500 transition-all h-fit"
              >
                <option>⏳ Menunggu Jadwal Muat</option>
                <option>🚚 Dalam Perjalanan (OTW)</option>
                <option>✅ Unit Tiba di Lokasi</option>
              </select>
            </div>
          </div>

          {/* DOKUMENTASI SECTION */}
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <label className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 py-3.5 px-4 rounded-xl font-bold text-xs cursor-pointer transition-all">
              <span>📷</span> Foto Muat Alat
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    updateOrder(order.id, "fotoMuat", e.target.files[0].name);
                  }
                }}
              />
              {order.fotoMuat && (
                <span className="text-emerald-400 text-[10px] ml-2">✓ Terunggah</span>
              )}
            </label>

            <label className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 py-3.5 px-4 rounded-xl font-bold text-xs cursor-pointer transition-all">
              <span>📷</span> Foto Tiba di Lokasi
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    updateOrder(order.id, "fotoTiba", e.target.files[0].name);
                  }
                }}
              />
              {order.fotoTiba && (
                <span className="text-emerald-400 text-[10px] ml-2">✓ Terunggah</span>
              )}
            </label>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-6 grid md:grid-cols-2 gap-3 pt-4 border-t border-slate-800/80">
            <button
              onClick={() => handleWhatsAppLogistik(order)}
              className="bg-purple-600 hover:bg-purple-500 text-white py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-900/20"
            >
              <span>📲</span> Kirim Instruksi WA Logistik
            </button>

            <button
              onClick={() => handleWhatsAppSales(order)}
              className="bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20"
            >
              <span>📋</span> Kirim Update ke Sales ({order.sales})
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
