import React, { useState } from "react";

export default function KontrolLapangan() {

  const [orders, setOrders] = useState([
    {
      id: "SO-7208",
      customer: "PT Mahligai Artha Sejahtera",
      proyek: "Land Clearing 44",
      sales: "ANS",

      jenisAlat:
        "Excavator 20 Ton - Bucket",

      jumlahUnit: 1,

      kodeUnit: "EXC.08",

      operator: "Baharuddin",

      hmAwal: "1240.5",

      statusUnit: "Working",

      statusLogistik:
        "🚚 Dalam Perjalanan (OTW)",

      catatan:
        "Bawa breaker & selang hidrolik cadangan.",

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

  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-2xl font-black">
          🚜 Kontrol Lapangan & Logistik
        </h2>

        <p className="text-sm text-slate-400">
          Pengendalian unit, operator, HM, mobilisasi,
          dokumentasi dan status lapangan.
        </p>
      </div>

      {orders.map((order) => (

        <div
          key={order.id}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
        >

          {/* HEADER ORDER */}

          <div className="flex justify-between mb-6">

            <div>

              <div className="text-blue-400 font-black">
                {order.id}
              </div>

              <div className="text-lg font-black">
                {order.customer}
              </div>

              <div className="text-sm text-amber-400">
                {order.proyek}
              </div>

            </div>

            <div className="text-right">

              <div className="text-xs text-slate-500">
                SALES
              </div>

              <div className="font-black text-blue-400">
                {order.sales}
              </div>

            </div>

          </div>

          {/* KONTROL UNIT */}

          <div className="grid md:grid-cols-4 gap-4">

            <div>

              <label className="label">
                Kode Unit
              </label>

              <input
                value={order.kodeUnit}
                onChange={(e) =>
                  updateOrder(
                    order.id,
                    "kodeUnit",
                    e.target.value
                  )
                }
                className="input"
              />

            </div>

            <div>

              <label className="label">
                Operator
              </label>

              <input
                value={order.operator}
                onChange={(e) =>
                  updateOrder(
                    order.id,
                    "operator",
                    e.target.value
                  )
                }
                className="input"
              />

            </div>

            <div>

              <label className="label">
                HM Awal
              </label>

              <input
                value={order.hmAwal}
                onChange={(e) =>
                  updateOrder(
                    order.id,
                    "hmAwal",
                    e.target.value
                  )
                }
                className="input"
              />

            </div>

            <div>

              <label className="label">
                Status Unit
              </label>

              <select
                value={order.statusUnit}
                onChange={(e) =>
                  updateOrder(
                    order.id,
                    "statusUnit",
                    e.target.value
                  )
                }
                className="input"
              >

                <option value="Ready">
                  Ready
                </option>

                <option value="Working">
                  Working
                </option>

                <option value="Breakdown">
                  Breakdown
                </option>

                <option value="Standby">
                  Standby
                </option>

              </select>

            </div>

          </div>

          {/* LOGISTIK */}

          <div className="mt-6 p-4 bg-slate-950 rounded-2xl">

            <h3 className="font-black text-purple-400 mb-4">
              🚚 Instruksi Logistik
            </h3>

            <div className="grid md:grid-cols-2 gap-4">

              <textarea
                value={order.catatan}
                onChange={(e) =>
                  updateOrder(
                    order.id,
                    "catatan",
                    e.target.value
                  )
                }
                rows="4"
                className="input"
                placeholder="Instruksi logistik..."
              />

              <select
                value={order.statusLogistik}
                onChange={(e) =>
                  updateOrder(
                    order.id,
                    "statusLogistik",
                    e.target.value
                  )
                }
                className="input h-fit"
              >

                <option>
                  ⏳ Menunggu Jadwal Muat
                </option>

                <option>
                  🚚 Dalam Perjalanan (OTW)
                </option>

                <option>
                  ✅ Unit Tiba di Lokasi
                </option>

              </select>

            </div>

          </div>

          {/* DOKUMENTASI */}

          <div className="mt-6 grid md:grid-cols-2 gap-4">

            <button
              className="bg-slate-800 hover:bg-slate-700 py-4 rounded-xl font-bold"
            >
              📷 Foto Muat
            </button>

            <button
              className="bg-slate-800 hover:bg-slate-700 py-4 rounded-xl font-bold"
            >
              📷 Foto Tiba
            </button>

          </div>

          {/* ACTION */}

          <div className="mt-4 grid md:grid-cols-2 gap-3">

            <button
              className="bg-purple-600 hover:bg-purple-500 py-3 rounded-xl font-bold"
            >
              📲 WA Logistik
            </button>

            <button
              className="bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold"
            >
              📋 Kirim Update ke Sales
            </button>

          </div>

        </div>

      ))}

    </div>
  );
}
