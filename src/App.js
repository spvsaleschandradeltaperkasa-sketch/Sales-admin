import React, { useState, useEffect, useRef } from 'react';

export default function DeltaPerkasaApp() {
  // Membaca akses PIC langsung dari URL (Contoh: ?role=sales, ?role=operator, ?role=timesheet)
  const [currentRole, setCurrentRole] = useState('management');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get('role');
    if (roleParam && ['sales', 'operator', 'timesheet', 'management'].includes(roleParam)) {
      setCurrentRole(roleParam);
    }
  }, []);

  // Fungsi untuk mengganti URL secara otomatis saat tombol role diklik
  const switchRoleAndURL = (roleKey) => {
    setCurrentRole(roleKey);
    const newUrl = `${window.location.pathname}?role=${roleKey}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  // State Data Pusat (Sales Order & Timesheet)
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
      statusLogistik: '🚚 Dalam Perjalanan (OTW)',
      hmAwal: '1240.5 HM',
      fotoMuatUrl: null,
      fotoTibaUrl: null,
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
      operator: 'BUSTAM',
      unitCode: 'EXC.92',
      namaPenyewa: 'MAHLIGAI ARTHA SEJAHTERA',
      hmStart: '1030.0',
      hmEnd: '1032.5',
      totalHm: '2,5'
    }
  ]);

  // State Form Sales
  const [formData, setFormData] = useState({
    customer: '',
    namaProyek: '',
    lokasiPengantaran: '',
    picPenerima: '',
    sales: 'ANS',
    jenisAlat: 'Excavator 20 Ton - Bucket',
    jenisSewa: 'S1',
    tipeDurasi: 'Jam',
    jumlahDurasi: 8,
    jumlahUnit: 1
  });

  // State Form Timesheet
  const [timesheetForm, setTimesheetForm] = useState({
    kodeGajiOperator: '1907',
    kodeTagih: '2173',
    jobId: '0320-0526-ANS-S1',
    tanggal: '11-Sep-26',
    operator: 'BUSTAM',
    unitCode: 'EXC.92',
    namaPenyewa: 'MAHLIGAI ARTHA SEJAHTERA',
    hmStart: '1030.0',
    hmEnd: '1032.5'
  });

  const [notification, setNotification] = useState({ show: false, message: '' });
  const fileInputRef = useRef(null);
  const activeCaptureRef = useRef({ orderId: null, jenis: null });

  const salesOptions = [{ label: 'ANS', value: 'ANS' }, { label: 'UCI', value: 'UCI' }, { label: 'CDP', value: 'CDP' }, { label: 'FAN', value: 'FAN' }];
  const alatOptions = [
    { label: 'Excavator 20 Ton - Bucket', value: 'Excavator 20 Ton - Bucket' },
    { label: 'Excavator 20 Ton - Breaker', value: 'Excavator 20 Ton - Breaker' },
    { label: 'Excavator Mini SY55 - Bucket', value: 'Excavator Mini SY55 - Bucket' },
    { label: 'Vibro Roller', value: 'Vibro Roller' },
    { label: 'Bulldozer', value: 'Bulldozer' },
    { label: 'Motor Grader', value: 'Motor Grader' }
  ];
  const jenisSewaOptions = [{ label: 'S1', value: 'S1' }, { label: 'S2', value: 'S2' }, { label: 'S3', value: 'S3' }];
  const fleetDatabase = [
    { code: 'EXC.92', class: 'Exca 20 Ton' },
    { code: 'EXC.83', class: 'Exca 20 Ton' },
    { code: 'MG-1', class: 'Motor Grader' },
    { code: 'D.02', class: 'Medium Dozer' },
    { code: 'VBR.01', class: 'Vibro 10 Ton' }
  ];
  const operatorDatabase = ['BUSTAM', 'ABDUL RAHIM SAPUTRA', 'Saharuddin', 'Rustam', 'Amir', 'Yusuf', 'Aris', 'Herman'];

  const handleSalesSubmit = (e) => {
    e.preventDefault();
    const newOrderNo = 'SO-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder = {
      id: newOrderNo,
      customer: formData.customer,
      namaProyek: formData.namaProyek,
      lokasiTujuan: formData.lokasiPengantaran,
      picPenerima: formData.picPenerima,
      sales: formData.sales,
      jenisAlat: formData.jenisAlat,
      jenisSewa: formData.jenisSewa,
      statusLogistik: '⏳ Menunggu Jadwal Muat',
      hmAwal: 'Belum diisi',
      fotoMuatUrl: null,
      fotoTibaUrl: null,
      kodeUnit: 'Belum Dipilih',
      namaOperator: 'Belum Ditentukan',
      status: 'Menunggu Alokasi Unit'
    };
    setOrderList([newOrder, ...orderList]);
    setNotification({ show: true, message: `Sales Order #${newOrderNo} berhasil diterbitkan!` });
    setFormData({ customer: '', namaProyek: '', lokasiPengantaran: '', picPenerima: '', sales: 'ANS', jenisAlat: 'Excavator 20 Ton - Bucket', jenisSewa: 'S1', tipeDurasi: 'Jam', jumlahDurasi: 8, jumlahUnit: 1 });
    setTimeout(() => setNotification({ show: false, message: '' }), 4000);
  };

  const handleTimesheetSubmit = (e) => {
    e.preventDefault();
    const newTsId = 'TS-' + Math.floor(10 + Math.random() * 90);
    const start = parseFloat(timesheetForm.hmStart) || 0;
    const end = parseFloat(timesheetForm.hmEnd) || 0;
    const totalHMVal = (end >= start) ? (end - start).toFixed(1).replace('.', ',') : '0,0';

    const newRow = { id: newTsId, ...timesheetForm, totalHm: totalHMVal };
    setTimesheetList([newRow, ...timesheetList]);
    setNotification({ show: true, message: `Data Timesheet ${timesheetForm.jobId} berhasil disimpan!` });
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
    setOrderList(orderList.map(o => {
      if (o.id === orderId) {
        if (jenis === 'muat') return { ...o, fotoMuatUrl: imageUrl };
        return { ...o, fotoTibaUrl: imageUrl };
      }
      return o;
    }));
    e.target.value = null;
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 p-4 md:p-8 font-sans">
      <input type="file" accept="image/*" capture="environment" ref={fileInputRef} onChange={handleFileCaptured} className="hidden" />

      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER & NAVIGASI URL / ROLE */}
        <div className="bg-[#0d121f] border border-amber-500/30 rounded-3xl p-6 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center font-black text-slate-950 text-xl shadow-lg">▲</div>
            <div>
              <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">CV CHANDRA DELTA PERKASA</div>
              <h1 className="text-xl md:text-2xl font-black text-white">Portal Terpadu Rental Alat Berat</h1>
            </div>
          </div>

          {/* PILIHAN LINK BERDASARKAN URL PARAMETER */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#121824] p-1.5 border border-slate-800 rounded-2xl">
            <span className="text-[10px] font-bold text-slate-400 px-2">Link PIC Khusus:</span>
            <button onClick={() => switchRoleAndURL('sales')} className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${currentRole === 'sales' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>📝 Link Sales</button>
            <button onClick={() => switchRoleAndURL('operator')} className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${currentRole === 'operator' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}>🚜 Link Lapangan</button>
            <button onClick={() => switchRoleAndURL('timesheet')} className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${currentRole === 'timesheet' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}>📊 Link Timesheet</button>
            <button onClick={() => switchRoleAndURL('management')} className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${currentRole === 'management' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>👑 Full Akses (Boss)</button>
          </div>
        </div>

        {notification.show && (
          <div className="p-4 bg-emerald-950/90 border border-emerald-500 text-emerald-200 rounded-2xl text-xs font-bold flex items-center gap-3">
            <span>✅</span><span>{notification.message}</span>
          </div>
        )}

        {/* 1. TAMPILAN KHUSUS URL SALES (?role=sales) */}
        {(currentRole === 'sales' || currentRole === 'management') && (
          <div className="bg-[#0b0e17] border border-amber-500/30 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
            <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex justify-between items-center">
              <div>
                <h2 className="text-base font-black text-amber-400">📝 Form Khusus Sales Order</h2>
                <p className="text-xs text-slate-300">Bagikan URL ini ke tim Sales: <code className="text-amber-300 bg-black/40 px-2 py-1 rounded">?role=sales</code></p>
              </div>
            </div>

            <form onSubmit={handleSalesSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Nama Customer / PT</label>
                  <input type="text" value={formData.customer} onChange={(e) => setFormData({...formData, customer: e.target.value})} placeholder="PT Mahligai Artha Sejahtera" required className="w-full px-4 py-3 bg-[#121824] border border-slate-700 rounded-xl text-xs text-white" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Nama Proyek</label>
                  <input type="text" value={formData.namaProyek} onChange={(e) => setFormData({...formData, namaProyek: e.target.value})} placeholder="Land Clearing" required className="w-full px-4 py-3 bg-[#121824] border border-slate-700 rounded-xl text-xs text-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Sales / VIA</label>
                  <select value={formData.sales} onChange={(e) => setFormData({...formData, sales: e.target.value})} className="w-full px-4 py-3 bg-[#121824] border border-slate-700 rounded-xl text-xs font-bold text-amber-300">
                    {salesOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Jenis Alat</label>
                  <select value={formData.jenisAlat} onChange={(e) => setFormData({...formData, jenisAlat: e.target.value})} className="w-full px-4 py-3 bg-[#121824] border border-slate-700 rounded-xl text-xs font-bold text-teal-300">
                    {alatOptions.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Skema Kontrak</label>
                  <select value={formData.jenisSewa} onChange={(e) => setFormData({...formData, jenisSewa: e.target.value})} className="w-full px-4 py-3 bg-[#121824] border border-slate-700 rounded-xl text-xs font-bold text-amber-400">
                    {jenisSewaOptions.map(js => <option key={js.value} value={js.value}>{js.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Lokasi Tujuan & Alamat Drop</label>
                  <input type="text" value={formData.lokasiPengantaran} onChange={(e) => setFormData({...formData, lokasiPengantaran: e.target.value})} placeholder="Jl. Poros Malino Km. 7" required className="w-full px-4 py-3 bg-[#121824] border border-slate-700 rounded-xl text-xs text-white" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Nama PIC & No HP Penerima</label>
                  <input type="text" value={formData.picPenerima} onChange={(e) => setFormData({...formData, picPenerima: e.target.value})} placeholder="Pak Budi (081234567890)" required className="w-full px-4 py-3 bg-[#121824] border border-slate-700 rounded-xl text-xs text-white" />
                </div>
              </div>

              <button type="submit" className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer">
                Terbitkan Sales Order ke Sistem Pusat &rarr;
              </button>
            </form>
          </div>
        )}

        {/* 2. TAMPILAN KHUSUS URL LAPANGAN (?role=operator) */}
        {(currentRole === 'operator' || currentRole === 'management') && (
          <div className="bg-[#0b0e17] border border-purple-500/30 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
            <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-2xl flex justify-between items-center">
              <div>
                <h2 className="text-base font-black text-purple-400">🚜 Kontrol Lapangan, Unit & Logistik</h2>
                <p className="text-xs text-slate-300">Bagikan URL ini ke Kepala Operator / Logistik: <code className="text-purple-300 bg-black/40 px-2 py-1 rounded">?role=operator</code></p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#121824] border-b border-slate-800 text-[10px] text-slate-400 uppercase">
                    <th className="py-3 px-4">No. Order</th>
                    <th className="py-3 px-4">Customer & Alat</th>
                    <th className="py-3 px-4 text-amber-400">Alokasi Unit & Operator</th>
                    <th className="py-3 px-4 text-purple-400">Foto Muat / Tiba 📷</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-xs">
                  {orderList.map((order) => (
                    <tr key={order.id} className="hover:bg-[#121824]/40">
                      <td className="py-4 px-4 align-top font-mono font-black text-amber-400 text-sm">{order.id}</td>
                      <td className="py-4 px-4 align-top space-y-1">
                        <div className="font-bold text-white">{order.customer}</div>
                        <div className="text-teal-300 font-bold">{order.jenisAlat}</div>
                        <div className="text-[11px] text-blue-300">📍 {order.lokasiTujuan}</div>
                      </td>
                      <td className="py-4 px-4 align-top space-y-2">
                        <select value={order.kodeUnit} onChange={(e) => {
                          const val = e.target.value;
                          setOrderList(orderList.map(o => o.id === order.id ? { ...o, kodeUnit: val } : o));
                        }} className="w-full text-xs font-mono font-bold px-3 py-2 bg-[#121824] border border-amber-500 text-amber-300 rounded-xl">
                          <option value="Belum Dipilih">-- Pilih Unit --</option>
                          {fleetDatabase.map(u => <option key={u.code} value={u.code}>{u.code} ({u.class})</option>)}
                        </select>
                        <select value={order.namaOperator} onChange={(e) => {
                          const val = e.target.value;
                          setOrderList(orderList.map(o => o.id === order.id ? { ...o, namaOperator: val } : o));
                        }} className="w-full text-xs font-bold px-3 py-2 bg-[#121824] border border-emerald-500 text-emerald-300 rounded-xl">
                          <option value="Belum Ditentukan">-- Pilih Operator --</option>
                          {operatorDatabase.map(op => <option key={op} value={op}>{op}</option>)}
                        </select>
                      </td>
                      <td className="py-4 px-4 align-top">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-[#121824] p-2 rounded-xl border border-slate-800 text-center">
                            <button onClick={() => triggerCamera(order.id, 'muat')} className="w-full py-1.5 bg-blue-600 text-white text-[10px] font-bold rounded-lg mb-1">📷 Foto Muat</button>
                            {order.fotoMuatUrl ? <img src={order.fotoMuatUrl} alt="Muat" className="w-full h-10 object-cover rounded-lg" /> : <span className="text-[9px] text-slate-500">Belum ada</span>}
                          </div>
                          <div className="bg-[#121824] p-2 rounded-xl border border-slate-800 text-center">
                            <button onClick={() => triggerCamera(order.id, 'tiba')} className="w-full py-1.5 bg-blue-600 text-white text-[10px] font-bold rounded-lg mb-1">📷 Foto Tiba</button>
                            {order.fotoTibaUrl ? <img src={order.fotoTibaUrl} alt="Tiba" className="w-full h-10 object-cover rounded-lg" /> : <span className="text-[9px] text-slate-500">Belum ada</span>}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. TAMPILAN KHUSUS URL TIMESHEET (?role=timesheet) */}
        {(currentRole === 'timesheet' || currentRole === 'management') && (
          <div className="bg-[#0b0e17] border border-emerald-500/30 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl flex justify-between items-center">
              <div>
                <h2 className="text-base font-black text-emerald-400">📊 Admin Timesheet & Hour Meter</h2>
                <p className="text-xs text-slate-300">Bagikan URL ini ke Admin Timesheet: <code className="text-emerald-300 bg-black/40 px-2 py-1 rounded">?role=timesheet</code></p>
              </div>
            </div>

            <form onSubmit={handleTimesheetSubmit} className="space-y-4 bg-[#121824]/40 p-4 border border-slate-800 rounded-2xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Job ID</label>
                  <input type="text" value={timesheetForm.jobId} onChange={(e) => setTimesheetForm({...timesheetForm, jobId: e.target.value})} required className="w-full px-3 py-2 bg-[#0b0e17] border border-emerald-600 rounded-xl text-xs font-mono font-bold text-emerald-300" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Operator</label>
                  <select value={timesheetForm.operator} onChange={(e) => setTimesheetForm({...timesheetForm, operator: e.target.value})} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-xl text-xs font-bold text-emerald-300">
                    {operatorDatabase.map(op => <option key={op} value={op}>{op}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-teal-400 uppercase mb-1">HM Start</label>
                  <input type="text" value={timesheetForm.hmStart} onChange={(e) => setTimesheetForm({...timesheetForm, hmStart: e.target.value})} className="w-full px-3 py-2 bg-[#0b0e17] border border-teal-800 rounded-xl text-xs font-mono font-bold text-teal-300" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-teal-400 uppercase mb-1">HM End</label>
                  <input type="text" value={timesheetForm.hmEnd} onChange={(e) => setTimesheetForm({...timesheetForm, hmEnd: e.target.value})} className="w-full px-3 py-2 bg-[#0b0e17] border border-teal-800 rounded-xl text-xs font-mono font-bold text-teal-300" />
                </div>
              </div>
              <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer">
                + Simpan Entri Timesheet &rarr;
              </button>
            </form>

            <div className="overflow-x-auto max-h-80">
              <table className="w-full text-left border-collapse text-xs whitespace-nowrap font-mono">
                <thead>
                  <tr className="bg-[#121824] text-slate-300 uppercase text-[10px] border-b border-slate-700">
                    <th className="py-2 px-3">Job ID</th>
                    <th className="py-2 px-3">Tanggal</th>
                    <th className="py-2 px-3">Operator</th>
                    <th className="py-2 px-3">Unit</th>
                    <th className="py-2 px-3">Penyewa</th>
                    <th className="py-2 px-3">HM Start</th>
                    <th className="py-2 px-3">HM End</th>
                    <th className="py-2 px-3 text-emerald-300">Total HM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {timesheetList.map((ts, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-2 px-3 text-emerald-400 font-bold">{ts.jobId}</td>
                      <td className="py-2 px-3">{ts.tanggal}</td>
                      <td className="py-2 px-3 text-white">{ts.operator}</td>
                      <td className="py-2 px-3 text-amber-400">{ts.unitCode}</td>
                      <td className="py-2 px-3 text-slate-200">{ts.namaPenyewa}</td>
                      <td className="py-2 px-3 text-teal-300">{ts.hmStart}</td>
                      <td className="py-2 px-3 text-teal-300">{ts.hmEnd}</td>
                      <td className="py-2 px-3 text-emerald-300 font-bold">{ts.totalHm}</td>
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
