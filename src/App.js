import React, { useState } from 'react';

export default function SalesOrderForm({ onSubmitOrder, fleetList }) {
  // State untuk form input Sales Order
  const [customerName, setCustomerName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  
  // TAMBAHAN BARU: Lokasi Pengantaran & PIC Penerima
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [picReceiver, setPicReceiver] = useState('');

  const [salesVia, setSalesVia] = useState('ANS');
  const [contractSchema, setContractSchema] = useState('S1');
  const [estimatedAmount, setEstimatedAmount] = useState('8');
  const [unitType, setUnitType] = useState('Excavator 20 Ton - Bucket');
  const [unitCount, setUnitCount] = useState('1');
  const [unitSatuan, setUnitSatuan] = useState('Jam');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !projectLocation || !deliveryLocation || !picReceiver) {
      alert('Mohon lengkapi Nama Customer, Lokasi Proyek, Lokasi Pengantaran, dan PIC Penerima!');
      return;
    }

    // Objek data order baru yang dikirim ke rekap/tabel utama
    const newOrder = {
      id: 'SO-' + Date.now().toString().slice(-4),
      customer: customerName,
      proyek: projectName,
      lokasiProyek: projectLocation,
      lokasiPengantaran: deliveryLocation, // Disimpan untuk logistik/pengantaran
      picPenerima: picReceiver,             // Disimpan untuk koordinasi di lapangan
      sales: salesVia,
      skema: contractSchema,
      estimasi: estimatedAmount,
      satuan: unitSatuan,
      alat: unitType,
      jumlahUnit: unitCount,
      status: 'Menunggu Alokasi Unit',
      timestamp: new Date().toLocaleString('id-ID')
    };

    if (onSubmitOrder) {
      onSubmitOrder(newOrder);
    }

    // Reset Form setelah submit
    setCustomerName('');
    setProjectName('');
    setProjectLocation('');
    setDeliveryLocation('');
    setPicReceiver('');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl mb-8">
      <div className="mb-6">
        <h2 className="text-xl font-black text-white">Formulir Pemesanan Alat Berat (Sales Order)</h2>
        <p className="text-xs text-slate-400">MASUKKAN DATA PROYEK, LOKASI PENGANTARAN, DAN SKEMA SEWA DENGAN LENGKAP</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* BARIS 1: NAMA CUSTOMER */}
        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Nama Customer / PT / CV
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Contoh: PT Mahligai Artha Sejahtera"
            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 outline-none focus:border-blue-600 transition-all"
          />
        </div>

        {/* BARIS 2: NAMA PROYEK & LOKASI PROYEK TUJUAN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Nama Proyek
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Contoh: Land Clearing"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 outline-none focus:border-blue-600 transition-all"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Lokasi Proyek Tujuan
            </label>
            <input
              type="text"
              value={projectLocation}
              onChange={(e) => setProjectLocation(e.target.value)}
              placeholder="Contoh: Makassar / Gowa"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 outline-none focus:border-blue-600 transition-all"
            />
          </div>
        </div>

        {/* BARIS TAMBAHAN: LOKASI PENGANTARAN & PIC PENERIMA (SESUAI PERMINTAAN) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-950/60 border border-purple-900/30 rounded-2xl">
          <div>
            <label className="block text-[11px] font-bold text-purple-300 uppercase tracking-wider mb-1">
              📍 Lokasi Pengantaran / Alamat Drop Unit
            </label>
            <input
              type="text"
              value={deliveryLocation}
              onChange={(e) => setDeliveryLocation(e.target.value)}
              placeholder="Contoh: Jl. Poros Malino Km. 7 (Depan SPBU)"
              className="w-full px-4 py-2.5 bg-slate-950 border border-purple-800/60 rounded-xl text-sm text-white placeholder-slate-600 outline-none focus:border-purple-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-purple-300 uppercase tracking-wider mb-1">
              👤 Nama PIC & No HP Penerima di Lokasi
            </label>
            <input
              type="text"
              value={picReceiver}
              onChange={(e) => setPicReceiver(e.target.value)}
              placeholder="Contoh: Pak Budi (081234567890)"
              className="w-full px-4 py-2.5 bg-slate-950 border border-purple-800/60 rounded-xl text-sm text-white placeholder-slate-600 outline-none focus:border-purple-500 transition-all"
            />
          </div>
        </div>

        {/* BARIS 3: SALES / VIA, SKEMA KONTRAK, ESTIMASI JUMLAH, SATUAN */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Sales / Via
            </label>
            <select
              value={salesVia}
              onChange={(e) => setSalesVia(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white outline-none focus:border-blue-600 cursor-pointer"
            >
              <option value="ANS">ANS</option>
              <option value="TEAM SALES">TEAM SALES</option>
              <option value="DIRECT">DIRECT</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1">
              Skema Kontrak
            </label>
            <select
              value={contractSchema}
              onChange={(e) => setContractSchema(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-950 border border-amber-600/50 rounded-xl text-sm text-amber-200 font-bold outline-none cursor-pointer"
            >
              <option value="S1">S1 (Bulanan)</option>
              <option value="S2">S2 (Jam / HM)</option>
              <option value="S3">S3 (Borongan)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Estimasi Jumlah
            </label>
            <input
              type="number"
              value={estimatedAmount}
              onChange={(e) => setEstimatedAmount(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Satuan Rencana
            </label>
            <select
              value={unitSatuan}
              onChange={(e) => setUnitSatuan(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white outline-none cursor-pointer"
            >
              <option value="Jam">Jam</option>
              <option value="Bulan">Bulan</option>
              <option value="Hari">Hari</option>
            </select>
          </div>
        </div>

        {/* BARIS 4: JENIS ALAT & JUMLAH UNIT */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Jenis Alat & Attachment
            </label>
            <select
              value={unitType}
              onChange={(e) => setUnitType(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white outline-none cursor-pointer"
            >
              <option value="Excavator 20 Ton - Bucket">Excavator 20 Ton - Bucket</option>
              <option value="Excavator 20 Ton - Breaker">Excavator 20 Ton - Breaker</option>
              <option value="Excavator Mini - Bucket">Excavator Mini - Bucket</option>
              <option value="Vibro Roller">Vibro Roller</option>
              <option value="Bulldozer">Bulldozer</option>
              <option value="Motor Grader">Motor Grader</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Jumlah Unit
            </label>
            <input
              type="number"
              min="1"
              value={unitCount}
              onChange={(e) => setUnitCount(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white outline-none"
            />
          </div>
        </div>

        {/* TOMBOL SUBMIT */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm rounded-2xl shadow-lg shadow-blue-900/30 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Terbitkan Sales Order & Simpan ke Rekap</span>
            <span>→</span>
          </button>
        </div>
      </form>
    </div>
  );
}
