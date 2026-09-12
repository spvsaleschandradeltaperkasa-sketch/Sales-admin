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
    { code: 'SL01', name: 'Tronton SL01' },
    { code: 'SL02', name: 'Tronton SL02' },
    { code: 'SL03', name: 'Tronton SL03' },
    { code: 'TW02', name: 'Tronton TW02' }
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
    { label: 'Excavator Mini SY55 - Breaker', value: 'Excavator Mini SY55 - Breaker' },
    { label: 'Excavator Mini SY75 - Bucket', value: 'Excavator Mini SY75 - Bucket' },
    { label: 'Excavator Mini SY75 - Breaker', value: 'Excavator Mini SY75 - Breaker' },
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
                      <input type="number" name="jumlahDurasi" min="1" value={formData.jumlahDurasi} onChange={handleChange} required className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-100 text-sm focus:ring-2 focus:ring-teal-500 outline-none font-mono" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-teal-400 uppercase mb-1">Satuan Durasi</label>
                      <select name="tipeDurasi" value={formData.tipeDurasi} onChange={handleChange} className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-100 text-sm outline-none cursor-pointer">
                        <option value="Jam">Jam</option>
                        <option value="Hari">Hari</option>
                        <option value="Bulan">Bulan</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Jenis Alat / Attachment</label>
                    <select name="jenisAlat" value={formData.jenisAlat} onChange={handleChange} className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer">
                      {alatOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Jumlah Unit Disewa</label>
                    <input type="number" name="jumlahUnit" min="1" max="10" value={formData.jumlahUnit} onChange={handleChange} required className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>

                <button type="submit" className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-black rounded-2xl shadow-xl transition-all uppercase tracking-wider text-sm cursor-pointer mt-4">
                  🚀 Terbitkan Sales Order (SO) & Kirim ke Alokasi
                </button>
              </form>
            </div>

            {/* DAFTAR SALES ORDER & ALOKASI LAPANGAN */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                  <h2 className="text-xl font-black text-white">Daftar Sales Order & Alokasi Lapangan</h2>
                  <p className="text-xs text-slate-400 mt-1">Kelola penugasan unit, operator, foto muat/tiba, & koordinasi logistik tronton</p>
                </div>

                <div className="flex items-center gap-3">
                  <button onClick={exportToExcel} className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all flex items-center gap-2 cursor-pointer">
                    📥 Download Rekap Excel
                  </button>
                  <div className="flex items-center gap-2 bg-slate-950 px-3 py-2 border border-slate-800 rounded-xl">
                    <span className="text-xs font-bold text-slate-400">Filter Sales:</span>
                    <select value={selectedSalesFilter} onChange={(e) => setSelectedSalesFilter(e.target.value)} className="bg-slate-900 text-amber-400 font-bold text-xs px-2 py-1 rounded-lg border border-slate-700 outline-none cursor-pointer">
                      <option value="ALL">SEMUA SALES</option>
                      {salesOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {filteredOrders.map(order => (
                  <div key={order.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-900 pb-4">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-blue-600 text-white font-black text-xs rounded-xl shadow">{order.id}</span>
                        <div>
                          <h3 className="font-extrabold text-white text-base">{order.customer}</h3>
                          <p className="text-xs text-slate-400">Proyek: <span className="text-amber-300 font-bold">{order.namaProyek}</span> | Sales: <span className="text-blue-400 font-bold">{order.sales}</span> | Skema: <span className="text-emerald-400 font-bold">{order.jenisSewa}</span></p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button onClick={() => sendWhatsAppNotification(order)} className="px-3 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow transition-all flex items-center gap-1.5 cursor-pointer">
                          💬 WhatsApp Sales
                        </button>
                        <button onClick={() => sendLogisticsWhatsApp(order)} className="px-3 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-xl text-xs font-bold shadow transition-all flex items-center gap-1.5 cursor-pointer">
                          🚚 Kirim ke Logistik
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                      <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 space-y-2">
                        <div className="text-[10px] font-bold text-blue-400 uppercase">Detail Permintaan Alat</div>
                        <div><b>Request:</b> {order.jenisAlat}</div>
                        <div><b>Jumlah:</b> {order.jumlahUnit} Unit ({order.rencanaDurasi})</div>
                        <div className="pt-2 border-t border-slate-800">
                          <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Pilih Kode Unit (Armada)</label>
                          <select value={order.kodeUnit} onChange={(e) => updateKodeUnit(order.id, e.target.value)} className="w-full bg-slate-950 text-white font-bold text-xs p-2 rounded-lg border border-slate-700 outline-none cursor-pointer">
                            <option value="Belum Dipilih">-- Pilih Unit --</option>
                            {fleetDatabase.map(f => (
                              <option key={f.code} value={f.code}>{f.code} ({f.class})</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 space-y-2">
                        <div className="text-[10px] font-bold text-emerald-400 uppercase">Penugasan Lapangan</div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Nama Operator</label>
                          <select value={order.namaOperator} onChange={(e) => updateOperator(order.id, e.target.value)} className="w-full bg-slate-950 text-emerald-300 font-bold text-xs p-2 rounded-lg border border-slate-700 outline-none cursor-pointer">
                            <option value="Belum Ditentukan">-- Pilih Operator --</option>
                            {operatorDatabase.map(op => (
                              <option key={op} value={op}>{op}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">HM Awal / Kondisi BBM</label>
                          <input type="text" value={order.hmAwal} onChange={(e) => updateHmAwal(order.id, e.target.value)} placeholder="Contoh: 1240.5 HM / Full" className="w-full bg-slate-950 text-white text-xs p-2 rounded-lg border border-slate-700 outline-none font-mono" />
                        </div>
                      </div>

                      <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 space-y-2">
                        <div className="text-[10px] font-bold text-purple-400 uppercase">Rute & PIC Penerima</div>
                        <div>
                          <label className="block text-[9px] text-slate-400 uppercase">Lokasi Asal</label>
                          <input type="text" value={order.lokasiAwal} onChange={(e) => updateLokasiAwal(order.id, e.target.value)} className="w-full bg-slate-950 text-white text-[11px] p-1.5 rounded border border-slate-700 outline-none" />
                        </div>
                        <div>
                          <label className="block text-[9px] text-slate-400 uppercase">Lokasi Tujuan</label>
                          <input type="text" value={order.lokasiTujuan} onChange={(e) => updateLokasiTujuan(order.id, e.target.value)} className="w-full bg-slate-950 text-white text-[11px] p-1.5 rounded border border-slate-700 outline-none" />
                        </div>
                        <div>
                          <label className="block text-[9px] text-slate-400 uppercase">PIC & No HP Penerima</label>
                          <input type="text" value={order.picPenerima} onChange={(e) => updatePicPenerima(order.id, e.target.value)} className="w-full bg-slate-950 text-amber-300 font-bold text-[11px] p-1.5 rounded border border-slate-700 outline-none" />
                        </div>
                      </div>

                      <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 space-y-2">
                        <div className="text-[10px] font-bold text-amber-400 uppercase">Status & Logistik Tronton</div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400 w-16">Tronton:</span>
                          <select value={order.trontonUnit} onChange={(e) => updateTrontonUnit(order.id, e.target.value)} className="w-full bg-slate-950 text-amber-300 font-bold text-[11px] p-1.5 rounded border border-slate-700 outline-none">
                            {trontonFleet.map(t => <option key={t.code} value={t.code}>{t.name}</option>)}
                          </select>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400 w-16">Logistik:</span>
                          <select value={order.statusLogistik} onChange={(e) => updateStatusLogistik(order.id, e.target.value)} className="w-full bg-slate-950 text-cyan-300 font-bold text-[11px] p-1.5 rounded border border-slate-700 outline-none">
                            <option value="⏳ Menunggu Jadwal Muat">⏳ Menunggu Jadwal Muat</option>
                            <option value="🏗️ Sedang Dimuat di Pool">🏗️ Sedang Dimuat di Pool</option>
                            <option value="🚚 Dalam Perjalanan (OTW)">🚚 Dalam Perjalanan (OTW)</option>
                            <option value="✅ Unit Tiba di Lokasi Proyek">✅ Unit Tiba di Lokasi Proyek</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[9px] text-slate-400 uppercase mb-1">Catatan Logistik / Driver</label>
                          <input type="text" value={order.catatanLogistik} onChange={(e) => updateCatatanLogistik(order.id, e.target.value)} placeholder="Catatan khusus tronton..." className="w-full bg-slate-950 text-slate-200 text-[11px] p-1.5 rounded border border-slate-700 outline-none" />
                        </div>
                        <button onClick={() => sendLogisticsUpdateToSales(order)} className="w-full py-1.5 bg-blue-700 hover:bg-blue-600 text-white rounded-lg text-[10px] font-bold shadow cursor-pointer mt-1">
                          📢 Broadcast Update ke Sales
                        </button>
                      </div>
                    </div>

                    {/* FOTO DOKUMENTASI & TITIK GPS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-900">
                      <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800/60 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] font-bold text-amber-400 uppercase">1. Foto & Titik GPS Saat Muat (Pool)</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">Waktu: {order.timestampMuat}</div>
                          <div className="text-[10px] text-slate-400">Koordinat: <span className="font-mono text-slate-200">{order.koordinatMuat}</span></div>
                        </div>
                        <div className="flex items-center gap-2">
                          {order.fotoMuatUrl && (
                            <a href={order.fotoMuatUrl} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-lg overflow-hidden border border-amber-500 block shrink-0">
                              <img src={order.fotoMuatUrl} alt="Muat" className="w-full h-full object-cover" />
                            </a>
                          )}
                          <button onClick={() => triggerCamera(order.id, 'muat')} className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-black shadow transition-all cursor-pointer">
                            📷 Ambil Foto Muat
                          </button>
                        </div>
                      </div>

                      <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800/60 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] font-bold text-emerald-400 uppercase">2. Foto & Titik GPS Tiba di Proyek</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">Waktu: {order.timestampTiba}</div>
                          <div className="text-[10px] text-slate-400">Koordinat: <span className="font-mono text-slate-200">{order.koordinatTiba}</span></div>
                        </div>
                        <div className="flex items-center gap-2">
                          {order.fotoTibaUrl && (
                            <a href={order.fotoTibaUrl} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-lg overflow-hidden border border-emerald-500 block shrink-0">
                              <img src={order.fotoTibaUrl} alt="Tiba" className="w-full h-full object-cover" />
                            </a>
                          )}
                          <button onClick={() => triggerCamera(order.id, 'tiba')} className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow transition-all cursor-pointer">
                            📷 Ambil Foto Tiba
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* MONITORING STATUS ARMADA & FLEET DIRECTORY */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                  <h2 className="text-xl font-black text-white">Monitoring Status Armada (Fleet Directory)</h2>
                  <p className="text-xs text-slate-400 mt-1">Status real-time ketersediaan unit alat berat di pool dan lapangan</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <input type="text" placeholder="Cari Kode Unit / Jenis..." value={fleetSearchQuery} onChange={(e) => setFleetSearchQuery(e.target.value)} className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white outline-none w-48" />
                  <select value={selectedFleetFilter} onChange={(e) => setSelectedFleetFilter(e.target.value)} className="bg-slate-950 text-amber-400 font-bold text-xs px-3 py-2 rounded-xl border border-slate-700 outline-none cursor-pointer">
                    {uniqueClasses.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 max-h-96 overflow-y-auto pr-2">
                {filteredFleet.map(item => {
                  const status = fleetStatus[item.code] || 'Ready';
                  let statusBg = 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300';
                  if (status === 'Working') statusBg = 'bg-blue-950/80 border-blue-500/50 text-blue-300';
                  if (status === 'Breakdown') statusBg = 'bg-rose-950/80 border-rose-500/50 text-rose-300';

                  return (
                    <div key={item.code} className={`p-3 rounded-2xl border flex flex-col justify-between gap-2 ${statusBg}`}>
                      <div>
                        <div className="font-black text-sm text-white">{item.code}</div>
                        <div className="text-[10px] opacity-80">{item.class}</div>
                      </div>
                      <select value={status} onChange={(e) => updateFleetCondition(item.code, e.target.value)} className="bg-slate-950 text-white font-bold text-[10px] p-1.5 rounded-lg border border-slate-700 outline-none cursor-pointer">
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
          /* TAB ADMIN TIMESHEET HARIAN (SESUAI STRUKTUR SPREADSHEET) */
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
              <h2 className="text-xl font-black text-amber-400 mb-1">Form Input Timesheet Admin Harian</h2>
              <p className="text-xs text-slate-400 mb-6 uppercase tracking-wider font-bold">Sinkronisasi langsung dengan format rekap spreadsheet operasional alat berat</p>

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
                      {salesOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
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
        )}

      </div>
    </div>
  );
}
