import React, { useState } from 'react';

export default function DeltaPerkasaApp() {
  // State untuk navigasi antar divisi: 'sales', 'timesheet', atau 'operator'
  const [activeTab, setActiveTab] = useState('sales');

  // State Form Sales Order
  const [soData, setSoData] = useState({
    customer: '',
    project: '',
    unit: 'Excavator 20 Ton',
    operator: '',
    startDate: '',
    notes: ''
  });

  // State Admin Timesheet Harian
  const [timesheetList, setTimesheetList] = useState([
    { id: 1, date: '2026-09-12', unit: 'EXC-01', operator: 'Budi', hmStart: 1200, hmEnd: 1208, total: 8 }
  ]);
  const [tsInput, setTsInput] = useState({ date: '', unit: '', operator: '', hmStart: '', hmEnd: '' });

  // State Kontrol Lapangan & Instruksi Logistik
  const [logisticsList, setLogisticsList] = useState([
    { id: 1, unit: 'Vibro Roller', destination: 'Project Makassar ByPass', status: 'Persiapan Loading', driver: 'Pak Joko' }
  ]);
  const [logInput, setLogInput] = useState({ unit: '', destination: '', status: 'Persiapan Loading', driver: '' });

  // Handler Kirim WhatsApp Sales Order
  const handleSendSO = (e) => {
    e.preventDefault();
    const text = `*SALES ORDER - DELTA PERKASA*\n\n` +
      `Customer: ${soData.customer}\n` +
      `Proyek: ${soData.project}\n` +
      `Unit: ${soData.unit}\n` +
      `Operator: ${soData.operator}\n` +
      `Mulai: ${soData.startDate}\n` +
      `Catatan: ${soData.notes}`;
    window.open(`https://wa.me/6285165659907?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Handler Tambah Timesheet
  const handleAddTimesheet = (e) => {
    e.preventDefault();
    const total = Number(tsInput.hmEnd) - Number(tsInput.hmStart);
    setTimesheetList([...timesheetList, { id: Date.now(), ...tsInput, total: total > 0 ? total : 0 }]);
    setTsInput({ date: '', unit: '', operator: '', hmStart: '', hmEnd: '' });
  };

  // Handler Tambah Logistik
  const handleAddLogistics = (e) => {
    e.preventDefault();
    setLogisticsList([...logisticsList, { id: Date.now(), ...logInput }]);
    setLogInput({ unit: '', destination: '', status: 'Persiapan Loading', driver: '' });
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans p-4 md:p-6">
      {/* Header Utama */}
      <div className="max-w-4xl mx-auto bg-slate-900 text-white p-4 rounded-xl shadow-md mb-6 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide">DELTA PERKASA - SISTEM DIVISI</h1>
        
        {/* Tombol Navigasi / Pemisah Link Divisi */}
        <div className="flex gap-2 mt-3 md:mt-0 overflow-x-auto w-full md:w-auto">
          <button 
            onClick={() => setActiveTab('sales')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'sales' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 hover:bg-slate-700'}`}
          >
            Link Sales (SO)
          </button>
          <button 
            onClick={() => setActiveTab('timesheet')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'timesheet' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 hover:bg-slate-700'}`}
          >
            Admin Timesheet
          </button>
          <button 
            onClick={() => setActiveTab('operator')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'operator' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 hover:bg-slate-700'}`}
          >
            Kepala Operator / Logistik
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* DIVISI 1: SALES ORDER */}
        {activeTab === 'sales' && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Form Sales Order (Divisi Sales)</h2>
            <form onSubmit={handleSendSO} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Customer / PT</label>
                <input 
                  type="text" 
                  className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-500"
                  value={soData.customer}
                  onChange={(e) => setSoData({...soData, customer: e.target.value})}
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Lokasi Proyek</label>
                <input 
                  type="text" 
                  className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-500"
                  value={soData.project}
                  onChange={(e) => setSoData({...soData, project: e.target.value})}
                  required 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Pilihan Unit</label>
                  <select 
                    className="w-full border rounded-lg p-2.5 text-sm"
                    value={soData.unit}
                    onChange={(e) => setSoData({...soData, unit: e.target.value})}
                  >
                    <option>Excavator 20 Ton (Komatsu/Kobelco)</option>
                    <option>Mini Excavator</option>
                    <option>Vibro Roller</option>
                    <option>Bulldozer</option>
                    <option>Motor Grader</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Rencana Tanggal Mulai</label>
                  <input 
                    type="date" 
                    className="w-full border rounded-lg p-2.5 text-sm"
                    value={soData.startDate}
                    onChange={(e) => setSoData({...soData, startDate: e.target.value})}
                    required 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Catatan Tambahan / Lampiran Alat</label>
                <textarea 
                  className="w-full border rounded-lg p-2.5 text-sm"
                  rows="3"
                  value={soData.notes}
                  onChange={(e) => setSoData({...soData, notes: e.target.value})}
                  placeholder="Contoh: Tambah Bucket / Breaker"
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-lg hover:bg-emerald-700 transition">
                Kirim Sales Order via WhatsApp 🚀
              </button>
            </form>
          </div>
        )}

        {/* DIVISI 2: ADMIN TIMESHEET */}
        {activeTab === 'timesheet' && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Input & Rekap Timesheet Harian (Admin)</h2>
            <form onSubmit={handleAddTimesheet} className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6 bg-slate-50 p-4 rounded-lg border">
              <input 
                type="date" 
                className="border rounded-lg p-2 text-sm"
                value={tsInput.date}
                onChange={(e) => setTsInput({...tsInput, date: e.target.value})}
                required 
              />
              <input 
                type="text" 
                placeholder="Kode Unit (Cth: EXC-02)" 
                className="border rounded-lg p-2 text-sm"
                value={tsInput.unit}
                onChange={(e) => setTsInput({...tsInput, unit: e.target.value})}
                required 
              />
              <input 
                type="text" 
                placeholder="Nama Operator" 
                className="border rounded-lg p-2 text-sm"
                value={tsInput.operator}
                onChange={(e) => setTsInput({...tsInput, operator: e.target.value})}
                required 
              />
              <input 
                type="number" 
                placeholder="HM Start" 
                className="border rounded-lg p-2 text-sm"
                value={tsInput.hmStart}
                onChange={(e) => setTsInput({...tsInput, hmStart: e.target.value})}
                required 
              />
              <div className="flex gap-2">
                <input 
                  type="number" 
                  placeholder="HM End" 
                  className="border rounded-lg p-2 text-sm w-full"
                  value={tsInput.hmEnd}
                  onChange={(e) => setTsInput({...tsInput, hmEnd: e.target.value})}
                  required 
                />
                <button type="submit" className="bg-amber-500 text-slate-950 px-4 rounded-lg font-bold hover:bg-amber-600">+</button>
              </div>
            </form>

            {/* Tabel Data */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-200 text-slate-700">
                    <th className="p-2 border">Tanggal</th>
                    <th className="p-2 border">Unit</th>
                    <th className="p-2 border">Operator</th>
                    <th className="p-2 border">HM Start</th>
                    <th className="p-2 border">HM End</th>
                    <th className="p-2 border">Total Jam (Jam Kerja)</th>
                  </tr>
                </thead>
                <tbody>
                  {timesheetList.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-slate-50">
                      <td className="p-2 border">{item.date}</td>
                      <td className="p-2 border font-medium">{item.unit}</td>
                      <td className="p-2 border">{item.operator}</td>
                      <td className="p-2 border">{item.hmStart}</td>
                      <td className="p-2 border">{item.hmEnd}</td>
                      <td className="p-2 border font-bold text-emerald-600">{item.total} Jam</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* DIVISI 3: KEPALA OPERATOR & LOGISTIK */}
        {activeTab === 'operator' && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Kontrol Lapangan & Instruksi Logistik Unit</h2>
            <form onSubmit={handleAddLogistics} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6 bg-slate-50 p-4 rounded-lg border">
              <input 
                type="text" 
                placeholder="Nama/Kode Unit" 
                className="border rounded-lg p-2 text-sm"
                value={logInput.unit}
                onChange={(e) => setLogInput({...logInput, unit: e.target.value})}
                required 
              />
              <input 
                type="text" 
                placeholder="Lokasi / Tujuan Proyek" 
                className="border rounded-lg p-2 text-sm"
                value={logInput.destination}
                onChange={(e) => setLogInput({...logInput, destination: e.target.value})}
                required 
              />
              <select 
                className="border rounded-lg p-2 text-sm"
                value={logInput.status}
                onChange={(e) => setLogInput({...logInput, status: e.target.value})}
              >
                <option value="Persiapan Loading">Persiapan Loading</option>
                <option value="Dalam Perjalanan (Towing)">Dalam Perjalanan (Towing)</option>
                <option value="Tiba di Lokasi / Siap Operasi">Tiba di Lokasi / Siap Operasi</option>
                <option value="Standby / Maintenance">Standby / Maintenance</option>
              </select>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Nama Driver/Pengawal" 
                  className="border rounded-lg p-2 text-sm w-full"
                  value={logInput.driver}
                  onChange={(e) => setLogInput({...logInput, driver: e.target.value})}
                  required 
                />
                <button type="submit" className="bg-amber-500 text-slate-950 px-4 rounded-lg font-bold hover:bg-amber-600">+</button>
              </div>
            </form>

            {/* List Status Lapangan */}
            <div className="space-y-3">
              {logisticsList.map((log) => (
                <div key={log.id} className="border p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-50 gap-2">
                  <div>
                    <h3 className="font-bold text-slate-900">{log.unit}</h3>
                    <p className="text-sm text-slate-600">Tujuan: {log.destination} | Driver: {log.driver}</p>
                  </div>
                  <div>
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full border border-amber-300">
                      {log.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
