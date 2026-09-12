import React, { useState, useRef } from "react";

export default function SalesOrder() {
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

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-white bg-slate-950 min-h-screen">
      {notification.show && (
        <div className="bg-emerald-900 border border-emerald-500 text-emerald-200 p-4 rounded-xl shadow-lg">
          {notification.message}
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-black mb-4 text-blue-400">Form Pembuatan Sales Order</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">Nama Customer</label>
            <input 
              type="text" 
              name="customer" 
              value={formData.customer} 
              onChange={handleChange} 
              required
              placeholder="PT / CV Customer"
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Nama Proyek</label>
              <input 
                type="text" 
                name="namaProyek" 
                value={formData.namaProyek} 
                onChange={handleChange} 
                required
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Lokasi</label>
              <input 
                type="text" 
                name="lokasi" 
                value={formData.lokasi} 
                onChange={handleChange} 
                required
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm"
              />
            </div>
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-black text-sm transition-all shadow-lg">
            Terbitkan Sales Order
          </button>
        </form>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <h3 className="font-black text-lg mb-4 text-slate-200">Daftar Order Aktif</h3>
        <div className="space-y-3">
          {orderList.map(order => (
            <div key={order.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center">
              <div>
                <span className="text-blue-400 font-bold">{order.id}</span> - <span className="font-semibold">{order.customer}</span> ({order.namaProyek})
                <div className="text-xs text-slate-400 mt-1">Alat: {order.jenisAlat} | Status: {order.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
