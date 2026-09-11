import React, { useState } from 'react';

export default function SalesOrderDashboard() {
  // Data Master Armada Tronton & Alat Berat Delta Perkasa
  const trontonFleet = [
    { code: 'TR-01', name: 'Tronton Hino 01 (DLT)' },
    { code: 'TR-02', name: 'Tronton Fuso 02 (DLT)' },
    { code: 'TR-03', name: 'Tronton UD Truck 03 (DLT)' },
  ];

  const fleetDatabase = [
    { code: 'EXC.01', class: 'Exca 20 Ton' },
    { code: 'EXC.02', class: 'Exca 20 Ton' },
    { code: 'EXC.03', class: 'Exca Mini' },
    { code: 'EXC.04', class: 'Exca Mini' },
    { code: 'VIB.01', class: 'Vibro Roller' },
    { code: 'DOZ.01', class: 'Buldozer' },
    { code: 'GRD.01', class: 'Motor Grader' },
  ];

  // State Utama
  const [orderList, setOrderList] = useState([
    {
      id: 1,
      tanggal: '2026-06-06',
      sales: 'Ahmad Sales',
      customer: 'PT. Anugerah Konstruksi',
      project: 'Makassar Port Expansion',
      jenisAlat: 'Exca 20 Ton',
      unitCode: 'EXC.01',
      hmAwal: 'HM: 1.250 / Solar 50%',
      lokasiAwal: 'Pool Daya Makassar',
      lokasiTujuan: 'Pelabuhan Soekarno Hatta',
      picPenerima: 'Pak Budi (08123456789)',
      trontonUnit: 'TR-01',
      statusLogistik: '🚚 Dalam Perjalanan (OTW)',
      catatanLogistik: 'Akses jembatan batas 25 ton',
      fotoMuatUrl: '',
      timestampMuat: '',
      fotoTibaUrl: '',
      timestampTiba: '',
      status: 'Unit Ready / Dispatched'
    }
  ]);

  const [fleetStatus, setFleetStatus] = useState({
    'EXC.01': 'Working',
    'EXC.02': 'Ready',
    'EXC.03': 'Ready',
    'VIB.01': 'Ready'
  });

  const [fleetSearchQuery, setFleetSearchQuery] = useState('');
  const [selectedFleetFilter, setSelectedFleetFilter] = useState('ALL');

  // Handler Update State Baris Order
  const updateHmAwal = (id, val) => {
    setOrderList(orderList.map(o => o.id === id ? { ...o, hmAwal: val } : o));
  };
  const updateLokasiAwal = (id, val) => {
    setOrderList(orderList.map(o => o.id === id ? { ...o, lokasiAwal: val } : o));
  };
  const updateLokasiTujuan = (id, val) => {
    setOrderList(orderList.map(o => o.id === id ? { ...o, lokasiTujuan: val } : o));
  };
  const updatePicPenerima = (id, val) => {
    setOrderList(orderList.map(o => o.id === id ? { ...o, picPenerima: val } : o));
  };
  const updateTrontonUnit = (id, val) => {
    setOrderList(orderList.map(o => o.id === id ? { ...o, trontonUnit: val } : o));
  };
  const updateStatusLogistik = (id, val) => {
    setOrderList(orderList.map(o => o.id === id ? { ...o, statusLogistik: val } : o));
  };
  const updateCatatanLogistik = (id, val) => {
    setOrderList(orderList.map(o => o.id === id ? { ...o, catatanLogistik: val } : o));
  };

  const updateFleetCondition = (code, status) => {
    setFleetStatus(prev => ({ ...prev, [code]: status }));
  };

  // Simulasi Trigger Kamera / Foto Bukti
  const triggerCamera = (id, type) => {
    const timestamp = new Date().toLocaleString();
    const mockImageUrl = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&auto=format&fit=crop&q=60';
    setOrderList(orderList.map(o => {
      if (o.id === id) {
        if (type === 'muat') {
          return { ...o, fotoMuatUrl: mockImageUrl, timestampMuat: timestamp };
        } else {
          return { ...o, fotoTibaUrl: mockImageUrl, timestampTiba: timestamp };
        }
      }
      return o;
    }));
  };

  // Fitur WhatsApp Dispatcher
  const sendLogisticsWhatsApp = (order) => {
    const text = `Halo Driver Tronton (${order.trontonUnit}), mohon muat unit ${order.jenisAlat} (${order.unitCode}) dari ${order.lokasiAwal} tujuan ke ${order.lokasiTujuan}. PIC Penerima: ${order.picPenerima}. Catatan: ${order.catatanLogistik}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const sendLogisticsUpdateToSales = (order) => {
    const text = `Update Logistik Delta Perkasa untuk Sales (${order.sales}): Order ke ${order.customer} (${order.project}). Status Logistik: ${order.statusLogistik} menggunakan ${order.trontonUnit}.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const sendWhatsAppNotification = (order) => {
    const text = `Halo ${order.sales}, update status order alat berat untuk ${order.customer} (${order.project}): Status saat ini -> ${order.status}.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Fungsi Export Excel (CSV)
  const exportToExcel = () => {
    if (orderList.length === 0) {
      alert("Tidak ada data Sales Order untuk didownload.");
      return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Tanggal,Nama Sales,Pelanggan,Project/Site,Jenis Alat,Unit Code,HM Awal,Asal Pool,Tujuan Site,PIC Penerima,Tronton,Status Logistik,Status Order\n";

    orderList.forEach(order => {
      const row = [
        order.id,
        `"${order.tanggal || ''}"`,
        `"${order.sales || ''}"`,
        `"${order.customer || ''}"`,
        `"${order.project || ''}"`,
        `"${order.jenisAlat || ''}"`,
        `"${order.unitCode || ''}"`,
        `"${order.hmAwal || ''}"`,
        `"${order.lokasiAwal || ''}"`,
        `"${order.lokasiTujuan || ''}"`,
        `"${order.picPenerima || ''}"`,
        `"${order.trontonUnit || ''}"`,
        `"${order.statusLogistik || ''}"`,
        `"${order.status || ''}"`
      ];
      csvContent += row.join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Data_Sales_Order_Delta_Perkasa_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter Armada Fleet Monitoring
  const uniqueClasses = ['ALL', ...new Set(fleetDatabase.map(f => f.class))];
  const filteredFleet = fleetDatabase.filter(f => {
    const matchQuery = f.code.toLowerCase().includes(fleetSearchQuery.toLowerCase());
    const matchClass = selectedFleetFilter === 'ALL' || f.class === selectedFleetFilter;
    return matchQuery && matchClass;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER DASHBOARD & TOMBOL DOWNLOAD EXCEL */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
          <div>
            <h1 className="text-2xl font-black text-white tracking-wide">Delta Perkasa — Sales & Logistics Dashboard</h1>
            <p className="text-xs text-slate-400 mt-1">Makassar & Seluruh Wilayah Sulawesi • Hotline: 0851-6565-9907</p>
          </div>
          <button 
            onClick={exportToExcel}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-2"
          >
            <span>📊 Download Excel (CSV)</span>
          </button>
        </div>

        {/* TABEL UTAMA SALES ORDER & LOGISTIK */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Daftar Sales Order & Pengiriman Tronton</h2>
            <span className="text-xs bg-blue-950 text-blue-400 border border-blue-800 px-3 py-1 rounded-full font-mono">
              Total Order: {orderList.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/80 text-[11px] font-bold text-slate-400 border-b border-slate-800">
                  <th className="py-4 px-4">Info Sales & Pelanggan</th>
                  <th className="py-4 px-4">Alat Berat & Kondisi</th>
                  <th className="py-4 px-4">Logistik & Tronton Pengangkut</th>
                  <th className="py-4 px-4">Status & Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs">
                {orderList.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-8 text-slate-500">Belum ada data Sales Order.</td>
                  </tr>
                ) : (
                  orderList.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                      
                      {/* Kolom 1: Sales & Pelanggan */}
                      <td className="py-4 px-4 space-y-1 align-top">
                        <div className="font-bold text-white text-sm">{order.customer}</div>
                        <div className="text-slate-400">📍 Project: {order.project}</div>
                        <div className="text-[11px] text-amber-400 font-mono">Sales: {order.sales} ({order.tanggal})</div>
                      </td>

                      {/* Kolom 2: Alat Berat */}
                      <td className="py-4 px-4 space-y-2 align-top">
                        <div className="font-bold text-teal-300">{order.jenisAlat}</div>
                        <div className="text-xs font-mono bg-slate-950 px-2 py-1 rounded border border-slate-800 inline-block text-slate-300">
                          Unit: {order.unitCode}
                        </div>
                        <div>
                          <input 
                            type="text" 
                            value={order.hmAwal} 
                            onChange={(e) => updateHmAwal(order.id, e.target.value)} 
                            placeholder="HM Awal / Kondisi BBM..." 
                            className="w-full text-xs font-mono px-3 py-1 bg-slate-950 border border-slate-700 text-slate-300 rounded-lg outline-none" 
                          />
                        </div>
                      </td>

                      {/* Kolom 3: Logistik & Tronton */}
                      <td className="py-4 px-4 space-y-2 align-top">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] text-slate-400 font-bold block mb-0.5">Asal Pool:</label>
                            <input 
                              type="text" 
                              value={order.lokasiAwal} 
                              onChange={(e) => updateLokasiAwal(order.id, e.target.value)} 
                              className="w-full text-xs font-mono px-2 py-1 bg-slate-950 border border-slate-700 text-slate-300 rounded-md outline-none" 
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-slate-400 font-bold block mb-0.5">Tujuan Site:</label>
                            <input 
                              type="text" 
                              value={order.lokasiTujuan} 
                              onChange={(e) => updateLokasiTujuan(order.id, e.target.value)} 
                              className="w-full text-xs font-mono px-2 py-1 bg-slate-950 border border-slate-700 text-slate-300 rounded-md outline-none" 
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] text-slate-400 font-bold block mb-0.5">PIC Penerima di Lokasi:</label>
                          <input 
                            type="text" 
                            value={order.picPenerima} 
                            onChange={(e) => updatePicPenerima(order.id, e.target.value)} 
                            placeholder="Nama & No HP Penerima" 
                            className="w-full text-xs font-mono px-2 py-1 bg-slate-950 border border-slate-700 text-slate-300 rounded-md outline-none" 
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] text-slate-400 font-bold block mb-0.5">Armada Tronton:</label>
                            <select 
                              value={order.trontonUnit} 
                              onChange={(e) => updateTrontonUnit(order.id, e.target.value)} 
                              className="w-full text-xs font-bold px-2 py-1 bg-slate-950 border border-purple-600/50 text-purple-300 rounded-md outline-none cursor-pointer"
                            >
                              {trontonFleet.map(t => (
                                <option key={t.code} value={t.code}>{t.name}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="text-[10px] text-slate-400 font-bold block mb-0.5">Status Logistik:</label>
                            <select 
                              value={order.statusLogistik} 
                              onChange={(e) => updateStatusLogistik(order.id, e.target.value)} 
                              className="w-full text-xs font-bold px-2 py-1 bg-slate-950 border border-purple-600/50 text-purple-300 rounded-md outline-none cursor-pointer"
                            >
                              <option value="⏳ Menunggu Jadwal Muat">⏳ Menunggu Jadwal</option>
                              <option value="🚚 Dalam Perjalanan (OTW)">🚚 OTW ke Lokasi</option>
                              <option value="✅ Unit Tiba di Site">✅ Tiba di Lokasi</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <input 
                            type="text" 
                            value={order.catatanLogistik} 
                            onChange={(e) => updateCatatanLogistik(order.id, e.target.value)} 
                            placeholder="Catatan khusus logistik..." 
                            className="w-full text-xs font-mono px-2 py-1 bg-slate-950 border border-slate-700 text-slate-300 rounded-md outline-none" 
                          />
                        </div>

                        {/* Bukti Foto & GPS Kamera */}
                        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800">
                          <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-center">
                            <div className="text-[10px] font-bold text-slate-400 mb-1">FOTO MUAT POOL</div>
                            {order.fotoMuatUrl ? (
                              <div className="space-y-1">
                                <img src={order.fotoMuatUrl} alt="Muat" className="w-full h-16 object-cover rounded border border-slate-700" />
                                <div className="text-[9px] text-teal-400 font-mono">{order.timestampMuat}</div>
                              </div>
                            ) : (
                              <button 
                                onClick={() => triggerCamera(order.id, 'muat')} 
                                className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 text-[10px] font-bold rounded transition-all cursor-pointer"
                              >
                                📸 Ambil Foto Muat
                              </button>
                            )}
                          </div>

                          <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-center">
                            <div className="text-[10px] font-bold text-slate-400 mb-1">FOTO TIBA SITE</div>
                            {order.fotoTibaUrl ? (
                              <div className="space-y-1">
                                <img src={order.fotoTibaUrl} alt="Tiba" className="w-full h-16 object-cover rounded border border-slate-700" />
                                <div className="text-[9px] text-teal-400 font-mono">{order.timestampTiba}</div>
                              </div>
                            ) : (
                              <button 
                                onClick={() => triggerCamera(order.id, 'tiba')} 
                                className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 text-[10px] font-bold rounded transition-all cursor-pointer"
                              >
                                📸 Ambil Foto Tiba
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Tombol WhatsApp Logistik */}
                        <div className="flex gap-1 pt-1">
                          <button 
                            onClick={() => sendLogisticsWhatsApp(order)} 
                            className="flex-1 py-1.5 bg-purple-600/80 hover:bg-purple-500 text-white text-[10px] font-bold rounded transition-all cursor-pointer flex items-center justify-center gap-1"
                          >
                            💬 WA Driver / Logistik
                          </button>
                          <button 
                            onClick={() => sendLogisticsUpdateToSales(order)} 
                            className="flex-1 py-1.5 bg-blue-600/80 hover:bg-blue-500 text-white text-[10px] font-bold rounded transition-all cursor-pointer flex items-center justify-center gap-1"
                          >
                            📢 WA Info ke Sales
                          </button>
                        </div>
                      </td>

                      {/* Kolom 4: Status & Aksi Kirim */}
                      <td className="py-4 px-4 space-y-3 align-top">
                        <select 
                          value={order.status} 
                          onChange={(e) => {
                            const val = e.target.value;
                            setOrderList(orderList.map(o => o.id === order.id ? { ...o, status: val } : o));
                          }} 
                          className="w-full text-xs font-bold px-3 py-2 bg-slate-950 border border-blue-600/60 text-blue-300 rounded-lg outline-none cursor-pointer"
                        >
                          <option value="Menunggu Alokasi Unit">Menunggu Alokasi</option>
                          <option value="Unit Ready / Dispatched">Unit Ready / Dispatched</option>
                          <option value="Sedang Beroperasi (Working)">Sedang Beroperasi</option>
                          <option value="Selesai / Pulang">Selesai / Pulang</option>
                        </select>

                        <button 
                          onClick={() => sendWhatsAppNotification(order)} 
                          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <span>📱 Kirim Update ke Sales</span>
                        </button>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* PANEL MANAJEMEN STATUS ARMADA (FLEET MONITORING) */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl font-black text-white">Monitoring Status & Kondisi Armada Delta Perkasa</h2>
              <p className="text-xs text-slate-400">Pantau ketersediaan unit alat berat di pool dan site Sulawesi</p>
            </div>

            <div className="w-full md:w-auto flex flex-col md:flex-row gap-3">
              <input 
                type="text" 
                value={fleetSearchQuery} 
                onChange={(e) => setFleetSearchQuery(e.target.value)} 
                placeholder="Cari kode unit (misal: EXC.01)..." 
                className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 outline-none focus:ring-2 focus:ring-blue-500" 
              />
              <select 
                value={selectedFleetFilter} 
                onChange={(e) => setSelectedFleetFilter(e.target.value)} 
                className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-amber-400 outline-none cursor-pointer"
              >
                {uniqueClasses.map(cls => (
                  <option key={cls} value={cls}>{cls === 'ALL' ? 'Semua Kelas Alat' : cls}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-96 overflow-y-auto pr-2">
            {filteredFleet.map((fleet) => {
              const currentStatus = fleetStatus[fleet.code] || 'Ready';
              let statusColor = 'bg-emerald-950/60 border-emerald-600/60 text-emerald-300';
              if (currentStatus === 'Working') statusColor = 'bg-blue-950/60 border-blue-600/60 text-blue-300';
              if (currentStatus === 'Breakdown') statusColor = 'bg-red-950/60 border-red-600/60 text-red-300';

              return (
                <div key={fleet.code} className={`p-3 rounded-xl border flex flex-col justify-between gap-2 ${statusColor}`}>
                  <div>
                    <div className="font-mono font-black text-sm">{fleet.code}</div>
                    <div className="text-[10px] opacity-80 truncate">{fleet.class}</div>
                  </div>
                  <select 
                    value={currentStatus} 
                    onChange={(e) => updateFleetCondition(fleet.code, e.target.value)} 
                    className="w-full text-[10px] font-bold bg-slate-950 text-slate-200 border border-slate-700 rounded px-1.5 py-1 outline-none cursor-pointer"
                  >
                    <option value="Ready">🟢 Ready</option>
                    <option value="Working">🔵 Working</option>
                    <option value="Breakdown">🔴 Breakdown</option>
                  </select>
                </div>
              );
            })}
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center text-xs text-slate-500 mt-8 space-y-1">
          <div>CV Chandra Delta Perkasa • Pusat Rental Alat Berat Makassar & Sulawesi</div>
          <div className="font-mono">Hotline: 0851-6565-9907</div>
        </div>

      </div>
    </div>
  );
}
