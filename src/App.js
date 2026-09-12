import React, { useState, useEffect } from 'react';

export default function App() {
  // --- STATE & DATA UTAMA (TIDAK ADA YANG DIHAPUS) ---
  const [currentRole, setCurrentRole] = useState('management');
  const logisticsPhone = "085165659907";

  const fleetDatabase = [
    { code: "EX-20-01", class: "Excavator 20 Ton (Komatsu / Kobelco / Liugong)" },
    { code: "EX-MINI-01", class: "Mini Excavator" },
    { code: "VIBRO-01", class: "Vibro Roller" },
    { code: "DOZER-01", class: "Bulldozer" },
    { code: "GRADER-01", class: "Motor Grader" },
  ];

  const operatorDatabase = ["Baharuddin", "Andi Rasyid", "Saharuddin", "Ruslan", "Yusuf"];

  const [orderList, setOrderList] = useState([
    {
      id: "ORD-001",
      customer: "PT Sinar Makassar Konstruksi",
      namaProyek: "Cut & Fill Perumahan Tallasa City",
      jenisAlat: "Excavator 20 Ton",
      kodeUnit: "EX-20-01",
      namaOperator: "Baharuddin",
      hmAwal: "1250.5",
      status: "✅ Tiba di Lokasi & Mulai Kerja",
      timestampMuat: "08:30 WITA",
      timestampTiba: "10:15 WITA",
      fotoMuatUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300",
      fotoTibaUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=300"
    }
  ]);

  const [timesheetList, setTimesheetList] = useState([
    { id: "TS-001", tanggal: "2026-09-12", operator: "Baharuddin", unitCode: "EX-20-01", namaPenyewa: "PT Sinar Makassar", hmStart: "1250.5", hmEnd: "1258.0", totalHm: "7.5", keterangan: "Lancar" }
  ]);

  const [timesheetForm, setTimesheetForm] = useState({
    jobId: "ORD-001",
    tanggal: "2026-09-12",
    operator: "Baharuddin",
    unitCode: "EX-20-01",
    namaPenyewa: "PT Sinar Makassar",
    hmStart: "1250.5",
    hmEnd: "1258.0",
    keterangan: "Lancar"
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const role = params.get('role');
    if (role) {
      setCurrentRole(role);
    }
  }, []);

  const triggerCamera = (id, jenis) => {
    alert(`Simulasi Kamera (${jenis}) untuk Order #${id}. Foto berhasil diambil & terverifikasi!`);
    const now = new Date().toLocaleTimeString();
    setOrderList(orderList.map(o => {
      if (o.id === id) {
        if (jenis === 'muat') {
          return { ...o, fotoMuatUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300", timestampMuat: now };
        } else {
          return { ...o, fotoTibaUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=300", timestampTiba: now };
        }
      }
      return o;
    }));
  };

  const handleTimesheetSubmit = (e) => {
    e.preventDefault();
    const start = parseFloat(timesheetForm.hmStart) || 0;
    const end = parseFloat(timesheetForm.hmEnd) || 0;
    const total = (end - start).toFixed(1);

    const newTs = {
      id: `TS-00${timesheetList.length + 1}`,
      ...timesheetForm,
      totalHm: total > 0 ? total : "0.0"
    };

    setTimesheetList([newTs, ...timesheetList]);
    alert("Data timesheet berhasil disimpan!");
  };

  const exportToExcel = (type) => {
    alert(`File ${type} berhasil diexport dalam format CSV/Spreadsheet.`);
  };

  // --- RETURN UTAMA DENGAN FRAGMENT (<>) AGAR TIDAK TERKENA ERROR JSX ---
  return (
    <>
      <div className="min-h-screen bg-[#07090e] text-slate-100 p-4 md:p-8 font-sans">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header Dashboard */}
          <div className="bg-[#121824] border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold rounded-lg uppercase tracking-wider">
                  CV Chandra Delta Perkasa
                </span>
                <span className="text-xs text-slate-400">Makassar & Sulawesi</span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-white mt-1">
                Dashboard Operasional & Rental Alat Berat
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentRole('management')} 
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${currentRole === 'management' ? 'bg-amber-500 text-black' : 'bg-[#1b2230] text-slate-300'}`}
              >
                Management
              </button>
              <button 
                onClick={() => setCurrentRole('logistik')} 
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${currentRole === 'logistik' ? 'bg-amber-500 text-black' : 'bg-[#1b2230] text-slate-300'}`}
              >
                Logistik & Unit
              </button>
              <button 
                onClick={() => setCurrentRole('timesheet')} 
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${currentRole === 'timesheet' ? 'bg-amber-500 text-black' : 'bg-[#1b2230] text-slate-300'}`}
              >
                Timesheet
              </button>
            </div>
          </div>

          {/* Bagian 1: Logistik & Pengiriman Unit */}
          {(currentRole === 'logistik' || currentRole === 'management') && (
            <div className="bg-[#0b0e17] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-black text-amber-400">🚚 Alokasi Unit, Operator & Verifikasi Lapangan</h2>
                  <p className="text-xs text-slate-400">Kontak WA Logistik: {logisticsPhone}</p>
                </div>
                <button onClick={() => exportToExcel('logistik')} className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl">📥 Export Logistik</button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#121824] border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                      <th className="py-3 px-4">Order / Customer</th>
                      <th className="py-3 px-4">Jenis Alat</th>
                      <th className="py-3 px-4">Alokasi Unit & Operator</th>
                      <th className="py-3 px-4">Dokumentasi & Timestamp</th>
                      <th className="py-3 px-4">Status & Koordinasi WA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {orderList.map(order => (
                      <tr key={order.id} className="hover:bg-[#121824]/40">
                        <td className="py-4 px-4 align-top">
                          <div className="font-bold text-white">{order.customer}</div>
                          <div className="text-[11px] text-slate-400">{order.namaProyek}</div>
                          <div className="text-[10px] text-amber-400 font-mono mt-1">{order.id}</div>
                        </td>

                        <td className="py-4 px-4 align-top">
                          <div className="font-semibold text-teal-300">{order.jenisAlat}</div>
                        </td>

                        <td className="py-4 px-4 align-top space-y-2">
                          <div className="flex items-center gap-2">
                            <select 
                              value={order.kodeUnit} 
                              onChange={(e) => {
                                const val = e.target.value;
                                setOrderList(orderList.map(o => o.id === order.id ? { ...o, kodeUnit: val } : o));
                              }}
                              className="px-2 py-1.5 bg-[#121824] border border-slate-700 rounded-lg text-xs font-bold text-amber-300 outline-none"
                            >
                              <option value="Belum Dipilih">Pilih Unit...</option>
                              {fleetDatabase.map(f => (
                                <option key={f.code} value={f.code}>{f.code} - {f.class}</option>
                              ))}
                            </select>
                          </div>

                          <div className="flex items-center gap-2">
                            <select 
                              value={order.namaOperator} 
                              onChange={(e) => {
                                const val = e.target.value;
                                setOrderList(orderList.map(o => o.id === order.id ? { ...o, namaOperator: val } : o));
                              }}
                              className="px-2 py-1.5 bg-[#121824] border border-slate-700 rounded-lg text-xs font-bold text-purple-300 outline-none"
                            >
                              <option value="Belum Ditentukan">Pilih Operator...</option>
                              {operatorDatabase.map(op => (
                                <option key={op} value={op}>{op}</option>
                              ))}
                            </select>
                          </div>

                          <div className="text-[10px] text-slate-400">
                            HM Awal: <input 
                              type="text" 
                              value={order.hmAwal} 
                              onChange={(e) => {
                                const val = e.target.value;
                                setOrderList(orderList.map(o => o.id === order.id ? { ...o, hmAwal: val } : o));
                              }}
                              className="w-20 bg-[#121824] border border-slate-700 px-1 rounded text-white ml-1"
                            />
                          </div>
                        </td>

                        <td className="py-4 px-4 align-top space-y-2">
                          <div className="flex flex-wrap gap-2">
                            <button 
                              onClick={() => triggerCamera(order.id, 'muat')} 
                              className="px-2.5 py-1.5 bg-purple-600/80 hover:bg-purple-600 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer shadow"
                            >
                              📷 Foto Muat ({order.fotoMuatUrl ? '✔' : '0'})
                            </button>
                            <button 
                              onClick={() => triggerCamera(order.id, 'tiba')} 
                              className="px-2.5 py-1.5 bg-teal-600/80 hover:bg-teal-600 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer shadow"
                            >
                              📍 Foto Tiba ({order.fotoTibaUrl ? '✔' : '0'})
                            </button>
                          </div>
                          
                          <div className="text-[10px] text-slate-400 space-y-0.5">
                            <div>Muat: <span className="text-white">{order.timestampMuat}</span></div>
                            <div>Tiba: <span className="text-white">{order.timestampTiba}</span></div>
                          </div>

                          {order.fotoMuatUrl && (
                            <div className="flex gap-2 mt-1">
                              <a href={order.fotoMuatUrl} target="_blank" rel="noreferrer" className="text-[10px] text-amber-400 underline">Lihat Foto Muat</a>
                            </div>
                          )}
                        </td>

                        <td className="py-4 px-4 align-top space-y-3">
                          <select 
                            value={order.status} 
                            onChange={(e) => {
                              const val = e.target.value;
                              setOrderList(orderList.map(o => o.id === order.id ? { ...o, status: val } : o));
                            }}
                            className="w-full px-2.5 py-1.5 bg-[#121824] border border-slate-700 rounded-lg text-xs font-bold text-emerald-400 outline-none"
                          >
                            <option value="Menunggu Alokasi Unit">Menunggu Alokasi Unit</option>
                            <option value="Unit Ready / Dispatched">Unit Ready / Dispatched</option>
                            <option value="🚚 Dalam Perjalanan (OTW)">🚚 Dalam Perjalanan (OTW)</option>
                            <option value="✅ Tiba di Lokasi & Mulai Kerja">✅ Tiba di Lokasi & Mulai Kerja</option>
                            <option value="Selesai / Closed">Selesai / Closed</option>
                          </select>

                          <a 
                            href={`https://wa.me/${logisticsPhone}?text=${encodeURIComponent(`Halo Logistik Delta Perkasa,\n\nUpdate Order #${order.id}\nCustomer: ${order.customer}\nProyek: ${order.namaProyek}\nAlat: ${order.jenisAlat}\nUnit: ${order.kodeUnit}\nOperator: ${order.namaOperator}\nStatus: ${order.status}\n\nMohon koordinasi pengiriman.`)}`}
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-flex items-center justify-center w-full py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-bold tracking-wide shadow transition-all"
                          >
                            💬 Kirim WA Logistik
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Bagian 2: Menu Admin Timesheet */}
          {(currentRole === 'timesheet' || currentRole === 'management') && (
            <div className="bg-[#0b0e17] border border-emerald-500/30 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-black text-emerald-400">📊 Menu Admin Timesheet & Rekap Spreadsheet</h2>
                  <p className="text-xs text-slate-400">Akses role: <code className="text-emerald-300 bg-black/40 px-2 py-1 rounded">?role=timesheet</code></p>
                </div>
                <button onClick={() => exportToExcel('timesheet')} className="px-3 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl">📥 Export Timesheet CSV</button>
              </div>

              <form onSubmit={handleTimesheetSubmit} className="bg-[#121824] p-4 md:p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-xs font-black uppercase text-amber-400 tracking-wider">Form Input Data Timesheet Baru</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Job ID</label>
                    <input type="text" value={timesheetForm.jobId} onChange={(e) => setTimesheetForm({ ...timesheetForm, jobId: e.target.value })} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-lg text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Tanggal</label>
                    <input type="text" value={timesheetForm.tanggal} onChange={(e) => setTimesheetForm({ ...timesheetForm, tanggal: e.target.value })} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-lg text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Operator</label>
                    <input type="text" value={timesheetForm.operator} onChange={(e) => setTimesheetForm({ ...timesheetForm, operator: e.target.value })} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-lg text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Kode Unit</label>
                    <input type="text" value={timesheetForm.unitCode} onChange={(e) => setTimesheetForm({ ...timesheetForm, unitCode: e.target.value })} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-lg text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Nama Penyewa</label>
                    <input type="text" value={timesheetForm.namaPenyewa} onChange={(e) => setTimesheetForm({ ...timesheetForm, namaPenyewa: e.target.value })} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-lg text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">HM Start</label>
                    <input type="text" value={timesheetForm.hmStart} onChange={(e) => setTimesheetForm({ ...timesheetForm, hmStart: e.target.value })} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-lg text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">HM End</label>
                    <input type="text" value={timesheetForm.hmEnd} onChange={(e) => setTimesheetForm({ ...timesheetForm, hmEnd: e.target.value })} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-lg text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Keterangan</label>
                    <input type="text" value={timesheetForm.keterangan} onChange={(e) => setTimesheetForm({ ...timesheetForm, keterangan: e.target.value })} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-lg text-xs text-white" />
                  </div>
                </div>
                <button type="submit" className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl cursor-pointer">
                  Simpan Timesheet ke Sistem & Spreadsheet
                </button>
              </form>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-[11px]">
                  <thead>
                    <tr className="bg-[#121824] border-b border-slate-800 text-slate-400 uppercase">
                      <th className="py-2.5 px-3">ID</th>
                      <th className="py-2.5 px-3">Tanggal</th>
                      <th className="py-2.5 px-3">Operator</th>
                      <th className="py-2.5 px-3">Unit</th>
                      <th className="py-2.5 px-3">Penyewa</th>
                      <th className="py-2.5 px-3">HM Start</th>
                      <th className="py-2.5 px-3">HM End</th>
                      <th className="py-2.5 px-3 text-amber-400">Total HM</th>
                      <th className="py-2.5 px-3">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {timesheetList.map(ts => (
                      <tr key={ts.id} className="hover:bg-[#121824]/40">
                        <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">{ts.id}</td>
                        <td className="py-2.5 px-3 text-slate-300">{ts.tanggal}</td>
                        <td className="py-2.5 px-3 font-bold text-white">{ts.operator}</td>
                        <td className="py-2.5 px-3 text-teal-300 font-bold">{ts.unitCode}</td>
                        <td className="py-2.5 px-3 text-slate-200">{ts.namaPenyewa}</td>
                        <td className="py-2.5 px-3 font-mono">{ts.hmStart}</td>
                        <td className="py-2.5 px-3 font-mono">{ts.hmEnd}</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-amber-400">{ts.totalHm}</td>
                        <td className="py-2.5 px-3 text-slate-400">{ts.keterangan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
