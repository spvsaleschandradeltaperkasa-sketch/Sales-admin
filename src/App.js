import React, { useState } from 'react';

export default function SalesOrderDashboard() {
  const [formData, setFormData] = useState({
    customer: '',
    namaProyek: '',
    lokasi: '',
    sales: 'ANS',
    jenisAlat: 'Excavator 20 Ton - Bucket',
    jumlahUnit: 1
  });

  // Daftar lengkap kode unit CV Chandra Delta Perkasa
  const unitPool = [
    'EXC.01', 'EXC.03', 'EXC.04', 'EXC.05', 'EXC.06', 'EXC.07', 'EXC.08', 'EXC.09', 'EXC.11', 'EXC.12', 'EXC.14', 'EXC.15', 'EXC.16', 'EXC.17', 'EXC.18', 'EXC.19', 'EXC.20', 'EXC.21', 'EXC.24', 'EXC.25', 'EXC.26', 'EXC.27', 'EXC.28', 'EXC.29', 'EXC.30', 'EXC.31', 'EXC.32', 'EXC.33', 'EXC.34', 'EXC.35', 'EXC.36', 'EXC.37', 'EXC.38', 'EXC.39', 'EXC.40', 'EXC.41', 'EXC.42', 'EXC.43', 'EXC.44', 'EXC.45', 'EXC.46', 'EXC.47', 'EXC.48', 'EXC.49', 'EXC.50', 'EXC.51', 'EXC.52', 'EXC.53', 'EXC.54', 'EXC.55', 'EXC.56', 'EXC.57', 'EXC.58', 'EXC.59', 'EXC.60', 'EXC.61', 'EXC.62', 'EXC.63', 'EXC.64', 'EXC.65', 'EXC.66', 'EXC.67', 'EXC.68', 'EXC.69', 'EXC.70', 'EXC.71', 'EXC.72', 'EXC.73', 'EXC.74', 'EXC.75', 'EXC.76', 'EXC.77', 'EXC.80', 'EXC.81', 'EXC.82', 'EXC.83', 'EXC.84', 'EXC.85', 'EXC.86', 'EXC.87', 'EXC.88', 'EXC.89', 'EXC.90', 'EXC.91', 'EXC.92', 'EXC.93', 'EXC.94', 'EXC.95', 'EXC.96', 'EXC.97', 'EXC.98', 'EXC.201', 'EXC.202', 'EXC.203', 'EXC.204', 'EXC.205', 'EXC.206', 'EXC.207', 'EXC.208', 'EXC.209', 'EXC.210', 'EXC.211', 'EXC.212', 'EXC.213', 'EXC.214', 'EXC.215', 'EXC.301', 'EXC.302', 'EXC.303', 'EXC.304', 'EXC.305', 'EXC.306', 'EXC.307', 'EXC.308', 'EXC.309',
    'MG-1', 'MG-2', 'MG-3', 'MG-4', 'MG-5',
    'MC.01',
    'D.02', 'D.03',
    'VBR.01', 'VBR.04', 'VBR.05', 'VBR.06', 'VBR.07', 'VBR.08', 'VBR.09', 'VBR.TW.02',
    'DT.01', 'DT.02', 'DT.03', 'DT.05', 'DT.07', 'DT.08', 'DT.09', 'DT.10', 'DT.11', 'DT.12', 'DT.15', 'DT.16', 'DT.17', 'DT.18', 'DT.19', 'DT.20', 'DT.21', 'DT.22', 'DT.23', 'DT.24', 'DT.25', 'DT.26', 'DT.27', 'DT.28', 'DT.29'
  ];

  const [orderList, setOrderList] = useState([
    {
      id: 'SO-7208',
      customer: 'PT Mahligai Artha Sejahtera',
      namaProyek: 'Land Clearing 44',
      lokasi: 'Makassar',
      sales: 'ANS',
      jenisAlat: 'Excavator 20 Ton - Bucket',
      jumlahUnit: 1,
      kodeUnit: 'EXC.05',
      status: 'Unit Ready / Dispatched'
    }
  ]);

  const [notification, setNotification] = useState({ show: false, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrderNo = 'SO-' + Math.floor(1000 + Math.random() * 9000);
    
    const newOrder = {
      id: newOrderNo,
      ...formData,
      kodeUnit: 'Belum Dipilih',
      status: 'Menunggu Alokasi Unit'
    };

    setOrderList([newOrder, ...orderList]);
    setNotification({
      show: true,
      message: `Sales Order #${newOrderNo} berhasil diterbitkan via ${formData.sales}!`
    });

    setFormData({
      customer: '',
      namaProyek: '',
      lokasi: '',
      sales: 'ANS',
      jenisAlat: 'Excavator 20 Ton - Bucket',
      jumlahUnit: 1
    });

    setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 4000);
  };

  const updateKodeUnit = (id, newKodeUnit) => {
    setOrderList(orderList.map(order => 
      order.id === id ? { ...order, kodeUnit: newKodeUnit } : order
    ));
  };

  const updateStatus = (id, newStatus) => {
    setOrderList(orderList.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  const salesOptions = [
    { label: 'ANS', value: 'ANS' },
    { label: 'UCI', value: 'UCI' },
    { label: 'CDP', value: 'CDP' },
    { label: 'FAN', value: 'FAN' }
  ];

  const alatOptions = [
    { label: 'Excavator 20 Ton - Bucket', value: 'Excavator 20 Ton - Bucket' },
    { label: 'Excavator 20 Ton - Breaker', value: 'Excavator 20 Ton - Breaker' },
    { label: 'Excavator 20 Ton - Bucket & Breaker', value: 'Excavator 20 Ton - Bucket & Breaker' },
    { label: 'Excavator Mini SY55 - Bucket', value: 'Excavator Mini SY55 - Bucket' },
    { label: 'Excavator Mini SY55 - Breaker', value: 'Excavator Mini SY55 - Breaker' },
    { label: 'Excavator Mini SY55 - Bucket & Breaker', value: 'Excavator Mini SY55 - Bucket & Breaker' },
    { label: 'Excavator Mini SY75 - Bucket', value: 'Excavator Mini SY75 - Bucket' },
    { label: 'Excavator Mini SY75 - Breaker', value: 'Excavator Mini SY75 - Breaker' },
    { label: 'Excavator Mini SY75 - Bucket & Breaker', value: 'Excavator Mini SY75 - Bucket & Breaker' },
    { label: 'Vibro Roller', value: 'Vibro Roller' },
    { label: 'Bulldozer', value: 'Bulldozer' },
    { label: 'Motor Grader', value: 'Motor Grader' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col items-center">
      <div className="max-w-6xl w-full space-y-8">
        
        {/* FORM SECTION */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <h1 className="text-2xl font-black text-white mb-1">STEP 1: Form Sales Order</h1>
          <p className="text-xs text-blue-400 mb-6 uppercase tracking-wider font-bold">CV Chandra Delta Perkasa - Rental Alat Berat Sulawesi</p>

          {notification.show && (
            <div className="mb-6 p-4 bg-emerald-950 border border-emerald-500 text-emerald-200 rounded-xl text-sm font-medium">
              {notification.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nama Customer / PT / CV</label>
              <input type="text" name="customer" value={formData.customer} onChange={handleChange} placeholder="Contoh: PT Mahligai Artha Sejahtera" required className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nama Proyek</label>
                <input type="text" name="namaProyek" value={formData.namaProyek} onChange={handleChange} placeholder="Contoh: Land Clearing" required className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Lokasi Proyek</label>
                <input type="text" name="lokasi" value={formData.lokasi} onChange={handleChange} placeholder="Contoh: Makassar / Gowa" required className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Sales / VIA</label>
                <select name="sales" value={formData.sales} onChange={handleChange} className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer">
                  {salesOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Jenis Alat & Attachment</label>
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
              Terbitkan Sales Order & Simpan ke Rekap &rarr;
            </button>
          </form>
        </div>

        {/* REKAP TABLE SECTION WITH UNIT ALLOCATION */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-black text-white">STEP 2: Tabel Rekap & Alokasi Kode Unit</h2>
              <p className="text-xs text-slate-400">Pilih kode unit alat berat dan pantau status pengiriman secara real-time</p>
            </div>
            <span className="px-3 py-1 bg-blue-950 border border-blue-800 text-blue-300 text-xs font-bold rounded-full">
              Total Order: {orderList.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-xs text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">No. Order</th>
                  <th className="py-3 px-4">Customer / Proyek</th>
                  <th className="py-3 px-4">Sales</th>
                  <th className="py-3 px-4">Jenis Alat</th>
                  <th className="py-3 px-4 text-amber-400">Alokasi Kode Unit</th>
                  <th className="py-3 px-4">Status Alokasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {orderList.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-blue-400">{order.id}</td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-white">{order.customer}</div>
                      <div className="text-xs text-slate-400">{order.namaProyek} ({order.lokasi})</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 bg-slate-800 text-slate-200 font-bold text-xs rounded-lg">
                        {order.sales}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-300 font-medium">{order.jenisAlat}</td>
                    
                    {/* DROPDOWN PILIHAN KODE UNIT */}
                    <td className="py-4 px-4">
                      <select 
                        value={order.kodeUnit} 
                        onChange={(e) => updateKodeUnit(order.id, e.target.value)}
                        className="text-xs font-mono font-bold px-3 py-2 bg-slate-950 border border-amber-600/60 text-amber-300 rounded-lg outline-none cursor-pointer focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="Belum Dipilih">-- Pilih Unit --</option>
                        {unitPool.map((unit) => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </td>

                    <td className="py-4 px-4">
                      <select 
                        value={order.status} 
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border outline-none cursor-pointer ${
                          order.status === 'Menunggu Alokasi Unit' 
                            ? 'bg-amber-950/50 border-amber-600 text-amber-300' 
                            : order.status === 'Unit Ready / Dispatched' 
                            ? 'bg-emerald-950/50 border-emerald-600 text-emerald-300' 
                            : 'bg-blue-950/50 border-blue-600 text-blue-300'
                        }`}
                      >
                        <option value="Menunggu Alokasi Unit">Menunggu Alokasi Unit</option>
                        <option value="Unit Ready / Dispatched">Unit Ready / Dispatched</option>
                        <option value="Selesai / Close">Selesai / Close</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
