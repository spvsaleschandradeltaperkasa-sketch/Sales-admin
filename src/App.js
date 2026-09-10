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
    status: 'Belum Ada Kode Unit'
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulasi pengiriman sukses (Nanti kita sambungkan langsung ke Google Sheets)
    setTimeout(() => {
      setLoading(false);
      setSuccess(`Berhasil! Nomor Order ${formData.noOrder} diterbitkan (Status: Belum Ada Kode Unit).`);
      setFormData({
        noOrder: 'SO-' + Math.floor(1000 + Math.random() * 9000),
        customer: '',
        namaProyek: '',
        lokasi: '',
        sales: 'ANS',
        jenisAlat: 'Excavator 20 Ton',
        jumlahUnit: 1,
        durasi: '',
        status: 'Belum Ada Kode Unit'
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 flex justify-center items-center font-sans">
      <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl w-full max-w-2xl shadow-2xl">
        <div className="mb-6 border-b border-gray-800 pb-4">
          <h1 className="text-2xl font-bold text-blue-400">STEP 1: Form Sales Order</h1>
          <p className="text-sm text-gray-400 mt-1">CV Chandra Delta Perkasa - Rental Alat Berat Sulawesi</p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-900/50 border border-green-600 text-green-200 rounded-xl text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">No. Order (Otomatis)</label>
            <input type="text" value={formData.noOrder} disabled className="w-full p-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-400 cursor-not-allowed font-mono" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Nama Customer / PT / CV</label>
            <input type="text" name="customer" value={formData.customer} onChange={handleChange} required placeholder="Contoh: PT Mahligai Artha Sejahtera" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-blue-500 focus:outline-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Nama Proyek</label>
              <input type="text" name="namaProyek" value={formData.namaProyek} onChange={handleChange} required placeholder="Contoh: Land Clearing 44" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-blue-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Lokasi Proyek</label>
              <input type="text" name="lokasi" value={formData.lokasi} onChange={handleChange} required placeholder="Contoh: Makassar / Gowa" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-blue-500 focus:outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Sales / VIA</label>
              <select name="sales" value={formData.sales} onChange={handleChange} className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-blue-500 focus:outline-none">
                <option value="ANS">ANS</option>
                <option value="CDP">CDP</option>
                <option value="FAN">FAN</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Jenis Alat</label>
              <select name="jenisAlat" value={formData.jenisAlat} onChange={handleChange} className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-blue-500 focus:outline-none">
                <option value="Excavator 20 Ton">Excavator 20 Ton</option>
                <option value="Excavator Mini">Excavator Mini</option>
                <option value="Vibro Roller">Vibro Roller</option>
                <option value="Bulldozer">Bulldozer</option>
                <option value="Motor Grader">Motor Grader</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Jumlah Unit</label>
              <input type="number" name="jumlahUnit" min="1" value={formData.jumlahUnit} onChange={handleChange} required className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-blue-500 focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Durasi Sewa</label>
            <input type="text" name="durasi" value={formData.durasi} onChange={handleChange} required placeholder="Contoh: 1 Bulan / 100 Jam" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-blue-500 focus:outline-none" />
          </div>

          <button type="submit" disabled={loading} className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition duration-200 shadow-lg shadow-blue-900/50 mt-6 cursor-pointer">
            {loading ? 'Memproses Order...' : 'Terbitkan Sales Order (Simpan) →'}
          </button>
        </form>
      </div>
    </div>
  );
}
