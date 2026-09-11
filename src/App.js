import React, { useState } from 'react';

export default function DeltaPerkasaCompleteDashboard() {
  const trontonFleet = [
    { code: 'SL.01', name: 'Tronton Hino SL.01' },
    { code: 'SL.02', name: 'Tronton Fuso SL.02' },
    { code: 'TW.01', name: 'Trailer TW.01' }
  ];

  const fleetDatabase = [
    { code: 'EXC.01', class: 'Exca 20 Ton' },
    { code: 'EXC.02', class: 'Exca 20 Ton' },
    { code: 'EXC.03', class: 'Exca Mini' },
    { code: 'EXC.04', class: 'Exca Mini' },
    { code: 'EXC.05', class: 'Exca 30 Ton' },
    { code: 'VIB.01', class: 'Vibro 10 Ton' },
    { code: 'DOZ.01', class: 'Medium Dozer' },
    { code: 'DOZ.02', class: 'Medium Dozer' },
    { code: 'GRD.01', class: 'Motor Grader' },
    { code: 'CRN.01', class: 'Mobile Crane' }
  ];

  // State Form Input Sales Order Baru (Dilengkapi field tambahan sesuai permintaan)
  const [formCustomer, setFormCustomer] = useState('PT Prambanan Dwipaka');
  const [formProject, setFormProject] = useState('Land Clearing / Project Site');
  const [formLokasiPengantaran, setFormLokasiPengantaran] = useState('https://maps.app.goo.gl/Le3c25ej8ieFEQCp7');
  const [formPoolAwal, setFormPoolAwal] = useState('Pool Delta Makassar');
  const [formPicPenerima, setFormPicPenerima] = useState('Soni (+62 811-3118-801)');
  const [formTanggalPengantaran, setFormTanggalPengantaran] = useState('2026-09-13');
  const [formSales, setFormSales] = useState('ANS');
  const [formSkema, setFormSkema] = useState('S3 (Borongan / Kerja Termin)');
  const [formEstimasiKerja, setFormEstimasiKerja] = useState('Minggu, 13 Sept');
  const [formJenisAlat, setFormJenisAlat] = useState('Excavator 20 Ton - Bucket');
  const [formJumlahUnit, setFormJumlahUnit] = useState('1');

  // State Utama Order List
  const [orderList, setOrderList] = useState([
    {
      id: 1,
      soNumber: 'SO-7208',
      tanggalInput: '2026-06-06',
      sales: 'ANS',
      customer: 'PT Prambanan Dwipaka',
      project: 'Project Site',
      skema: 'S3 (Borongan / Kerja Termin)',
      tanggalPengantaran: '2026-09-13',
      estimasiKerja: 'Minggu, 13 Sept',
      lokasiAwal: 'Pool Delta Makassar',
      lokasiPengantaran: 'https://maps.app.goo.gl/Le3c25ej8ieFEQCp7',
      picPenerima: 'Soni (+62 811-3118-801)',
      evaluasiWaktu: 'Sesuai Rencana',
      statusLapangan: 'Sedang berjalan di lapangan',
      jenisAlat: 'Exca 20 Ton',
      unitCode: 'EXC.08',
      operator: 'Baharuddin',
      hmAwal: '1240.5 HM (Solar Full)',
      catatanLogistik: 'Bawa breaker & selang hidrolik cadangan',
      statusOrder: 'Dispatched',
      trontonUnit: 'SL.01',
      statusLogistik: 'OTW ke Proyek',
      fotoMuatUrl: '',
      timestampMuat: '',
      fotoTibaUrl: '',
      timestampTiba: ''
    }
  ]);

  const [fleetStatus, setFleetStatus] = useState({
    'DOZ.01': 'Ready',
    'DOZ.02': 'Ready',
    'EXC.01': 'Working',
    'EXC.03': 'Ready'
  });

  const [fleetSearchQuery, setFleetSearchQuery] = useState('');
  const [selectedFleetFilter, setSelectedFleetFilter] = useState('ALL');
  const [filterSalesKontrol, setFilterSalesKontrol] = useState('ALL');

  // Handler Terbitkan Sales Order Baru
  const handleTerbitkanOrder = (e) => {
    e.preventDefault();
    if (!formCustomer || !formProject) {
      alert("Mohon isi Nama Customer dan Nama Proyek terlebih dahulu.");
      return;
    }

    const newOrder = {
      id: orderList.length + 1,
      soNumber: `SO-${Math.floor(1000 + Math.random() * 9000)}`,
      tanggalInput: new Date().toISOString().slice(0, 10),
      sales: formSales,
      customer: formCustomer,
      project: formProject,
      skema: formSkema,
      tanggalPengantaran: formTanggalPengantaran,
      estimasiKerja: formEstimasiKerja,
      lokasiAwal: formPoolAwal,
      lokasiPengantaran: formLokasiPengantaran,
      picPenerima: formPicPenerima,
      evaluasiWaktu: 'Sesuai Rencana',
      statusLapangan: 'Menunggu Alokasi Unit',
      jenisAlat: formJenisAlat,
      unitCode: 'EXC.03',
      operator: 'Belum Ditentukan',
      hmAwal: 'HM: 0.0 / Solar Full',
      catatanLogistik: 'Standar pengiriman alat berat',
      statusOrder: 'Menunggu Alokasi',
      trontonUnit: 'SL.01',
      statusLogistik: 'Menunggu Jadwal Muat',
      fotoMuatUrl: '',
      timestampMuat: '',
      fotoTibaUrl: '',
      timestampTiba: ''
    };

    setOrderList([newOrder, ...orderList]);
    alert(`Sales Order ${newOrder.soNumber} berhasil diterbitkan!`);
  };

  const updateOrderField = (id, field, value) => {
    setOrderList(orderList.map(o => o.id === id ? { ...o, [field]: value } : o));
  };

  const triggerCameraLogistik = (id, type) => {
    const timeNow = new Date().toLocaleTimeString();
    const mockImg = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&auto=format&fit=crop&q=60';
    setOrderList(orderList.map(o => {
      if (o.id === id) {
        if (type === 'muat') {
          return { ...o, fotoMuatUrl: mockImg, timestampMuat: timeNow };
        } else {
          return { ...o, fotoTibaUrl: mockImg, timestampTiba: timeNow };
        }
      }
      return o;
    }));
  };

  const sendWhatsApp = (text) => {
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const exportToExcel = () => {
    let csv = "data:text/csv;charset=utf-8,SO Number,Customer,Project,Skema,Tgl Pengantaran,Estimasi Kerja,Lokasi Awal,Lokasi Pengantaran,PIC Penerima,Jenis Alat,Unit\n";
    orderList.forEach(o => {
      csv += `${o.soNumber},"${o.customer}","${o.project}",${o.skema},${o.tanggalPengantaran},"${o.estimasiKerja}","${o.lokasiAwal}","${o.lokasiPengantaran}","${o.picPenerima}",${o.jenisAlat},${o.unitCode}\n`;
    });
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", `Sales_Order_Delta_Perkasa_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const uniqueClasses = ['ALL', ...new Set(fleetDatabase.map(f => f.class))];
  const filteredFleet = fleetDatabase.filter(f => {
    const matchQuery = f.code.toLowerCase().includes(fleetSearchQuery.toLowerCase()) || f.class.toLowerCase().includes(fleetSearchQuery.toLowerCase());
    const matchClass = selectedFleetFilter === 'ALL' || f.class === selectedFleetFilter;
    return matchQuery && matchClass;
  });

  const filteredOrderList = orderList.filter(o => {
    if (filterSalesKontrol === 'ALL') return true;
    return o.sales === filterSalesKontrol;
  });

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER UTAMA */}
        <div className="bg-[#0b0e17] border border-slate-800/80 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="bg-amber-500 text-slate-950 font-black p-3 rounded-2xl shadow-lg flex flex-col items-center justify-center">
              <span className="text-xs uppercase tracking-widest">Delta</span>
              <span className="text-lg">DP</span>
            </div>
            <div>
              <div className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-1">
                PUSAT RENTAL ALAT BERAT SULAWESI
              </div>
              <h1 className="text-2xl font-black text-white tracking-wide">CV CHANDRA DELTA PERKASA</h1>
              <p className="text-xs text-slate-400">Dashboard Operasional, Alokasi Unit, & Koordinasi Logistik Lapangan</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#111622] border border-slate-800 px-5 py-3 rounded-2xl shadow-inner">
            <div className="text-2xl">🚚</div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Armada Ready</div>
              <div className="text-lg font-black text-emerald-400">131 Unit</div>
            </div>
            <button 
              onClick={exportToExcel} 
              className="ml-4 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold rounded-xl transition-all cursor-pointer shadow"
            >
              📥 Export Excel
            </button>
          </div>
        </div>

        {/* FORMULIR PEMESANAN ALAT BERAT (SALES ORDER) */}
        <div className="bg-[#0b0e17] border border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-base font-bold text-white">Formulir Pemesanan Alat Berat (Sales Order)</h2>
            <p className="text-xs text-slate-400 mt-0.5">MASUKKAN DATA CUSTOMER, JADWAL, LOKASI PENGANTARAN, DAN PIC DENGAN LENGKAP</p>
          </div>

          <form onSubmit={handleTerbitkanOrder} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">NAMA CUSTOMER / PT / CV</label>
                <input 
                  type="text" 
                  value={formCustomer} 
                  onChange={(e) => setFormCustomer(e.target.value)} 
                  placeholder="Contoh: PT Prambanan Dwipaka" 
                  required
                  className="w-full px-4 py-2.5 bg-[#121824] border border-slate-700/80 rounded-xl text-xs text-slate-100 outline-none focus:border-amber-500" 
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">NAMA PROYEK</label>
                <input 
                  type="text" 
                  value={formProject} 
                  onChange={(e) => setFormProject(e.target.value)} 
                  placeholder="Contoh: Land Clearing" 
                  required
                  className="w-full px-4 py-2.5 bg-[#121824] border border-slate-700/80 rounded-xl text-xs text-slate-100 outline-none focus:border-amber-500" 
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">SKEMA KONTRAK / SEWA</label>
                <select 
                  value={formSkema} 
                  onChange={(e) => setFormSkema(e.target.value)} 
                  className="w-full px-4 py-2.5 bg-[#121824] border border-amber-500/60 rounded-xl text-xs font-bold text-amber-300 outline-none cursor-pointer"
                >
                  <option value="S1 (Sewa Bulanan / Operasional)">S1 (Sewa Bulanan / Operasional)</option>
                  <option value="S2 (Sewa Jam / HM)">S2 (Sewa Jam / HM)</option>
                  <option value="S3 (Borongan / Kerja Termin)">S3 (Borongan / Kerja Termin)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">TANGGAL PENGANTARAN</label>
                <input 
                  type="date" 
                  value={formTanggalPengantaran} 
                  onChange={(e) => setFormTanggalPengantaran(e.target.value)} 
                  className="w-full px-4 py-2.5 bg-[#121824] border border-slate-700/80 rounded-xl text-xs font-bold text-slate-100 outline-none" 
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">ESTIMASI WAKTU KERJA</label>
                <input 
                  type="text" 
                  value={formEstimasiKerja} 
                  onChange={(e) => setFormEstimasiKerja(e.target.value)} 
                  placeholder="Contoh: Minggu, 13 Sept" 
                  className="w-full px-4 py-2.5 bg-[#121824] border border-slate-700/80 rounded-xl text-xs text-slate-100 outline-none" 
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">SALES / VIA</label>
                <select 
                  value={formSales} 
                  onChange={(e) => setFormSales(e.target.value)} 
                  className="w-full px-4 py-2.5 bg-[#121824] border border-slate-700/80 rounded-xl text-xs font-bold text-amber-400 outline-none cursor-pointer"
                >
                  <option value="ANS">ANS</option>
                  <option value="UCI">UCI</option>
                  <option value="CDP">CDP</option>
                  <option value="FAN">FAN</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">POOL LOKASI AWAL UNIT</label>
                <input 
                  type="text" 
                  value={formPoolAwal} 
                  onChange={(e) => setFormPoolAwal(e.target.value)} 
                  placeholder="Contoh: Pool Delta Makassar" 
                  className="w-full px-4 py-2.5 bg-[#121824] border border-slate-700/80 rounded-xl text-xs text-slate-100 outline-none" 
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">LOKASI PENGANTARAN (LINK MAPS)</label>
                <input 
                  type="text" 
                  value={formLokasiPengantaran} 
                  onChange={(e) => setFormLokasiPengantaran(e.target.value)} 
                  placeholder="https://maps.app.goo.gl/..." 
                  className="w-full px-4 py-2.5 bg-[#121824] border border-slate-700/80 rounded-xl text-xs text-slate-100 outline-none font-mono" 
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">PIC PENERIMA ALAT</label>
                <input 
                  type="text" 
                  value={formPicPenerima} 
                  onChange={(e) => setFormPicPenerima(e.target.value)} 
                  placeholder="Contoh: Soni +62 811-3118-801" 
                  className="w-full px-4 py-2.5 bg-[#121824] border border-slate-700/80 rounded-xl text-xs text-slate-100 outline-none font-bold text-amber-300" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">JENIS ALAT & ATTACHMENT</label>
                <select 
                  value={formJenisAlat} 
                  onChange={(e) => setFormJenisAlat(e.target.value)} 
                  className="w-full px-4 py-2.5 bg-[#121824] border border-slate-700/80 rounded-xl text-xs font-bold text-teal-300 outline-none cursor-pointer"
                >
                  <option value="Excavator 20 Ton - Bucket">Excavator 20 Ton - Bucket</option>
                  <option value="Excavator 20 Ton - Breaker">Excavator 20 Ton - Breaker</option>
                  <option value="Excavator Mini">Excavator Mini</option>
                  <option value="Vibro Roller 10 Ton">Vibro Roller 10 Ton</option>
                  <option value="Medium Dozer">Medium Dozer</option>
                  <option value="Motor Grader">Motor Grader</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">JUMLAH UNIT</label>
                <input 
                  type="number" 
                  value={formJumlahUnit} 
                  onChange={(e) => setFormJumlahUnit(e.target.value)} 
                  className="w-full px-4 py-2.5 bg-[#121824] border border-slate-700/80 rounded-xl text-xs font-bold text-slate-100 outline-none" 
                />
              </div>
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Terbitkan Sales Order & Simpan ke Rekap →</span>
              </button>
            </div>
          </form>
        </div>

        {/* KONTROL LAPANGAN & INSTRUKSI LOGISTIK UNIT */}
        <div className="bg-[#0b0e17] border border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-base font-bold text-white">Kontrol Lapangan & Instruksi Logistik Unit</h2>
              <p className="text-xs text-slate-400">Pantau jadwal pengantaran, estimasi kerja, lokasi, dan alokasi unit secara real-time</p>
            </div>

            <div className="flex items-center gap-2 bg-[#121824] p-1.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold px-2">Filter Sales:</span>
              {['ALL', 'ANS', 'UCI', 'CDP', 'FAN'].map(s => (
                <button 
                  key={s} 
                  onClick={() => setFilterSalesKontrol(s)} 
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${filterSalesKontrol === s ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#121824]/80 text-[10px] font-bold text-slate-400 border-b border-slate-800">
                  <th className="py-3 px-3">NO. ORDER</th>
                  <th className="py-3 px-3">CUSTOMER & JADWAL KERJA</th>
                  <th className="py-3 px-3">LOKASI & PIC PENERIMA</th>
                  <th className="py-3 px-3">ALOKASI UNIT, OPERATOR & HM AWAL</th>
                  <th className="py-3 px-3">CATATAN LOGISTIK 🚚</th>
                  <th className="py-3 px-3">AKSI WA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {filteredOrderList.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-slate-500">Tidak ada data order untuk filter ini.</td>
                  </tr>
                ) : (
                  filteredOrderList.map(order => (
                    <tr key={order.id} className="hover:bg-[#121824]/40 transition-colors">
                      
                      {/* No Order */}
                      <td className="py-4 px-3 align-top font-mono font-black text-amber-400">
                        {order.soNumber}
                        <div className="text-[9px] text-slate-400 mt-1 font-sans">Skema: {order.skema}</div>
                      </td>

                      {/* Customer & Jadwal Kerja */}
                      <td className="py-4 px-3 align-top space-y-1">
                        <div className="font-bold text-white text-xs">{order.customer}</div>
                        <div className="text-slate-300 text-[11px]">Proyek: {order.project}</div>
                        <div className="text-[10px] text-teal-300 font-bold">📅 Tgl Kirim: {order.tanggalPengantaran}</div>
                        <div className="text-[10px] text-amber-300 font-mono">⏱️ Kerja: {order.estimasiKerja}</div>
                        <div className="inline-block mt-1 text-[9px] font-mono bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                          Sales: {order.sales}
                        </div>
                      </td>

                      {/* Lokasi & PIC Penerima */}
                      <td className="py-4 px-3 align-top space-y-2">
                        <div>
                          <label className="text-[9px] text-slate-400 block">Pool Awal:</label>
                          <input 
                            type="text" 
                            value={order.lokasiAwal} 
                            onChange={(e) => updateOrderField(order.id, 'lokasiAwal', e.target.value)} 
                            className="w-full text-xs px-2 py-1 bg-[#121824] border border-slate-700 text-slate-200 rounded font-mono" 
                          />
                        </div>
                        <div>
                          <label className="text-[9px] text-slate-400 block">Link Maps Tujuan:</label>
                          <input 
                            type="text" 
                            value={order.lokasiPengantaran} 
                            onChange={(e) => updateOrderField(order.id, 'lokasiPengantaran', e.target.value)} 
                            className="w-full text-xs px-2 py-1 bg-[#121824] border border-slate-700 text-blue-400 rounded font-mono truncate" 
                          />
                          {order.lokasiPengantaran && (
                            <a href={order.lokasiPengantaran} target="_blank" rel="noreferrer" className="text-[9px] text-amber-400 underline block mt-0.5">
                              🔗 Buka Google Maps
                            </a>
                          )}
                        </div>
                        <div>
                          <label className="text-[9px] text-slate-400 block">PIC Penerima:</label>
                          <input 
                            type="text" 
                            value={order.picPenerima} 
                            onChange={(e) => updateOrderField(order.id, 'picPenerima', e.target.value)} 
                            className="w-full text-xs font-bold px-2 py-1 bg-[#121824] border border-amber-500/50 text-amber-300 rounded" 
                          />
                        </div>
                      </td>

                      {/* Alokasi Unit, Operator & HM Awal */}
                      <td className="py-4 px-3 align-top space-y-2">
                        <select 
                          value={order.unitCode} 
                          onChange={(e) => updateOrderField(order.id, 'unitCode', e.target.value)}
                          className="w-full text-xs font-bold px-2 py-1.5 bg-[#121824] text-amber-300 border border-amber-500/60 rounded-lg outline-none cursor-pointer"
                        >
                          <option value="EXC.01">EXC.01 (Exca 20 Ton)</option>
                          <option value="EXC.02">EXC.02 (Exca 20 Ton)</option>
                          <option value="EXC.03">EXC.03 (Exca Mini)</option>
                          <option value="EXC.08">EXC.08 (Exca 20 Ton)</option>
                          <option value="VIB.01">VIB.01 (Vibro 10T)</option>
                          <option value="DOZ.01">DOZ.01 (Medium Dozer)</option>
                        </select>
                        <input 
                          type="text" 
                          value={order.operator} 
                          onChange={(e) => updateOrderField(order.id, 'operator', e.target.value)} 
                          placeholder="Nama Operator..." 
                          className="w-full text-xs px-2 py-1 bg-[#121824] border border-slate-700 text-slate-200 rounded-lg outline-none" 
                        />
                        <input 
                          type="text" 
                          value={order.hmAwal} 
                          onChange={(e) => updateOrderField(order.id, 'hmAwal', e.target.value)} 
                          placeholder="HM Awal & BBM..." 
                          className="w-full text-xs font-mono px-2 py-1 bg-[#121824] border border-slate-700 text-teal-300 rounded-lg outline-none" 
                        />
                      </td>

                      {/* Catatan Logistik */}
                      <td className="py-4 px-3 align-top space-y-2">
                        <textarea 
                          rows="2"
                          value={order.catatanLogistik} 
                          onChange={(e) => updateOrderField(order.id, 'catatanLogistik', e.target.value)} 
                          className="w-full text-xs p-2 bg-[#121824] border border-slate-700 text-slate-300 rounded-lg outline-none resize-none"
                        ></textarea>
                        <button 
                          onClick={() => sendWhatsApp(`Instruksi Logistik Delta Perkasa (${order.soNumber}) untuk ${order.customer}:\nTgl Kirim: ${order.tanggalPengantaran}\nEstimasi Kerja: ${order.estimasiKerja}\nLokasi: ${order.lokasiPengantaran}\nPIC: ${order.picPenerima}\nCatatan: ${order.catatanLogistik}`)}
                          className="w-full py-1.5 bg-purple-950/80 hover:bg-purple-900 border border-purple-600/60 text-purple-200 text-[10px] font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1"
                        >
                          <span>💬 Kirim ke Logistik WA</span>
                        </button>
                      </td>

                      {/* Aksi WA */}
                      <td className="py-4 px-3 align-top space-y-2">
                        <select 
                          value={order.statusOrder} 
                          onChange={(e) => updateOrderField(order.id, 'statusOrder', e.target.value)}
                          className="w-full text-xs font-bold px-2 py-1.5 bg-blue-950/80 text-blue-300 border border-blue-600/60 rounded-lg outline-none cursor-pointer"
                        >
                          <option value="Menunggu Alokasi">Menunggu Alokasi</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Working">Working</option>
                          <option value="Completed">Completed</option>
                        </select>

                        <button 
                          onClick={() => sendWhatsApp(`Update Sales Delta Perkasa (${order.soNumber}) - ${order.customer}:\nTanggal Kirim: ${order.tanggalPengantaran}\nKerja: ${order.estimasiKerja}\nLokasi: ${order.lokasiPengantaran}\nPIC: ${order.picPenerima}\nUnit: ${order.unitCode} (${order.operator})`)}
                          className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow transition-all cursor-pointer flex items-center justify-center gap-1"
                        >
                          <span>📱 Info Sales ({order.sales})</span>
                        </button>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* MONITORING KONDISI FISIK ARMADA */}
        <div className="bg-[#0b0e17] border border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-base font-bold text-white">Monitoring Kondisi Fisik Armada</h2>
              <p className="text-xs text-slate-400">Total 131 unit terdaftar. Kelola status real-time</p>
            </div>

            <input 
              type="text" 
              value={fleetSearchQuery} 
              onChange={(e) => setFleetSearchQuery(e.target.value)} 
              placeholder="Cari kode unit (cth: EXC.08)..." 
              className="px-4 py-2 bg-[#121824] border border-slate-700/80 rounded-xl text-xs text-slate-100 outline-none w-full md:w-64" 
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {uniqueClasses.map(cls => (
              <button 
                key={cls}
                onClick={() => setSelectedFleetFilter(cls)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedFleetFilter === cls ? 'bg-amber-500 text-slate-950 shadow' : 'bg-[#121824] text-slate-300 border border-slate-800 hover:bg-slate-800'}`}
              >
                {cls === 'ALL' ? 'Semua Kelas' : cls}
              </button>
            ))}
          </div>

          <div className="bg-[#121824]/60 border border-slate-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#121824] text-[10px] font-bold text-slate-400 border-b border-slate-800">
                  <th className="py-3 px-4 w-16">NO</th>
                  <th className="py-3 px-4">KODE UNIT</th>
                  <th className="py-3 px-4">KELAS / JENIS</th>
                  <th className="py-3 px-4">STATUS FISIK REAL-TIME</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {filteredFleet.map((fleet, index) => {
                  const status = fleetStatus[fleet.code] || 'Ready';
                  return (
                    <tr key={fleet.code} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-4 font-mono text-slate-400">{index + 1}</td>
                      <td className="py-3 px-4 font-mono font-black text-white">{fleet.code}</td>
                      <td className="py-3 px-4 font-bold text-amber-400">{fleet.class}</td>
                      <td className="py-3 px-4">
                        <select 
                          value={status} 
                          onChange={(e) => setFleetStatus({ ...fleetStatus, [fleet.code]: e.target.value })}
                          className={`text-xs font-bold px-3 py-1.5 rounded-xl border outline-none cursor-pointer ${status === 'Ready' ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600/60' : status === 'Working' ? 'bg-blue-950/80 text-blue-300 border-blue-600/60' : 'bg-red-950/80 text-red-300 border-red-600/60'}`}
                        >
                          <option value="Ready">🟢 Ready</option>
                          <option value="Working">🔵 Working</option>
                          <option value="Breakdown">🔴 Breakdown</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* PANEL PENGIRIMAN & VERIFIKASI LAPANGAN LOGISTIK */}
        <div className="bg-[#0b0e17] border border-purple-900/40 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-amber-500"></div>
          
          <div className="mb-6">
            <span className="text-[9px] font-bold bg-purple-950 text-purple-300 border border-purple-700/60 px-2.5 py-0.5 rounded-full uppercase tracking-widest">
              DASHBOARD KHUSUS DRIVER & ANGKUTAN TRONTON (SL.01, SL.02, TW.01)
            </span>
            <h2 className="text-base font-bold text-white mt-1">Panel Pengiriman & Verifikasi Lapangan Logistik</h2>
            <p className="text-xs text-slate-400">Atur rute, tanggal kirim, PIC, dan verifikasi foto muat/tiba di lokasi tujuan</p>
          </div>

          <div className="space-y-6">
            {orderList.map(order => (
              <div key={order.id} className="bg-[#121824] border border-slate-800 rounded-2xl p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
                
                <div className="space-y-1">
                  <div className="text-[10px] text-slate-400 font-bold">NO. ORDER & JADWAL</div>
                  <div className="text-base font-mono font-black text-amber-400">{order.soNumber}</div>
                  <div className="text-[11px] text-white font-bold">{order.customer}</div>
                  <div className="text-[10px] text-teal-300">Tgl: {order.tanggalPengantaran}</div>
                  <div className="text-[10px] text-amber-300">Kerja: {order.estimasiKerja}</div>
                </div>

                <div className="space-y-2">
                  <div className="text-[10px] text-slate-400 font-bold">UNIT & TRONTON</div>
                  <div className="text-xs text-teal-300 font-bold">Alat: {order.unitCode}</div>
                  <div className="text-[11px] font-mono text-slate-200">HM/BBM: {order.hmAwal}</div>
                  <div>
                    <select 
                      value={order.trontonUnit} 
                      onChange={(e) => updateOrderField(order.id, 'trontonUnit', e.target.value)}
                      className="w-full text-xs font-bold px-2 py-1 bg-[#0b0e17] text-purple-300 border border-purple-600/50 rounded-lg outline-none cursor-pointer"
                    >
                      {trontonFleet.map(t => (
                        <option key={t.code} value={t.code}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[10px] text-slate-400 font-bold">LOKASI & PIC PENERIMA</div>
                  <div>
                    <label className="text-[9px] text-slate-400 block">Pool Awal:</label>
                    <input 
                      type="text" 
                      value={order.lokasiAwal} 
                      onChange={(e) => updateOrderField(order.id, 'lokasiAwal', e.target.value)} 
                      className="w-full text-xs px-2 py-1 bg-[#0b0e17] border border-slate-700 text-slate-200 rounded font-mono" 
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-slate-400 block">Lokasi Tujuan (Maps):</label>
                    <input 
                      type="text" 
                      value={order.lokasiPengantaran} 
                      onChange={(e) => updateOrderField(order.id, 'lokasiPengantaran', e.target.value)} 
                      className="w-full text-xs px-2 py-1 bg-[#0b0e17] border border-slate-700 text-blue-400 rounded font-mono truncate" 
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-slate-400 block">PIC Penerima:</label>
                    <input 
                      type="text" 
                      value={order.picPenerima} 
                      onChange={(e) => updateOrderField(order.id, 'picPenerima', e.target.value)} 
                      className="w-full text-xs font-bold px-2 py-1 bg-[#0b0e17] border border-amber-500/60 text-amber-300 rounded" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 md:col-span-1">
                  <div className="bg-[#0b0e17] p-2 rounded-xl border border-slate-800 text-center space-y-1">
                    <div className="text-[9px] font-bold text-slate-400">📸 FOTO MUAT</div>
                    {order.fotoMuatUrl ? (
                      <div className="space-y-1">
                        <img src={order.fotoMuatUrl} alt="Muat" className="w-full h-16 object-cover rounded border border-slate-700" />
                        <div className="text-[9px] text-emerald-400 font-mono">{order.timestampMuat}</div>
                      </div>
                    ) : (
                      <button 
                        onClick={() => triggerCameraLogistik(order.id, 'muat')}
                        className="w-full py-2 bg-purple-900/60 hover:bg-purple-800 text-purple-200 text-[10px] font-bold rounded transition-all cursor-pointer"
                      >
                        Ambil Foto
                      </button>
                    )}
                  </div>

                  <div className="bg-[#0b0e17] p-2 rounded-xl border border-slate-800 text-center space-y-1">
                    <div className="text-[9px] font-bold text-slate-400">📸 FOTO TIBA</div>
                    {order.fotoTibaUrl ? (
                      <div className="space-y-1">
                        <img src={order.fotoTibaUrl} alt="Tiba" className="w-full h-16 object-cover rounded border border-slate-700" />
                        <div className="text-[9px] text-emerald-400 font-mono">{order.timestampTiba}</div>
                      </div>
                    ) : (
                      <button 
                        onClick={() => triggerCameraLogistik(order.id, 'tiba')}
                        className="w-full py-2 bg-purple-900/60 hover:bg-purple-800 text-purple-200 text-[10px] font-bold rounded transition-all cursor-pointer"
                      >
                        Ambil Foto
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[10px] text-slate-400 font-bold">STATUS & LAPORAN WA</div>
                  <select 
                    value={order.statusLogistik} 
                    onChange={(e) => updateOrderField(order.id, 'statusLogistik', e.target.value)}
                    className="w-full text-xs font-bold px-2 py-2 bg-[#0b0e17] text-purple-300 border border-purple-600/60 rounded-xl outline-none cursor-pointer"
                  >
                    <option value="Menunggu Jadwal Muat">⏳ Menunggu Jadwal</option>
                    <option value="OTW ke Proyek">🚚 OTW ke Proyek</option>
                    <option value="Tiba di Lokasi Proyek">✅ Tiba di Lokasi</option>
                  </select>

                  <button 
                    onClick={() => sendWhatsApp(`Update Logistik Tronton (${order.trontonUnit}) untuk Sales (${order.sales}): Order ${order.soNumber} (${order.customer})\nTgl Kirim: ${order.tanggalPengantaran}\nKerja: ${order.estimasiKerja}\nLokasi: ${order.lokasiPengantaran}\nPIC: ${order.picPenerima}\nStatus: ${order.statusLogistik}`)}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow transition-all cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>💬 Kirim Laporan ke WA Sales</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center text-xs text-slate-500 pt-4 pb-8 space-y-1">
          <div>CV Chandra Delta Perkasa • Pusat Rental Alat Berat Makassar & Sulawesi</div>
          <div className="font-mono">Hotline: 0851-6565-9907</div>
        </div>

      </div>
    </div>
  );
}
