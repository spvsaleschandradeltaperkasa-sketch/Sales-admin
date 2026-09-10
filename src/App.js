import React, { useState } from 'react';

export default function SalesOrderDashboard() {
  const [formData, setFormData] = useState({
    customer: '',
    namaProyek: '',
    lokasi: '',
    sales: 'ANS',
    jenisAlat: 'Excavator 20 Ton - Bucket',
    jenisSewa: 'S1',
    tipeDurasi: 'Jam',
    jumlahDurasi: 8,
    jumlahUnit: 1
  });

  const [selectedSalesFilter, setSelectedSalesFilter] = useState('ALL');
  const [selectedFleetFilter, setSelectedFleetFilter] = useState('ALL');
  const [fleetSearchQuery, setFleetSearchQuery] = useState('');

  const salesPhoneBook = {
    'ANS': '6285165659907', 
    'UCI': '6281234567891', 
    'CDP': '6285165659907', 
    'FAN': '6281234567893'  
  };

  const operatorDatabase = [
    'Baharuddin',
    'Saharuddin',
    'Rustam',
    'Amir',
    'Yusuf',
    'Aris',
    'Herman',
    'Dg. Sila',
    'Rahmat',
    'Supriadi'
  ];

  const fleetDatabase = [
    { code: 'EXC.05', class: 'Exca 20 Ton' },
    { code: 'EXC.01', class: 'Exca 20 Ton' },
    { code: 'EXC.03', class: 'Exca 20 Ton' },
    { code: 'EXC.04', class: 'Exca 20 Ton' },
    { code: 'EXC.06', class: 'Exca 20 Ton' },
    { code: 'EXC.07', class: 'Exca 20 Ton' },
    { code: 'EXC.08', class: 'Exca 20 Ton' },
    { code: 'EXC.09', class: 'Exca 20 Ton' },
    { code: 'EXC.11', class: 'Exca 20 Ton' },
    { code: 'EXC.12', class: 'Exca 20 Ton' },
    { code: 'EXC.14', class: 'Exca 20 Ton' },
    { code: 'EXC.15', class: 'Exca 20 Ton' },
    { code: 'EXC.16', class: 'Exca 20 Ton' },
    { code: 'EXC.17', class: 'Exca 20 Ton' },
    { code: 'EXC.18', class: 'Exca 20 Ton' },
    { code: 'EXC.19', class: 'Exca 20 Ton' },
    { code: 'EXC.20', class: 'Exca Mini' },
    { code: 'EXC.21', class: 'Exca Mini' },
    { code: 'EXC.24', class: 'Exca Mini' },
    { code: 'EXC.25', class: 'Exca Mini' },
    { code: 'EXC.26', class: 'Exca Mini' },
    { code: 'EXC.27', class: 'Exca Mini' },
    { code: 'EXC.28', class: 'Exca Mini' },
    { code: 'EXC.29', class: 'Exca Mini' },
    { code: 'EXC.30', class: 'Exca Mini' },
    { code: 'EXC.31', class: 'Exca Mini' },
    { code: 'EXC.32', class: 'Exca Mini' },
    { code: 'EXC.33', class: 'Exca Mini' },
    { code: 'EXC.34', class: 'Exca Mini' },
    { code: 'EXC.35', class: 'Exca Mini' },
    { code: 'EXC.36', class: 'Exca Mini' },
    { code: 'EXC.37', class: 'Exca Mini' },
    { code: 'EXC.38', class: 'Exca Mini' },
    { code: 'EXC.39', class: 'Exca Mini' },
    { code: 'EXC.40', class: 'Exca 20 Ton' },
    { code: 'EXC.41', class: 'Exca 20 Ton' },
    { code: 'EXC.42', class: 'Exca 20 Ton' },
    { code: 'EXC.43', class: 'Exca 20 Ton' },
    { code: 'EXC.44', class: 'Exca 20 Ton' },
    { code: 'EXC.45', class: 'Exca 20 Ton' },
    { code: 'EXC.46', class: 'Exca 20 Ton' },
    { code: 'EXC.47', class: 'Exca 20 Ton' },
    { code: 'EXC.48', class: 'Exca 20 Ton' },
    { code: 'EXC.49', class: 'Exca 20 Ton' },
    { code: 'EXC.50', class: 'Exca 20 Ton' },
    { code: 'EXC.51', class: 'Exca 20 Ton' },
    { code: 'EXC.52', class: 'Exca 20 Ton' },
    { code: 'EXC.53', class: 'Exca 20 Ton' },
    { code: 'EXC.54', class: 'Exca 20 Ton' },
    { code: 'EXC.55', class: 'Exca 20 Ton' },
    { code: 'EXC.56', class: 'Exca 20 Ton' },
    { code: 'EXC.57', class: 'Exca 20 Ton' },
    { code: 'EXC.58', class: 'Exca 20 Ton' },
    { code: 'EXC.59', class: 'Exca 20 Ton' },
    { code: 'EXC.60', class: 'Exca Mini' },
    { code: 'EXC.61', class: 'Exca Mini' },
    { code: 'EXC.62', class: 'Exca Mini' },
    { code: 'EXC.63', class: 'Exca Mini' },
    { code: 'EXC.64', class: 'Exca Mini' },
    { code: 'EXC.65', class: 'Exca Mini' },
    { code: 'EXC.66', class: 'Exca Mini' },
    { code: 'EXC.67', class: 'Exca Mini' },
    { code: 'EXC.68', class: 'Exca Mini' },
    { code: 'EXC.69', class: 'Exca Mini' },
    { code: 'EXC.70', class: 'Exca Mini' },
    { code: 'EXC.71', class: 'Exca Mini' },
    { code: 'EXC.72', class: 'Exca Mini' },
    { code: 'EXC.73', class: 'Exca Mini' },
    { code: 'EXC.74', class: 'Exca Mini' },
    { code: 'EXC.75', class: 'Exca Mini' },
    { code: 'EXC.76', class: 'Exca Mini' },
    { code: 'EXC.77', class: 'Exca Mini' },
    { code: 'EXC.80', class: 'Exca 20 Ton' },
    { code: 'EXC.81', class: 'Exca 20 Ton' },
    { code: 'EXC.82', class: 'Exca 20 Ton' },
    { code: 'EXC.83', class: 'Exca 20 Ton' },
    { code: 'EXC.84', class: 'Exca 20 Ton' },
    { code: 'EXC.85', class: 'Exca 20 Ton' },
    { code: 'EXC.86', class: 'Exca 20 Ton' },
    { code: 'EXC.87', class: 'Exca 20 Ton' },
    { code: 'EXC.88', class: 'Exca 20 Ton' },
    { code: 'EXC.89', class: 'Exca 20 Ton' },
    { code: 'EXC.90', class: 'Exca 20 Ton' },
    { code: 'EXC.201', class: 'Exca 20 Ton' },
    { code: 'EXC.202', class: 'Exca 20 Ton' },
    { code: 'EXC.203', class: 'Exca 20 Ton' },
    { code: 'EXC.204', class: 'Exca 20 Ton' },
    { code: 'EXC.205', class: 'Exca 20 Ton' },
    { code: 'EXC.206', class: 'Exca 20 Ton' },
    { code: 'EXC.207', class: 'Exca 20 Ton' },
    { code: 'EXC.208', class: 'Exca 20 Ton' },
    { code: 'EXC.209', class: 'Exca 20 Ton' },
    { code: 'EXC.210', class: 'Exca 20 Ton' },
    { code: 'EXC.301', class: 'Exca 30 Ton' },
    { code: 'EXC.302', class: 'Exca 30 Ton' },
    { code: 'EXC.303', class: 'Exca 30 Ton' },
    { code: 'MG-1', class: 'Motor Grader' },
    { code: 'MG-2', class: 'Motor Grader' },
    { code: 'MG-3', class: 'Motor Grader' },
    { code: 'MG-4', class: 'Motor Grader' },
    { code: 'MC.01', class: 'Mobile Crane' },
    { code: 'D.02', class: 'Medium Dozer' },
    { code: 'D.03', class: 'Medium Dozer' },
    { code: 'VBR.01', class: 'Vibro 10 Ton' },
    { code: 'VBR.04', class: 'Vibro 10 Ton' },
    { code: 'VBR.05', class: 'Vibro 10 Ton' },
    { code: 'VBR.06', class: 'Vibro 10 Ton' },
    { code: 'VBR.07', class: 'Vibro 10 Ton' },
    { code: 'EXC.91', class: 'Exca 20 Ton' },
    { code: 'EXC.304', class: 'Exca 30 Ton' },
    { code: 'EXC.211', class: 'Exca 20 Ton' },
    { code: 'EXC.212', class: 'Exca 20 Ton' },
    { code: 'EXC.213', class: 'Exca 20 Ton' },
    { code: 'EXC.214', class: 'Exca 20 Ton' },
    { code: 'EXC.215', class: 'Exca 20 Ton' },
    { code: 'EXC.92', class: 'Exca 20 Ton' },
    { code: 'EXC.93', class: 'Exca 20 Ton' },
    { code: 'EXC.94', class: 'Exca 20 Ton' },
    { code: 'EXC.95', class: 'Exca 20 Ton' },
    { code: 'EXC.96', class: 'Exca 20 Ton' },
    { code: 'EXC.97', class: 'Exca 20 Ton' },
    { code: 'EXC.98', class: 'Exca 20 Ton' },
    { code: 'EXC.305', class: 'Exca 30 Ton' },
    { code: 'EXC.306', class: 'Exca 30 Ton' },
    { code: 'EXC.307', class: 'Exca 30 Ton' },
    { code: 'EXC.308', class: 'Exca 30 Ton' },
    { code: 'VBR.09', class: 'Vibro 10 Ton' },
    { code: 'VBR.08', class: 'Vibro 10 Ton' },
    { code: 'MG-5', class: 'Motor Grader' },
    { code: 'EXC.309', class: 'Exca 30 Ton' },
    { code: 'VBR.TW.02', class: 'Vibro 10 Ton' }
  ];

  const [orderList, setOrderList] = useState([
    {
      id: 'SO-7208',
      customer: 'PT Mahligai Artha Sejahtera',
      namaProyek: 'Land Clearing 44',
      lokasi: 'Makassar',
      sales: 'ANS',
      jenisAlat: 'Excavator 20 Ton - Bucket',
      jenisSewa: 'S1',
      rencanaDurasi: '3 Hari',
      statusDurasi: 'Selesai Lebih Cepat',
      catatanAktual: 'Selesai dalam 2 hari karena cuaca mendukung',
      jumlahUnit: 1,
      kodeUnit: 'EXC.08',
      namaOperator: 'Baharuddin',
      status: 'Selesai / Close'
    }
  ]);

  // State khusus untuk Data Admin Timesheet (Step 4)
  const [timesheetList, setTimesheetList] = useState([
    {
      id: 'TS-001',
      tanggal: '2026-03-30',
      soId: 'SO-7208',
      customer: 'PT Mahligai Artha Sejahtera',
      kodeUnit: 'EXC.08',
      operator: 'Baharuddin',
      jamMulai: '08:00',
      jamSelesai: '17:00',
      totalJam: '8 Jam',
      keterangan: 'Normal / Sesuai Target'
    }
  ]);

  const [newTimesheet, setNewTimesheet] = useState({
    tanggal: new Date().toISOString().split('T')[0],
    soId: 'SO-7208',
    customer: 'PT Mahligai Artha Sejahtera',
    kodeUnit: 'EXC.08',
    operator: 'Baharuddin',
    jamMulai: '08:00',
    jamSelesai: '17:00',
    totalJam: '8 Jam',
    keterangan: 'Operasional Lancar'
  });

  const [fleetStatus, setFleetStatus] = useState({
    'EXC.08': 'Ready',
    'EXC.01': 'Ready',
    'MG-1': 'Breakdown'
  });

  const [notification, setNotification] = useState({ show: false, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTimesheetChange = (e) => {
    const { name, value } = e.target;
    setNewTimesheet(prev => {
      const updated = { ...prev, [name]: value };
      // Auto sinkronisasi data customer, unit, operator jika SO ID dipilih dari orderList
      if (name === 'soId') {
        const foundOrder = orderList.find(o => o.id === value);
        if (foundOrder) {
          updated.customer = foundOrder.customer;
          updated.kodeUnit = foundOrder.kodeUnit;
          updated.operator = foundOrder.namaOperator;
        }
      }
      return updated;
    });
  };

  const handleTimesheetSubmit = (e) => {
    e.preventDefault();
    const entryId = 'TS-' + Math.floor(100 + Math.random() * 900);
    const entry = { id: entryId, ...newTimesheet };
    setTimesheetList([entry, ...timesheetList]);
    setNotification({
      show: true,
      message: `Timesheet harian #${entryId} berhasil dicatat ke sistem admin!`
    });
    setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 4000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrderNo = 'SO-' + Math.floor(1000 + Math.random() * 9000);
    const durasiString = `${formData.jumlahDurasi} ${formData.tipeDurasi}`;
    
    const newOrder = {
      id: newOrderNo,
      ...formData,
      rencanaDurasi: durasiString,
      statusDurasi: 'Sesuai Rencana',
      catatanAktual: 'Sedang berjalan di lapangan',
      kodeUnit: 'Belum Dipilih',
      namaOperator: 'Belum Ditentukan',
      status: 'Menunggu Alokasi Unit'
    };

    setOrderList([newOrder, ...orderList]);
    setNotification({
      show: true,
      message: `Sales Order #${newOrderNo} berhasil diterbitkan!`
    });

    setFormData({
      customer: '',
      namaProyek: '',
      lokasi: '',
      sales: 'ANS',
      jenisAlat: 'Excavator 20 Ton - Bucket',
      jenisSewa: 'S1',
      tipeDurasi: 'Jam',
      jumlahDurasi: 8,
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

  const updateOperator = (id, newOperator) => {
    setOrderList(orderList.map(order => 
      order.id === id ? { ...order, namaOperator: newOperator } : order
    ));
  };

  const updateStatusDurasi = (id, newStatusDurasi) => {
    setOrderList(orderList.map(order => 
      order.id === id ? { ...order, statusDurasi: newStatusDurasi } : order
    ));
  };

  const updateCatatanAktual = (id, newCatatan) => {
    setOrderList(orderList.map(order => 
      order.id === id ? { ...order, catatanAktual: newCatatan } : order
    ));
  };

  const updateStatus = (id, newStatus) => {
    setOrderList(orderList.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  const updateFleetCondition = (unitCode, condition) => {
    setFleetStatus(prev => ({ ...prev, [unitCode]: condition }));
  };

  const sendWhatsAppNotification = (order) => {
    const phone = salesPhoneBook[order.sales] || '';
    const message = `Halo ${order.sales}, Update Lapangan SO *${order.id}* (${order.customer}) | Unit: *${order.kodeUnit}* | Operator: *${order.namaOperator}* | Rencana: *${order.rencanaDurasi}* | Kondisi Waktu: *${order.statusDurasi}* (${order.catatanAktual}) | Status: *${order.status}*. Terima kasih! - CV Chandra Delta Perkasa`;
    const encodedMessage = encodeURIComponent(message);
    
    const waUrl = phone ? `https://wa.me/${phone}?text=${encodedMessage}` : `https://wa.me/?text=${encodedMessage}`;
    window.open(waUrl, '_blank');
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
    { label: 'Excavator Mini SY55 - Bucket', value: 'Excavator Mini SY55 - Bucket' },
    { label: 'Excavator Mini SY75 - Bucket', value: 'Excavator Mini SY75 - Bucket' },
    { label: 'Vibro Roller', value: 'Vibro Roller' },
    { label: 'Bulldozer', value: 'Bulldozer' },
    { label: 'Motor Grader', value: 'Motor Grader' }
  ];

  const jenisSewaOptions = [
    { label: 'S1 (Sewa Bulanan / Operasional Utama)', value: 'S1' },
    { label: 'S2 (Sewa Lepas Kunci / Pendek)', value: 'S2' },
    { label: 'S3 (Sewa Borongan / Project Khusus)', value: 'S3' }
  ];

  const filteredOrders = selectedSalesFilter === 'ALL' 
    ? orderList 
    : orderList.filter(order => order.sales === selectedSalesFilter);

  const filteredFleet = fleetDatabase.filter(item => {
    const matchesClass = selectedFleetFilter === 'ALL' || item.class === selectedFleetFilter;
    const matchesSearch = item.code.toLowerCase().includes(fleetSearchQuery.toLowerCase()) || 
                          item.class.toLowerCase().includes(fleetSearchQuery.toLowerCase());
    return matchesClass && matchesSearch;
  });

  const uniqueClasses = ['ALL', ...new Set(fleetDatabase.map(item => item.class))];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col items-center">
      <div className="max-w-6xl w-full space-y-8">
        
        {/* STEP 1: FORM SALES ORDER */}
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

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Sales / VIA</label>
                <select name="sales" value={formData.sales} onChange={handleChange} className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer">
                  {salesOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-400 uppercase mb-1">Skema Kontrak</label>
                <select name="jenisSewa" value={formData.jenisSewa} onChange={handleChange} className="w-full px-4 py-3 bg-slate-950 border border-amber-600/60 rounded-xl text-amber-300 font-bold text-sm focus:ring-2 focus:ring-amber-500 outline-none cursor-pointer">
                  {jenisSewaOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2 grid grid-cols-2 gap-2 bg-slate-950 p-2 border border-slate-800 rounded-xl">
                <div>
                  <label className="block text-[10px] font-bold text-teal-400 uppercase mb-1">Estimasi Jumlah</label>
                  <input 
                    type="number" 
                    name="jumlahDurasi" 
                    min="1" 
                    value={formData.jumlahDurasi} 
                    onChange={handleChange} 
                    required 
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-100 text-sm focus:ring-2 focus:ring-teal-500 outline-none font-bold" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-teal-400 uppercase mb-1">Satuan Rencana</label>
                  <select 
                    name="tipeDurasi" 
                    value={formData.tipeDurasi} 
                    onChange={handleChange} 
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-teal-300 font-bold text-sm focus:ring-2 focus:ring-teal-500 outline-none cursor-pointer"
                  >
                    <option value="Jam">Jam</option>
                    <option value="Hari">Hari</option>
                    <option value="Minggu">Minggu</option>
                    <option value="Bulan">Bulan</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        {/* STEP 2: KEPALA OPERATOR, UNIT & EVALUASI WAKTU LAPANGAN */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl font-black text-white">STEP 2: Alokasi Unit, Operator & Monitoring Waktu Riil</h2>
              <p className="text-xs text-slate-400">Sesuaikan status waktu jika pekerjaan lebih cepat atau mengalami perpanjangan (extend)</p>
            </div>

            <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-1.5 border border-slate-800 rounded-xl">
              <span className="text-xs font-bold text-slate-400 px-2">Filter Sales:</span>
              {['ALL', 'ANS', 'UCI', 'CDP', 'FAN'].map(sal => (
                <button
                  key={sal}
                  onClick={() => setSelectedSalesFilter(sal)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    selectedSalesFilter === sal 
                      ? 'bg-blue-600 text-white shadow' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {sal}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-xs text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">No. Order</th>
                  <th className="py-3 px-4">Customer / Proyek</th>
                  <th className="py-3 px-4">Sales / Skema</th>
                  <th className="py-3 px-4 text-teal-400">Evaluasi Waktu (Rencana vs Lapangan)</th>
                  <th className="py-3 px-4 text-amber-400">Alokasi Unit & Operator</th>
                  <th className="py-3 px-4">Status & Aksi WA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-500 text-sm">
                      Tidak ada data order untuk sales "{selectedSalesFilter}"
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 px-4 font-mono font-bold text-blue-400">{order.id}</td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-white">{order.customer}</div>
                        <div className="text-xs text-slate-400">{order.namaProyek} ({order.lokasi})</div>
                      </td>
                      <td className="py-4 px-4 space-y-1">
                        <div><span className="px-2 py-0.5 bg-slate-800 text-slate-200 font-bold text-xs rounded-lg">{order.sales}</span></div>
                        <div><span className="px-2 py-0.5 bg-amber-950 text-amber-300 font-bold text-xs rounded-lg border border-amber-600/50">{order.jenisSewa}</span></div>
                      </td>
                      
                      {/* KOLOM EVALUASI WAKTU */}
                      <td className="py-4 px-4 space-y-2">
                        <div className="text-xs text-slate-400 flex items-center gap-1">
                          <span>Target Awal:</span> 
                          <span className="font-mono font-bold text-slate-200">{order.rencanaDurasi}</span>
                        </div>
                        
                        <div>
                          <select 
                            value={order.statusDurasi} 
                            onChange={(e) => updateStatusDurasi(order.id, e.target.value)}
                            className="w-full text-xs font-bold px-3 py-1.5 bg-slate-950 border border-teal-600/60 text-teal-300 rounded-lg outline-none cursor-pointer focus:ring-2 focus:ring-teal-500"
                          >
                            <option value="Sesuai Rencana">🟢 Sesuai Rencana</option>
                            <option value="Selesai Lebih Cepat">⚡ Selesai Lebih Cepat</option>
                            <option value="Extend / Perpanjangan">⏱️ Extend / Perpanjangan</option>
                          </select>
                        </div>

                        <div>
                          <input 
                            type="text" 
                            value={order.catatanAktual} 
                            onChange={(e) => updateCatatanAktual(order.id, e.target.value)}
                            placeholder="Catatan (cth: Selesai 2 hari / Tambah 2 hari)"
                            className="w-full text-xs font-mono px-3 py-1 bg-slate-950 border border-slate-700 text-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-teal-500"
                          />
                        </div>
                      </td>
                      
                      {/* KOLOM UNIT & NAMA OPERATOR */}
                      <td className="py-4 px-4 space-y-2">
                        <div>
                          <label className="block text-[10px] text-slate-400 font-bold uppercase mb-0.5">Kode Unit:</label>
                          <select 
                            value={order.kodeUnit} 
                            onChange={(e) => updateKodeUnit(order.id, e.target.value)}
                            className="w-full text-xs font-mono font-bold px-3 py-1.5 bg-slate-950 border border-amber-600/60 text-amber-300 rounded-lg outline-none cursor-pointer focus:ring-2 focus:ring-amber-500"
                          >
                            <option value="Belum Dipilih">-- Pilih Unit --</option>
                            {fleetDatabase.map((unit) => (
                              <option key={unit.code} value={unit.code}>{unit.code} ({unit.class})</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] text-slate-400 font-bold uppercase mb-0.5">Nama Operator:</label>
                          <select 
                            value={order.namaOperator} 
                            onChange={(e) => updateOperator(order.id, e.target.value)}
                            className="w-full text-xs font-bold px-3 py-1.5 bg-slate-950 border border-emerald-600/60 text-emerald-300 rounded-lg outline-none cursor-pointer focus:ring-2 focus:ring-emerald-500"
                          >
                            <option value="Belum Ditentukan">-- Pilih Operator --</option>
                            {operatorDatabase.map((opName) => (
                              <option key={opName} value={opName}>{opName}</option>
                            ))}
                          </select>
                        </div>
                      </td>

                      <td className="py-4 px-4 space-y-2">
                        <select 
                          value={order.status} 
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          className="w-full text-xs font-bold px-3 py-2 rounded-lg border border-slate-700 bg-slate-950 text-slate-200 outline-none cursor-pointer"
                        >
                          <option value="Menunggu Alokasi Unit">⏳ Menunggu Alokasi Unit</option>
                          <option value="Unit Ready / Dispatched">🚀 Unit Ready / Dispatched</option>
                          <option value="Selesai / Close">✅ Selesai / Close</option>
                        </select>

                        <button 
                          onClick={() => sendWhatsAppNotification(order)}
                          className="w-full py-1.5 px-3 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all shadow cursor-pointer"
                        >
                          💬 Info WA ({order.sales})
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* STEP 3: MONITORING KONDISI ARMADA */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl font-black text-white">STEP 3: Monitoring Kondisi Fisik Armada</h2>
              <p className="text-xs text-slate-400">Total {fleetDatabase.length} unit terdaftar. Kelola status real-time (*Ready, Standby, Working, Breakdown*)</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <input 
                type="text" 
                placeholder="Cari kode unit (cth: EXC.08)..." 
                value={fleetSearchQuery}
                onChange={(e) => setFleetSearchQuery(e.target.value)}
                className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none w-full md:w-56"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-2 border border-slate-800 rounded-2xl mb-6">
            <span className="text-xs font-bold text-slate-400 px-2">Filter Kelas:</span>
            {uniqueClasses.map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedFleetFilter(cls)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  selectedFleetFilter === cls 
                    ? 'bg-amber-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cls}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto max-h-[500px] rounded-2xl border border-slate-800">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-slate-950 z-10 border-b border-slate-800 text-xs text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">No</th>
                  <th className="py-3 px-4">Kode Unit</th>
                  <th className="py-3 px-4">Kelas / Jenis</th>
                  <th className="py-3 px-4 text-center">Status Fisik Real-Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {filteredFleet.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-slate-500 text-sm">
                      Tidak ditemukan unit dengan kata kunci "{fleetSearchQuery}"
                    </td>
                  </tr>
                ) : (
                  filteredFleet.map((item, index) => {
                    const currentCondition = fleetStatus[item.code] || 'Ready';
                    return (
                      <tr key={item.code} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-4 font-mono text-xs text-slate-500">{index + 1}</td>
                        <td className="py-3 px-4 font-mono font-bold text-white">{item.code}</td>
                        <td className="py-3 px-4 text-xs font-semibold text-amber-400">{item.class}</td>
                        <td className="py-3 px-4 text-center">
                          <select
                            value={currentCondition}
                            onChange={(e) => updateFleetCondition(item.code, e.target.value)}
                            className={`text-xs font-bold px-3 py-1.5 rounded-xl border outline-none cursor-pointer transition-all ${
                              currentCondition === 'Ready' 
                                ? 'bg-emerald-950/65 border-emerald-500 text-emerald-300' 
                                : currentCondition === 'Working' 
                                ? 'bg-blue-950/60 border-blue-500 text-blue-300' 
                                : currentCondition === 'Standby' 
                                ? 'bg-teal-950/60 border-teal-500 text-teal-300' 
                                : 'bg-rose-950/60 border-rose-500 text-rose-300 animate-pulse'
                            }`}
                          >
                            <option value="Ready">🟢 Ready</option>
                            <option value="Standby">🟡 Standby</option>
                            <option value="Working">🔵 Working</option>
                            <option value="Breakdown">⚠️ Breakdown</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* STEP 4: ADMIN TIMESHEET & LAPORAN HARIAN OPERATOR */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-xl font-black text-white mb-1">STEP 4: Admin Timesheet & Rekap Jam Kerja Harian</h2>
          <p className="text-xs text-slate-400 mb-6">Pencatatan real-time jam kerja alat dan operator dari lapangan untuk rekapitulasi penagihan akhir</p>

          <form onSubmit={handleTimesheetSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-3 bg-slate-950 p-4 border border-slate-800 rounded-2xl mb-6">
            <div>
              <label className="block text-[10px] font-bold text-teal-400 uppercase mb-1">Tanggal</label>
              <input 
                type="date" 
                name="tanggal" 
                value={newTimesheet.tanggal} 
                onChange={handleTimesheetChange} 
                required 
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 outline-none focus:ring-2 focus:ring-teal-500" 
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-teal-400 uppercase mb-1">Pilih Order (SO)</label>
              <select 
                name="soId" 
                value={newTimesheet.soId} 
                onChange={handleTimesheetChange} 
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-blue-400 outline-none cursor-pointer focus:ring-2 focus:ring-teal-500"
              >
                {orderList.map(ord => (
                  <option key={ord.id} value={ord.id}>{ord.id} - {ord.customer}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-teal-400 uppercase mb-1">Unit & Operator</label>
              <input 
                type="text" 
                readOnly 
                value={`${newTimesheet.kodeUnit} / ${newTimesheet.operator}`} 
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-amber-300 font-mono font-bold" 
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-teal-400 uppercase mb-1">Total Jam / Sesi</label>
              <input 
                type="text" 
                name="totalJam" 
                value={newTimesheet.totalJam} 
                onChange={handleTimesheetChange} 
                placeholder="Cth: 8 Jam / Lembur +2 Jam" 
                required 
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 outline-none font-bold focus:ring-2 focus:ring-teal-500" 
              />
            </div>

            <div className="flex items-end">
              <button type="submit" className="w-full py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-xl shadow transition-all cursor-pointer">
                + Input Timesheet
              </button>
            </div>
          </form>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-xs text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">ID Timesheet</th>
                  <th className="py-3 px-4">Tanggal & SO</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Unit & Operator</th>
                  <th className="py-3 px-4 text-teal-400">Total Jam Aktual</th>
                  <th className="py-3 px-4">Keterangan Lapangan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {timesheetList.map(ts => (
                  <tr key={ts.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-teal-400 text-xs">{ts.id}</td>
                    <td className="py-3 px-4">
                      <div className="font-mono text-xs text-slate-300">{ts.tanggal}</div>
                      <div className="font-mono text-[11px] text-blue-400 font-bold">{ts.soId}</div>
                    </td>
                    <td className="py-3 px-4 text-xs font-semibold text-white">{ts.customer}</td>
                    <td className="py-3 px-4">
                      <div className="font-mono text-xs font-bold text-amber-300">{ts.kodeUnit}</div>
                      <div className="text-xs text-emerald-400">{ts.operator}</div>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-teal-300 text-xs">{ts.totalJam}</td>
                    <td className="py-3 px-4 text-xs text-slate-300">{ts.keterangan}</td>
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
