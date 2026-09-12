import React, { useState, useRef } from 'react';

export default function OperatorLogistikDashboard() {
  // State Navigasi Tab
  const [activeTab, setActiveTab] = useState('timesheet');

  // State untuk Timesheet Harian
  const [timesheetList, setTimesheetList] = useState([
    {
      id: 'TS-001',
      kodeGajiOp: 'G08',
      kodeTagih: 'INV-7208',
      jobId: 'SO-7208',
      tanggal: '11-Sep-26',
      hari: 'Jumat',
      operator: 'BAHARUDDIN',
      attach: 'Bucket',
      model: 'SY215H',
      unitCode: 'EXC.08',
      jobVia: 'ANS',
      namaPenyewa: 'MAHLIGAI ARTHA SEJAHTERA',
      alamat: 'Makassar (Site 44)',
      hmStart: 1200.5,
      hmEnd: 1208.0,
      totalHm: 7.5,
      ot: 1.0,
      unitWorkingHour: 8.5,
      keterangan: 'Cukup 200 Jam'
    }
  ]);

  const [tsForm, setTsForm] = useState({
    kodeGajiOp: '',
    kodeTagih: '',
    jobId: '',
    tanggal: '',
    hari: '',
    operator: 'BAHARUDDIN',
    attach: '',
    model: '',
    unitCode: 'EXC.08',
    jobVia: 'ANS',
    namaPenyewa: '',
    alamat: '',
    hmStart: '',
    hmEnd: '',
    ot: '',
    keterangan: ''
  });

  // State untuk Monitoring Logistik & Pengiriman Tronton
  const [logistikOrders, setLogistikOrders] = useState([
    {
      id: 'SO-7208',
      customer: 'PT Mahligai Artha Sejahtera',
      namaProyek: 'Land Clearing 44',
      jenisAlat: 'Excavator 20 Ton - Bucket',
      jumlahUnit: 1,
      kodeUnit: 'EXC.08',
      namaOperator: 'Baharuddin',
      lokasiAwal: 'Pool Delta Parang Loe, Makassar',
      lokasiTujuan: 'Makassar (Site 44)',
      picPenerima: 'Bpk. Hendra (081298765432)',
      sales: 'ANS',
      trontonUnit: 'SL01',
      statusLogistik: '🚚 Dalam Perjalanan (OTW)',
      catatanLogistik: 'Bawa breaker & selang hidrolik cadangan.',
      fotoMuatUrl: null,
      fotoTibaUrl: null,
      timestampMuat: '-',
      timestampTiba: '-',
      koordinatMuat: '-',
      koordinatTiba: '-'
    }
  ]);

  const [notification, setNotification] = useState({ show: false, message: '' });

  // Refs untuk kamera tersembunyi
  const fileInputRef = useRef(null);
  const activeCaptureRef = useRef({ orderId: null, jenis: null });

  const logisticsPhone = '6285165659907';
  
  const salesPhoneBook = {
    'ANS': '6285165659907', 
    'UCI': '6281234567891', 
    'CDP': '6285165659907', 
    'FAN': '6281234567893'  
  };

  const trontonFleet = [
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

  const operatorDatabase = [
    'BUSTAM',
    'ABDUL RAHIM SAPUTRA',
    'BAHARUDDIN',
    'SAHARUDDIN',
    'RUSTAM',
    'AMIR',
    'YUSUF',
    'ARIS',
    'HERMAN',
    'DG. SILA',
    'RAHMAT',
    'SUPRIADI'
  ];

  const fleetDatabase = [...trontonFleet];
  const salesOptions = ['ANS', 'UCI', 'CDP', 'FAN'];

  const handleAddTimesheet = (e) => {
    e.preventDefault();
    const start = parseFloat(tsForm.hmStart) || 0;
    const end = parseFloat(tsForm.hmEnd) || 0;
    const totalHm = Number((end - start).toFixed(1));
    const otVal = parseFloat(tsForm.ot) || 0;
    const unitWorkingHour = Number((totalHm + otVal).toFixed(1));

    const newEntry = {
      id: `TS-${Date.now().toString().slice(-4)}`,
      ...tsForm,
      totalHm,
      ot: otVal,
      unitWorkingHour
    };

    setTimesheetList([newEntry, ...timesheetList]);
    setNotification({ show: true, message: 'Timesheet harian berhasil ditambahkan!' });
    setTimeout(() => setNotification({ show: false, message: '' }), 3000);
  };

  const handleFileCaptured = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    const { orderId, jenis } = activeCaptureRef.current;
    const now = new Date();
    const timeString = now.toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'medium' });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(5);
          const lng = position.coords.longitude.toFixed(5);
          const koordinatStr = `${lat}, ${lng}`;

          setLogistikOrders(logistikOrders.map(order => {
            if (order.id === orderId) {
              if (jenis === 'muat') {
                return { ...order, fotoMuatUrl: imageUrl, timestampMuat: timeString, koordinatMuat: koordinatStr };
              } else {
                return { ...order, fotoTibaUrl: imageUrl, timestampTiba: timeString, koordinatTiba: koordinatStr };
              }
            }
            return order;
          }));
        },
        () => {
          const koordinatStr = '-5.14766, 119.43273 (Makassar Area)';
          setLogistikOrders(logistikOrders.map(order => {
            if (order.id === orderId) {
              if (jenis === 'muat') {
                return { ...order, fotoMuatUrl: imageUrl, timestampMuat: timeString, koordinatMuat: koordinatStr };
              } else {
                return { ...order, fotoTibaUrl: imageUrl, timestampTiba: timeString, koordinatTiba: koordinatStr };
              }
            }
            return order;
          }));
        }
      );
    }
    e.target.value = null;
  };

  const updateLogistikField = (id, field, value) => {
    setLogistikOrders(logistikOrders.map(order => 
      order.id === id ? { ...order, [field]: value } : order
    ));
  };

  const sendLogisticsWhatsApp = (order) => {
    const message = `🚚 *CV CHANDRA DELTA PERKASA — LOGISTIK* 🚚\n\nDetail Mobilisasi Order *${order.id}*:\n- *Customer:* ${order.customer} (${order.namaProyek})\n- *Request Alat:* ${order.jenisAlat} (${order.jumlahUnit} Unit)\n- *Unit:* ${order.kodeUnit} | *Op:* ${order.namaOperator}\n- *Tronton:* ${order.trontonUnit}\n- *Asal:* ${order.lokasiAwal}\n- *Tujuan:* ${order.lokasiTujuan}\n- *PIC Penerima:* ${order.picPenerima}\n- *Status:* ${order.statusLogistik}\n- *Catatan:* _${order.catatanLogistik}_\n\nMohon koordinasikan. Terima kasih!`;
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${logisticsPhone}?text=${encodedMessage}`;
    window.open(waUrl, '_blank');
  };

  const sendLogisticsUpdateToSales = (order) => {
    const phone = salesPhoneBook[order.sales] || '';
    const message = `📢 *INFO LOGISTIK & TRONTON* 📢\nHalo ${order.sales}, update pengiriman order *${order.id}* (${order.customer}):\n- *Unit:* ${order.kodeUnit} | *Tronton:* ${order.trontonUnit}\n- *Rute:* ${order.lokasiAwal} ➡️ ${order.lokasiTujuan}\n- *PIC Penerima:* ${order.picPenerima}\n- *Status:* *${order.statusLogistik}*\n- *Foto Muat:* ${order.timestampMuat} (${order.koordinatMuat})\n- *Foto Tiba:* ${order.timestampTiba} (${order.koordinatTiba})\n\nTerima kasih!`;
    const encodedMessage = encodeURIComponent(message);
    const waUrl = phone ? `https://wa.me/${phone}?text=${encodedMessage}` : `https://wa.me/?text=${encodedMessage}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col items-center">
      
      {/* Hidden File Input untuk Kamera HP */}
      <input 
        type="file" 
        accept="image/*" 
        capture="environment" 
        ref={fileInputRef} 
        onChange={handleFileCaptured} 
        className="hidden" 
      />

      <div className="max-w-6xl w-full space-y-8">
        
        {/* HEADER BRANDING */}
        <div className="relative bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-amber-500/40 rounded-3xl p-8 shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 z-10">
            <div className="w-20 h-20 bg-white rounded-2xl p-2 shadow-lg border-2 border-amber-500 flex items-center justify-center shrink-0">
              <div className="text-center font-black">
                <div className="text-red-700 text-2xl leading-none">▲</div>
                <div className="text-[10px] text-blue-900 font-extrabold tracking-tighter mt-0.5">DELTA</div>
                <div className="text-[8px] text-slate-700 tracking-widest">PERKASA</div>
              </div>
            </div>

            <div>
              <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 font-bold text-[10px] uppercase rounded-full tracking-widest mb-1 border border-amber-500/30">
                Portal Kepala Operator & Logistik Lapangan
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-wide">
                CV CHANDRA DELTA PERKASA
              </h1>
              <p className="text-xs text-slate-300 mt-1">
                Makassar & Sekitarnya • Melayani Sulawesi
              </p>
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS KHUSUS OPERATOR & LOGISTIK */}
        <div className="flex bg-slate-900 p-1.5 border border-slate-800 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab('timesheet')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === 'timesheet' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            ⏱️ Timesheet & Kepala Operator
          </button>
          <button
            onClick={() => setActiveTab('logistik')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === 'logistik' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            🚚 Logistik & Mobilisasi Tronton
          </button>
        </div>

        {notification.show && (
          <div className="p-4 bg-emerald-950 border border-emerald-500 text-emerald-200 rounded-xl text-sm font-medium">
            {notification.message}
          </div>
        )}

        {/* KONTEN BERDASARKAN TAB AKTIF */}
        {activeTab === 'timesheet' ? (
          <div className="space-y-6">
            {/* FORM INPUT TIMESHEET HARIAN */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
              <h2 className="text-xl font-black text-amber-400 mb-1">Form Input Timesheet Harian (Kepala Operator)</h2>
              <p className="text-xs text-slate-400 mb-6 uppercase tracking-wider font-bold">Catat Hour Meter (HM), Operator, dan Durasi Kerja Alat</p>

              <form onSubmit={handleAddTimesheet} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block font-bold text-slate-400 uppercase mb-1">Kode Gaji Operator</label>
                    <input type="text" value={tsForm.kodeGajiOp} onChange={(e) => setTsForm({...tsForm, kodeGajiOp: e.target.value})} required className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none font-mono" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-400 uppercase mb-1">Kode Tagih</label>
                    <input type="text" value={tsForm.kodeTagih} onChange={(e) => setTsForm({...tsForm, kodeTagih: e.target.value})} required className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none font-mono" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-400 uppercase mb-1">Job ID</label>
                    <input type="text" value={tsForm.jobId} onChange={(e) => setTsForm({...tsForm, jobId: e.target.value})} required className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none font-mono" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-400 uppercase mb-1">Tanggal & Hari</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" value={tsForm.tanggal} onChange={(e) => setTsForm({...tsForm, tanggal: e.target.value})} placeholder="11-Sep-26" className="px-2 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none" />
                      <input type="text" value={tsForm.hari} onChange={(e) => setTsForm({...tsForm, hari: e.target.value})} placeholder="Jumat" className="px-2 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block font-bold text-slate-400 uppercase mb-1">Nama Operator</label>
                    <select value={tsForm.operator} onChange={(e) => setTsForm({...tsForm, operator: e.target.value})} className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-emerald-300 font-bold outline-none cursor-pointer">
                      {operatorDatabase.map(op => <option key={op} value={op}>{op}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-400 uppercase mb-1">Attachment / Model</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" value={tsForm.attach} onChange={(e) => setTsForm({...tsForm, attach: e.target.value})} placeholder="Bucket" className="px-2 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none" />
                      <input type="text" value={tsForm.model} onChange={(e) => setTsForm({...tsForm, model: e.target.value})} placeholder="SY215H" className="px-2 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-400 uppercase mb-1">Kode Unit</label>
                    <select value={tsForm.unitCode} onChange={(e) => setTsForm({...tsForm, unitCode: e.target.value})} className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-amber-300 font-bold outline-none cursor-pointer">
                      {fleetDatabase.map(f => <option key={f.code} value={f.code}>{f.code}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-400 uppercase mb-1">Job Via (Sales)</label>
                    <select value={tsForm.jobVia} onChange={(e) => setTsForm({...tsForm, jobVia: e.target.value})} className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-blue-300 font-bold outline-none cursor-pointer">
                      {salesOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-400 uppercase mb-1">Nama Penyewa & Alamat Proyek</label>
                    <div className="space-y-2">
                      <input type="text" value={tsForm.namaPenyewa} onChange={(e) => setTsForm({...tsForm, namaPenyewa: e.target.value})} placeholder="MAHLIGAI ARTHA SEJAHTERA" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none font-bold" />
                      <input type="text" value={tsForm.alamat} onChange={(e) => setTsForm({...tsForm, alamat: e.target.value})} placeholder="Lokasi / Alamat Proyek" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-amber-400 uppercase mb-1">HM Start</label>
                      <input type="number" step="0.1" value={tsForm.hmStart} onChange={(e) => setTsForm({...tsForm, hmStart: e.target.value})} required className="w-full px-3 py-2 bg-slate-950 border border-amber-600/60 rounded-xl text-white font-mono outline-none text-sm font-bold" />
                    </div>
                    <div>
                      <label className="block font-bold text-amber-400 uppercase mb-1">HM End</label>
                      <input type="number" step="0.1" value={tsForm.hmEnd} onChange={(e) => setTsForm({...tsForm, hmEnd: e.target.value})} required className="w-full px-3 py-2 bg-slate-950 border border-amber-600/60 rounded-xl text-white font-mono outline-none text-sm font-bold" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-slate-400 uppercase mb-1">Overtime (OT)</label>
                      <input type="number" step="0.5" value={tsForm.ot} onChange={(e) => setTsForm({...tsForm, ot: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none" />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-400 uppercase mb-1">Keterangan / Status</label>
                      <input type="text" value={tsForm.keterangan} onChange={(e) => setTsForm({...tsForm, keterangan: e.target.value})} placeholder="Cukup 200 Jam" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none" />
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl shadow-xl transition-all uppercase tracking-wider text-xs cursor-pointer mt-4">
                  ➕ Simpan & Rekap Timesheet Harian
                </button>
              </form>
            </div>

            {/* TABEL REKAP TIMESHEET HARIAN */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-4 overflow-x-auto">
              <h2 className="text-xl font-black text-white">Tabel Rekap Timesheet Admin Harian</h2>
              <p className="text-xs text-slate-400">Data terekap sesuai format spreadsheet operasional</p>

              <table className="w-auto text-left text-xs whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-950 text-amber-400 border-b border-slate-800 font-mono">
                    <th className="p-3">ID</th>
                    <th className="p-3">Gaji Op</th>
                    <th className="p-3">Tagih</th>
                    <th className="p-3">Job ID</th>
                    <th className="p-3">Tanggal</th>
                    <th className="p-3">Operator</th>
                    <th className="p-3">Unit</th>
                    <th className="p-3">Penyewa</th>
                    <th className="p-3">HM Start</th>
                    <th className="p-3">HM End</th>
                    <th className="p-3">Total HM</th>
                    <th className="p-3">OT</th>
                    <th className="p-3">Working Hr</th>
                    <th className="p-3">Keterangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 font-mono">
                  {timesheetList.map(ts => (
                    <tr key={ts.id} className="hover:bg-slate-950/50">
                      <td className="p-3 font-bold text-blue-400">{ts.id}</td>
                      <td className="p-3">{ts.kodeGajiOp}</td>
                      <td className="p-3">{ts.kodeTagih}</td>
                      <td className="p-3 text-slate-300">{ts.jobId}</td>
                      <td className="p-3">{ts.tanggal}</td>
                      <td className="p-3 font-bold text-emerald-300">{ts.operator}</td>
                      <td className="p-3 font-bold text-amber-300">{ts.unitCode}</td>
                      <td className="p-3 font-bold text-white">{ts.namaPenyewa}</td>
                      <td className="p-3">{ts.hmStart}</td>
                      <td className="p-3">{ts.hmEnd}</td>
                      <td className="p-3 font-black text-cyan-300">{ts.totalHm}</td>
                      <td className="p-3">{ts.ot}</td>
                      <td className="p-3 text-emerald-400">{ts.unitWorkingHour}</td>
                      <td className="p-3 text-slate-300">{ts.keterangan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* TAB LOGISTIK & MOBILISASI TRONTON */
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <h2 className="text-xl font-black text-white">Manajemen Logistik & Pengiriman Tronton</h2>
                <p className="text-xs text-slate-400 mt-1">Koordinasi tronton, update status pengiriman, foto muat/tiba, serta GPS koordinat lapangan</p>
              </div>
            </div>

            <div className="space-y-6">
              {logistikOrders.map(order => (
                <div key={order.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-900 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-mono font-bold">{order.id}</span>
                        <h3 className="font-bold text-white text-base">{order.customer}</h3>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">Proyek: <span className="text-amber-300 font-semibold">{order.namaProyek}</span> | Unit: {order.jenisAlat}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => sendLogisticsWhatsApp(order)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-lg"
                      >
                        <span>💬 Koordinasi Logistik (WA)</span>
                      </button>
                      <button
                        onClick={() => sendLogisticsUpdateToSales(order)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-lg"
                      >
                        <span>📢 Update Sales ({order.sales})</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="space-y-2">
                      <div>
                        <span className="text-slate-400 block font-bold mb-1">Kode Unit & Operator</span>
                        <div className="grid grid-cols-2 gap-2">
                          <input type="text" value={order.kodeUnit} onChange={(e) => updateLogistikField(order.id, 'kodeUnit', e.target.value)} className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-amber-300 font-bold" />
                          <input type="text" value={order.namaOperator} onChange={(e) => updateLogistikField(order.id, 'namaOperator', e.target.value)} className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-emerald-300 font-bold" />
                        </div>
                      </div>

                      <div>
                        <span className="text-slate-400 block font-bold mb-1">Tronton & Status</span>
                        <div className="grid grid-cols-2 gap-2">
                          <input type="text" value={order.trontonUnit} onChange={(e) => updateLogistikField(order.id, 'trontonUnit', e.target.value)} className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-cyan-300 font-bold" />
                          <select value={order.statusLogistik} onChange={(e) => updateLogistikField(order.id, 'statusLogistik', e.target.value)} className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-bold cursor-pointer">
                            <option value="🚚 Dalam Perjalanan (OTW)">🚚 OTW</option>
                            <option value="🏗️ Tiba & Proses Bongkar">🏗️ Tiba & Bongkar</option>
                            <option value="✅ Selesai dimobilisasi">✅ Selesai</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <span className="text-slate-400 block font-bold mb-1">Rute Pengiriman</span>
                        <input type="text" value={order.lokasiAwal} onChange={(e) => updateLogistikField(order.id, 'lokasiAwal', e.target.value)} placeholder="Asal" className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white mb-1.5" />
                        <input type="text" value={order.lokasiTujuan} onChange={(e) => updateLogistikField(order.id, 'lokasiTujuan', e.target.value)} placeholder="Tujuan" className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white" />
                      </div>

                      <div>
                        <span className="text-slate-400 block font-bold mb-1">Catatan Lapangan</span>
                        <input type="text" value={order.catatanLogistik} onChange={(e) => updateLogistikField(order.id, 'catatanLogistik', e.target.value)} className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white" />
                      </div>
                    </div>

                    <div className="space-y-2 bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
                      <span className="text-amber-400 font-bold block">Dokumentasi Foto & GPS</span>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => {
                            activeCaptureRef.current = { orderId: order.id, jenis: 'muat' };
                            fileInputRef.current.click();
                          }}
                          className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-[11px] cursor-pointer text-center"
                        >
                          📸 Foto Muat
                        </button>
                        <button
                          onClick={() => {
                            activeCaptureRef.current = { orderId: order.id, jenis: 'tiba' };
                            fileInputRef.current.click();
                          }}
                          className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-[11px] cursor-pointer text-center"
                        >
                          📸 Foto Tiba
                        </button>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono space-y-1">
                        <div>Muat: {order.timestampMuat}</div>
                        <div>Tiba: {order.timestampTiba}</div>
                      </div>
                    </div>
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
