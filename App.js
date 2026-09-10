import React, { useState } from 'react';

const InputField = ({ label, id, name, value, onChange, placeholder, type = "text", required = false, disabled = false }) => (
  <div className="space-y-1.5">
    <label htmlFor={id} className="block text-xs font-bold uppercase tracking-wider text-slate-400">
      {label} {required && <span className="text-amber-400">*</span>}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className={`w-full px-4 py-3 bg-slate-900 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-inner
                ${disabled ? 'opacity-60 cursor-not-allowed bg-slate-950/60 font-mono text-blue-400' : ''}`}
    />
  </div>
);

const SelectField = ({ label, id, name, value, onChange, options, required = false }) => (
  <div className="space-y-1.5">
    <label htmlFor={id} className="block text-xs font-bold uppercase tracking-wider text-slate-400">
      {label} {required && <span className="text-amber-400">*</span>}
    </label>
    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 bg-slate-900 border border-slate-700/80 rounded-xl text-slate-100 text-sm appearance-none
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-10 cursor-pointer"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value} className="bg-slate-900 text-slate-100">{opt.label}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </div>
    </div>
  </div>
);

export default function SalesOrderForm() {
  const [formData, setFormData] = useState({
    noOrder: 'CDP-SO-' + Math.floor(100000 + Math.random() * 900000),
    customer: '',
    namaProyek: '',
    lokasi: '',
    sales: 'ANS',
    jenisAlat: 'Excavator 20 Ton',
    jumlahUnit: 1,
    durasi: '',
    status: 'Menunggu Kode Unit'
  });

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setNotification({ show: false, message: '', type: '' });

    setTimeout(() => {
      setLoading(false);
      setNotification({
        show: true,
        message: `Berhasil! Sales Order #${formData.noOrder} untuk "${formData.customer}" berhasil diterbitkan via ${formData.sales}.`,
        type: 'success'
      });
      setFormData(prev => ({
        ...prev,
        noOrder: 'CDP-SO-' + Math.floor(100000 + Math.random() * 900000),
        customer: '',
        namaProyek: '',
        lokasi: '',
        durasi: ''
      }));
    }, 1000);
  };

  // Daftar Sales diperbarui lengkap termasuk UCI
  const salesOptions = [
    { label: 'ANS (Andi Nur Shadrina)', value: 'ANS' },
    { label: 'UCI (Suci)', value: 'UCI' },
    { label: 'CDP (Chandra Delta Pusat)', value: 'CDP' },
    { label: 'FAN (Fandi Ahmad)', value: 'FAN' },
    { label: 'MFS (Muh. Faisal)', value: 'MFS' }
  ];

  const alatOptions = [
    { label: 'Excavator 20 Ton (Komatsu / Kobelco)', value: 'Excavator 20 Ton' },
    { label: 'Excavator Mini (PC 55 / 75)', value: 'Excavator Mini' },
    { label: 'Vibro Roller (Sakai / Compactor)', value: 'Vibro Roller' },
    { label: 'Bulldozer (D6R / D85)', value: 'Bulldozer' },
    { label: 'Motor Grader', value: 'Motor Grader' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-slate-100 p-4 md:p-8 flex flex-col justify-between">
      <div>
        <header className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between pb-6 mb-8 border-b border-slate-800 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-lg shadow-blue-900/40 border border-blue-500/30">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-wider uppercase text-white">CV Chandra Delta Perkasa</h1>
              <p className="text-xs text-blue-400 font-medium tracking-wide">Portal Sales & Operasional Alat Berat Sulawesi</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-slate-900/80 px-4 py-2 rounded-full border border-slate-800 shadow">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-slate-300">Live Server (Makassar)</span>
          </div>
        </header>

        <main className="max-w-5xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-slate-900/90 backdrop-blur-xl border border-slate-800/80 rounded-3xl shadow-2xl shadow-black/60 p-6 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-500"></div>

            <div className="mb-8">
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400 bg-blue-950/80 px-3 py-1 rounded-full border border-blue-800/50">Step 1 dari 2</span>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-3">Formulir Penerbitan Sales Order</h2>
              <p className="text-slate-400 text-sm mt-1">Lengkapi data kontrak sewa alat berat di bawah ini dengan akurat sebelum diteruskan ke Tim Operasional.</p>
            </div>

            {notification.show && (
              <div className={`mb-8 p-4 rounded-2xl border ${notification.type === 'success' ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200' : 'bg-red-950/60 border-red-500/40 text-red-200'} flex items-start gap-3 shadow-lg`}>
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <div className="text-sm font-medium">{notification.message}</div>
                <button type="button" onClick={() => setNotification({show: false})} className="ml-auto text-slate-400 hover:text-white font-bold">&times;</button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <InputField label="No. Sales Order (Otomatis)" id="noOrder" name="noOrder" value={formData.noOrder} disabled />
                <InputField label="Nama Customer / PT / CV" id="customer" name="customer" value={formData.customer} onChange={handleChange} placeholder="Contoh: PT Mahligai Artha Sejahtera" required />
                <InputField label="Nama Proyek" id="namaProyek" name="namaProyek" value={formData.namaProyek} onChange={handleChange} placeholder="Contoh: Land Clearing Ruas 44" required />
                <InputField label="Lokasi / Wilayah Proyek" id="lokasi" name="lokasi" value={formData.lokasi} onChange={handleChange} placeholder="Contoh: Morowali, Sulawesi Tengah" required />
              </div>

              <div className="space-y-6">
                <SelectField label="Sales Person / VIA" id="sales" name="sales" value={formData.sales} onChange={handleChange} options={salesOptions} required />
                <SelectField label="Jenis Alat Berat Utama" id="jenisAlat" name="jenisAlat" value={formData.jenisAlat} onChange={handleChange} options={alatOptions} required />
                
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Jumlah Unit" id="jumlahUnit" name="jumlahUnit" type="number" min="1" value={formData.jumlahUnit} onChange={handleChange} required />
                  <InputField label="Durasi Sewa Estimasi" id="durasi" name="durasi" value={formData.durasi} onChange={handleChange} placeholder="Cth: 1 Bulan / 100 Jam" required />
                </div>

                <InputField label="Status Sistem" id="status" name="status" value={formData.status} disabled />
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-500 italic">*Pastikan data sudah diverifikasi sesuai PO fisik atau persetujuan WhatsApp customer.</p>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-xl shadow-blue-600/30 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.291z"></path></svg>
                    <span>Memproses Data...</span>
                  </>
                ) : (
                  <>
                    <span>Terbitkan Sales Order (Simpan)</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </main>
      </div>

      <footer className="max-w-5xl mx-auto w-full mt-12 text-center text-xs text-slate-500 border-t border-slate-900 pt-6">
        &copy; 2026 CV Chandra Delta Perkasa &bull; Sistem Internal Manajemen Armada Alat Berat
      </footer>
    </div>
  );
}
