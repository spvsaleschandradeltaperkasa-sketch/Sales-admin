import React, { useState, useRef } from 'react';

export default function SalesOrderDashboard() {
  const [activeTab, setActiveTab] = useState('order'); // 'order' atau 'timesheet'

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

  // State Khusus Form Timesheet yang diinput oleh Kepala Operator / Admin Timesheet
  const [timesheetForm, setTimesheetForm] = useState({
    kodeGajiOperator: '1907',
    kodeTagih: '2173',
    jobId: '0320-0526-ANS-S1',
    tanggal: '11-Sep-26',
    hari: 'Jumat',
    operator: 'BUSTAM',
    attach: 'Bucket',
    unitCode: 'EXC.92',
    model: 'SY215H',
    namaPenyewa: 'MAHLIGAI ARTHA SEJAHTERA',
    alamat: 'Buleleng, Bungku Pesisir, Morowali',
    jobVia: 'ANS',
    jamMulai: '08:00',
    jamSelesai: '17:00',
    durasiIstirahat: '1',
    standby: '0',
    ot: '0',
    hmStart: '1030.0',
    hmEnd: '1032.5',
    pencukupan: '1.00',
    keterangan: 'Cukup Operasional',
    jamDuniaHm: 'Hour Meter'
  });

  const [selectedSalesFilter, setSelectedSalesFilter] = useState('ALL');
  const [selectedFleetFilter, setSelectedFleetFilter] = useState('ALL');
  const [fleetSearchQuery, setFleetSearchQuery] = useState('');

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
    { code: 'EXC.91', class: 'Exca 20 Ton' },
    { code: 'EXC.92', class: 'Exca 20 Ton' },
    { code: 'EXC.93', class: 'Exca 20 Ton' },
    { code: 'EXC.94', class: 'Exca 20 Ton' },
    { code: 'EXC.95', class: 'Exca 20 Ton' },
    { code: 'EXC.96', class: 'Exca 20 Ton' },
    { code: 'EXC.97', class: 'Exca 20 Ton' },
    { code: 'EXC.98', class: 'Exca 20 Ton' },
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
    { code: 'EXC.211', class: 'Exca 20 Ton' },
    { code: 'EXC.212', class: 'Exca 20 Ton' },
    { code: 'EXC.213', class: 'Exca 20 Ton' },
    { code: 'EXC.214', class: 'Exca 20 Ton' },
    { code: 'EXC.215', class: 'Exca 20 Ton' },
    { code: 'EXC.301', class: 'Exca 30 Ton' },
    { code: 'EXC.302', class: 'Exca 30 Ton' },
    { code: 'EXC.303', class: 'Exca 30 Ton' },
    { code: 'EXC.304', class: 'Exca 30 Ton' },
    { code: 'EXC.305', class: 'Exca 30 Ton' },
    { code: 'EXC.306', class: 'Exca 30 Ton' },
    { code: 'EXC.307', class: 'Exca 30 Ton' },
    { code: 'EXC.308', class: 'Exca 30 Ton' },
    { code: 'EXC.309', class: 'Exca 30 Ton' },
    { code: 'MG-1', class: 'Motor Grader' },
    { code: 'MG-2', class: 'Motor Grader' },
    { code: 'MG-3', class: 'Motor Grader' },
    { code: 'MG-4', class: 'Motor Grader' },
    { code: 'MG-5', class: 'Motor Grader' },
    { code: 'MC.01', class: 'Mobile Crane' },
    { code: 'D.02', class: 'Medium Dozer' },
    { code: 'D.03', class: 'Medium Dozer' },
    { code: 'VBR.01', class: 'Vibro 10 Ton' },
    { code: 'VBR.04', class: 'Vibro 10 Ton' },
    { code: 'VBR.05', class: 'Vibro 10 Ton' },
    { code: 'VBR.06', class: 'Vibro 10 Ton' },
    { code: 'VBR.07', class: 'Vibro 10 Ton' },
    { code: 'VBR.08', class: 'Vibro 10 Ton' },
    { code: 'VBR.09', class: 'Vibro 10 Ton' },
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
      kodeUnit: 'EXC.92',
      namaOperator: 'BUSTAM',
      status: 'Unit Ready / Dispatched'
    }
  ]);

  // Data Rekap Timesheet Sesuai Spreadsheet Gambar Anda
  const [timesheetList, setTimesheetList] = useState([
    {
      id: 'TS-01',
      kodeGajiOperator: '1907',
      kodeTagih: '2173',
      jobId: '0320-0526-ANS-S1',
      tanggal: '11-Sep-26',
      hari: 'Jumat',
      operator: 'BUSTAM',
      attach: 'Bucket',
      unitCode: 'EXC.92',
      model: 'SY215H',
      namaPenyewa: 'MAHLIGAI ARTHA SEJAHTERA',
      alamat: 'Buleleng, Bungku Pesisir, Morowali',
      jobVia: 'ANS',
      jamMulai: '08:00',
      jamSelesai: '17:00',
      durasiIstirahat: '1',
      standby: '0',
      totalJamKerja: '8,00',
      ot: '0',
      hmStart: '1.030,0',
      hmEnd: '1.032,5',
      totalHm: '2,5',
      unitWorkingHour: '2,47',
      operatorWorkingHour: '2,47',
      hariKerjaAlat: '1,00',
      pencukupan: '1,00',
      keterangan: 'Cukup 200 Jam',
      jamDuniaHm: 'Hour Meter'
    }
  ]);

  const [fleetStatus, setFleetStatus] = useState({
    'EXC.92': 'Working',
    'EXC.83': 'Ready',
    'MG-1': 'Breakdown'
  });

  const [notification, setNotification] = useState({ show: false, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTimesheetChange = (e) => {
    const { name, value } = e.target;
    setTimesheetForm(prev => ({ ...prev, [name]: value }));
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
      message: `Sales Order #${newOrderNo} berhasil diterbitkan & dikirim ke rekap!`
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

    setTimeout(() => setNotification({ show: false, message: '' }), 4000);
  };

  // Submit Form Timesheet oleh Kepala Operator / Admin Timesheet
  const handleTimesheetSubmit = (e) => {
    e.preventDefault();
    const newTsId = 'TS-' + Math.floor(10 + Math.random() * 90);
    
    const start = parseFloat(timesheetForm.hmStart.replace(',', '.')) || 0;
    const end = parseFloat(timesheetForm.hmEnd.replace(',', '.')) || 0;
    const totalHMVal = (end >= start) ? (end - start).toFixed(1).replace('.', ',') : '0,0';

    const newTimesheetRow = {
      id: newTsId,
      ...timesheetForm,
      totalJamKerja: '8,00',
      totalHm: totalHMVal,
      unitWorkingHour: totalHMVal,
      operatorWorkingHour: totalHMVal,
      hariKerjaAlat: '1,00'
    };

    setTimesheetList([newTimesheetRow, ...timesheetList]);
    setNotification({
      show: true,
      message: `Job ID ${timesheetForm.jobId} untuk Operator ${timesheetForm.operator} berhasil dicatat!`
    });

    setTimeout(() => setNotification({ show: false, message: '' }), 4000);
  };

  const updateKodeUnit = (id, newKodeUnit) => {
    setOrderList(orderList.map(order => order.id === id ? { ...order, kodeUnit: newKodeUnit } : order));
  };

  const updateOperator = (id, newOperator) => {
    setOrderList(orderList.map(order => order.id === id ? { ...order, namaOperator: newOperator } : order));
  };

  const updateStatusDurasi = (id, newStatusDurasi) => {
    setOrderList(orderList.map(order => order.id === id ? { ...order, statusDurasi: newStatusDurasi } : order));
  };

  const updateCatatanAktual = (id, newCatatan) => {
    setOrderList(orderList.map(order => order.id === id ? { ...order, catatanAktual: newCatatan } : order));
  };

  const updateCatatanLogistik = (id, newLogistikNote) => {
    setOrderList(orderList.map(order => order.id === id ? { ...order, catatanLogistik: newLogistikNote } : order));
  };

  const updateHmAwal = (id, newHmAwal) => {
    setOrderList(orderList.map(order => order.id === id ? { ...order, hmAwal: newHmAwal } : order));
  };

  const triggerCamera = (id, jenis) => {
    activeCaptureRef.current = { orderId: id, jenis: jenis };
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileCaptured = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    const { orderId, jenis } = activeCaptureRef.current;
    const now = new Date();
    const timeString = now.toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'medium' });

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
    e.target.value = null;
  };

  const updateFleetCondition = (unitCode, condition) => {
    setFleetStatus(prev => ({ ...prev, [unitCode]: condition }));
  };

  const exportToExcel = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    if (activeTab === 'order') {
      csvContent += "No Order,Customer,Proyek,Sales,Request Alat,Jumlah Unit,Skema,Durasi,Lokasi Awal,Lokasi Tujuan,PIC Penerima,Unit Teralokasi,Operator,HM Awal,Status Logistik,Status Order\n";
      orderList.forEach(order => {
        csvContent += `${order.id},"${order.customer}","${order.namaProyek}",${order.sales},"${order.jenisAlat}",${order.jumlahUnit},${order.jenisSewa},"${order.rencanaDurasi}","${order.lokasiAwal}","${order.lokasiTujuan}","${order.picPenerima}",${order.kodeUnit},"${order.namaOperator}","${order.hmAwal}","${order.statusLogistik}","${order.status}"\n`;
      });
    } else {
      csvContent += "Kode Gaji Operator,Kode Tagih,Job ID,Tanggal,Hari,Operator,Attach,Unit Code,Model,Nama Penyewa,Alamat,Job Via,Jam Mulai,Jam Selesai,Durasi Istirahat,Standby,Total Jam Kerja,OT,HM Start,HM End,Total HM,Unit Working Hour,Operator Working Hour,Hari Kerja Alat,Pencukupan,Keterangan,Jam Dunia/HM\n";
      timesheetList.forEach(ts => {
        csvContent += `${ts.kodeGajiOperator},${ts.kodeTagih},${ts.jobId},${ts.tanggal},${ts.hari},${ts.operator},${ts.attach},${ts.unitCode},"${ts.model}","${ts.namaPenyewa}","${ts.alamat}",${ts.jobVia},${ts.jamMulai},${ts.jamSelesai},${ts.durasiIstirahat},${ts.standby},${ts.totalJamKerja},${ts.ot},${ts.hmStart},${ts.hmEnd},${ts.totalHm},${ts.unitWorkingHour},${ts.operatorWorkingHour},${ts.hariKerjaAlat},${ts.pencukupan},"${ts.keterangan}",${ts.jamDuniaHm}\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Rekap_${activeTab === 'order' ? 'Sales_Order' : 'Admin_Timesheet'}_Delta_Perkasa.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sendWhatsAppNotification = (order) => {
    const phone = salesPhoneBook[order.sales] || '';
    const message = `🏗️ *DELTA PERKASA RENTAL* 🏗️\nUpdate Lapangan SO *${order.id}* (${order.customer}) | Request Alat: *${order.jenisAlat}* (Jml: ${order.jumlahUnit}) | Unit: *${order.kodeUnit}* (HM: ${order.hmAwal}) | Operator: *${order.namaOperator}* | Status: *${order.status}*. Terima kasih!`;
    window.open(phone ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}` : `https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const sendLogisticsWhatsApp = (order) => {
    const message = `🚚 *CV CHANDRA DELTA PERKASA — LOGISTIK* 🚚\n\nDetail Mobilisasi Order *${order.id}*:\n- *Customer:* ${order.customer} (${order.namaProyek})\n- *Request Alat:* ${order.jenisAlat} (${order.jumlahUnit} Unit)\n- *Unit & HM/BBM:* ${order.kodeUnit} | ${order.hmAwal}\n- *Tronton:* ${order.trontonUnit}\n- *Asal:* ${order.lokasiAwal}\n- *Tujuan:* ${order.lokasiTujuan}\n- *PIC Penerima:* ${order.picPenerima}\n- *Catatan:* _${order.catatanLogistik}_\n\nMohon koordinasikan. Terima kasih!`;
    window.open(`https://wa.me/${logisticsPhone}?text=${encodeURIComponent(message)}`, '_blank');
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
    <div className="min-h-screen bg-[#07090e] text-slate-100 p-4 md:p-8 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      <input 
        type="file" 
        accept="image/*" 
        capture="environment" 
        ref={fileInputRef} 
        onChange={handleFileCaptured} 
        className="hidden" 
      />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER BRANDING MODERN */}
        <div className="relative bg-gradient-to-r from-[#0d121f] via-[#111827] to-[#0d121f] border border-amber-500/30 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex items-center gap-5 z-10">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl p-1 shadow-lg shadow-amber-500/20 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-xl flex flex-col items-center justify-center p-1">
                <span className="text-amber-400 text-xl md:text-2xl font-black">▲</span>
                <span className="text-[9px] font-black text-white tracking-widest">DELTA</span>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-400 font-bold text-[10px] uppercase rounded-full tracking-widest mb-1.5 border border-amber-500/20">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                Pusat Rental Alat Berat Sulawesi
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-wide">
                CV CHANDRA DELTA PERKASA
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Command Center Operasional, Admin Timesheet, & Koordinasi Logistik
              </p>
            </div>
          </div>

          <div className="z-10 flex items-center gap-4">
            <div className="bg-slate-950/90 border border-slate-800/80 rounded-2xl px-5 py-3 flex items-center gap-3 shadow-inner">
              <div className="text-2xl">🚜</div>
              <div>
                <div className="text-[10px] font-bold text-amber-400 uppercase">Total Armada</div>
                <div className="text-lg font-black text-white">{fleetDatabase.length} Unit Ready</div>
              </div>
            </div>

            <button 
              onClick={exportToExcel}
              className="px-4 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-2xl shadow-lg shadow-emerald-900/30 transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <span>📥</span>
              <span className="hidden sm:inline">Download Excel ({activeTab === 'order' ? 'Sales Order' : 'Timesheet'})</span>
            </button>
          </div>
        </div>

        {/* NAVIGATION TABS (PILIHAN MENU ATAS) */}
        <div className="flex border-b border-slate-800">
          <button
            onClick={() => setActiveTab('order')}
            className={`px-6 py-3 font-bold text-sm tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'order' 
                ? 'border-amber-500 text-amber-400 bg-amber-500/10 rounded-t-xl' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>📝</span> Formulir Sales Order & Kontrol Lapangan
          </button>
          <button
            onClick={() => setActiveTab('timesheet')}
            className={`px-6 py-3 font-bold text-sm tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'timesheet' 
                ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10 rounded-t-xl' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>📊</span> Form & Rekap Admin Timesheet (Job ID)
          </button>
        </div>

        {notification.show && (
          <div className="p-4 bg-emerald-950/90 border border-emerald-500 text-emerald-200 rounded-2xl text-xs font-bold flex items-center gap-3 shadow-lg">
            <span className="text-base">✅</span>
            <span>{notification.message}</span>
          </div>
        )}

        {/* TAB 1: SALES ORDER & KONTROL LAPANGAN (TETAP UTUH SEPERTI SEMULA) */}
        {activeTab === 'order' && (
          <div className="space-y-8">
            <div className="bg-[#0b0e17] border border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-2xl relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-blue-600 to-emerald-500 rounded-t-3xl"></div>
              
              <h2 className="text-lg font-black text-white mb-1">Formulir Pemesanan Alat Berat (Sales Order)</h2>
              <p className="text-xs text-slate-400 mb-6">Masukkan data proyek, spesifikasi alat, lokasi, dan PIC dengan lengkap</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Nama Customer / PT / CV</label>
                  <input type="text" name="customer" value={formData.customer} onChange={handleChange} placeholder="Contoh: PT Mahligai Artha Sejahtera" required className="w-full px-4 py-3 bg-[#121824] border border-slate-700 rounded-xl text-slate-100 text-xs focus:border-amber-500 outline-none" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Nama Proyek</label>
                    <input type="text" name="namaProyek" value={formData.namaProyek} onChange={handleChange} placeholder="Contoh: Land Clearing" required className="w-full px-4 py-3 bg-[#121824] border border-slate-700 rounded-xl text-slate-100 text-xs focus:border-amber-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Lokasi Proyek Tujuan</label>
                    <input type="text" name="lokasi" value={formData.lokasi} onChange={handleChange} placeholder="Contoh: Makassar / Gowa" required className="w-full px-4 py-3 bg-[#121824] border border-slate-700 rounded-xl text-slate-100 text-xs focus:border-amber-500 outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-[#121824]/60 border border-purple-500/30 rounded-2xl">
                  <div>
                    <label className="block text-[11px] font-bold text-purple-300 uppercase tracking-wider mb-1.5">📍 Lokasi Pengantaran / Alamat Drop Unit</label>
                    <input type="text" name="lokasiPengantaran" value={formData.lokasiPengantaran} onChange={handleChange} placeholder="Contoh: Jl. Poros Malino Km. 7" className="w-full px-4 py-2.5 bg-[#0b0e17] border border-purple-900/50 rounded-xl text-xs text-white font-mono outline-none" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-purple-300 uppercase tracking-wider mb-1.5">👤 Nama PIC & No HP Penerima</label>
                    <input type="text" name="picPenerima" value={formData.picPenerima} onChange={handleChange} placeholder="Contoh: Pak Budi (081234567890)" className="w-full px-4 py-2.5 bg-[#0b0e17] border border-purple-900/50 rounded-xl text-xs text-amber-300 font-bold outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Sales / VIA</label>
                    <select name="sales" value={formData.sales} onChange={handleChange} className="w-full px-4 py-3 bg-[#121824] border border-slate-700 rounded-xl text-slate-100 text-xs font-bold outline-none cursor-pointer">
                      {salesOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1.5">Skema Kontrak</label>
                    <select name="jenisSewa" value={formData.jenisSewa} onChange={handleChange} className="w-full px-4 py-3 bg-[#121824] border border-amber-500/60 rounded-xl text-amber-300 font-bold text-xs outline-none cursor-pointer">
                      {jenisSewaOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-2 grid grid-cols-2 gap-2 bg-[#121824] p-2 border border-slate-700 rounded-xl">
                    <div>
                      <label className="block text-[10px] font-bold text-teal-400 uppercase mb-1">Estimasi Jumlah</label>
                      <input type="number" name="jumlahDurasi" min="1" value={formData.jumlahDurasi} onChange={handleChange} required className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-lg text-slate-100 text-xs font-bold outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-teal-400 uppercase mb-1">Satuan Rencana</label>
                      <select name="tipeDurasi" value={formData.tipeDurasi} onChange={handleChange} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-lg text-teal-300 font-bold text-xs outline-none cursor-pointer">
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
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Jenis Alat & Attachment</label>
                    <select name="jenisAlat" value={formData.jenisAlat} onChange={handleChange} className="w-full px-4 py-3 bg-[#121824] border border-slate-700 rounded-xl text-teal-300 font-bold text-xs outline-none cursor-pointer">
                      {alatOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Jumlah Unit</label>
                    <input type="number" name="jumlahUnit" min="1" value={formData.jumlahUnit} onChange={handleChange} required className="w-full px-4 py-3 bg-[#121824] border border-slate-700 rounded-xl text-slate-100 text-xs font-bold outline-none" />
                  </div>
                </div>

                <button type="submit" className="w-full mt-4 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl transition-all cursor-pointer">
                  Terbitkan Sales Order & Simpan ke Rekap &rarr;
                </button>
              </form>
            </div>

            {/* KONTROL LAPANGAN & LOGISTIK */}
            <div className="bg-[#0b0e17] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-black text-white">Kontrol Lapangan & Instruksi Logistik Unit</h2>
                  <p className="text-xs text-slate-400">Pantau status unit, operator, HM awal, dan koordinasi pengiriman</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 bg-[#121824] p-1.5 border border-slate-800 rounded-2xl">
                  <span className="text-xs font-bold text-slate-400 px-3">Filter Sales:</span>
                  {['ALL', 'ANS', 'UCI', 'CDP', 'FAN'].map(sal => (
                    <button key={sal} onClick={() => setSelectedSalesFilter(sal)} className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${selectedSalesFilter === sal ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}>
                      {sal}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#121824] border-b border-slate-800 text-[10px] text-slate-400 uppercase tracking-wider">
                      <th className="py-3 px-4">No. Order</th>
                      <th className="py-3 px-4">Customer & Request Alat</th>
                      <th className="py-3 px-4 text-teal-400">Evaluasi Waktu</th>
                      <th className="py-3 px-4 text-amber-400">Alokasi Unit & Operator</th>
                      <th className="py-3 px-4 text-purple-400">Logistik & Geotag 🚚</th>
                      <th className="py-3 px-4">Status & Aksi WA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-xs">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-[#121824]/40">
                        <td className="py-4 px-4 align-top font-mono font-black text-amber-400 text-sm">
                          {order.id}
                          <div className="text-[10px] font-sans font-normal text-slate-400 mt-1">Skema: {order.jenisSewa}</div>
                        </td>
                        <td className="py-4 px-4 align-top space-y-2">
                          <div>
                            <div className="font-bold text-white text-sm">{order.customer}</div>
                            <div className="text-slate-300 text-xs">{order.namaProyek}</div>
                            <div className="text-[11px] font-mono text-blue-300 truncate max-w-xs">📍 {order.lokasiTujuan}</div>
                          </div>
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/15 border border-amber-500/40 rounded-xl shadow-inner">
                            <span className="text-sm">🚜</span>
                            <span className="text-xs font-black text-amber-300">
                              Req: {order.jenisAlat} <span className="text-teal-300 font-mono font-bold">({order.jumlahUnit} Unit)</span>
                            </span>
                          </div>
                          <div className="text-[11px] text-amber-300 font-medium">👤 PIC: {order.picPenerima}</div>
                        </td>
                        <td className="py-4 px-4 align-top space-y-2">
                          <div className="text-slate-400">Target: <span className="font-mono text-slate-200 font-bold">{order.rencanaDurasi}</span></div>
                          <select value={order.statusDurasi} onChange={(e) => updateStatusDurasi(order.id, e.target.value)} className="w-full text-xs font-bold px-3 py-2 bg-[#121824] border border-teal-600/50 text-teal-300 rounded-xl outline-none cursor-pointer">
                            <option value="Sesuai Rencana">🟢 Sesuai Rencana</option>
                            <option value="Selesai Lebih Cepat">⚡ Selesai Lebih Cepat</option>
                            <option value="Extend / Perpanjangan">⏱️ Extend / Perpanjangan</option>
                          </select>
                          <input type="text" value={order.catatanAktual} onChange={(e) => updateCatatanAktual(order.id, e.target.value)} placeholder="Catatan waktu..." className="w-full text-xs font-mono px-3 py-1.5 bg-[#121824] border border-slate-700 text-slate-300 rounded-xl outline-none" />
                        </td>
                        <td className="py-4 px-4 align-top space-y-2">
                          <select value={order.kodeUnit} onChange={(e) => updateKodeUnit(order.id, e.target.value)} className="w-full text-xs font-mono font-bold px-3 py-2 bg-[#121824] border border-amber-500/60 text-amber-300 rounded-xl outline-none cursor-pointer">
                            <option value="Belum Dipilih">-- Pilih Unit --</option>
                            {fleetDatabase.map(u => <option key={u.code} value={u.code}>{u.code} ({u.class})</option>)}
                          </select>
                          <select value={order.namaOperator} onChange={(e) => updateOperator(order.id, e.target.value)} className="w-full text-xs font-bold px-3 py-2 bg-[#121824] border border-emerald-500/60 text-emerald-300 rounded-xl outline-none cursor-pointer">
                            <option value="Belum Ditentukan">-- Pilih Operator --</option>
                            {operatorDatabase.map(op => <option key={op} value={op}>{op}</option>)}
                          </select>
                          <input type="text" value={order.hmAwal} onChange={(e) => updateHmAwal(order.id, e.target.value)} placeholder="HM Awal & BBM..." className="w-full text-xs font-mono px-3 py-2 bg-[#121824] border border-slate-700 text-teal-300 rounded-xl outline-none" />
                        </td>
                        <td className="py-4 px-4 align-top space-y-2">
                          <input type="text" value={order.lokasiAwal} onChange={(e) => {
                            const val = e.target.value;
                            setOrderList(orderList.map(o => o.id === order.id ? { ...o, lokasiAwal: val } : o));
                          }} placeholder="Asal / Pool..." className="w-full text-xs font-mono px-3 py-1.5 bg-[#121824] border border-slate-700 text-slate-300 rounded-xl outline-none" />
                          <input type="text" value={order.lokasiTujuan} onChange={(e) => {
                            const val = e.target.value;
                            setOrderList(orderList.map(o => o.id === order.id ? { ...o, lokasiTujuan: val } : o));
                          }} placeholder="Tujuan Proyek..." className="w-full text-xs font-mono px-3 py-1.5 bg-[#121824] border border-slate-700 text-slate-300 rounded-xl outline-none" />
                          <div className="grid grid-cols-2 gap-2">
                            <select value={order.trontonUnit} onChange={(e) => {
                              const val = e.target.value;
                              setOrderList(orderList.map(o => o.id === order.id ? { ...o, trontonUnit: val } : o));
                            }} className="w-full text-[11px] font-mono font-bold px-2 py-1.5 bg-[#121824] border border-purple-500/50 text-purple-300 rounded-xl outline-none">
                              {trontonFleet.map(t => <option key={t.code} value={t.code}>{t.name}</option>)}
                            </select>
                            <select value={order.statusLogistik} onChange={(e) => {
                              const val = e.target.value;
                              setOrderList(orderList.map(o => o.id === order.id ? { ...o, statusLogistik: val } : o));
                            }} className="w-full text-[11px] font-bold px-2 py-1.5 bg-[#121824] border border-purple-500/50 text-purple-300 rounded-xl outline-none">
                              <option value="⏳ Menunggu Jadwal Muat">⏳ Menunggu</option>
                              <option value="🏗️ Proses Muat di Pool">🏗️ Muat</option>
                              <option value="🚚 Dalam Perjalanan (OTW)">🚚 OTW</option>
                              <option value="✅ Tiba di Lokasi Proyek">✅ Tiba</option>
                            </select>
                          </div>
                          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800">
                            <div className="bg-[#121824] p-2 rounded-xl border border-slate-800">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-[9px] font-bold text-slate-400">FOTO MUAT</span>
                                <button onClick={() => triggerCamera(order.id, 'muat')} className="px-2 py-0.5 bg-blue-600 text-white text-[9px] font-bold rounded-lg cursor-pointer">📷 Ambil</button>
                              </div>
                              {order.fotoMuatUrl ? (
                                <div className="space-y-1">
                                  <img src={order.fotoMuatUrl} alt="Muat" className="w-full h-14 object-cover rounded-lg border border-slate-700" />
                                  <div className="text-[8px] font-mono text-emerald-400 truncate">📍 {order.koordinatMuat}</div>
                                </div>
                              ) : <div className="text-[9px] text-slate-500 italic py-1">Belum ada foto</div>}
                            </div>
                            <div className="bg-[#121824] p-2 rounded-xl border border-slate-800">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-[9px] font-bold text-slate-400">FOTO TIBA</span>
                                <button onClick={() => triggerCamera(order.id, 'tiba')} className="px-2 py-0.5 bg-blue-600 text-white text-[9px] font-bold rounded-lg cursor-pointer">📷 Ambil</button>
                              </div>
                              {order.fotoTibaUrl ? (
                                <div className="space-y-1">
                                  <img src={order.fotoTibaUrl} alt="Tiba" className="w-full h-14 object-cover rounded-lg border border-slate-700" />
                                  <div className="text-[8px] font-mono text-emerald-400 truncate">📍 {order.koordinatTiba}</div>
                                </div>
                              ) : <div className="text-[9px] text-slate-500 italic py-1">Belum ada foto</div>}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 align-top space-y-2">
                          <select value={order.status} onChange={(e) => {
                            const val = e.target.value;
                            setOrderList(orderList.map(o => o.id === order.id ? { ...o, status: val } : o));
                          }} className="w-full text-xs font-bold px-3 py-2 bg-[#121824] border border-blue-500/60 text-blue-300 rounded-xl outline-none">
                            <option value="Menunggu Alokasi Unit">Menunggu Alokasi</option>
                            <option value="Unit Ready / Dispatched">Dispatched</option>
                            <option value="Sedang Berjalan di Lapangan">Working</option>
                            <option value="Selesai Kontrak / Tarik Unit">Completed</option>
                          </select>
                          <div className="space-y-1.5 pt-1">
                            <button onClick={() => sendLogisticsWhatsApp(order)} className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-[11px] rounded-xl shadow transition-all flex items-center justify-center gap-1 cursor-pointer">
                              <span>🚚</span> Kirim ke Logistik
                            </button>
                            <button onClick={() => sendWhatsAppNotification(order)} className="w-full py-2 bg-[#121824] hover:bg-slate-800 text-slate-300 font-bold text-[11px] rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-1 cursor-pointer">
                              <span>💬</span> Update WA
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FORM & REKAP ADMIN TIMESHEET (INPUT KEPALA OPERATOR & JOB ID) */}
        {activeTab === 'timesheet' && (
          <div className="space-y-8">
            <div className="bg-[#0b0e17] border border-emerald-500/30 rounded-3xl p-6 md:p-8 shadow-2xl relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 rounded-t-3xl"></div>
              
              <div className="mb-6">
                <h2 className="text-lg font-black text-white">Form Input Timesheet & Job ID oleh Kepala Operator / Admin</h2>
                <p className="text-xs text-slate-400 mt-0.5">Catat jam kerja, Hour Meter (HM), Job ID, operator, dan unit sesuai format spreadsheet operasional</p>
              </div>

              <form onSubmit={handleTimesheetSubmit} className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Kode Gaji Operator</label>
                    <input type="text" name="kodeGajiOperator" value={timesheetForm.kodeGajiOperator} onChange={handleTimesheetChange} required className="w-full px-3 py-2 bg-[#121824] border border-slate-700 rounded-xl text-xs font-mono text-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Kode Tagih</label>
                    <input type="text" name="kodeTagih" value={timesheetForm.kodeTagih} onChange={handleTimesheetChange} required className="w-full px-3 py-2 bg-[#121824] border border-slate-700 rounded-xl text-xs font-mono text-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-emerald-400 uppercase mb-1">Job ID (Pilihan Kepala Operator)</label>
                    <input type="text" name="jobId" value={timesheetForm.jobId} onChange={handleTimesheetChange} placeholder="0320-0526-ANS-S1" required className="w-full px-3 py-2 bg-[#121824] border border-emerald-600 rounded-xl text-xs font-mono font-bold text-emerald-300 outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Job Via (Sales)</label>
                    <select name="jobVia" value={timesheetForm.jobVia} onChange={handleTimesheetChange} className="w-full px-3 py-2 bg-[#121824] border border-slate-700 rounded-xl text-xs font-bold text-amber-300 outline-none">
                      {salesOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Tanggal & Hari</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" name="tanggal" value={timesheetForm.tanggal} onChange={handleTimesheetChange} placeholder="11-Sep-26" className="px-3 py-2 bg-[#121824] border border-slate-700 rounded-xl text-xs text-white outline-none" />
                      <input type="text" name="hari" value={timesheetForm.hari} onChange={handleTimesheetChange} placeholder="Jumat" className="px-3 py-2 bg-[#121824] border border-slate-700 rounded-xl text-xs text-white outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Operator</label>
                    <select name="operator" value={timesheetForm.operator} onChange={handleTimesheetChange} className="w-full px-3 py-2 bg-[#121824] border border-slate-700 rounded-xl text-xs font-bold text-emerald-300 outline-none">
                      {operatorDatabase.map(op => <option key={op} value={op}>{op}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Unit Code & Model</label>
                    <div className="grid grid-cols-2 gap-2">
                      <select name="unitCode" value={timesheetForm.unitCode} onChange={handleTimesheetChange} className="px-3 py-2 bg-[#121824] border border-slate-700 rounded-xl text-xs font-bold text-amber-300 outline-none">
                        {fleetDatabase.map(f => <option key={f.code} value={f.code}>{f.code}</option>)}
                      </select>
                      <input type="text" name="model" value={timesheetForm.model} onChange={handleTimesheetChange} placeholder="SY215H" className="px-3 py-2 bg-[#121824] border border-slate-700 rounded-xl text-xs text-white outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Attachment</label>
                    <input type="text" name="attach" value={timesheetForm.attach} onChange={handleTimesheetChange} placeholder="Bucket / Breaker" className="w-full px-3 py-2 bg-[#121824] border border-slate-700 rounded-xl text-xs text-white outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-[#121824]/50 border border-slate-800 rounded-2xl">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Nama Penyewa & Alamat Proyek</label>
                    <input type="text" name="namaPenyewa" value={timesheetForm.namaPenyewa} onChange={handleTimesheetChange} placeholder="PT Mahligai Artha Sejahtera" className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-xl text-xs text-white outline-none mb-2" />
                    <input type="text" name="alamat" value={timesheetForm.alamat} onChange={handleTimesheetChange} placeholder="Buleleng, Bungku Pesisir, Morowali" className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-xl text-xs text-white outline-none" />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[9px] font-bold text-teal-400 uppercase mb-1">HM Start</label>
                      <input type="text" name="hmStart" value={timesheetForm.hmStart} onChange={handleTimesheetChange} className="w-full px-3 py-2 bg-[#0b0e17] border border-teal-800 rounded-xl text-xs font-mono font-bold text-teal-300 outline-none" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-teal-400 uppercase mb-1">HM End</label>
                      <input type="text" name="hmEnd" value={timesheetForm.hmEnd} onChange={handleTimesheetChange} className="w-full px-3 py-2 bg-[#0b0e17] border border-teal-800 rounded-xl text-xs font-mono font-bold text-teal-300 outline-none" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-amber-400 uppercase mb-1">Pencukupan</label>
                      <input type="text" name="pencukupan" value={timesheetForm.pencukupan} onChange={handleTimesheetChange} className="w-full px-3 py-2 bg-[#0b0e17] border border-amber-800 rounded-xl text-xs font-mono font-bold text-amber-300 outline-none" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Keterangan / Catatan</label>
                    <input type="text" name="keterangan" value={timesheetForm.keterangan} onChange={handleTimesheetChange} placeholder="Cukup 200 Jam / Kelebihan periode..." className="w-full px-3 py-2 bg-[#121824] border border-slate-700 rounded-xl text-xs text-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Jam Dunia / HM</label>
                    <input type="text" name="jamDuniaHm" value={timesheetForm.jamDuniaHm} onChange={handleTimesheetChange} className="w-full px-3 py-2 bg-[#121824] border border-slate-700 rounded-xl text-xs text-white outline-none" />
                  </div>
                </div>

                <button type="submit" className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer">
                  + Simpan Entri Timesheet & Job ID ke Spreadsheet &rarr;
                </button>
              </form>
            </div>

            {/* TABEL SPREADSHEET REKAP TIMESHEET */}
            <div className="bg-[#0b0e17] border border-slate-800 rounded-3xl p-6 shadow-2xl overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-black text-white">Spreadsheet Rekap Admin Timesheet (Job ID Terdaftar)</h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">Total Baris: {timesheetList.length}</span>
              </div>

              <div className="overflow-x-auto max-h-[500px]">
                <table className="w-full text-left border-collapse text-xs whitespace-nowrap font-mono">
                  <thead>
                    <tr className="bg-[#121824] text-slate-300 uppercase text-[10px] border-b border-slate-700 sticky top-0">
                      <th className="py-3 px-3 bg-emerald-950 text-emerald-300">Kode Gaji</th>
                      <th className="py-3 px-3 bg-emerald-950 text-emerald-300">Kode Tagih</th>
                      <th className="py-3 px-3 bg-emerald-900/50 text-emerald-300 font-bold">Job ID</th>
                      <th className="py-3 px-3">Tanggal</th>
                      <th className="py-3 px-3">Hari</th>
                      <th className="py-3 px-3">Operator</th>
                      <th className="py-3 px-3">Attach.</th>
                      <th className="py-3 px-3">Unit Code</th>
                      <th className="py-3 px-3">Model</th>
                      <th className="py-3 px-3">Nama Penyewa</th>
                      <th className="py-3 px-3">Alamat</th>
                      <th className="py-3 px-3">Job Via</th>
                      <th className="py-3 px-3 bg-teal-950 text-teal-300">HM Start</th>
                      <th className="py-3 px-3 bg-teal-950 text-teal-300">HM End</th>
                      <th className="py-3 px-3 bg-teal-950 text-teal-300">Total HM</th>
                      <th className="py-3 px-3 bg-cyan-950 text-cyan-300">Unit Working</th>
                      <th className="py-3 px-3 bg-cyan-950 text-cyan-300">Op. Working</th>
                      <th className="py-3 px-3 bg-amber-950 text-amber-300">Pencukupan</th>
                      <th className="py-3 px-3">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {timesheetList.map((ts, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40">
                        <td className="py-2.5 px-3 bg-emerald-950/40 text-emerald-300 font-bold">{ts.kodeGajiOperator}</td>
                        <td className="py-2.5 px-3 bg-emerald-950/40 text-amber-300 font-bold">{ts.kodeTagih}</td>
                        <td className="py-2.5 px-3 bg-emerald-900/20 text-emerald-400 font-black">{ts.jobId}</td>
                        <td className="py-2.5 px-3">{ts.tanggal}</td>
                        <td className="py-2.5 px-3">{ts.hari}</td>
                        <td className="py-2.5 px-3 font-bold text-white">{ts.operator}</td>
                        <td className="py-2.5 px-3 text-slate-300">{ts.attach}</td>
                        <td className="py-2.5 px-3 font-bold text-amber-400">{ts.unitCode}</td>
                        <td className="py-2.5 px-3 text-slate-300">{ts.model}</td>
                        <td className="py-2.5 px-3 font-bold text-slate-200">{ts.namaPenyewa}</td>
                        <td className="py-2.5 px-3 text-slate-400 text-[11px]">{ts.alamat}</td>
                        <td className="py-2.5 px-3 font-bold text-blue-300">{ts.jobVia}</td>
                        <td className="py-2.5 px-3 bg-teal-950/40 text-teal-300">{ts.hmStart}</td>
                        <td className="py-2.5 px-3 bg-teal-950/40 text-teal-300">{ts.hmEnd}</td>
                        <td className="py-2.5 px-3 bg-teal-950/40 font-bold text-white">{ts.totalHm}</td>
                        <td className="py-2.5 px-3 bg-cyan-950/40 text-cyan-300 font-bold">{ts.unitWorkingHour}</td>
                        <td className="py-2.5 px-3 bg-cyan-950/40 text-cyan-300 font-bold">{ts.operatorWorkingHour}</td>
                        <td className="py-2.5 px-3 bg-amber-950/40 text-amber-300">{ts.pencukupan}</td>
                        <td className="py-2.5 px-3 text-slate-300">{ts.keterangan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* DATABASE ARMADA (TETAP UTUH) */}
        <div className="bg-[#0b0e17] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-lg font-black text-white">Database Armada & Status Kesiapan Unit</h2>
              <p className="text-xs text-slate-400">Pusat kontrol ketersediaan unit alat berat CV Chandra Delta Perkasa</p>
            </div>
            <input type="text" value={fleetSearchQuery} onChange={(e) => setFleetSearchQuery(e.target.value)} placeholder="Cari kode unit (Cth: EXC.92)..." className="px-4 py-2.5 bg-[#121824] border border-slate-700 rounded-xl text-xs text-slate-100 outline-none focus:border-amber-500 w-full md:w-64" />
          </div>

          <div className="flex flex-wrap gap-2 mb-6 bg-[#121824] p-2 border border-slate-800 rounded-2xl">
            {uniqueClasses.map(cls => (
              <button key={cls} onClick={() => setSelectedFleetFilter(cls)} className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${selectedFleetFilter === cls ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}>
                {cls}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-96 overflow-y-auto p-1">
            {filteredFleet.map((item) => {
              const currentCondition = fleetStatus[item.code] || 'Ready';
              let badgeColor = 'bg-emerald-950/80 text-emerald-300 border-emerald-600/50';
              if (currentCondition === 'Working') badgeColor = 'bg-blue-950/80 text-blue-300 border-blue-600/50';
              if (currentCondition === 'Breakdown') badgeColor = 'bg-red-950/80 text-red-300 border-red-600/50';

              return (
                <div key={item.code} className="bg-[#121824] border border-slate-800 rounded-2xl p-3 flex flex-col justify-between shadow-inner">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-mono font-black text-white text-sm">{item.code}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${badgeColor}`}>{currentCondition}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mb-3">{item.class}</div>
                  </div>
                  <div className="pt-2 border-t border-slate-800">
                    <select value={currentCondition} onChange={(e) => updateFleetCondition(item.code, e.target.value)} className="w-full text-[10px] font-bold px-2 py-1.5 bg-[#0b0e17] border border-slate-700 text-slate-200 rounded-xl outline-none cursor-pointer">
                      <option value="Ready">🟢 Ready</option>
                      <option value="Working">🔵 Working</option>
                      <option value="Breakdown">🔴 Breakdown</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center text-xs text-slate-500 py-6 space-y-1">
          <div>CV Chandra Delta Perkasa • Pusat Rental Alat Berat Makassar & Sulawesi</div>
          <div className="font-mono text-amber-500/80">Hotline: 0851-6565-9907</div>
        </div>

      </div>
    </div>
  );
}
