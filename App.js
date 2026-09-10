import React, { useState } from 'react';

export default function SalesOrderForm() {
  const [formData, setFormData] = useState({
    noOrder: 'SO-' + Math.floor(1000 + Math.random() * 9000),
    customer: '',
    namaProyek: '',
    lokasi: '',
    sales: 'ANS',
    jenisAlat: 'Excavator 20 Ton',
    jumlahUnit: 1,
    durasi: '',
    status: 'Menunggu Kode Unit'
  });

  const [notification, setNotification] = useState({ show: false, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotification({
      show: true,
      message: `Sales Order #${formData.noOrder} berhasil diterbitkan via ${formData.sales}!`
    });
  };

  // DAFTAR SALES UTAMA (Hanya inisial saja tanpa nama panjang)
  const salesOptions = [
    { label: 'ANS', value: 'ANS' },
    { label: 'UCI', value: 'UCI' },
    { label: 'CDP', value: 'CDP' },
    { label: 'FAN', value: 'FAN' },
    { label: 'MFS', value: 'MFS' }
  ];

  const alatOptions = [
    { label: 'Excavator 20 Ton', value: 'Excavator 20 Ton' },
    { label: 'Excavator Mini', value: 'Excavator Mini' },
    { label: 'Vibro Roller', value: 'Vibro Roller' },
    { label: 'Bulldozer', value: 'Bulldozer' },
    { label: 'Motor Grader', value: 'Motor Grader' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-2xl font-black text-white mb-1">STEP 1: Form Sales Order</h1>
        <p className="text-xs text-blue-400 mb-6 uppercase tracking-wider font-bold">CV Chandra Delta Perkasa - Rental Alat Berat Sulawesi</p>

        {notification.show && (
          <div className="mb-6 p-4 bg-emerald-950 border border-emerald-500 text-emerald-200 rounded-xl text-sm font-medium">
            {notification.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">No. Order (Otomatis)</label>
            <input type="text" value={formData.noOrder} disabled className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-blue-400 font-mono text-sm" />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nama Customer / PT / CV</label>
            <input type="text" name="customer" value={formData.customer} onChange={handleChange} placeholder="Contoh: PT Mahligai Artha Sejahtera" required className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nama Proyek</label>
              <input type="text" name="namaProyek" value={formData.namaProyek} onChange={handleChange} placeholder="Contoh: Land Clearing" required className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Lokasi Proyek</label>
              <input type="text" name="lokasi" value={formData.lokasi} onChange={handleChange} placeholder="Contoh: Takalar" required className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Sales / VIA</label>
              <select name="sales" value={formData.sales} onChange={handleChange} className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer">
                {salesOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Jenis Alat</label>
              <select name="jenisAlat" value={formData.jenisAlat} onChange={handleChange} className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer">
                {alatOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Jumlah Unit</label>
              <input type="number" name="jumlahUnit" min="1" value={formData.jumlahUnit} onChange={handleChange} required className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>

          <button type="submit" className="w-full mt-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer">
            Terbitkan Sales Order (Simpan) &rarr;
          </button>
        </form>
      </div>
    </div>
  );
}
