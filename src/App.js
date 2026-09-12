import React, { useState, useRef } from 'react';

export default function DeltaPerkasaApp() {
  // State Navigasi antar Divisi / Link Berbeda
  // Pilihan: 'dashboard' (Sales), 'timesheet' (Admin Timesheet), 'logistik' (Kepala Operator & Logistik)
  const [activeTab, setActiveTab] = useState('dashboard');

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
    'CDF': '082348222444',
    'FAN': '6281234567893'  
  };

  const logisticsPhone = '6285165659907';

  const trontonFleet = [
    { code: 'SL01', name: 'Tronton SL01' },
    { code: 'SL02', name: 'Tronton SL02' },
    { code: 'SL03', name: 'Tronton SL03' },
    { code: 'TW02', name: 'Tronton TW02' }
  ];

  const operatorDatabase = [
    'BUSTAM', 'ABDUL RAHIM SAPUTRA', 'BAHARUDDIN', 'SAHARUDDIN', 
    'RUSTAM', 'AMIR', 'YUSUF', 'ARIS', 'HERMAN', 'DG. SILA', 'RAHMAT', 'SUPRIADI'
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

  // Handler Tambah Timesheet Harian
  const handleAddTimesheet = (e) => {
    e.preventDefault();
    const hmS = parseFloat(tsForm.hmStart) || 0;
    const hmE = parseFloat(tsForm.hmEnd) || 0;
    const total = Number((hmE - hmS).toFixed(2));
    const otVal = parseFloat(tsForm.ot) || 0;
    const workingHour = Number((total > 0 ? total : 0).toFixed(2));

    const newTs = {
      id: 'TS-' + Math.floor(1000 + Math.random() * 9000),
      ...tsForm,
      totalHm: total,
      unitWorkingHour: workingHour,
      opWorkingHour: workingHour,
      hariKerjaAlat: total > 0 ? 1.00 : 0.00,
      keterangan: tsForm.keterangan || '-'
    };

    setTimesheetList([newTs, ...timesheetList]);
    setNotification({ show: true, message: 'Data Timesheet Admin Harian berhasil ditambahkan!' });
    setTimeout(() => setNotification({ show: false, message: '' }), 3000);
  };

  const triggerCamera = (id, jenis) => {
    activeCaptureRef.current = { orderId: id, jenis: jenis };
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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

  const exportToExcel = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "No Order,Customer,Proyek,Sales,Request Alat,Jumlah Unit,Skema,Durasi,Lokasi Awal,Lokasi Tujuan,PIC Penerima,Unit Teralokasi,Operator,HM Awal,Status Logistik,Status Order\n";

    orderList.forEach(order => {
      const row = [
        order.id, `"${order.customer}"`, `"${order.namaProyek}"`, order.sales,
        `"${order.jenisAlat}"`, order.jumlahUnit, order.jenisSewa, `"${order.rencanaDurasi}"`,
        `"${order.lokasiAwal}"`, `"${order.lokasiTujuan}"`, `"${order.picPenerima}"`,
        order.kodeUnit, `"${order.namaOperator}"`, `"${order.hmAwal}"`, `"${order.statusLogistik}"`, `"${order.status}"`
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

  // Helper Simulasi URL Domain per Divisi
  const getDomainUrl = () => {
    switch(activeTab) {
      case 'dashboard': return 'https://app.deltaperkasa.com/sales-order';
      case 'timesheet': return 'https://app.deltaperkasa.com/admin-timesheet';
      case 'logistik': return 'https://app.deltaperkasa.com/kepala-operator-logistik';
      default: return 'https://app.deltaperkasa.com';
    }
  };

  const salesOptions = [{ label: 'ANS', value: 'ANS' }, { label: 'UCI', value: 'UCI' }, { label: 'CDP', value: 'CDP' }, { label: 'FAN', value: 'FAN' }];
  const jenisSewaOptions = [{ label: 'S1', value: 'S1' }, { label: 'S2', value: 'S2' }, { label: 'S3', value: 'S3' }];

  const filteredOrders = selectedSalesFilter === 'ALL' ? orderList : orderList.filter(order => order.sales === selectedSalesFilter);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col items-center font-sans">
      
      {/* Hidden File Input untuk Kamera */}
      <input 
        type="file" 
        accept="image/*" 
        capture="environment" 
        ref={fileInputRef} 
        onChange={handleFileCaptured} 
        className="hidden" 
      />

      <div className="max-w-6xl w-full space-y-6">
        
        {/* HEADER BRANDING */}
        <div className="relative bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-amber-500/40 rounded-3xl p-6 shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 z-10">
            <div className="w-16 h-16 bg-white rounded-2xl p-2 shadow-lg border-2 border-amber-500 flex items-center justify-center shrink-0">
              <div className="text-center font-black">
                <div className="text-red-700 text-xl leading-none">▲</div>
                <div className="text-[9px] text-blue-900 font-extrabold tracking-tighter">DELTA</div>
              </div>
            </div>
            <div>
              <span className="px-3 py-0.5 bg-amber-500/20 text-amber-400 font-bold text-[10px] uppercase rounded-full border border-amber-500/30">
                Sulawesi Region
              </span>
              <h1 className="text-xl md:text-2xl font-black text-white tracking-wide mt-1">
                CV CHANDRA DELTA PERKASA
              </h1>
              <p className="text-xs text-slate-300">
                Sistem Terpadu Manajemen Alat Berat, Sales Order, & Logistik Lapangan
              </p>
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS / PEMISAH LINK DIVISI */}
        <div className="bg-slate-900 p-2 border border-slate-800 rounded-2xl flex flex-col md:flex-row gap-2 justify-between items-center">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              📋 1. Link Sales (Sales Order)
            </button>
            <button
              onClick={() => setActiveTab('timesheet')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                activeTab === 'timesheet' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              ⏱️ 2. Link Admin Timesheet
            </button>
            <button
              onClick={() => setActiveTab('logistik')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                activeTab === 'logistik' ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              🚚 3. Link Kepala Operator & Logistik
            </button>
          </div>
        </div>

        {/* SIMULASI URL DOMAIN BAR AKTIF */}
        <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="bg-slate-800 text-amber-400 px-2.5 py-1 rounded font-mono text-[11px] font-bold">🔗 Active URL:</span>
            <span className="font-mono text-slate-200 truncate">{getDomainUrl()}</span>
          </div>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(getDomainUrl());
              alert('Link divisi berhasil disalin!');
            }}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded text-xs font-semibold shrink-0 cursor-pointer border border-slate-700"
          >
            Salin Link 📋
          </button>
        </div>

        {notification.show && (
          <div className="p-4 bg-emerald-950 border border-emerald-500 text-emerald-200 rounded-xl text-sm font-medium">
            {notification.message}
          </div>
        )}

        {/* ================= DIVISI 1: SALES ORDER & DASHBOARD ================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
              <h2 className="text-lg font-black text-white mb-1">Formulir Pemesanan Alat Berat (Sales Order)</h2>
              <p className="text-xs text-blue-400 mb-6 uppercase tracking-wider font-bold">Masukkan data proyek, lokasi pengantaran, dan skema sewa</p>

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
                    <label className="block text-[11px] font-bold text-purple-300 uppercase tracking-wider mb-1">📍 Lokasi Pengantaran / Alamat Drop Unit</label>
                    <input type="text" name="lokasiPengantaran" value={formData.lokasiPengantaran} onChange={handleChange} placeholder="Contoh: Jl. Poros Malino Km. 7" className="w-full px-4 py-2.5 bg-slate-950 border border-purple-800/60 rounded-xl text-sm text-white outline-none font-mono" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-purple-300 uppercase tracking-wider mb-1">👤 Nama PIC & No HP Penerima</label>
                    <input type="text" name="picPenerima" value={formData.picPenerima} onChange={handleChange} placeholder="Contoh: Pak Budi (081234567890)" className="w-full px-4 py-2.5 bg-slate-950 border border-purple-800/60 rounded-xl text-sm text-amber-300 font-bold outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Sales / VIA</label>
                    <select name="sales" value={formData.sales} onChange={handleChange} className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm outline-none cursor-pointer">
                      {salesOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-amber-400 uppercase mb-1">Skema Kontrak</label>
                    <select name="jenisSewa" value={formData.jenisSewa} onChange={handleChange} className="w-full px-4 py-3 bg-slate-950 border border-amber-600/60 rounded-xl text-amber-300 font-bold text-sm outline-none cursor-pointer">
                      {jenisSewaOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-teal-400 uppercase mb-1">Estimasi Jumlah Unit</label>
                    <input type="number" name="jumlahUnit" min="1" value={formData.jumlahUnit} onChange={handleChange} required className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm outline-none" />
                  </div>
                </div>

                <button type="submit" className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-2xl shadow-xl transition-all cursor-pointer">
                  Terbitkan Sales Order (SO) Baru 🚀
                </button>
              </form>
            </div>

            {/* DAFTAR ORDER & LAPORAN */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h3 className="text-lg font-black text-white">Daftar Sales Order & Alokasi Lapangan</h3>
                <button onClick={exportToExcel} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow cursor-pointer">
                  📥 Download Rekap Excel (CSV)
                </button>
              </div>

              <div className="space-y-4">
                {filteredOrders.map(order => (
                  <div key={order.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                      <div>
                        <span className="font-black text-amber-400">{order.id}</span> — <span className="font-bold text-white">{order.customer}</span>
                      </div>
                      <span className="text-xs bg-blue-950 text-blue-300 px-3 py-1 rounded-full font-bold">{order.sales} | {order.jenisSewa}</span>
                    </div>
                    <div className="text-xs text-slate-300 grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>📍 <b>Proyek:</b> {order.namaProyek} ({order.lokasiTujuan})</div>
                      <div>🚜 <b>Alat:</b> {order.jenisAlat} (Jml: {order.jumlahUnit})</div>
                      <div>👤 <b>PIC:</b> {order.picPenerima}</div>
                      <div>📌 <b>Status:</b> {order.status}</div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button onClick={() => sendWhatsAppNotification(order)} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg cursor-pointer">
                        💬 WhatsApp Sales
                      </button>
                      <button onClick={() => sendLogisticsWhatsApp(order)} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg cursor-pointer">
                        🚚 WhatsApp Logistik
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= DIVISI 2: ADMIN TIMESHEET HARIAN ================= */}
        {activeTab === 'timesheet' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
            <div>
              <h2 className="text-lg font-black text-white mb-1">Admin Timesheet Harian (Format Spreadsheet)</h2>
              <p className="text-xs text-amber-400 font-bold uppercase">Pencatatan jam kerja operator, Hour Meter (HM), dan kalkulasi otomatis</p>
            </div>

            <form onSubmit={handleAddTimesheet} className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div>
                <label className="block text-[10px] text-slate-400 font-bold mb-1">Tanggal</label>
                <input type="text" value={tsForm.tanggal} onChange={(e) => setTsForm({...tsForm, tanggal: e.target.value})} className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white" required />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 font-bold mb-1">Kode Unit</label>
                <input type="text" value={tsForm.unitCode} onChange={(e) => setTsForm({...tsForm, unitCode: e.target.value})} className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white" required />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 font-bold mb-1">Nama Operator</label>
                <input type="text" value={tsForm.operator} onChange={(e) => setTsForm({...tsForm, operator: e.target.value})} className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white" required />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 font-bold mb-1">Nama Penyewa</label>
                <input type="text" value={tsForm.namaPenyewa} onChange={(e) => setTsForm({...tsForm, namaPenyewa: e.target.value})} className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white" required />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 font-bold mb-1">HM Start</label>
                <input type="number" step="0.1" value={tsForm.hmStart} onChange={(e) => setTsForm({...tsForm, hmStart: e.target.value})} className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white" required />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 font-bold mb-1">HM End</label>
                <input type="number" step="0.1" value={tsForm.hmEnd} onChange={(e) => setTsForm({...tsForm, hmEnd: e.target.value})} className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white" required />
              </div>
              <div className="md:col-span-2 flex items-end">
                <button type="submit" className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition-all cursor-pointer">
                  + Simpan Timesheet Harian
                </button>
              </div>
            </form>

            {/* TABEL TIMESHEET */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <th className="p-3">Tanggal</th>
                    <th className="p-3">Unit</th>
                    <th className="p-3">Operator</th>
                    <th className="p-3">Penyewa</th>
                    <th className="p-3">HM Start</th>
                    <th className="p-3">HM End</th>
                    <th className="p-3">Total HM</th>
                    <th className="p-3">Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  {timesheetList.map(ts => (
                    <tr key={ts.id} className="border-b border-slate-800/60 hover:bg-slate-950/40">
                      <td className="p-3">{ts.tanggal}</td>
                      <td className="p-3 font-bold text-amber-400">{ts.unitCode}</td>
                      <td className="p-3">{ts.operator}</td>
                      <td className="p-3">{ts.namaPenyewa}</td>
                      <td className="p-3">{ts.hmStart}</td>
                      <td className="p-3">{ts.hmEnd}</td>
                      <td className="p-3 font-bold text-emerald-400">{ts.totalHm} Jam</td>
                      <td className="p-3 text-slate-400">{ts.keterangan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= DIVISI 3: KEPALA OPERATOR & LOGISTIK ================= */}
        {activeTab === 'logistik' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div>
              <h2 className="text-lg font-black text-white mb-1">Kontrol Lapangan & Instruksi Logistik Unit</h2>
              <p className="text-xs text-purple-400 font-bold uppercase">Monitoring armada towing, pengantaran alat berat, dan kesiapan site</p>
            </div>

            <div className="space-y-3">
              {orderList.map(order => (
                <div key={order.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="font-bold text-white">SO: {order.id} — {order.customer}</div>
                    <div className="text-xs text-slate-400 mt-1">Tujuan: {order.lokasiTujuan} | Tronton: {order.trontonUnit}</div>
                    <div className="text-xs text-purple-300 font-semibold mt-1">Status: {order.statusLogistik}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => triggerCamera(order.id, 'muat')} className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-lg cursor-pointer">
                      📸 Foto Muat
                    </button>
                    <button onClick={() => triggerCamera(order.id, 'tiba')} className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg cursor-pointer">
                      📸 Foto Tiba
                    </button>
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
