import React, { useState, useEffect, useRef } from 'react';

export default function DeltaPerkasaApp() {
  const [currentRole, setCurrentRole] = useState('management');

  // Membaca parameter URL (Contoh: ?role=sales, ?role=operator, ?role=timesheet)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get('role');
    if (roleParam && ['sales', 'operator', 'timesheet', 'management'].includes(roleParam)) {
      setCurrentRole(roleParam);
    }
  }, []);

  const switchRoleAndURL = (roleKey) => {
    setCurrentRole(roleKey);
    const newUrl = `${window.location.pathname}?role=${roleKey}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  // State Data Pusat
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
      hmAwal: '1240.5 HM',
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
    },
    {
      id: 'TS-02',
      kodeGajiOperator: '1907',
      kodeTagih: '2292',
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
      hmStart: '1.032,5',
      hmEnd: '1.032,7',
      totalHm: '0,2',
      unitWorkingHour: '0,22',
      operatorWorkingHour: '0,22',
      hariKerjaAlat: '1,00',
      pencukupan: '1,00',
      keterangan: 'Kelebihan periode sebelumnya',
      jamDuniaHm: 'Hour Meter'
    }
  ]);

  const [fleetStatus, setFleetStatus] = useState({
    'EXC.92': 'Working',
    'EXC.83': 'Ready',
    'MG-1': 'Breakdown'
  });

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

  const [timesheetForm, setTimesheetForm] = useState({
    kodeGajiOperator: '1907',
    kodeTagih: '2292',
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
    hmStart: '1.032,5',
    hmEnd: '1.032,7',
    totalHm: '0,2',
    unitWorkingHour: '0,22',
    operatorWorkingHour: '0,22',
    hariKerjaAlat: '1,00',
    pencukupan: '1,00',
    keterangan: 'Operasional Normal',
    jamDuniaHm: 'Hour Meter'
  });

  const [notification, setNotification] = useState({ show: false, message: '' });

  const fileInputRef = useRef(null);
  const activeCaptureRef = useRef({ orderId: null, jenis: null });

  const logisticsPhone = '6285165659907';
  const operatorDatabase = ['BUSTAM', 'ABDUL RAHIM SAPUTRA', 'Saharuddin', 'Rustam', 'Amir', 'Yusuf', 'Aris', 'Herman', 'Dg. Sila', 'Rahmat', 'Supriadi'];

  const fleetDatabase = [
    { code: 'EXC.92', class: 'Exca 20 Ton', model: 'SY215H' },
    { code: 'EXC.83', class: 'Exca 20 Ton', model: 'SY215ACE' },
    { code: 'EXC.80', class: 'Exca 20 Ton', model: 'SY215ACE' },
    { code: 'EXC.05', class: 'Exca 20 Ton', model: 'SY215' },
    { code: 'MG-1', class: 'Motor Grader', model: 'Grader' },
    { code: 'D.02', class: 'Medium Dozer', model: 'Dozer' },
    { code: 'VBR.01', class: 'Vibro 10 Ton', model: 'Vibro' }
  ];

  const salesOptions = [{ label: 'ANS', value: 'ANS' }, { label: 'UCI', value: 'UCI' }, { label: 'CDP', value: 'CDP' }, { label: 'FAN', value: 'FAN' }, { label: 'CDF', value: 'CDF' }];
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
  const jenisSewaOptions = [{ label: 'S1', value: 'S1' }, { label: 'S2', value: 'S2' }, { label: 'S3', value: 'S3' }];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSalesSubmit = (e) => {
    e.preventDefault();
    const newOrderNo = 'SO-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder = {
      id: newOrderNo,
      customer: formData.customer,
      namaProyek: formData.namaProyek,
      lokasiAwal: 'Pool Delta Perkasa Makassar',
      lokasiTujuan: formData.lokasiPengantaran || formData.lokasi,
      picPenerima: formData.picPenerima || 'Belum diisi',
      sales: formData.sales,
      jenisAlat: formData.jenisAlat,
      jenisSewa: formData.jenisSewa,
      rencanaDurasi: `${formData.jumlahDurasi} ${formData.tipeDurasi}`,
      statusDurasi: 'Sesuai Rencana',
      catatanAktual: 'Menunggu alokasi lapangan',
      catatanLogistik: 'Mohon siapkan unit',
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
    setNotification({ show: true, message: `Sales Order #${newOrderNo} berhasil diterbitkan ke Sistem Pusat & Lapangan!` });
    setFormData({ customer: '', namaProyek: '', lokasi: '', lokasiPengantaran: '', picPenerima: '', sales: 'ANS', jenisAlat: 'Excavator 20 Ton - Bucket', jenisSewa: 'S1', tipeDurasi: 'Jam', jumlahDurasi: 8, jumlahUnit: 1 });
    setTimeout(() => setNotification({ show: false, message: '' }), 4000);
  };

  const handleTimesheetSubmit = (e) => {
    e.preventDefault();
    const newTsId = 'TS-' + Math.floor(10 + Math.random() * 90);
    const start = parseFloat(timesheetForm.hmStart.replace(',', '.')) || 0;
    const end = parseFloat(timesheetForm.hmEnd.replace(',', '.')) || 0;
    const totalHMVal = (end >= start) ? (end - start).toFixed(1).replace('.', ',') : '0,0';

    const newRow = {
      id: newTsId,
      ...timesheetForm,
      totalHm: totalHMVal,
      unitWorkingHour: totalHMVal,
      operatorWorkingHour: totalHMVal
    };

    setTimesheetList([newRow, ...timesheetList]);
    setNotification({ show: true, message: `Data Timesheet Job ID ${timesheetForm.jobId} berhasil disimpan ke Spreadsheet!` });
    setTimeout(() => setNotification({ show: false, message: '' }), 4000);
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
    const timeString = new Date().toLocaleString('id-ID');

    setOrderList(orderList.map(o => {
      if (o.id === orderId) {
        if (jenis === 'muat') return { ...o, fotoMuatUrl: imageUrl, timestampMuat: timeString, koordinatMuat: '-5.1476, 119.4327' };
        return { ...o, fotoTibaUrl: imageUrl, timestampTiba: timeString, koordinatTiba: '-5.1476, 119.4327' };
      }
      return o;
    }));
    e.target.value = null;
  };

  const exportToExcel = (type) => {
    let csvContent = "data:text/csv;charset=utf-8,";
    if (type === 'order') {
      csvContent += "No Order,Customer,Proyek,Sales,Request Alat,Jumlah Unit,Skema,Lokasi Tujuan,Unit,Operator,Status\n";
      orderList.forEach(o => { csvContent += `${o.id},"${o.customer}","${o.namaProyek}",${o.sales},"${o.jenisAlat}",${o.jumlahUnit},${o.jenisSewa},"${o.lokasiTujuan}",${o.kodeUnit},"${o.namaOperator}","${o.status}"\n`; });
    } else {
      csvContent += "Kode Gaji,Kode Tagih,Job ID,Tanggal,Hari,Operator,Attach,Unit Code,Model,Nama Penyewa,Alamat,Job Via,Jam Mulai,Jam Selesai,Istirahat,Standby,Total Jam Kerja,OT,HM Start,HM End,Total HM,Unit WH,Op WH,Hari Kerja,Pencukupan,Keterangan,Jam Dunia\n";
      timesheetList.forEach(ts => { 
        csvContent += `${ts.kodeGajiOperator},${ts.kodeTagih},${ts.jobId},${ts.tanggal},${ts.hari},${ts.operator},${ts.attach},${ts.unitCode},${ts.model},"${ts.namaPenyewa}","${ts.alamat}",${ts.jobVia},${ts.jamMulai},${ts.jamSelesai},${ts.durasiIstirahat},${ts.standby},${ts.totalJamKerja},${ts.ot},${ts.hmStart},${ts.hmEnd},${ts.totalHm},${ts.unitWorkingHour},${ts.operatorWorkingHour},${ts.hariKerjaAlat},${ts.pencukupan},"${ts.keterangan}",${ts.jamDuniaHm}\n`; 
      });
    }
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `Data_${type}_Delta_Perkasa.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 p-4 md:p-8 font-sans selection:bg-amber-500 selection:text-slate-950">
      <input type="file" accept="image/*" capture="environment" ref={fileInputRef} onChange={handleFileCaptured} className="hidden" />

      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER & NAVIGASI URL / ROLE */}
        <div className="bg-[#0d121f] border border-amber-500/30 rounded-3xl p-6 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center font-black text-slate-950 text-xl shadow-lg">▲</div>
            <div>
              <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">CV CHANDRA DELTA PERKASA</div>
              <h1 className="text-xl md:text-2xl font-black text-white">Sistem Terpusat Rental Alat Berat</h1>
            </div>
          </div>

          {/* TOMBOL PENGATUR URL PIC */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#121824] p-1.5 border border-slate-800 rounded-2xl">
            <span className="text-[10px] font-bold text-slate-400 px-2">Link PIC URL:</span>
            <button onClick={() => switchRoleAndURL('sales')} className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${currentRole === 'sales' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>📝 Sales</button>
            <button onClick={() => switchRoleAndURL('operator')} className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${currentRole === 'operator' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}>🚜 Lapangan</button>
            <button onClick={() => switchRoleAndURL('timesheet')} className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${currentRole === 'timesheet' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}>📊 Timesheet</button>
            <button onClick={() => switchRoleAndURL('management')} className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${currentRole === 'management' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>👑 Management (All)</button>
          </div>
        </div>

        {notification.show && (
          <div className="p-4 bg-emerald-950/90 border border-emerald-500 text-emerald-200 rounded-2xl text-xs font-bold flex items-center gap-3 shadow-lg">
            <span>✅</span><span>{notification.message}</span>
          </div>
        )}

        {/* 1. TAMPILAN KHUSUS URL SALES (?role=sales) */}
        {(currentRole === 'sales' || currentRole === 'management') && (
          <div className="bg-[#0b0e17] border border-amber-500/30 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-black text-amber-400">📝 Menu Khusus Sales: Form Sales Order</h2>
                <p className="text-xs text-slate-400">Link khusus: <code className="text-amber-300 bg-black/40 px-2 py-1 rounded">?role=sales</code></p>
              </div>
              <button onClick={() => exportToExcel('order')} className="px-3 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl">📥 Export SO Excel</button>
            </div>

            <form onSubmit={handleSalesSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Nama Customer / PT / CV</label>
                  <input type="text" name="customer" value={formData.customer} onChange={handleChange} placeholder="Contoh: PT Mahligai Artha Sejahtera" required className="w-full px-4 py-3 bg-[#121824] border border-slate-700 rounded-xl text-xs text-white outline-none" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Nama Proyek</label>
                  <input type="text" name="namaProyek" value={formData.namaProyek} onChange={handleChange} placeholder="Contoh: Land Clearing" required className="w-full px-4 py-3 bg-[#121824] border border-slate-700 rounded-xl text-xs text-white outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Sales / VIA</label>
                  <select name="sales" value={formData.sales} onChange={handleChange} className="w-full px-4 py-3 bg-[#121824] border border-slate-700 rounded-xl text-xs font-bold text-amber-300 outline-none">
                    {salesOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Jenis Alat & Attachment</label>
                  <select name="jenisAlat" value={formData.jenisAlat} onChange={handleChange} className="w-full px-4 py-3 bg-[#121824] border border-slate-700 rounded-xl text-xs font-bold text-teal-300 outline-none">
                    {alatOptions.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Skema Kontrak</label>
                  <select name="jenisSewa" value={formData.jenisSewa} onChange={handleChange} className="w-full px-4 py-3 bg-[#121824] border border-slate-700 rounded-xl text-xs font-bold text-amber-400 outline-none">
                    {jenisSewaOptions.map(js => <option key={js.value} value={js.value}>{js.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Lokasi Proyek Tujuan & Alamat Drop</label>
                  <input type="text" name="lokasiPengantaran" value={formData.lokasiPengantaran} onChange={handleChange} placeholder="Makassar / Jl. Poros Malino Km. 7" required className="w-full px-4 py-3 bg-[#121824] border border-slate-700 rounded-xl text-xs text-white outline-none" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Nama PIC & No HP Penerima</label>
                  <input type="text" name="picPenerima" value={formData.picPenerima} onChange={handleChange} placeholder="Pak Budi (081234567890)" required className="w-full px-4 py-3 bg-[#121824] border border-slate-700 rounded-xl text-xs text-white outline-none" />
                </div>
              </div>

              <button type="submit" className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg cursor-pointer">
                Terbitkan Sales Order & Kirim ke Lapangan &rarr;
              </button>
            </form>
          </div>
        )}

        {/* 2. TAMPILAN KHUSUS URL LAPANGAN (?role=operator) */}
        {(currentRole === 'operator' || currentRole === 'management') && (
          <div className="bg-[#0b0e17] border border-purple-500/30 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-black text-purple-400">🚜 Menu Kepala Operator & Logistik: Kontrol Lapangan & Unit</h2>
                <p className="text-xs text-slate-400">Link khusus: <code className="text-purple-300 bg-black/40 px-2 py-1 rounded">?role=operator</code></p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#121824] border-b border-slate-800 text-[10px] text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-4">No. Order</th>
                    <th className="py-3 px-4">Customer & Request Alat</th>
                    <th className="py-3 px-4 text-amber-400">Alokasi Unit & Operator</th>
                    <th className="py-3 px-4 text-purple-400">Logistik & Bukti Foto 📷</th>
                    <th className="py-3 px-4">Status & Kirim WA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-xs">
                  {orderList.map((order) => (
                    <tr key={order.id} className="hover:bg-[#121824]/40">
                      <td className="py-4 px-4 align-top font-mono font-black text-amber-400 text-sm">
                        {order.id}
                        <div className="text-[10px] text-slate-400 font-sans mt-1">Sales: {order.sales}</div>
                      </td>
                      <td className="py-4 px-4 align-top space-y-1">
                        <div className="font-bold text-white">{order.customer}</div>
                        <div className="text-slate-300 text-xs">{order.namaProyek}</div>
                        <div className="text-teal-300 font-bold">Req: {order.jenisAlat}</div>
                        <div className="text-[11px] text-blue-300">📍 {order.lokasiTujuan}</div>
                      </td>
                      <td className="py-4 px-4 align-top space-y-2">
                        <select value={order.kodeUnit} onChange={(e) => {
                          const val = e.target.value;
                          setOrderList(orderList.map(o => o.id === order.id ? { ...o, kodeUnit: val } : o));
                        }} className="w-full text-xs font-mono font-bold px-3 py-2 bg-[#121824] border border-amber-500 text-amber-300 rounded-xl outline-none">
                          <option value="Belum Dipilih">-- Pilih Unit --</option>
                          {fleetDatabase.map(u => <option key={u.code} value={u.code}>{u.code} ({u.class})</option>)}
                        </select>
                        <select value={order.namaOperator} onChange={(e) => {
                          const val = e.target.value;
                          setOrderList(orderList.map(o => o.id === order.id ? { ...o, namaOperator: val } : o));
                        }} className="w-full text-xs font-bold px-3 py-2 bg-[#121824] border border-emerald-500 text-emerald-300 rounded-xl outline-none">
                          <option value="Belum Ditentukan">-- Pilih Operator --</option>
                          {operatorDatabase.map(op => <option key={op} value={op}>{op}</option>)}
                        </select>
                        <input type="text" value={order.hmAwal} onChange={(e) => {
                          const val = e.target.value;
                          setOrderList(orderList.map(o => o.id === order.id ? { ...o, hmAwal: val } : o));
                        }} placeholder="HM Awal..." className="w-full text-xs font-mono px-3 py-2 bg-[#121824] border border-slate-700 text-teal-300 rounded-xl outline-none" />
                      </td>
                      <td className="py-4 px-4 align-top space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-[#121824] p-2 rounded-xl border border-slate-800">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-[9px] font-bold text-slate-400">MUAT</span>
                              <button onClick={() => triggerCamera(order.id, 'muat')} className="px-2 py-0.5 bg-blue-600 text-white text-[9px] font-bold rounded-lg cursor-pointer">📷 Foto</button>
                            </div>
                            {order.fotoMuatUrl ? <img src={order.fotoMuatUrl} alt="Muat" className="w-full h-12 object-cover rounded-lg" /> : <div className="text-[9px] text-slate-500">Kosong</div>}
                          </div>
                          <div className="bg-[#121824] p-2 rounded-xl border border-slate-800">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-[9px] font-bold text-slate-400">TIBA</span>
                              <button onClick={() => triggerCamera(order.id, 'tiba')} className="px-2 py-0.5 bg-blue-600 text-white text-[9px] font-bold rounded-lg cursor-pointer">📷 Foto</button>
                            </div>
                            {order.fotoTibaUrl ? <img src={order.fotoTibaUrl} alt="Tiba" className="w-full h-12 object-cover rounded-lg" /> : <div className="text-[9px] text-slate-500">Kosong</div>}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 align-top space-y-2">
                        <select value={order.status} onChange={(e) => {
                          const val = e.target.value;
                          setOrderList(orderList.map(o => o.id === order.id ? { ...o, status: val } : o));
                        }} className="w-full text-xs font-bold px-3 py-2 bg-[#121824] border border-blue-500 text-blue-300 rounded-xl outline-none">
                          <option value="Menunggu Alokasi Unit">Menunggu Alokasi</option>
                          <option value="Unit Ready / Dispatched">Dispatched</option>
                          <option value="Sedang Berjalan di Lapangan">Working</option>
                          <option value="Selesai Kontrak / Tarik Unit">Completed</option>
                        </select>
                        <button onClick={() => window.open(`https://wa.me/${logisticsPhone}?text=` + encodeURIComponent(`Logistik Update SO ${order.id} Unit ${order.kodeUnit} Operator ${order.namaOperator}`), '_blank')} className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-[11px] rounded-xl cursor-pointer">
                          💬 Kirim WA Logistik
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. TAMPILAN KHUSUS URL TIMESHEET (?role=timesheet) - DISESUAIKAN DENGAN TABEL */}
        {(currentRole === 'timesheet' || currentRole === 'management') && (
          <div className="bg-[#0b0e17] border border-emerald-500/30 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-black text-emerald-400">📊 Menu Admin Timesheet: Sesuai Format Tabel Master</h2>
                <p className="text-xs text-slate-400">Link khusus: <code className="text-emerald-300 bg-black/40 px-2 py-1 rounded">?role=timesheet</code></p>
              </div>
              <button onClick={() => exportToExcel('timesheet')} className="px-3 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl">📥 Export Timesheet Excel</button>
            </div>

            {/* FORM INPUT TIMESHEET SESUAI KOLOM TABEL */}
            <form onSubmit={handleTimesheetSubmit} className="space-y-4 bg-[#121824]/40 p-5 border border-slate-800 rounded-2xl">
              <h3 className="text-xs font-black text-emerald-400 uppercase tracking-wider mb-2">+ Input Entri Timesheet Baru</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-emerald-400 uppercase mb-1">Kode Gaji Op.</label>
                  <input type="text" value={timesheetForm.kodeGajiOperator} onChange={(e) => setTimesheetForm({...timesheetForm, kodeGajiOperator: e.target.value})} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-xl text-xs text-white" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-emerald-400 uppercase mb-1">Kode Tagih</label>
                  <input type="text" value={timesheetForm.kodeTagih} onChange={(e) => setTimesheetForm({...timesheetForm, kodeTagih: e.target.value})} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-xl text-xs text-white" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-emerald-400 uppercase mb-1">Job ID</label>
                  <input type="text" value={timesheetForm.jobId} onChange={(e) => setTimesheetForm({...timesheetForm, jobId: e.target.value})} required className="w-full px-3 py-2 bg-[#0b0e17] border border-emerald-600 rounded-xl text-xs font-mono font-bold text-emerald-300" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Tanggal</label>
                  <input type="text" value={timesheetForm.tanggal} onChange={(e) => setTimesheetForm({...timesheetForm, tanggal: e.target.value})} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-xl text-xs text-white" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Hari</label>
                  <input type="text" value={timesheetForm.hari} onChange={(e) => setTimesheetForm({...timesheetForm, hari: e.target.value})} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-xl text-xs text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Operator</label>
                  <select value={timesheetForm.operator} onChange={(e) => setTimesheetForm({...timesheetForm, operator: e.target.value})} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-xl text-xs font-bold text-emerald-300">
                    {operatorDatabase.map(op => <option key={op} value={op}>{op}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Attach.</label>
                  <input type="text" value={timesheetForm.attach} onChange={(e) => setTimesheetForm({...timesheetForm, attach: e.target.value})} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-xl text-xs text-white" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Unit Code</label>
                  <input type="text" value={timesheetForm.unitCode} onChange={(e) => setTimesheetForm({...timesheetForm, unitCode: e.target.value})} className="w-full px-3 py-2 bg-[#0b0e17] border border-amber-800 rounded-xl text-xs font-amber-300" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Model</label>
                  <input type="text" value={timesheetForm.model} onChange={(e) => setTimesheetForm({...timesheetForm, model: e.target.value})} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-xl text-xs text-white" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Job Via</label>
                  <input type="text" value={timesheetForm.jobVia} onChange={(e) => setTimesheetForm({...timesheetForm, jobVia: e.target.value})} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-xl text-xs text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Nama Penyewa</label>
                  <input type="text" value={timesheetForm.namaPenyewa} onChange={(e) => setTimesheetForm({...timesheetForm, namaPenyewa: e.target.value})} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-xl text-xs text-white" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Alamat Lokasi Kerja</label>
                  <input type="text" value={timesheetForm.alamat} onChange={(e) => setTimesheetForm({...timesheetForm, alamat: e.target.value})} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-xl text-xs text-white" />
                </div>
              </div>

              {/* BAGIAN UTAMA HM DAN HITUNGAN SESUAI GAMBAR 2 */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3 bg-teal-950/20 p-3 border border-teal-500/30 rounded-xl">
                <div>
                  <label className="block text-[10px] font-bold text-teal-400 uppercase mb-1">HM Start</label>
                  <input type="text" value={timesheetForm.hmStart} onChange={(e) => setTimesheetForm({...timesheetForm, hmStart: e.target.value})} className="w-full px-3 py-2 bg-[#0b0e17] border border-teal-600 rounded-xl text-xs font-mono font-bold text-teal-300" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-teal-400 uppercase mb-1">HM End</label>
                  <input type="text" value={timesheetForm.hmEnd} onChange={(e) => setTimesheetForm({...timesheetForm, hmEnd: e.target.value})} className="w-full px-3 py-2 bg-[#0b0e17] border border-teal-600 rounded-xl text-xs font-mono font-bold text-teal-300" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-teal-300 uppercase mb-1">Total HM</label>
                  <input type="text" value={timesheetForm.totalHm} onChange={(e) => setTimesheetForm({...timesheetForm, totalHm: e.target.value})} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-xl text-xs font-mono font-bold text-white" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">OT</label>
                  <input type="text" value={timesheetForm.ot} onChange={(e) => setTimesheetForm({...timesheetForm, ot: e.target.value})} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-xl text-xs font-mono text-white" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-cyan-400 uppercase mb-1">Unit Working Hour</label>
                  <input type="text" value={timesheetForm.unitWorkingHour} onChange={(e) => setTimesheetForm({...timesheetForm, unitWorkingHour: e.target.value})} className="w-full px-3 py-2 bg-[#0b0e17] border border-cyan-700 rounded-xl text-xs font-mono text-cyan-300" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-cyan-400 uppercase mb-1">Op. Working Hour</label>
                  <input type="text" value={timesheetForm.operatorWorkingHour} onChange={(e) => setTimesheetForm({...timesheetForm, operatorWorkingHour: e.target.value})} className="w-full px-3 py-2 bg-[#0b0e17] border border-cyan-700 rounded-xl text-xs font-mono text-cyan-300" />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-yellow-300 uppercase mb-1">Hari Kerja Alat</label>
                  <input type="text" value={timesheetForm.hariKerjaAlat} onChange={(e) => setTimesheetForm({...timesheetForm, hariKerjaAlat: e.target.value})} className="w-full px-3 py-2 bg-[#0b0e17] border border-yellow-600 rounded-xl text-xs font-mono text-yellow-300" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Pencukupan</label>
                  <input type="text" value={timesheetForm.pencukupan} onChange={(e) => setTimesheetForm({...timesheetForm, pencukupan: e.target.value})} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-xl text-xs font-mono text-white" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Keterangan</label>
                  <input type="text" value={timesheetForm.keterangan} onChange={(e) => setTimesheetForm({...timesheetForm, keterangan: e.target.value})} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-xl text-xs text-white" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Jam Dunia / HM</label>
                  <input type="text" value={timesheetForm.jamDuniaHm} onChange={(e) => setTimesheetForm({...timesheetForm, jamDuniaHm: e.target.value})} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-xl text-xs text-white" />
                </div>
              </div>

              <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer">
                + Simpan Entri Timesheet Lengkap ke Spreadsheet &rarr;
              </button>
            </form>

            {/* TABEL DATA TIMESHEET LENGKAP 27 KOLOM */}
            <div className="overflow-x-auto max-h-96 border border-slate-800 rounded-2xl">
              <table className="w-full text-left border-collapse text-xs whitespace-nowrap font-mono">
                <thead>
                  <tr className="bg-[#121824] text-slate-300 uppercase text-[9px] border-b border-slate-700 sticky top-0">
                    <th className="py-2.5 px-3 bg-emerald-950 text-emerald-300">Kode Gaji</th>
                    <th className="py-2.5 px-3 bg-emerald-950 text-emerald-300">Kode Tagih</th>
                    <th className="py-2.5 px-3 text-emerald-400">Job ID</th>
                    <th className="py-2.5 px-3">Tanggal</th>
                    <th className="py-2.5 px-3">Hari</th>
                    <th className="py-2.5 px-3">Operator</th>
                    <th className="py-2.5 px-3">Attach.</th>
                    <th className="py-2.5 px-3 text-amber-400">Unit Code</th>
                    <th className="py-2.5 px-3">Model</th>
                    <th className="py-2.5 px-3">Nama Penyewa</th>
                    <th className="py-2.5 px-3">Alamat</th>
                    <th className="py-2.5 px-3">Job Via</th>
                    <th className="py-2.5 px-3">Jam Mulai</th>
                    <th className="py-2.5 px-3">Jam Selesai</th>
                    <th className="py-2.5 px-3">Istirahat</th>
                    <th className="py-2.5 px-3">Standby</th>
                    <th className="py-2.5 px-3">Total Jam</th>
                    <th className="py-2.5 px-3">OT</th>
                    <th className="py-2.5 px-3 bg-teal-950 text-teal-300">HM Start</th>
                    <th className="py-2.5 px-3 bg-teal-950 text-teal-300">HM End</th>
                    <th className="py-2.5 px-3 bg-teal-950 text-teal-300">Total HM</th>
                    <th className="py-2.5 px-3 bg-cyan-950 text-cyan-300">Unit WH</th>
                    <th className="py-2.5 px-3 bg-cyan-950 text-cyan-300">Op WH</th>
                    <th className="py-2.5 px-3 bg-yellow-950 text-yellow-300">Hari Kerja</th>
                    <th className="py-2.5 px-3">Pencukupan</th>
                    <th className="py-2.5 px-3">Keterangan</th>
                    <th className="py-2.5 px-3">Jam Dunia/HM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {timesheetList.map((ts, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-2 px-3 text-emerald-300 font-bold">{ts.kodeGajiOperator}</td>
                      <td className="py-2 px-3 text-emerald-300">{ts.kodeTagih}</td>
                      <td className="py-2 px-3 text-emerald-400 font-bold">{ts.jobId}</td>
                      <td className="py-2 px-3">{ts.tanggal}</td>
                      <td className="py-2 px-3">{ts.hari}</td>
                      <td className="py-2 px-3 text-white font-bold">{ts.operator}</td>
                      <td className="py-2 px-3 text-slate-300">{ts.attach}</td>
                      <td className="py-2 px-3 text-amber-400 font-bold">{ts.unitCode}</td>
                      <td className="py-2 px-3 text-slate-300">{ts.model}</td>
                      <td className="py-2 px-3 text-slate-200">{ts.namaPenyewa}</td>
                      <td className="py-2 px-3 text-slate-400 text-[11px]">{ts.alamat}</td>
                      <td className="py-2 px-3 text-amber-300">{ts.jobVia}</td>
                      <td className="py-2 px-3">{ts.jamMulai}</td>
                      <td className="py-2 px-3">{ts.jamSelesai}</td>
                      <td className="py-2 px-3">{ts.durasiIstirahat}</td>
                      <td className="py-2 px-3">{ts.standby}</td>
                      <td className="py-2 px-3">{ts.totalJamKerja}</td>
                      <td className="py-2 px-3 text-purple-300">{ts.ot}</td>
                      <td className="py-2 px-3 text-teal-300">{ts.hmStart}</td>
                      <td className="py-2 px-3 text-teal-300">{ts.hmEnd}</td>
                      <td className="py-2 px-3 text-teal-400 font-bold">{ts.totalHm}</td>
                      <td className="py-2 px-3 text-cyan-300 bg-cyan-950/20">{ts.unitWorkingHour}</td>
                      <td className="py-2 px-3 text-cyan-300 bg-cyan-950/20">{ts.operatorWorkingHour}</td>
                      <td className="py-2 px-3 text-yellow-300 bg-yellow-950/20 font-bold">{ts.hariKerjaAlat}</td>
                      <td className="py-2 px-3">{ts.pencukupan}</td>
                      <td className="py-2 px-3 text-slate-300">{ts.keterangan}</td>
                      <td className="py-2 px-3 text-slate-400">{ts.jamDuniaHm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="text-center text-xs text-slate-500 py-4">
          CV Chandra Delta Perkasa • Makassar & Sulawesi • Hotline: 0851-6565-9907
        </div>

      </div>
    </div>
  );
}
