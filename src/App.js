import React, { useState, useRef } from 'react';

export default function SalesOrderDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' atau 'timesheet'

  const [formData, setFormData] = useState({
    customer: '',
    namaProyek: '',
    lokasi: '',
    lokasiPengantaran: '',
    picPenerima: '',
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

  // State untuk Timesheet Admin Harian (Sesuai Struktur Spreadsheet Lampiran)
  const [timesheetList, setTimesheetList] = useState([
    {
      id: 'TS-001',
      kodeGajiOp: '1907',
      kodeTagih: '2173',
      jobId: '0320-0526-ANS-S1',
      tanggal: '11-Sep-26',
      hari: 'Jumat',
      operator: 'BUSTAM',
      attach: 'Bucket',
      unitCode: 'EXC.92',
      model: 'SY215H',
      namaPenyewa: 'MAHLIGAI ARTHA SEJAHTERA',
      alamat: 'BULELENG, BUNGKU PESISIR, MOROWALI',
      jobVia: 'ANS',
      jamMulai: '',
      jamSelesai: '',
      durasiIstirahat: '',
      standby: '',
      totalJamKerja: '',
      hmStart: 1030.0,
      hmEnd: 1032.5,
      totalHm: 2.5,
      ot: 0,
      unitWorkingHour: 2.47,
      opWorkingHour: 2.47,
      hariKerjaAlat: 1.00,
      pencukupan: '',
      keterangan: 'Cukup 200 Jam',
      tipeJam: 'Hour Meter'
    }
  ]);

  const [tsForm, setTsForm] = useState({
    kodeGajiOp: '1907',
    kodeTagih: '2173',
    jobId: '0320-0526-ANS-S1',
    tanggal: '11-Sep-26',
    hari: 'Jumat',
    operator: 'BUSTAM',
    attach: 'Bucket',
    unitCode: 'EXC.92',
    model: 'SY215H',
    namaPenyewa: 'MAHLIGAI ARTHA SEJAHTERA',
    alamat: 'BULELENG, BUNGKU PESISIR, MOROWALI',
    jobVia: 'ANS',
    jamMulai: '',
    jamSelesai: '',
    durasiIstirahat: '',
    standby: '',
    totalJamKerja: '',
    hmStart: 0,
    hmEnd: 0,
    ot: 0,
    pencukupan: '',
    keterangan: '',
    tipeJam: 'Hour Meter'
  });

  // Refs untuk kamera tersembunyi
  const fileInputRef = useRef(null);
  const activeCaptureRef = useRef({ orderId: null, jenis: null });

  const salesPhoneBook = {
    'ANS': '6285165659907', 
    'UCI': '6281234567891', 
    'CDP': '6285165659907', 
    'FAN': '6281234567893'  
  };

  const logisticsPhone = '6285165659907';

  const trontonFleet = [
    { code: 'SL01', name: 'Tronton / Trailer SL01' },
    { code: 'SL02', name: 'Tronton / Trailer SL02' },
    { code: 'SL03', name: 'Tronton / Trailer SL03' },
    { code: 'TW02', name: 'Tronton / Trailer TW02' }
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

  const fleetDatabase = [
    { code: 'EXC.05', class: 'Exca 20 Ton', model: 'SY215H' },
    { code: 'EXC.01', class: 'Exca 20 Ton', model: 'SY215H' },
    { code: 'EXC.83', class: 'Exca 20 Ton', model: 'SY215ACE' },
    { code: 'EXC.92', class: 'Exca 20 Ton', model: 'SY215H' },
    { code: 'MG-1', class: 'Motor Grader', model: 'Grader' },
    { code: 'D.02', class: 'Medium Dozer', model: 'Dozer' },
    { code: 'VBR.01', class: 'Vibro 10 Ton', model: 'Vibro' }
  ];

  const [orderList, setOrderList] = useState([
    {
      id: 'SO-7208',
      customer: 'PT Mahligai Artha Sejahtera',
      namaProyek: 'Land Clearing 44',
      lokasiAwal: 'Pool Delta Parang Loe, Makassar',
      lokasiTujuan: 'Makassar (Site 44)',
      picPenerima: 'Bpk. Hendra (081298765432)',
      sales: 'ANS',
      jenisAlat: 'Excavator 20 Ton - Bucket',
      jenisSewa: 'S1',
      rencanaDurasi: '3 Hari',
      statusDurasi: 'Sesuai Rencana',
      catatanAktual: 'Sedang berjalan di lapangan',
      catatanLogistik: 'Bawa breaker & selang hidrolik cadangan.',
      statusLogistik: '🚚 Dalam Perjalanan (OTW)',
      trontonUnit: 'SL01',
      hmAwal: '1240.5 HM (Solar Full)',
      fotoMuatUrl: null,
      fotoTibaUrl: null,
      timestampMuat: '-',
      timestampTiba: '-',
      koordinatMuat: '-',
      koordinatTiba: '-',
      jumlahUnit: 1,
      kodeUnit: 'EXC.08',
      namaOperator: 'Baharuddin',
      status: 'Unit Ready / Dispatched'
    }
  ]);

  const [fleetStatus, setFleetStatus] = useState({
    'EXC.08': 'Working',
    'EXC.01': 'Ready',
    'MG-1': 'Breakdown'
  });

  const [notification, setNotification] = useState({ show: false, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrderNo = 'SO-' + Math.floor(1000 + Math.random() * 9000);
    const durasiString = `${formData.jumlahDurasi} ${formData.tipeDurasi}`;
    
    const newOrder = {
      id: newOrderNo,
      customer: formData.customer,
      namaProyek: formData.namaProyek,
      lokasiAwal: 'Pool Delta Perkasa Makassar',
      lokasiTujuan: formData.lokasiPengantaran || formData.lokasi,
      picPenerima: formData.picPenerima || 'Belum diisi PIC',
      sales: formData.sales,
      jenisAlat: formData.jenisAlat,
      jenisSewa: formData.jenisSewa,
      rencanaDurasi: durasiString,
      statusDurasi: 'Sesuai Rencana',
      catatanAktual: 'Menunggu alokasi lapangan',
      catatanLogistik: 'Belum ada catatan khusus',
      statusLogistik: '⏳ Menunggu Jadwal Muat',
      trontonUnit: 'SL01',
      hmAwal: 'Belum diisi',
      fotoMuatUrl: null,
      fotoTibaUrl: null,
      timestampMuat: '-',
      timestampTiba: '-',
      koordinatMuat: '-',
      koordinatTiba: '-',
      jumlahUnit: Number(formData.jumlahUnit) || 1,
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
      lokasiPengantaran: '',
      picPenerima: '',
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

  // Handler Tambah Timesheet Harian (Sesuai Lampiran Spreadsheet)
  const handleAddTimesheet = (e) => {
    e.preventDefault();
    const hmS = parseFloat(tsForm.hmStart) || 0;
    const hmE = parseFloat(tsForm.hmEnd) || 0;
    const total = Number((hmE - hmS).toFixed(2));
    const otVal = parseFloat(tsForm.ot) || 0;
    const workingHour = Number((total > 0 ? total : 0).toFixed(2));

    const newTs = {
      id: 'TS-' + Math.floor(1000 + Math.random() * 9000),
      kodeGajiOp: tsForm.kodeGajiOp,
      kodeTagih: tsForm.kodeTagih,
      jobId: tsForm.jobId,
      tanggal: tsForm.tanggal,
      hari: tsForm.hari,
      operator: tsForm.operator,
      attach: tsForm.attach,
      unitCode: tsForm.unitCode,
      model: tsForm.model,
      namaPenyewa: tsForm.namaPenyewa,
      alamat: tsForm.alamat,
      jobVia: tsForm.jobVia,
      jamMulai: tsForm.jamMulai,
      jamSelesai: tsForm.jamSelesai,
      durasiIstirahat: tsForm.durasiIstirahat,
      standby: tsForm.standby,
      totalJamKerja: tsForm.totalJamKerja,
      hmStart: hmS,
      hmEnd: hmE,
      totalHm: total,
      ot: otVal,
      unitWorkingHour: workingHour,
      opWorkingHour: workingHour,
      hariKerjaAlat: total > 0 ? 1.00 : 0.00,
      pencukupan: tsForm.pencukupan,
      keterangan: tsForm.keterangan || '-',
      tipeJam: tsForm.tipeJam
    };

    setTimesheetList([newTs, ...timesheetList]);
    setNotification({ show: true, message: 'Data Timesheet Admin Harian berhasil ditambahkan!' });
    setTimeout(() => setNotification({ show: false, message: '' }), 3000);
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

  const updateCatatanLogistik = (id, newLogistikNote) => {
    setOrderList(orderList.map(order => 
      order.id === id ? { ...order, catatanLogistik: newLogistikNote } : order
    ));
  };

  const updateHmAwal = (id, newHmAwal) => {
    setOrderList(orderList.map(order => 
      order.id === id ? { ...order, hmAwal: newHmAwal } : order
    ));
  };

  const updateLokasiAwal = (id, val) => {
    setOrderList(orderList.map(order => order.id === id ? { ...order, lokasiAwal: val } : order));
  };

  const updateLokasiTujuan = (id, val) => {
    setOrderList(orderList.map(order => order.id === id ? { ...order, lokasiTujuan: val } : order));
  };

  const updatePicPenerima = (id, val) => {
    setOrderList(orderList.map(order => order.id === id ? { ...order, picPenerima: val } : order));
  };

  const updateTrontonUnit = (id, newTronton) => {
    setOrderList(orderList.map(order => 
      order.id === id ? { ...order, trontonUnit: newTronton } : order
    ));
  };

  const updateStatusLogistik = (id, newLogistikStatus) => {
    setOrderList(orderList.map(order => 
      order.id === id ? { ...order, statusLogistik: newLogistikStatus } : order
    ));
  };

  // Fungsi Pemicu Kamera HP
  const triggerCamera = (id, jenis) => {
    activeCaptureRef.current = { orderId: id, jenis: jenis };
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handler Tangkap Foto & Preview Gambar
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

          setOrderList(orderList.map(order => {
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
          setOrderList(orderList.map(order => {
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

  const updateFleetCondition = (unitCode, condition) => {
    setFleetStatus(prev => ({ ...prev, [unitCode]: condition }));
  };

  // FUNGSI DOWNLOAD EXCEL (CSV FORMAT)
  const exportToExcel = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "No Order,Customer,Proyek,Sales,Request Alat,Jumlah Unit,Skema,Durasi,Lokasi Awal,Lokasi Tujuan,PIC Penerima,Unit Teralokasi,Operator,HM Awal,Status Logistik,Status Order\n";

    orderList.forEach(order => {
      const row = [
        order.id,
        `"${order.customer}"`,
        `"${order.namaProyek}"`,
        order.sales,
        `"${order.jenisAlat}"`,
        order.jumlahUnit,
        order.jenisSewa,
        `"${order.rencanaDurasi}"`,
        `"${order.lokasiAwal}"`,
        `"${order.lokasiTujuan}"`,
        `"${order.picPenerima}"`,
        order.kodeUnit,
        `"${order.namaOperator}"`,
        `"${order.hmAwal}"`,
        `"${order.statusLogistik}"`,
        `"${order.status}"`
      ];
      csvContent += row.join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Rekap_Sales_Order_Delta_Perkasa_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sendWhatsAppNotification = (order) => {
    const phone = salesPhoneBook[order.sales] || '';
    const message = `🏗️ *DELTA PERKASA RENTAL* 🏗️\nUpdate Lapangan SO *${order.id}* (${order.customer}) | Request Alat: *${order.jenisAlat}* (Jml: ${order.jumlahUnit}) | Unit: *${order.kodeUnit}* (HM: ${order.hmAwal}) | Operator: *${order.namaOperator}* | Status: *${order.status}*. Terima kasih!`;
    const encodedMessage = encodeURIComponent(message);
    const waUrl = phone ? `https://wa.me/${phone}?text=${encodedMessage}` : `https://wa.me/?text=${encodedMessage}`;
    window.open(waUrl, '_blank');
  };

  const sendLogisticsWhatsApp = (order) => {
    const message = `🚚 *CV CHANDRA DELTA PERKASA — LOGISTIK* 🚚\n\nDetail Mobilisasi Order *${order.id}*:\n- *Customer:* ${order.customer} (${order.namaProyek})\n- *Request Alat:* ${order.jenisAlat} (${order.jumlahUnit} Unit)\n- *Unit & HM/BBM:* ${order.kodeUnit} | ${order.hmAwal}\n- *Tronton:* ${order.trontonUnit}\n- *Asal:* ${order.lokasiAwal}\n- *Tujuan:* ${order.lokasiTujuan}\n- *PIC Penerima:* ${order.picPenerima}\n- *Catatan:* _${order.catatanLogistik}_\n\nMohon koordinasikan. Terima kasih!`;
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${logisticsPhone}?text=${encodedMessage}`;
    window.open(waUrl, '_blank');
  };

  const sendLogisticsUpdateToSales = (order) => {
    const phone = salesPhoneBook[order.sales] || '';
    const message = `📢 *INFO LOGISTIK LENGKAP* 📢\nHalo ${order.sales}, update pengiriman order *${order.id}* (${order.customer}):\n- *Request Alat:* ${order.jenisAlat} (${order.jumlahUnit} Unit)\n- *Unit:* ${order.kodeUnit} (HM/BBM: ${order.hmAwal})\n- *Tronton:* ${order.trontonUnit}\n- *Rute:* ${order.lokasiAwal} ➡️ ${order.lokasiTujuan}\n- *PIC Penerima:* ${order.picPenerima}\n- *Status:* *${order.statusLogistik}*\n- *Foto Muat:* ${order.timestampMuat} (${order.koordinatMuat})\n- *Foto Tiba:* ${order.timestampTiba} (${order.koordinatTiba})\n\nTerima kasih!`;
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
    { label: 'S1', value: 'S1' },
    { label: 'S2', value: 'S2' },
    { label: 'S3', value: 'S3' }
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
      
      {/* Hidden File Input untuk Kamera */}
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
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
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
                Pusat Rental Alat Berat Sulawesi
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-wide">
                CV CHANDRA DELTA PERKASA
              </h1>
              <p className="text-xs text-slate-300 mt-1">
                Dashboard Operasional, Alokasi Unit, & Koordinasi Logistik Lapangan (Makassar & Sekitarnya)
              </p>
            </div>
          </div>

          <div className="z-10 bg-slate-950/80 border border-slate-800 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-inner">
            <div className="text-3xl">🚜</div>
            <div>
              <div className="text-[10px] font-bold text-amber-400 uppercase">Total Armada Ready</div>
              <div className="text-xl font-black text-white">{fleetDatabase.length} Unit</div>
              <div className="text-[10px] text-slate-400">Exca 20T, Mini, Vibro, Dozer, Grader</div>
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS (DASHBOARD UTAMA VS ADMIN TIMESHEET) */}
        <div className="flex bg-slate-900 p-1.5 border border-slate-800 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            📋 Sales Order & Alokasi
          </button>
          <button
            onClick={() => setActiveTab('timesheet')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === 'timesheet' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            ⏱️ Admin Timesheet Harian
          </button>
        </div>

        {notification.show && (
          <div className="p-4 bg-emerald-950 border border-emerald-500 text-emerald-200 rounded-xl text-sm font-medium">
            {notification.message}
          </div>
        )}

        {/* KONTEN BERDASARKAN TAB AKTIF */}
        {activeTab === 'dashboard' ? (
          <>
            {/* FORM SALES ORDER */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
              <h2 className="text-xl font-black text-white mb-1">Formulir Pemesanan Alat Berat (Sales Order)</h2>
              <p className="text-xs text-blue-400 mb-6 uppercase tracking-wider font-bold">Masukkan data proyek, lokasi pengantaran, dan skema sewa dengan lengkap</p>

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
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Lokasi Proyek Tujuan</label>
                    <input type="text" name="lokasi" value={formData.lokasi} onChange={handleChange} placeholder="Contoh: Makassar / Gowa" required className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-950/60 border border-purple-900/40 rounded-2xl">
                  <div>
                    <label className="block text-[11px] font-bold text-purple-300 uppercase tracking-wider mb-1">
                      📍 Lokasi Pengantaran / Alamat Drop Unit
                    </label>
                    <input
                      type="text"
                      name="lokasiPengantaran"
                      value={formData.lokasiPengantaran}
                      onChange={handleChange}
                      placeholder="Contoh: Jl. Poros Malino Km. 7 / Link Google Maps"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-purple-800/60 rounded-xl text-sm text-white placeholder-slate-600 outline-none focus:border-purple-500 transition-all font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-purple-300 uppercase tracking-wider mb-1">
                      👤 Nama PIC & No HP Penerima di Lokasi
                    </label>
                    <input
                      type="text"
                      name="picPenerima"
                      value={formData.picPenerima}
                      onChange={handleChange}
                      placeholder="Contoh: Pak Budi (081234567890)"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-purple-800/60 rounded-xl text-sm text-white placeholder-slate-600 outline-none focus:border-purple-500 transition-all font-bold text-amber-300"
                    />
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
                      <input type="number" name="jumlahDurasi" min="1" value={formData.jumlahDurasi} onChange={handleChange} required className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-100 text-sm focus:ring-2 focus:ring-teal-500 outline-none font-bold" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-teal-400 uppercase mb-1">Satuan Rencana</label>
                      <select name="tipeDurasi" value={formData.tipeDurasi} onChange={handleChange} className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-teal-300 font-bold text-sm focus:ring-2 focus:ring-teal-500 outline-none cursor-pointer">
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

            {/* KONTROL LAPANGAN & INSTRUKSI LOGISTIK */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-black text-white">Kontrol Lapangan & Instruksi Logistik Unit</h2>
                  <p className="text-xs text-slate-400">Pantau status unit, operator, HM Awal/BBM, dan evaluasi waktu riil secara real-time</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button 
                    onClick={exportToExcel}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>📥</span> Download Rekap Excel
                  </button>

                  <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-1.5 border border-slate-800 rounded-xl">
                    <span className="text-xs font-bold text-slate-400 px-2">Filter Sales:</span>
                    {['ALL', 'ANS', 'UCI', 'CDP', 'FAN'].map(sal => (
                      <button
                        key={sal}
                        onClick={() => setSelectedSalesFilter(sal)}
                        className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          selectedSalesFilter === sal ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        {sal}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-xs text-slate-400 uppercase tracking-wider">
                      <th className="py-3 px-4">No. Order</th>
                      <th className="py-3 px-4">Customer / Proyek</th>
                      <th className="py-3 px-4 text-teal-400">Evaluasi Waktu Riil</th>
                      <th className="py-3 px-4 text-amber-400">Alokasi Unit, Operator & HM Awal/BBM</th>
                      <th className="py-3 px-4 text-purple-400">Catatan Khusus & Logistik</th>
                      <th className="py-3 px-4 text-blue-400">Dokumentasi & Koordinasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-sm">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-8 text-slate-500">
                          Tidak ada data Sales Order untuk filter sales ini.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map(order => (
                        <tr key={order.id} className="hover:bg-slate-950/40 transition-all align-top">
                          <td className="py-4 px-4">
                            <div className="font-black text-white">{order.id}</div>
                            <div className="inline-block px-2 py-0.5 mt-1 bg-blue-500/20 text-blue-400 font-bold text-[10px] rounded">
                              Sales: {order.sales}
                            </div>
                            <div className="text-[11px] text-slate-400 mt-1">Skema: <span className="text-amber-400 font-bold">{order.jenisSewa}</span></div>
                            <div className="text-[11px] text-slate-300 mt-0.5 font-semibold">{order.jenisAlat} ({order.jumlahUnit} Unit)</div>
                          </td>

                          <td className="py-4 px-4">
                            <div className="font-bold text-slate-200">{order.customer}</div>
                            <div className="text-xs text-amber-400/90 font-medium">Proyek: {order.namaProyek}</div>
                            <div className="mt-2 space-y-1 text-xs text-slate-400">
                              <div><span className="text-slate-500">Asal:</span> <input type="text" value={order.lokasiAwal} onChange={(e) => updateLokasiAwal(order.id, e.target.value)} className="bg-slate-950 border border-slate-800 rounded px-1.5 py-0.5 text-slate-200 w-full text-[11px] mt-0.5" /></div>
                              <div><span className="text-slate-500">Tujuan:</span> <input type="text" value={order.lokasiTujuan} onChange={(e) => updateLokasiTujuan(order.id, e.target.value)} className="bg-slate-950 border border-slate-800 rounded px-1.5 py-0.5 text-slate-200 w-full text-[11px] mt-0.5" /></div>
                              <div><span className="text-slate-500">PIC:</span> <input type="text" value={order.picPenerima} onChange={(e) => updatePicPenerima(order.id, e.target.value)} className="bg-slate-950 border border-slate-800 rounded px-1.5 py-0.5 text-amber-300 font-bold w-full text-[11px] mt-0.5" /></div>
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <div className="space-y-2">
                              <div>
                                <span className="text-[10px] text-slate-500 uppercase font-bold">Rencana Durasi</span>
                                <div className="text-xs text-slate-300 font-medium">{order.rencanaDurasi}</div>
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-teal-400 uppercase mb-1">Status Durasi Lapangan</label>
                                <select 
                                  value={order.statusDurasi} 
                                  onChange={(e) => updateStatusDurasi(order.id, e.target.value)}
                                  className="w-full px-2 py-1.5 bg-slate-950 border border-teal-800/60 rounded-lg text-teal-300 text-xs font-bold outline-none cursor-pointer"
                                >
                                  <option value="Sesuai Rencana">Sesuai Rencana</option>
                                  <option value="Potensi Overtime">Potensi Overtime</option>
                                  <option value="Overtime Aktif">Overtime Aktif</option>
                                  <option value="Selesai / Close">Selesai / Close</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Catatan Aktual</label>
                                <input 
                                  type="text" 
                                  value={order.catatanAktual} 
                                  onChange={(e) => updateCatatanAktual(order.id, e.target.value)}
                                  placeholder="Keterangan lapangan..." 
                                  className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-slate-200 text-xs outline-none"
                                />
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <div className="space-y-2">
                              <div>
                                <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Pilih Kode Unit</label>
                                <select 
                                  value={order.kodeUnit} 
                                  onChange={(e) => updateKodeUnit(order.id, e.target.value)}
                                  className="w-full px-2 py-1.5 bg-slate-950 border border-amber-800/60 rounded-lg text-amber-300 text-xs font-bold outline-none cursor-pointer"
                                >
                                  <option value="Belum Dipilih">-- Pilih Unit --</option>
                                  {fleetDatabase.map(f => (
                                    <option key={f.code} value={f.code}>{f.code} ({f.class})</option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Nama Operator</label>
                                <select 
                                  value={order.namaOperator} 
                                  onChange={(e) => updateOperator(order.id, e.target.value)}
                                  className="w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 text-xs outline-none cursor-pointer"
                                >
                                  <option value="Belum Ditentukan">-- Pilih Operator --</option>
                                  {operatorDatabase.map(op => (
                                    <option key={op} value={op}>{op}</option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">HM Awal / BBM</label>
                                <input 
                                  type="text" 
                                  value={order.hmAwal} 
                                  onChange={(e) => updateHmAwal(order.id, e.target.value)}
                                  placeholder="Contoh: 1240 HM (Full)" 
                                  className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-slate-200 text-xs outline-none font-mono"
                                />
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <div className="space-y-2">
                              <div>
                                <label className="block text-[10px] font-bold text-purple-400 uppercase mb-1">Catatan Logistik / Muat</label>
                                <textarea 
                                  value={order.catatanLogistik} 
                                  onChange={(e) => updateCatatanLogistik(order.id, e.target.value)}
                                  rows="2"
                                  className="w-full px-2 py-1 bg-slate-950 border border-purple-900/60 rounded text-slate-200 text-xs outline-none resize-none"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Armada Tronton Pengangkut</label>
                                <select 
                                  value={order.trontonUnit} 
                                  onChange={(e) => updateTrontonUnit(order.id, e.target.value)}
                                  className="w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 text-xs outline-none cursor-pointer"
                                >
                                  {trontonFleet.map(t => (
                                    <option key={t.code} value={t.code}>{t.name}</option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Status Pengiriman Tronton</label>
                                <select 
                                  value={order.statusLogistik} 
                                  onChange={(e) => updateStatusLogistik(order.id, e.target.value)}
                                  className="w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-amber-300 text-xs font-bold outline-none cursor-pointer"
                                >
                                  <option value="⏳ Menunggu Jadwal Muat">⏳ Menunggu Jadwal Muat</option>
                                  <option value="🚚 Dalam Perjalanan (OTW)">🚚 Dalam Perjalanan (OTW)</option>
                                  <option value="✅ Unit Tiba di Lokasi & Selesai Drop">✅ Unit Tiba di Lokasi & Selesai Drop</option>
                                </select>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-4 space-y-3">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-1">
                                <button 
                                  type="button"
                                  onClick={() => triggerCamera(order.id, 'muat')}
                                  className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[10px] rounded border border-slate-700 transition-all flex items-center justify-center gap-1 cursor-pointer"
                                >
                                  <span>📷</span> Foto Muat
                                </button>
                                {order.fotoMuatUrl && (
                                  <div className="text-[10px] text-emerald-400 font-medium truncate">✓ Muat Tercatat</div>
                                )}
                              </div>

                              <div className="space-y-1">
                                <button 
                                  type="button"
                                  onClick={() => triggerCamera(order.id, 'tiba')}
                                  className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[10px] rounded border border-slate-700 transition-all flex items-center justify-center gap-1 cursor-pointer"
                                >
                                  <span>📷</span> Foto Tiba
                                </button>
                                {order.fotoTibaUrl && (
                                  <div className="text-[10px] text-emerald-400 font-medium truncate">✓ Tiba Tercatat</div>
                                )}
                              </div>
                            </div>

                            <div className="space-y-1.5 pt-2 border-t border-slate-800">
                              <button 
                                type="button"
                                onClick={() => sendLogisticsWhatsApp(order)}
                                className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-[10px] rounded-lg shadow transition-all flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <span>📲</span> WA Logistik Pool
                              </button>

                              <button 
                                type="button"
                                onClick={() => sendWhatsAppNotification(order)}
                                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] rounded-lg shadow transition-all flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <span>💬</span> WA Sales ({order.sales})
                              </button>

                              <button 
                                type="button"
                                onClick={() => sendLogisticsUpdateToSales(order)}
                                className="w-full py-1.5 bg-blue-600/80 hover:bg-blue-500 text-white font-bold text-[10px] rounded-lg shadow transition-all flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <span>📋</span> Kirim Info Lengkap WA
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* MONITORING STATUS ARMADA */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-black text-white">Monitoring Status Ketersediaan Armada</h2>
                  <p className="text-xs text-slate-400">Filter kelas alat berat dan perbarui status operasional unit secara langsung</p>
                </div>

                <div className="w-full md:w-72">
                  <input 
                    type="text"
                    placeholder="Cari kode unit (Contoh: EXC.08, MG-1)..."
                    value={fleetSearchQuery}
                    onChange={(e) => setFleetSearchQuery(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {uniqueClasses.map(cls => (
                  <button
                    key={cls}
                    onClick={() => setSelectedFleetFilter(cls)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                      selectedFleetFilter === cls ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-96 overflow-y-auto p-1">
                {filteredFleet.map(item => {
                  const currentStatus = fleetStatus[item.code] || 'Ready';
                  const statusColor = currentStatus === 'Working' ? 'bg-blue-950/80 border-blue-600/60 text-blue-300' :
                                      currentStatus === 'Breakdown' ? 'bg-red-950/80 border-red-600/60 text-red-300' :
                                      'bg-emerald-950/80 border-emerald-600/60 text-emerald-300';

                  return (
                    <div key={item.code} className={`p-3 border rounded-2xl flex flex-col justify-between gap-2 transition-all ${statusColor}`}>
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="font-black text-sm tracking-wide">{item.code}</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-950/60">
                            {currentStatus}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-300 mt-0.5 truncate">{item.class}</div>
                      </div>

                      <select 
                        value={currentStatus}
                        onChange={(e) => updateFleetCondition(item.code, e.target.value)}
                        className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-[11px] font-bold text-white outline-none cursor-pointer"
                      >
                        <option value="Ready">Ready</option>
                        <option value="Working">Working</option>
                        <option value="Breakdown">Breakdown</option>
                      </select>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          /* TAB: ADMIN TIMESHEET HARIAN (LENGKAP SESUAI GAMBAR LAMPIRAN) */
          <div className="space-y-6">
            <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-8 shadow-2xl">
              <h2 className="text-xl font-black text-white mb-1">Formulir Admin Timesheet Harian</h2>
              <p className="text-xs text-amber-400 mb-6 uppercase tracking-wider font-bold">Input lengkap sesuai parameter spreadsheet rekapitulasi harian</p>

              <form onSubmit={handleAddTimesheet} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Kode Gaji Operator</label>
                  <input type="text" value={tsForm.kodeGajiOp} onChange={(e) => setTsForm({...tsForm, kodeGajiOp: e.target.value})} required className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Kode Tagih</label>
                  <input type="text" value={tsForm.kodeTagih} onChange={(e) => setTsForm({...tsForm, kodeTagih: e.target.value})} required className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Job ID</label>
                  <input type="text" value={tsForm.jobId} onChange={(e) => setTsForm({...tsForm, jobId: e.target.value})} required className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Tanggal</label>
                  <input type="text" value={tsForm.tanggal} onChange={(e) => setTsForm({...tsForm, tanggal: e.target.value})} placeholder="Contoh: 11-Sep-26" required className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Hari</label>
                  <input type="text" value={tsForm.hari} onChange={(e) => setTsForm({...tsForm, hari: e.target.value})} placeholder="Contoh: Jumat" required className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Operator</label>
                  <select value={tsForm.operator} onChange={(e) => setTsForm({...tsForm, operator: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white">
                    {operatorDatabase.map(op => <option key={op} value={op}>{op}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Attachment</label>
                  <input type="text" value={tsForm.attach} onChange={(e) => setTsForm({...tsForm, attach: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Unit Code</label>
                  <select value={tsForm.unitCode} onChange={(e) => setTsForm({...tsForm, unitCode: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-amber-300 font-bold">
                    {fleetDatabase.map(f => <option key={f.code} value={f.code}>{f.code} - {f.model}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Model Alat</label>
                  <input type="text" value={tsForm.model} onChange={(e) => setTsForm({...tsForm, model: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Nama Penyewa</label>
                  <input type="text" value={tsForm.namaPenyewa} onChange={(e) => setTsForm({...tsForm, namaPenyewa: e.target.value})} required className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Alamat Proyek</label>
                  <input type="text" value={tsForm.alamat} onChange={(e) => setTsForm({...tsForm, alamat: e.target.value})} required className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Job Via</label>
                  <input type="text" value={tsForm.jobVia} onChange={(e) => setTsForm({...tsForm, jobVia: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Jam Mulai</label>
                  <input type="text" value={tsForm.jamMulai} onChange={(e) => setTsForm({...tsForm, jamMulai: e.target.value})} placeholder="Opsional" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Jam Selesai</label>
                  <input type="text" value={tsForm.jamSelesai} onChange={(e) => setTsForm({...tsForm, jamSelesai: e.target.value})} placeholder="Opsional" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Durasi Istirahat (jam)</label>
                  <input type="text" value={tsForm.durasiIstirahat} onChange={(e) => setTsForm({...tsForm, durasiIstirahat: e.target.value})} placeholder="Opsional" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Standby (jam)</label>
                  <input type="text" value={tsForm.standby} onChange={(e) => setTsForm({...tsForm, standby: e.target.value})} placeholder="Opsional" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-teal-400 uppercase mb-1">HM Start</label>
                  <input type="number" step="0.1" value={tsForm.hmStart} onChange={(e) => setTsForm({...tsForm, hmStart: e.target.value})} required className="w-full px-3 py-2 bg-slate-950 border border-teal-800 rounded-xl text-xs text-teal-300 font-mono font-bold" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-teal-400 uppercase mb-1">HM End</label>
                  <input type="number" step="0.1" value={tsForm.hmEnd} onChange={(e) => setTsForm({...tsForm, hmEnd: e.target.value})} required className="w-full px-3 py-2 bg-slate-950 border border-teal-800 rounded-xl text-xs text-teal-300 font-mono font-bold" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-amber-400 uppercase mb-1">Overtime (OT)</label>
                  <input type="number" step="0.1" value={tsForm.ot} onChange={(e) => setTsForm({...tsForm, ot: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-amber-800 rounded-xl text-xs text-amber-300 font-mono font-bold" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Pencukupan</label>
                  <input type="text" value={tsForm.pencukupan} onChange={(e) => setTsForm({...tsForm, pencukupan: e.target.value})} placeholder="Opsional" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                </div>
                <div className="sm:col-span-2 md:col-span-3">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Keterangan</label>
                  <input type="text" value={tsForm.keterangan} onChange={(e) => setTsForm({...tsForm, keterangan: e.target.value})} placeholder="Contoh: Cukup 200 Jam / Kelebihan periode sebelumnya" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-purple-400 uppercase mb-1">Tipe Jam</label>
                  <select value={tsForm.tipeJam} onChange={(e) => setTsForm({...tsForm, tipeJam: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-purple-300 font-bold">
                    <option value="Hour Meter">Hour Meter</option>
                    <option value="Jam Dunia">Jam Dunia</option>
                  </select>
                </div>

                <div className="sm:col-span-2 md:col-span-4 mt-2">
                  <button type="submit" className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl shadow-lg transition-all cursor-pointer">
                    Simpan & Rekap Timesheet Harian &rarr;
                  </button>
                </div>
              </form>
            </div>

            {/* TABEL REKAP TIMESHEET SESUAI LAMPIRAN */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-black text-white">Tabel Rekapitulasi Admin Timesheet</h2>
                  <p className="text-xs text-slate-400">Sinkronisasi lengkap dengan seluruh kolom pada spreadsheet laporan harian</p>
                </div>
              </div>

              <div className="overflow-x-auto max-w-full">
                <table className="w-full text-left border-collapse whitespace-nowrap text-xs">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider">
                      <th className="p-3">Kode Gaji Operator</th>
                      <th className="p-3">Kode Tagih</th>
                      <th className="p-3">Job ID</th>
                      <th className="p-3">Tanggal</th>
                      <th className="p-3">Hari</th>
                      <th className="p-3">Operator</th>
                      <th className="p-3">Attach.</th>
                      <th className="p-3">Unit Code</th>
                      <th className="p-3">Model</th>
                      <th className="p-3">Nama Penyewa</th>
                      <th className="p-3">Alamat</th>
                      <th className="p-3">Job Via</th>
                      <th className="p-3">Jam Mulai</th>
                      <th className="p-3">Jam Selesai</th>
                      <th className="p-3">Durasi Istirahat (jam)</th>
                      <th className="p-3">Standby (jam)</th>
                      <th className="p-3">Total Jam Kerja</th>
                      <th className="p-3 text-amber-300">HM Start</th>
                      <th className="p-3 text-amber-300">HM End</th>
                      <th className="p-3 text-amber-300">Total HM</th>
                      <th className="p-3 text-amber-300">OT</th>
                      <th className="p-3 bg-cyan-950/40 text-cyan-300">Unit Working Hour</th>
                      <th className="p-3 bg-cyan-950/40 text-cyan-300">Operator Working Hour</th>
                      <th className="p-3 bg-yellow-950/40 text-yellow-300">Hari Kerja Alat</th>
                      <th className="p-3">Pencukupan</th>
                      <th className="p-3">Keterangan</th>
                      <th className="p-3">Jam Dunia / HM</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                    {timesheetList.map(ts => (
                      <tr key={ts.id} className="hover:bg-slate-950/50">
                        <td className="p-3 font-bold text-emerald-400">{ts.kodeGajiOp}</td>
                        <td className="p-3 font-bold text-amber-400">{ts.kodeTagih}</td>
                        <td className="p-3 text-slate-300 font-sans">{ts.jobId}</td>
                        <td className="p-3 text-slate-300">{ts.tanggal}</td>
                        <td className="p-3 text-slate-300">{ts.hari}</td>
                        <td className="p-3 text-white font-bold font-sans">{ts.operator}</td>
                        <td className="p-3 text-slate-400">{ts.attach}</td>
                        <td className="p-3 font-bold text-amber-300 font-sans">{ts.unitCode}</td>
                        <td className="p-3 text-slate-300">{ts.model}</td>
                        <td className="p-3 text-slate-200 font-sans">{ts.namaPenyewa}</td>
                        <td className="p-3 text-slate-400 font-sans">{ts.alamat}</td>
                        <td className="p-3 text-blue-400 font-bold">{ts.jobVia}</td>
                        <td className="p-3 text-slate-400">{ts.jamMulai || '-'}</td>
                        <td className="p-3 text-slate-400">{ts.jamSelesai || '-'}</td>
                        <td className="p-3 text-slate-400">{ts.durasiIstirahat || '-'}</td>
                        <td className="p-3 text-slate-400">{ts.standby || '-'}</td>
                        <td className="p-3 text-slate-300">{ts.totalJamKerja || '-'}</td>
                        <td className="p-3 text-amber-200">{ts.hmStart.toFixed(1)}</td>
                        <td className="p-3 text-amber-200">{ts.hmEnd.toFixed(1)}</td>
                        <td className="p-3 text-amber-300 font-bold">{ts.totalHm.toFixed(1)}</td>
                        <td className="p-3 text-amber-400">{ts.ot > 0 ? ts.ot.toFixed(1) : '-'}</td>
                        <td className="p-3 bg-cyan-950/30 text-cyan-200 font-bold">{ts.unitWorkingHour.toFixed(2)}</td>
                        <td className="p-3 bg-cyan-950/30 text-cyan-200 font-bold">{ts.opWorkingHour.toFixed(2)}</td>
                        <td className="p-3 bg-yellow-950/30 text-yellow-200 font-bold">{ts.hariKerjaAlat.toFixed(2)}</td>
                        <td className="p-3 text-slate-500">{ts.pencukupan || '-'}</td>
                        <td className="p-3 text-slate-300 font-sans">{ts.keterangan}</td>
                        <td className="p-3 text-purple-300 font-sans">{ts.tipeJam}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
