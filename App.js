import React, { useState } from 'react';

// --- Komponen Kecil untuk Input Field agar kode lebih rapi ---
const InputField = ({ label, id, name, value, onChange, placeholder, type = "text", required = false, disabled = false }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1.5">
      {label} {required && <span className="text-red-400">*</span>}
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
      className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 
                focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150
                ${disabled ? 'opacity-60 cursor-not-allowed bg-gray-800/50' : ''}`}
    />
  </div>
);

const SelectField = ({ label, id, name, value, onChange, options, required = false }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1.5">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white appearance-none
                focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150
                bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'16'%20height%3D'16'%20viewBox%3D'0%200%2024%2024'%20fill%3D'none'%20stroke%3D'%239ca3af'%20stroke-width%3D'2'%20stroke-linecap%3D'round'%20stroke-linejoin%3D'round'%3E%3Cpath%20d%3D'M6%209l6%206%206-6'%2F%3E%3C%2Fsvg%3E')] 
                bg-[center_right_1rem] bg-no-repeat pr-10"
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

// --- Komponen Utama Halaman Form ---
export default function SalesOrderForm() {
  const [formData, setFormData] = useState({
    noOrder: 'CDP-SO-' + Date.now().toString().slice(-6), // Nomor unik sederhana berbasis waktu
    customer: '',
    namaProyek: '',
    lokasi: '',
    sales: 'ANS',
    jenisAlat: 'Excavator 20 Ton',
    jumlahUnit: 1,
    durasi: '',
    status: 'Belum Ada Kode Unit'
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

    // Simulasi koneksi ke Google Sheets (akan kita buat nanti)
    console.log("Mengirim data:", formData);

    setTimeout(() => {
      setLoading(false);
      if (formData.customer) {
        setNotification({
          show: true,
          message: `Sukses! Sales Order #${formData.noOrder} untuk ${formData.customer} telah diterbitkan.`,
          type: 'success'
        });
        // Reset Form kecuali No Order baru
        setFormData(prevState => ({
            ...prevState,
            noOrder: 'CDP-SO-' + Date.now().toString().slice(-6),
            customer: '',
            namaProyek: '',
            lokasi: '',
            durasi: ''
        }));
      } else {
         setNotification({ show: true, message: 'Gagal: Mohon lengkapi data customer.', type: 'error' });
      }
    }, 1200);
  };

  // Opsi Dropdown
  const salesOptions = [{label: 'ANS', value: 'ANS'}, {label: 'CDP', value: 'CDP'}, {label: 'FAN', value: 'FAN'}, {label: 'MFS', value: 'MFS'}];
  const alatOptions = [
      {label: 'Excavator 20 Ton', value: 'Excavator 20 Ton'},
      {label: 'Excavator 30 Ton', value: 'Excavator 30 Ton'},
      {label: 'Excavator Mini', value: 'Excavator Mini'},
      {label: 'Bulldozer D6R', value: 'Bulldozer D6R'},
      {label: 'Bulldozer D85', value: 'Bulldozer D85'},
      {label: 'Vibro Roller Sakai', value: 'Vibro Roller Sakai'},
      {label: 'Motor Grader', value: 'Motor Grader'},
      {label: 'Dump Truck 10 Roda', value: 'Dump Truck 10 Roda'}
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 md:p-8 font-sans antialiased">
      {/* Header Dashboard Style */}
      <header className="flex items-center justify-between pb-6 mb-8 border-b border-gray-800">
        <div className='flex items-center gap-4'>
            <div className="p-3 bg-blue-950 rounded-2xl border border-blue-800">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            </div>
            <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Sales & Operasional Dashboard</h1>
                <p className="text-gray-400">CV Chandra Delta Perkasa - Sistem Input Pesanan Sewa</p>
            </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className='text-sm font-medium text-gray-300'>Admin Sales Online</span>
          <img src={`https://api.dicebear.com/8.x/avataaars/svg?seed=cdpadmin`} alt="Admin Avatar" className="w-10 h-10 rounded-full border-2 border-gray-700 bg-gray-800"/>
        </div>
      </header>

      {/* Main Content Area - Centered Card */}
      <main className="max-w-5xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl shadow-black/20 p-6 md:p-10">
          
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-blue-400 tracking-tight">FORMULIR PENERBITAN SALES ORDER</h2>
            <p className="text-gray-400 mt-1.5 max-w-2xl">Lengkapi data pesanan sewa alat berat di bawah ini dengan teliti. Nomor Order akan terbit otomatis. Setelah ini, Admin Operasional akan menetapkan kode unit (Step 2).</p>
          </div>

          {/* Notifikasi Feedback */}
          {notification.show && (
            <div className={`mb-8 p-5 rounded-xl border ${notification.type === 'success' ? 'bg-green-950/50 border-green-600 text-green-100' : 'bg-red-950/50 border-red-600 text-red-100'} flex items-start gap-4 shadow-lg`}>
                <svg className={`w-6 h-6 mt-0.5 flex-shrink-0 ${notification.type === 'success' ? 'text-green-400' : 'text-red-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={notification.type === 'success' ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"}></path></svg>
                <p className='text-sm leading-relaxed'>{notification.message}</p>
                <button type="button" onClick={() => setNotification({show:false})} className='ml-auto text-gray-400 hover:text-white'><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
            </div>
          )}

          {/* Grid Layout Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Kolom Kiri */}
            <div className="space-y-6">
                <InputField 
                    label="No. Sales Order (Sistem)" 
                    id="noOrder" 
                    name="noOrder" 
                    value={formData.noOrder} 
                    disabled 
                    className="font-mono tracking-wide"
                />
                <InputField 
                    label="Nama Customer / PT / CV" 
                    id="customer" 
                    name="customer" 
                    value={formData.customer} 
                    onChange={handleChange} 
                    placeholder="Cth: PT Mahligai Artha Sejahtera" 
                    required 
                />
                <InputField 
                    label="Nama Proyek" 
                    id="namaProyek" 
                    name="namaProyek" 
                    value={formData.namaProyek} 
                    onChange={handleChange} 
                    placeholder="Cth: Land Clearing Ruas 44" 
                    required 
                />
                <InputField 
                    label="Lokasi / Wilayah Proyek" 
                    id="lokasi" 
                    name="lokasi" 
                    value={formData.lokasi} 
                    onChange={handleChange} 
                    placeholder="Cth: Morowali, Sulawesi Tengah" 
                    required 
                />
            </div>

            {/* Kolom Kanan */}
            <div className="space-y-6">
                <SelectField 
                    label="Sales Person / VIA" 
                    id="sales" 
                    name="sales" 
                    value={formData.sales} 
                    onChange={handleChange} 
                    options={salesOptions} 
                    required
                />
                <SelectField 
                    label="Jenis Alat Berat Utama" 
                    id="jenisAlat" 
                    name="jenisAlat" 
                    value={formData.jenisAlat} 
                    onChange={handleChange} 
                    options={alatOptions} 
                    required
                />
                 <div className="grid grid-cols-2 gap-4">
                    <InputField 
                        label="Jumlah Unit" 
                        id="jumlahUnit" 
                        name="jumlahUnit" 
                        type="number" 
                        value={formData.jumlahUnit} 
                        onChange={handleChange} 
                        min="1" 
                        required 
                    />
                    <InputField 
                        label="Durasi Sewa Estimasi" 
                        id="durasi" 
                        name="durasi" 
                        value={formData.durasi} 
                        onChange={handleChange} 
                        placeholder="Cth: 2 Bulan" 
                        required 
                    />
                 </div>
                <InputField 
                    label="Status Awal (Otomatis)" 
                    id="status" 
                    name="status" 
                    value={formData.status} 
                    disabled 
                    required 
                />
            </div>
          </div>

          {/* Tombol Submit */}
          <div className="mt-12 pt-8 border-t border-gray-800 flex items-center justify-between gap-6">
            <p className='text-sm text-gray-500'>*Pastikan data yang dimasukkan sudah sesuai Purchase Order (PO) atau kontrak sementara.</p>
            <button 
              type="submit" 
              disabled={loading} 
              className={`group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-bold rounded-2xl shadow-lg transition-all duration-300 ease-out
                        ${loading ? 'bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-900/50'}`}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative flex items-center gap-3">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7
