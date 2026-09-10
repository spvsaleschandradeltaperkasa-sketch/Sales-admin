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

  // State untuk menyimpan daftar Sales Order yang sudah diterbitkan
  const [orderList, setOrderList] = useState([
    {
      id: 'SO-7208',
      customer: 'PT Mahligai Artha Sejahtera',
      namaProyek: 'Land Clearing 44',
      lokasi: 'Makassar',
      sales: 'ANS',
      jenisAlat: 'Excavator 20 Ton - Bucket',
      jumlahUnit: 1,
      status: 'Menunggu Alokasi Unit'
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
      status: 'Menunggu Alokasi Unit'
    };

    setOrderList([newOrder, ...orderList]);
    setNotification({
      show: true,
      message: `Sales Order #${newOrderNo} berhasil diterbitkan via ${formData.sales}!`
    });

    // Reset form input utama
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
      <div className="max-w-5xl w-full space-y-8">
        
        {/* FORM SECTION */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <h1 className="text-2xl font-black text-white mb-1">STEP 1: Form Sales Order</h1>
          <p className="text-xs text-blue-400 mb-6 uppercase tracking-wider font-bold">CV Chandra Delta Perkasa - Rental Alat Berat Sulawesi</p>

          {notification.show && (
            <div className="mb-6 p-4 bg-emerald-950 border border-emerald-500 text-emerald-200 rounded-xl text-sm font-medium animate-pulse">
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

        {/* REKAP TABLE SECTION */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-black text-white">STEP 2: Tabel Rekap & Status Unit</h2>
              <p className="text-xs text-slate-400">Monitoring real-time order rental alat berat masuk</p>
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
                  <th className="py-3 px-4">Unit</th>
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
                    <td className="py-4 px-4 font-bold">{order.jumlahUnit} Unit</td>
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
