import React, { useState } from "react";

const salesOptions = [
  { label: "ANS", value: "ANS" },
  { label: "UCI", value: "UCI" },
  { label: "CDP", value: "CDP" },
  { label: "FAN", value: "FAN" },
];

const alatOptions = [
  "Excavator 20 Ton - Bucket",
  "Excavator 20 Ton - Breaker",
  "Excavator Mini SY55 - Bucket",
  "Excavator Mini SY55 - Breaker",
  "Excavator Mini SY75 - Bucket",
  "Excavator Mini SY75 - Breaker",
  "Vibro Roller",
  "Bulldozer",
  "Motor Grader",
];

export default function SalesOrder() {
  const [formData, setFormData] = useState({
    customer: "",
    namaProyek: "",
    lokasi: "",
    lokasiPengantaran: "",
    picPenerima: "",
    sales: "ANS",
    jenisAlat: "Excavator 20 Ton - Bucket",
    jenisSewa: "S1",
    tipeDurasi: "Jam",
    jumlahDurasi: 8,
    jumlahUnit: 1,
  });

  const [orderList, setOrderList] = useState([]);
  const [notification, setNotification] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderNo = "SO-" + Math.floor(1000 + Math.random() * 9000);

    const newOrder = {
      id: orderNo,
      ...formData,
      durasi: `${formData.jumlahDurasi} ${formData.tipeDurasi}`,
      jumlahUnit: Number(formData.jumlahUnit) || 1,
      status: "Menunggu Alokasi Unit",
      createdAt: new Date().toLocaleString("id-ID"),
    };

    setOrderList((prev) => [newOrder, ...prev]);
    setNotification(`Sales Order ${orderNo} berhasil diterbitkan!`);

    setFormData({
      customer: "",
      namaProyek: "",
      lokasi: "",
      lokasiPengantaran: "",
      picPenerima: "",
      sales: "ANS",
      jenisAlat: "Excavator 20 Ton - Bucket",
      jenisSewa: "S1",
      tipeDurasi: "Jam",
      jumlahDurasi: 8,
      jumlahUnit: 1,
    });

    setTimeout(() => {
      setNotification("");
    }, 3500);
  };

  const handleWhatsAppSO = (order) => {
    const text = `*SALES ORDER - CV CHANDRA DELTA PERKASA*

No. SO: *${order.id}*
Customer: ${order.customer}
Proyek: ${order.namaProyek}
Lokasi Proyek: ${order.lokasi}
Lokasi Pengantaran / Drop Unit: ${order.lokasiPengantaran || "-"}
PIC Penerima: ${order.picPenerima || "-"}
Sales PIC: ${order.sales}
Jenis Kontrak: ${order.jenisSewa}
Jenis Alat: ${order.jenisAlat}
Jumlah: ${order.jumlahUnit} Unit
Durasi: ${order.durasi}
Status: ${order.status}`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* HEADER WITH LOGO */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900 border border-amber-500/30 p-6 rounded-3xl shadow-xl gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white border border-amber-500/40 rounded-2xl flex flex-col items-center justify-center p-2 shadow-inner">
            <svg viewBox="0 0 100 100" className="w-8 h-8 drop-shadow">
              <polygon points="50,10 90,85 10,85" fill="#991b1b" />
            </svg>
            <div className="text-[9px] font-black tracking-tighter text-slate-900 leading-none mt-1 text-center">
              DELTA<br/>PERKASA
            </div>
          </div>
          <div>
            <div className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1">
              CV CHANDRA DELTA PERKASA
            </div>
            <h2 className="text-2xl font-black text-white">
              📋 Sales Order (SO)
            </h2>
            <p className="text-xs text-slate-400">
              Makassar & Sekitarnya • Melayani Sulawesi
            </p>
          </div>
        </div>
        <div className="bg-slate-950 px-4 py-2 border border-slate-800 rounded-xl text-xs font-bold text-slate-300">
          Total SO Terbit: <span className="text-blue-400 font-black">{orderList.length}</span>
        </div>
      </div>

      {/* NOTIFICATION */}
      {notification && (
        <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 p-4 rounded-2xl shadow-lg flex items-center gap-3 animate-fade-in">
          <span className="text-xl">✅</span>
          <span className="font-bold text-sm">{notification}</span>
        </div>
      )}

      {/* FORM SALES ORDER */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-amber-500 to-purple-600"></div>

        <h3 className="font-black text-lg text-white mb-6 flex items-center gap-2">
          <span>✨</span> Form Pembuatan Sales Order
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 font-bold mb-1.5">
              Nama Customer / PT / CV
            </label>
            <input
              type="text"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              placeholder="Contoh: PT Mahligai Artha Sejahtera"
              required
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 transition-all font-semibold"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 font-bold mb-1.5">
                Nama Proyek
              </label>
              <input
                type="text"
                name="namaProyek"
                value={formData.namaProyek}
                onChange={handleChange}
                placeholder="Contoh: Land Clearing 44"
                required
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 font-bold mb-1.5">
                Lokasi Proyek
              </label>
              <input
                type="text"
                name="lokasi"
                value={formData.lokasi}
                onChange={handleChange}
                placeholder="Contoh: Maros, Sulawesi Selatan"
                required
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 font-bold mb-1.5">
                Lokasi Pengantaran / Drop Unit
              </label>
              <input
                type="text"
                name="lokasiPengantaran"
                value={formData.lokasiPengantaran}
                onChange={handleChange}
                placeholder="Titik drop atau akses masuk lokasi"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 font-bold mb-1.5">
                PIC Penerima & No HP
              </label>
              <input
                type="text"
                name="picPenerima"
                value={formData.picPenerima}
                onChange={handleChange}
                placeholder="Nama PIC (0812xxxxxxx)"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 font-bold mb-1.5">
                Sales PIC
              </label>
              <select
                name="sales"
                value={formData.sales}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-bold text-blue-400 focus:outline-none focus:border-blue-500 transition-all"
              >
                {salesOptions.map((item, idx) => (
                  <option key={idx} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-400 font-bold mb-1.5">
                Jenis Kontrak Sewa
              </label>
              <select
                name="jenisSewa"
                value={formData.jenisSewa}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-bold text-amber-400 focus:outline-none focus:border-blue-500 transition-all"
              >
                <option value="S1">S1 (Dengan Operator & Tanpa BBM)</option>
                <option value="S2">S2 (Dengan Operator & BBM)</option>
                <option value="S3">S3 (All In)</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-slate-400 font-bold mb-1.5">
                Jenis Alat & Attachment
              </label>
              <select
                name="jenisAlat"
                value={formData.jenisAlat}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-blue-500 transition-all"
              >
                {alatOptions.map((alat) => (
                  <option key={alat} value={alat}>
                    {alat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-400 font-bold mb-1.5">
                Jumlah Unit
              </label>
              <input
                type="number"
                name="jumlahUnit"
                min="1"
                value={formData.jumlahUnit}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 font-bold mb-1.5">
                Durasi Sewa
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="jumlahDurasi"
                  min="1"
                  value={formData.jumlahDurasi}
                  onChange={handleChange}
                  className="w-2/3 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-blue-500 transition-all"
                />
                <select
                  name="tipeDurasi"
                  value={formData.tipeDurasi}
                  onChange={handleChange}
                  className="w-1/3 px-3 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-slate-300 focus:outline-none focus:border-blue-500 transition-all"
                >
                  <option value="Jam">Jam</option>
                  <option value="Hari">Hari</option>
                  <option value="Minggu">Minggu</option>
                  <option value="Bulan">Bulan</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-black text-sm tracking-wider transition-all shadow-lg shadow-blue-900/30 mt-6"
          >
            TERBITKAN SALES ORDER →
          </button>
        </form>
      </div>

      {/* REKAP SO */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden">
        <h3 className="font-black text-lg text-white mb-5 flex items-center justify-between">
          <span>📊 Rekap Sales Order</span>
          <span className="text-xs font-normal text-slate-400">Daftar pesanan aktif</span>
        </h3>

        {orderList.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm border border-dashed border-slate-800 rounded-2xl">
            Belum ada Sales Order yang diterbitkan pada sesi ini.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                  <th className="p-3.5">No. SO</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Proyek</th>
                  <th className="p-3.5">Sales</th>
                  <th className="p-3.5">Alat</th>
                  <th className="p-3.5 text-center">Unit</th>
                  <th className="p-3.5">Durasi</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {orderList.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-950/40 transition-colors">
                    <td className="p-3.5 font-black text-blue-400">
                      {order.id}
                    </td>
                    <td className="p-3.5 font-bold text-white">
                      {order.customer}
                    </td>
                    <td className="p-3.5 text-slate-300">
                      {order.namaProyek}
                    </td>
                    <td className="p-3.5 font-bold text-amber-400">
                      {order.sales}
                    </td>
                    <td className="p-3.5 text-slate-300">
                      {order.jenisAlat}
                    </td>
                    <td className="p-3.5 text-center font-bold text-white">
                      {order.jumlahUnit}
                    </td>
                    <td className="p-3.5 text-purple-300 font-semibold">
                      {order.durasi}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-lg font-bold text-[10px]">
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleWhatsAppSO(order)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-[10px] transition-all shadow"
                      >
                        📲 Kirim WA
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
