import React, { useState, useRef, useEffect, useMemo } from 'react';

const STORAGE_KEY = 'delta-perkasa-board-v3';

/* Warna dan tipografi identitas CV Chandra Delta Perkasa */
const BRAND = {
  red: '#C1272D',
  redDark: '#9E1F24',
  navy: '#132A4E',
  navyDeep: '#0C1D38',
  sand: '#F5F1E8'
};

/* Logo asli perusahaan, disematkan sebagai data URI agar tidak bergantung pada file eksternal */
const LOGO_DATA_URI =
  'data:image/jpeg;base64,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';

/* Wordmark khas: DELTA (navy, tegas) dengan aksen segitiga merah dari logo */
function DeltaWordmark({ tone = 'light' }) {
  const isLight = tone === 'light';
  return (
    <div className="flex items-center gap-3">
      <img src={LOGO_DATA_URI} alt="Logo Delta Perkasa" className="h-11 w-auto rounded-[6px] shadow-[0_2px_10px_rgba(0,0,0,0.25)]" />
      <div className="leading-tight">
        <div className={`font-['Space_Grotesk'] font-bold text-lg tracking-tight ${isLight ? 'text-white' : 'text-[#132A4E]'}`}>
          DELTA <span style={{ color: BRAND.red }}>PERKASA</span>
        </div>
        <div className={`text-[10.5px] tracking-wide ${isLight ? 'text-white/60' : 'text-stone-500'}`}>
          CV Chandra Delta Perkasa
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * ALUR KERJA
 * 1. Sales        : buat order + catatan untuk kepala operator
 * 2. Kepala Op.   : Job ID, pilih nomor unit, posisi unit sekarang,
 *                   lokasi turun, HM awal + fotonya, status armada,
 *                   lalu kabari logistik dan grup
 * 3. Lapangan     : tronton + sopir, titik maps muat & tiba,
 *                   foto muat & tiba, kabari grup
 * 4. Timesheet    : rekap jam kerja harian (Job ID diambil dari order)
 * ------------------------------------------------------------------ */

const TAHAP = {
  baru: { label: 'Menunggu kepala operator', dot: 'bg-amber-500', chip: 'bg-amber-50 text-amber-800 border-amber-200' },
  siap: { label: 'Siap digeser', dot: 'bg-sky-500', chip: 'bg-sky-50 text-sky-800 border-sky-200' },
  lapangan: { label: 'Unit di lokasi', dot: 'bg-emerald-600', chip: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  selesai: { label: 'Selesai', dot: 'bg-stone-400', chip: 'bg-stone-100 text-stone-600 border-stone-200' }
};

const DEFAULT_ORDERS = [];

const DEFAULT_TIMESHEETS = [];

const DEFAULT_FLEET_STATUS = { 'EXC.08': 'Working', 'EXC.01': 'Ready', 'MG-1': 'Breakdown' };

/* Palet status armada: Ready (hijau), Working (biru), Standby (kuning), Breakdown (merah) */
const FLEET_STATUSES = ['Ready', 'Working', 'Standby', 'Breakdown'];
const FLEET_STATUS_STYLE = {
  Ready: { card: 'border-emerald-200 bg-emerald-50', dot: 'bg-emerald-500', text: 'text-emerald-800' },
  Working: { card: 'border-sky-200 bg-sky-50', dot: 'bg-sky-500', text: 'text-sky-800' },
  Standby: { card: 'border-amber-200 bg-amber-50', dot: 'bg-amber-500', text: 'text-amber-800' },
  Breakdown: { card: 'border-rose-200 bg-rose-50', dot: 'bg-rose-500', text: 'text-rose-800' }
};

let idCounter = 0;
const generateId = prefix => {
  idCounter += 1;
  return `${prefix}-${Date.now().toString(36).toUpperCase().slice(-5)}${idCounter}`;
};

const pad = n => String(n).padStart(2, '0');

const suggestJobId = o => {
  const d = new Date();
  return `${pad(d.getDate())}${pad(d.getMonth() + 1)}-${pad(d.getHours())}${pad(d.getMinutes())}-${o.sales}-${o.jenisSewa}`;
};

const mapsLink = koor =>
  koor && koor !== '-' ? `https://www.google.com/maps?q=${encodeURIComponent(koor)}` : '';

const waktuSekarang = () =>
  new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });

/* Membubuhkan cap waktu, lokasi, dan label langsung ke piksel foto — bukan
   sekadar metadata terpisah — supaya bukti tidak bisa diganti tanpa merusak
   capnya sendiri. */
function watermarkFoto(file, lines) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objUrl = URL.createObjectURL(file);
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const barH = Math.round(canvas.height * 0.17);
        ctx.fillStyle = 'rgba(12, 29, 56, 0.72)';
        ctx.fillRect(0, canvas.height - barH, canvas.width, barH);

        const fontSize = Math.max(16, Math.round(canvas.width * 0.032));
        ctx.fillStyle = '#ffffff';
        ctx.textBaseline = 'top';
        let y = canvas.height - barH + fontSize * 0.35;
        lines.forEach((line, i) => {
          ctx.font = `${i === 0 ? 700 : 500} ${fontSize}px Arial, sans-serif`;
          ctx.fillText(line, fontSize * 0.7, y);
          y += fontSize * 1.3;
        });

        URL.revokeObjectURL(objUrl);
        canvas.toBlob(blob => (blob ? resolve(blob) : reject(new Error('Gagal membuat foto bercap'))), 'image/jpeg', 0.9);
      } catch (err) {
        URL.revokeObjectURL(objUrl);
        reject(err);
      }
    };
    img.onerror = () => { URL.revokeObjectURL(objUrl); reject(new Error('Gagal memuat foto')); };
    img.src = objUrl;
  });
}

/* ---------------------------- UI kecil ---------------------------- */

const inputClass =
  'w-full px-3 py-2.5 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 placeholder-stone-400 outline-none focus:border-[#132A4E] focus:ring-2 focus:ring-[#132A4E]/10 transition';

function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="block text-[13px] font-semibold text-stone-700 mb-1.5">{label}</span>
      {children}
      {hint && <span className="block text-[11px] text-stone-500 mt-1">{hint}</span>}
    </label>
  );
}

const Card = ({ children, className = '' }) => (
  <div className={`bg-white border border-stone-200 rounded-2xl ${className}`}>{children}</div>
);

function Chip({ tahap }) {
  const m = TAHAP[tahap] || TAHAP.baru;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold ${m.chip}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />{m.label}
    </span>
  );
}

const Empty = ({ children }) => (
  <div className="border border-dashed border-stone-300 rounded-2xl py-10 px-6 text-center text-sm text-stone-500 bg-stone-50/60">
    {children}
  </div>
);

const Btn = ({ kind = 'ghost', className = '', style, ...rest }) => {
  const base = 'text-sm font-semibold rounded-lg transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed';
  const kinds = {
    solid: 'px-5 py-2.5 text-white hover:brightness-110',
    accent: 'px-5 py-2.5 text-white hover:brightness-110',
    ghost: 'px-4 py-2.5 border border-stone-300 bg-white hover:bg-stone-50 text-stone-800',
    small: 'px-3 py-1.5 text-[12px] border border-stone-300 bg-white hover:bg-stone-50 text-stone-800'
  };
  const inline = kind === 'solid' ? { backgroundColor: BRAND.navy, ...style }
    : kind === 'accent' ? { backgroundColor: BRAND.red, ...style }
    : style;
  return <button {...rest} style={inline} className={`${base} ${kinds[kind]} ${className}`} />;
};

/* Kotak foto + kamera. Foto dibubuhi cap waktu & lokasi langsung ke piksel gambar
   (watermark), jadi bukti tidak bisa diganti tanpa merusak capnya. */
function FotoBox({ label, url, waktu, koor, onCapture, onShare, note }) {
  return (
    <div className="border border-stone-200 rounded-xl p-3 flex gap-3">
      {url ? (
        <img src={url} alt={label} className="w-16 h-16 object-cover rounded-lg border border-stone-200 shrink-0" />
      ) : (
        <div className="w-16 h-16 rounded-lg bg-stone-100 border border-dashed border-stone-300 shrink-0" />
      )}
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-semibold">{label}</div>
        <div className="text-[11px] text-stone-500 truncate">
          {waktu && waktu !== '-' ? waktu : (note || 'Belum diambil')}
        </div>
        {koor && koor !== '-' && (
          <a href={mapsLink(koor)} target="_blank" rel="noreferrer"
            className="text-[11px] text-sky-700 underline break-all">{koor}</a>
        )}
        {(onCapture || onShare) && (
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {onCapture && <Btn kind="small" type="button" onClick={onCapture}>{url ? 'Ambil ulang' : 'Ambil foto'}</Btn>}
            {onShare && url && (
              <Btn kind="small" type="button" onClick={onShare} className="text-[#132A4E] border-[#132A4E]/30">Kirim foto ke WhatsApp</Btn>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================================================================== */

export default function DashboardDeltaPerkasa() {
  const [tab, setTab] = useState('sales');

  const [orderList, setOrderList] = useState(DEFAULT_ORDERS);
  const [timesheetList, setTimesheetList] = useState(DEFAULT_TIMESHEETS);
  const [fleetStatus, setFleetStatus] = useState(DEFAULT_FLEET_STATUS);

  const [isLoaded, setIsLoaded] = useState(false);
  const [saveState, setSaveState] = useState('idle');
  const [toast, setToast] = useState(null);

  const fileInputRef = useRef(null);
  const captureRef = useRef({ orderId: null, jenis: null });
  const fotoBlobRef = useRef({});

  /* Nomor WhatsApp — ganti dengan nomor asli sebelum dipakai di lapangan.
     Grup tidak punya nomor, jadi tombol grup membuka daftar chat agar
     pengirim memilih sendiri grup tujuan. */
  const salesPhoneBook = { ANS: '6285165659907', UCI: '6281234567891', CDP: '6285165659907', FAN: '6281234567893' };
  const logisticsPhone = '6285165659907';

  const trontonFleet = ['SL01', 'SL02', 'SL03', 'TW02'];

  const operatorDatabase = ['BUSTAM', 'ABDUL RAHIM SAPUTRA', 'BAHARUDDIN', 'SAHARUDDIN', 'RUSTAM', 'AMIR',
    'YUSUF', 'ARIS', 'HERMAN', 'DG. SILA', 'RAHMAT', 'SUPRIADI'];

  const fleetDatabase = useMemo(() => {
    const mk = (p, nums, kelas) => nums.map(n => ({ code: `${p}${n}`, class: kelas }));
    return [
      ...mk('EXC.', ['01', '03', '04', '05', '06', '07', '08', '09', '11', '12', '14', '15', '16', '17', '18', '19'], 'Excavator 20 Ton'),
      ...mk('EXC.', ['20', '21', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39'], 'Excavator Mini'),
      ...mk('EXC.', ['40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'], 'Excavator 20 Ton'),
      ...mk('EXC.', ['60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77'], 'Excavator Mini'),
      ...mk('EXC.', ['80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98'], 'Excavator 20 Ton'),
      ...mk('EXC.', ['201', '202', '203', '204', '205', '206', '207', '208', '209', '210', '211', '212', '213', '214', '215'], 'Excavator 20 Ton'),
      ...mk('EXC.', ['301', '302', '303', '304', '305', '306', '307', '308', '309'], 'Excavator 30 Ton'),
      ...mk('MG-', ['1', '2', '3', '4', '5'], 'Motor Grader'),
      { code: 'MC.01', class: 'Mobile Crane' },
      ...mk('D.', ['02', '03'], 'Medium Dozer'),
      ...mk('VBR.', ['01', '04', '05', '06', '07', '08', '09'], 'Vibro 10 Ton'),
      { code: 'VBR.TW.02', class: 'Vibro 10 Ton' }
    ];
  }, []);

  const showToast = (message, tone = 'ok') => {
    setToast({ message, tone });
    setTimeout(() => setToast(null), 3500);
  };

  /* --------------------------- persistensi --------------------------- */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await window.storage.get(STORAGE_KEY, true);
        if (!cancelled && res && res.value) {
          const p = JSON.parse(res.value);
          if (Array.isArray(p.orderList)) {
            setOrderList(p.orderList.map(o => ({ ...o, fotoMuatUrl: null, fotoTibaUrl: null, fotoHmAwalUrl: null })));
          }
          if (Array.isArray(p.timesheetList)) setTimesheetList(p.timesheetList);
          if (p.fleetStatus) setFleetStatus(p.fleetStatus);
        }
      } catch (err) {
        console.warn('Belum ada data tersimpan, memakai data awal.', err);
      } finally {
        if (!cancelled) setIsLoaded(true);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    setSaveState('saving');
    const t = setTimeout(async () => {
      try {
        const payload = JSON.stringify({
          orderList: orderList.map(({ fotoMuatUrl, fotoTibaUrl, fotoHmAwalUrl, ...rest }) => rest),
          timesheetList, fleetStatus
        });
        const res = await window.storage.set(STORAGE_KEY, payload, true);
        setSaveState(res ? 'saved' : 'error');
      } catch (err) {
        console.error(err);
        setSaveState('error');
      }
    }, 600);
    return () => clearTimeout(t);
  }, [orderList, timesheetList, fleetStatus, isLoaded]);

  const patchOrder = (id, patch) => setOrderList(prev => prev.map(o => (o.id === id ? { ...o, ...patch } : o)));

  /* ------------------------------ GPS ------------------------------- */
  const ambilKoordinat = (id, field, labelToast) => {
    if (!navigator.geolocation) return showToast('Perangkat ini tidak mendukung GPS.', 'info');
    showToast('Membaca lokasi…', 'info');
    navigator.geolocation.getCurrentPosition(
      pos => {
        patchOrder(id, { [field]: `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}` });
        showToast(`${labelToast} tersimpan.`);
      },
      () => showToast('Lokasi tidak terbaca. Izinkan akses lokasi di browser.', 'info')
    );
  };

  /* ----------------------------- kamera ----------------------------- */
  const triggerCamera = (orderId, jenis) => {
    captureRef.current = { orderId, jenis };
    fileInputRef.current?.click();
  };

  const handleFileCaptured = e => {
    const file = e.target.files[0];
    if (!file) return;
    const { orderId, jenis } = captureRef.current;
    const waktu = waktuSekarang();
    const orderNow = orderList.find(o => o.id === orderId);
    const labelBaris = jenis === 'hmawal' ? 'FOTO HM AWAL' : jenis === 'muat' ? 'FOTO MUAT UNIT' : 'FOTO UNIT TIBA';

    const simpanFoto = async koor => {
      const lines = [
        `${labelBaris} · ${orderNow?.jobId || orderId}`,
        `Unit ${orderNow?.kodeUnit || '-'} · ${waktu}`,
        koor && koor !== '-' ? `Lokasi: ${koor}` : 'Lokasi: tidak terbaca'
      ];
      let blob;
      try {
        blob = await watermarkFoto(file, lines);
      } catch (err) {
        console.error('Gagal membubuhkan cap pada foto, memakai foto asli.', err);
        blob = file;
      }
      const url = URL.createObjectURL(blob);
      fotoBlobRef.current[`${orderId}-${jenis}`] = blob;

      if (jenis === 'hmawal') patchOrder(orderId, { fotoHmAwalUrl: url, timestampHmAwal: waktu });
      else if (jenis === 'muat') patchOrder(orderId, { fotoMuatUrl: url, timestampMuat: waktu, koordinatMuat: koor });
      else patchOrder(orderId, { fotoTibaUrl: url, timestampTiba: waktu, koordinatTiba: koor });
    };

    if (jenis === 'hmawal') {
      simpanFoto('-');
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => simpanFoto(`${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`),
        () => simpanFoto('-')
      );
    } else {
      simpanFoto('-');
    }
    e.target.value = null;
  };

  /* Kirim foto (yang sudah bercap) langsung sebagai lampiran WhatsApp lewat
     kotak berbagi bawaan HP. Ini satu-satunya cara foto benar-benar ikut
     terkirim, bukan cuma teks — tautan wa.me sendiri tidak bisa membawa
     lampiran. Kalau HP/browser tidak mendukung fitur ini, foto diunduh
     dan WhatsApp dibuka dengan teksnya, tinggal dilampirkan manual. */
  const shareFotoWhatsApp = async (order, jenis) => {
    const blob = fotoBlobRef.current[`${order.id}-${jenis}`];
    if (!blob) return showToast('Ambil fotonya dulu sebelum dikirim.', 'info');

    const namaLabel = { hmawal: 'HM awal', muat: 'muat', tiba: 'tiba' }[jenis];
    const namaFile = `foto-${jenis}-${(order.jobId || order.id).replace(/[^a-zA-Z0-9-]/g, '')}.jpg`;
    const caption = `Foto ${namaLabel} — ${order.jobId || order.id} — unit ${order.kodeUnit || '-'} — ${order.customer}`;
    const file = new File([blob], namaFile, { type: 'image/jpeg' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], text: caption });
        return;
      } catch (err) {
        if (err && err.name === 'AbortError') return;
        console.error('Gagal membagikan foto, memakai cara unduh manual.', err);
      }
    }

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = namaFile;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('HP ini belum mendukung kirim foto langsung. Foto sudah diunduh — lampirkan manual di WhatsApp yang baru dibuka.', 'info');
    openWa('', caption);
  };

  /* ---------------------------- WhatsApp ---------------------------- */
  const openWa = (phone, message) =>
    window.open(`https://wa.me/${phone || ''}?text=${encodeURIComponent(message)}`, '_blank');

  const teksInstruksiGeser = o =>
    `*GESER UNIT — ${o.jobId || o.id}*\n` +
    `Nomor unit: *${o.kodeUnit}*\n` +
    `Operator: ${o.namaOperator}\n` +
    `Customer: ${o.customer} (${o.namaProyek})\n` +
    `Alat: ${o.jenisAlat}, ${o.jumlahUnit} unit\n\n` +
    `Posisi unit sekarang: ${o.posisiUnitSekarang || '-'}\n` +
    (mapsLink(o.koordinatUnitSekarang) ? `${mapsLink(o.koordinatUnitSekarang)}\n` : '') +
    `Lokasi turun: ${o.lokasiTurun || '-'}\n` +
    (mapsLink(o.koordinatTurun) ? `${mapsLink(o.koordinatTurun)}\n` : '') +
    `PIC penerima: ${o.picPenerima}\n` +
    `HM awal: ${o.hmAwal || '-'}\n\n` +
    `Catatan sales: ${o.catatanSales || '-'}\n` +
    `Catatan kepala operator: ${o.catatanOperator || '-'}`;

  const waKeLogistik = o => openWa(logisticsPhone, teksInstruksiGeser(o));
  const waKeGrup = o => openWa('', teksInstruksiGeser(o));

  const teksUpdateLapangan = o =>
    `*UPDATE LAPANGAN — ${o.jobId || o.id}*\n` +
    `Unit *${o.kodeUnit}* | operator ${o.namaOperator}\n` +
    `Tronton ${o.trontonUnit}${o.sopirTronton ? ` (sopir ${o.sopirTronton})` : ''}\n` +
    `Customer: ${o.customer} — ${o.namaProyek}\n` +
    `Status: ${o.statusLogistik}\n\n` +
    `Muat: ${o.timestampMuat}\n` + (mapsLink(o.koordinatMuat) ? `${mapsLink(o.koordinatMuat)}\n` : '') +
    `Tiba: ${o.timestampTiba}\n` + (mapsLink(o.koordinatTiba) ? `${mapsLink(o.koordinatTiba)}\n` : '') +
    (o.catatanAktual ? `\nCatatan: ${o.catatanAktual}` : '') +
    `\n\nFoto muat dan foto tiba disertakan bila didukung perangkat, atau kirim manual lewat tombol "Kirim foto ke WhatsApp".`;

  /* Sampaikan ke grup: kalau foto muat dan/atau tiba sudah diambil, foto-foto itu
     ikut dibagikan bersama teks lewat kotak berbagi bawaan HP. Kalau perangkat
     tidak mendukung berbagi banyak file sekaligus, jatuh kembali ke tautan teks
     WhatsApp biasa dan foto tetap bisa dikirim satu per satu lewat tombol di
     setiap foto. */
  const waUpdateGrup = async o => {
    const namaBase = (o.jobId || o.id).replace(/[^a-zA-Z0-9-]/g, '');
    const files = [];
    const fotoMuat = fotoBlobRef.current[`${o.id}-muat`];
    const fotoTiba = fotoBlobRef.current[`${o.id}-tiba`];
    if (fotoMuat) files.push(new File([fotoMuat], `foto-muat-${namaBase}.jpg`, { type: 'image/jpeg' }));
    if (fotoTiba) files.push(new File([fotoTiba], `foto-tiba-${namaBase}.jpg`, { type: 'image/jpeg' }));
    const caption = teksUpdateLapangan(o);

    if (files.length && navigator.canShare && navigator.canShare({ files })) {
      try {
        await navigator.share({ files, text: caption });
        return;
      } catch (err) {
        if (err && err.name === 'AbortError') return;
        console.error('Gagal membagikan foto ke grup, memakai cara teks saja.', err);
      }
    }
    openWa('', caption);
    if (files.length) showToast('HP ini belum mendukung kirim foto sekaligus. Kirim foto muat/tiba satu per satu lewat tombol di setiap foto.', 'info');
  };
  const waUpdateLogistik = o => openWa(logisticsPhone, teksUpdateLapangan(o));

  /* ------------------------------ sales ------------------------------ */
  const emptyForm = {
    customer: '', namaProyek: '', lokasiPengantaran: '', picPenerima: '',
    sales: 'ANS', jenisAlat: 'Excavator 20 Ton - Bucket', jenisSewa: 'S1',
    tipeDurasi: 'Jam', jumlahDurasi: 8, jumlahUnit: 1, catatanSales: ''
  };
  const [formData, setFormData] = useState(emptyForm);
  const handleChange = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const submitOrder = e => {
    e.preventDefault();
    const id = generateId('SO');
    const d = new Date();
    setOrderList(prev => [{
      id, tahap: 'baru',
      tanggalOrder: `${pad(d.getDate())}-${d.toLocaleString('id-ID', { month: 'short' })}-${String(d.getFullYear()).slice(-2)}`,
      customer: formData.customer, namaProyek: formData.namaProyek, sales: formData.sales,
      jenisAlat: formData.jenisAlat, jenisSewa: formData.jenisSewa,
      rencanaDurasi: `${formData.jumlahDurasi} ${formData.tipeDurasi}`,
      jumlahUnit: Number(formData.jumlahUnit) || 1,
      picPenerima: formData.picPenerima || 'Belum diisi',
      catatanSales: formData.catatanSales.trim(),
      jobId: '', kodeUnit: '', namaOperator: '',
      posisiUnitSekarang: '', koordinatUnitSekarang: '',
      lokasiTurun: formData.lokasiPengantaran, koordinatTurun: '',
      hmAwal: '', fotoHmAwalUrl: null, timestampHmAwal: '-',
      catatanOperator: '', trontonUnit: '', sopirTronton: '',
      statusLogistik: 'Menunggu jadwal muat', statusDurasi: 'Sesuai rencana', catatanAktual: '',
      fotoMuatUrl: null, timestampMuat: '-', koordinatMuat: '-',
      fotoTibaUrl: null, timestampTiba: '-', koordinatTiba: '-'
    }, ...prev]);
    setFormData(emptyForm);
    showToast(`Order ${id} terkirim ke kepala operator.`);
  };

  const deleteOrder = id => {
    if (!window.confirm(`Hapus order ${id}? Tindakan ini tidak bisa dibatalkan.`)) return;
    setOrderList(prev => prev.filter(o => o.id !== id));
    showToast(`Order ${id} dihapus.`, 'info');
  };

  /* ------------------------- kepala operator ------------------------- */
  const [opError, setOpError] = useState({});

  const releaseOrder = o => {
    const kurang = [];
    if (!o.jobId.trim()) kurang.push('Job ID');
    if (!o.kodeUnit) kurang.push('nomor unit');
    if (!o.namaOperator) kurang.push('operator');
    if (!o.posisiUnitSekarang.trim()) kurang.push('posisi unit sekarang');
    if (!o.lokasiTurun.trim()) kurang.push('lokasi turun');
    if (kurang.length) {
      setOpError(p => ({ ...p, [o.id]: `Lengkapi dulu: ${kurang.join(', ')}.` }));
      return;
    }
    setOpError(p => ({ ...p, [o.id]: null }));
    patchOrder(o.id, { tahap: 'siap' });
    setFleetStatus(p => ({ ...p, [o.kodeUnit]: 'Working' }));
    showToast(`Unit ${o.kodeUnit} dikirim ke tim lapangan. Kabari grup sekarang.`);
  };

  /* ----------------------------- timesheet --------------------------- */
  const emptyTs = {
    kodeGajiOp: '', kodeTagih: '', jobId: '', tanggal: '', hari: '', operator: operatorDatabase[0],
    attach: 'Bucket', unitCode: 'EXC.01', model: '', namaPenyewa: '', alamat: '', jobVia: 'ANS',
    jamMulai: '', jamSelesai: '', durasiIstirahat: '', standby: '', totalJamKerja: '',
    hmStart: '', hmEnd: '', ot: 0, pencukupan: '', keterangan: '', tipeJam: 'Hour Meter'
  };
  const [tsForm, setTsForm] = useState(emptyTs);
  const [tsError, setTsError] = useState('');
  const setTs = (k, v) => setTsForm(p => ({ ...p, [k]: v }));

  const isiFormulirDariOrder = (o, d = new Date()) => ({
    jobId: o.jobId,
    operator: o.namaOperator || operatorDatabase[0],
    unitCode: o.kodeUnit || 'EXC.01',
    namaPenyewa: o.customer.toUpperCase(),
    alamat: (o.lokasiTurun || '').toUpperCase(),
    jobVia: o.sales,
    tanggal: `${pad(d.getDate())}-${d.toLocaleString('id-ID', { month: 'short' })}-${String(d.getFullYear()).slice(-2)}`,
    hari: d.toLocaleDateString('id-ID', { weekday: 'long' }),
    hmStart: (o.hmAwal && o.hmAwal.match(/[\d.]+/)) ? o.hmAwal.match(/[\d.]+/)[0] : ''
  });

  const prefillFromOrder = orderId => {
    const o = orderList.find(x => x.id === orderId);
    if (!o) return;
    setTsForm(p => ({ ...p, ...isiFormulirDariOrder(o) }));
    showToast(`Data ${o.jobId || o.id} dimuat ke formulir.`);
  };

  /* -------------------- tutup pekerjaan (kepala operator) -------------------- */
  const closeOrder = o => {
    patchOrder(o.id, { tahap: 'selesai', statusLogistik: 'Pekerjaan ditutup' });
    if (o.kodeUnit) setFleetStatus(p => ({ ...p, [o.kodeUnit]: 'Ready' }));
    setTsForm(p => ({ ...p, ...isiFormulirDariOrder(o) }));
    setTab('timesheet');
    showToast(`${o.jobId || o.id} ditutup. Data sudah masuk formulir timesheet, lengkapi jam kerja dan HM akhir.`);
  };

  const addTimesheet = e => {
    e.preventDefault();
    const a = parseFloat(tsForm.hmStart), b = parseFloat(tsForm.hmEnd);
    if (Number.isNaN(a) || Number.isNaN(b)) return setTsError('HM start dan HM end harus diisi angka.');
    if (b < a) return setTsError('HM end lebih kecil dari HM start. Periksa kembali angka jam meter.');
    setTsError('');
    const total = Number((b - a).toFixed(2));
    setTimesheetList(prev => [{
      ...tsForm, id: generateId('TS'), hmStart: a, hmEnd: b, totalHm: total,
      ot: parseFloat(tsForm.ot) || 0, unitWorkingHour: total, opWorkingHour: total,
      hariKerjaAlat: total > 0 ? 1 : 0, keterangan: tsForm.keterangan || '-'
    }, ...prev]);
    setTsForm(p => ({ ...emptyTs, jobId: p.jobId, operator: p.operator, unitCode: p.unitCode, namaPenyewa: p.namaPenyewa, alamat: p.alamat, jobVia: p.jobVia }));
    showToast('Timesheet harian tersimpan.');
  };

  const deleteTimesheet = id => {
    if (!window.confirm('Hapus baris timesheet ini?')) return;
    setTimesheetList(prev => prev.filter(t => t.id !== id));
    showToast('Baris timesheet dihapus.', 'info');
  };

  const recapByOperator = useMemo(() => {
    const m = {};
    timesheetList.forEach(t => {
      m[t.operator] = m[t.operator] || { operator: t.operator, totalHm: 0, ot: 0, hari: 0, entries: 0 };
      m[t.operator].totalHm += t.totalHm || 0; m[t.operator].ot += t.ot || 0;
      m[t.operator].hari += t.hariKerjaAlat || 0; m[t.operator].entries += 1;
    });
    return Object.values(m).sort((x, y) => y.totalHm - x.totalHm);
  }, [timesheetList]);

  const recapByUnit = useMemo(() => {
    const m = {};
    timesheetList.forEach(t => {
      m[t.unitCode] = m[t.unitCode] || { unitCode: t.unitCode, totalHm: 0, entries: 0 };
      m[t.unitCode].totalHm += t.totalHm || 0; m[t.unitCode].entries += 1;
    });
    return Object.values(m).sort((x, y) => y.totalHm - x.totalHm);
  }, [timesheetList]);

  /* ------------------------------ ekspor ----------------------------- */
  const download = (nama, header, rows) => {
    const csv = 'data:text/csv;charset=utf-8,' + header + '\n' + rows.map(r => r.join(',')).join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csv);
    link.download = `${nama}_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };

  const exportOrders = () => download('Rekap_Order_Delta_Perkasa',
    'No Order,Job ID,Tahap,Tanggal,Customer,Proyek,Sales,Alat,Jumlah Unit,Skema,Rencana,Nomor Unit,Operator,Posisi Unit Sekarang,Koordinat Unit,Lokasi Turun,Koordinat Turun,HM Awal,Tronton,Sopir,Status Logistik,Waktu Muat,Koordinat Muat,Waktu Tiba,Koordinat Tiba,Catatan Sales,Catatan Kepala Operator',
    orderList.map(o => [o.id, o.jobId, TAHAP[o.tahap].label, o.tanggalOrder, `"${o.customer}"`, `"${o.namaProyek}"`,
      o.sales, `"${o.jenisAlat}"`, o.jumlahUnit, o.jenisSewa, `"${o.rencanaDurasi}"`, o.kodeUnit, `"${o.namaOperator}"`,
      `"${o.posisiUnitSekarang}"`, `"${o.koordinatUnitSekarang}"`, `"${o.lokasiTurun}"`, `"${o.koordinatTurun}"`,
      `"${o.hmAwal}"`, o.trontonUnit, `"${o.sopirTronton}"`, `"${o.statusLogistik}"`,
      `"${o.timestampMuat}"`, `"${o.koordinatMuat}"`, `"${o.timestampTiba}"`, `"${o.koordinatTiba}"`,
      `"${o.catatanSales}"`, `"${o.catatanOperator}"`]));

  const exportTimesheet = () => download('Rekap_Timesheet_Delta_Perkasa',
    'Kode Gaji,Kode Tagih,Job ID,Tanggal,Hari,Operator,Attachment,Unit,Model,Penyewa,Alamat,Via,Jam Mulai,Jam Selesai,Istirahat,Standby,Total Jam,HM Start,HM End,Total HM,OT,Unit WH,Operator WH,Hari Kerja Alat,Pencukupan,Keterangan,Tipe Jam',
    timesheetList.map(t => [t.kodeGajiOp, t.kodeTagih, t.jobId, t.tanggal, t.hari, `"${t.operator}"`, t.attach,
      t.unitCode, t.model, `"${t.namaPenyewa}"`, `"${t.alamat}"`, t.jobVia, t.jamMulai, t.jamSelesai,
      t.durasiIstirahat, t.standby, t.totalJamKerja, t.hmStart, t.hmEnd, t.totalHm, t.ot,
      t.unitWorkingHour, t.opWorkingHour, t.hariKerjaAlat, t.pencukupan, `"${t.keterangan}"`, t.tipeJam]));

  /* ------------------------------ turunan ---------------------------- */
  const antrianOperator = orderList.filter(o => o.tahap === 'baru');
  const dilapangan = orderList.filter(o => o.tahap === 'siap' || o.tahap === 'lapangan');
  const selesai = orderList.filter(o => o.tahap === 'selesai');

  const [fleetQuery, setFleetQuery] = useState('');
  const [fleetKelas, setFleetKelas] = useState('Semua');
  const kelasList = ['Semua', ...new Set(fleetDatabase.map(f => f.class))];
  const filteredFleet = fleetDatabase.filter(f =>
    (fleetKelas === 'Semua' || f.class === fleetKelas) &&
    (f.code.toLowerCase().includes(fleetQuery.toLowerCase()) || f.class.toLowerCase().includes(fleetQuery.toLowerCase())));
  const hitungStatus = s => fleetDatabase.filter(f => (fleetStatus[f.code] || 'Ready') === s).length;

  const tabs = [
    { key: 'sales', label: 'Sales' },
    { key: 'operator', label: 'Kepala operator', count: antrianOperator.length },
    { key: 'lapangan', label: 'Lapangan & logistik', count: dilapangan.length },
    { key: 'timesheet', label: 'Timesheet' }
  ];

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: BRAND.navyDeep }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600&display=swap');`}</style>
        <div className="flex flex-col items-center gap-3">
          <img src={LOGO_DATA_URI} alt="Logo Delta Perkasa" className="h-16 w-auto animate-pulse" />
          <div className="text-white/50 text-sm font-['Space_Grotesk']">Memuat papan kerja…</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-stone-900" style={{ backgroundColor: BRAND.sand, fontFamily: "'Inter', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');`}</style>
      <input type="file" accept="image/*" capture="environment" ref={fileInputRef} onChange={handleFileCaptured} className="hidden" />

      {/* Masthead: navy dalam, aksen merah tipis, motif segitiga samar mengikuti bentuk logo */}
      <header className="relative overflow-hidden" style={{ backgroundColor: BRAND.navyDeep }}>
        <svg className="absolute -top-10 -right-16 w-72 h-72 opacity-[0.07] pointer-events-none" viewBox="0 0 100 100">
          <polygon points="50,4 96,92 4,92" fill={BRAND.red} />
        </svg>
        <svg className="absolute bottom-0 left-1/3 w-40 h-40 opacity-[0.05] pointer-events-none" viewBox="0 0 100 100">
          <polygon points="50,4 96,92 4,92" fill="white" />
        </svg>

        <div className="relative max-w-5xl mx-auto px-5 pt-6 pb-5 flex flex-wrap items-center justify-between gap-4">
          <DeltaWordmark tone="light" />
          <div className="flex items-center gap-2 text-[12px] text-white/60">
            <span className={`w-2 h-2 rounded-full ${saveState === 'saving' ? 'bg-amber-400' : saveState === 'error' ? 'bg-rose-400' : saveState === 'saved' ? 'bg-emerald-400' : 'bg-white/30'}`} />
            {saveState === 'saving' && 'Menyimpan…'}
            {saveState === 'saved' && 'Tersimpan, terlihat satu tim'}
            {saveState === 'error' && 'Gagal menyimpan, cek koneksi'}
            {saveState === 'idle' && 'Belum ada perubahan'}
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto px-5">
          <h1 className="font-['Space_Grotesk'] font-semibold text-xl text-white">Papan kerja rental alat berat</h1>
          <p className="text-[13px] text-white/55 mt-1 max-w-xl">Sales buat order, kepala operator tentukan unit, lapangan yang geser dan rekam bukti.</p>
        </div>

        <div className="relative max-w-5xl mx-auto px-5 pt-5 pb-6">
          <div className="flex items-stretch gap-2 overflow-x-auto">
            {[
              { n: 1, t: 'Sales buat order', s: 'Lengkap dengan catatan' },
              { n: 2, t: 'Kepala operator', s: `${antrianOperator.length} menunggu unit & Job ID` },
              { n: 3, t: 'Lapangan geser unit', s: `${dilapangan.length} sedang jalan` },
              { n: 4, t: 'Timesheet', s: `${timesheetList.length} baris terekam` }
            ].map(s => (
              <div key={s.n} className="flex-1 min-w-[150px] rounded-xl px-3.5 py-3 border border-white/10" style={{ backgroundColor: 'rgba(255,255,255,0.045)' }}>
                <div className="text-[11px] font-semibold" style={{ color: BRAND.red }}>Tahap {s.n}</div>
                <div className="text-[13px] font-semibold mt-0.5 text-white">{s.t}</div>
                <div className="text-[11px] text-white/45">{s.s}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-5 flex gap-1 overflow-x-auto">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className="px-4 py-3.5 text-sm font-semibold border-b-[3px] -mb-px transition whitespace-nowrap cursor-pointer"
              style={tab === t.key
                ? { borderColor: BRAND.red, color: BRAND.navy }
                : { borderColor: 'transparent', color: '#78716c' }}>
              {t.label}
              {t.count > 0 && (
                <span className="ml-2 px-1.5 py-0.5 rounded-full text-white text-[11px] font-bold" style={{ backgroundColor: BRAND.red }}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {toast && (
        <div className="max-w-5xl mx-auto px-5 pt-4">
          <div className={`px-4 py-3 rounded-xl text-sm border ${toast.tone === 'info' ? 'bg-stone-50 border-stone-200 text-stone-700' : 'bg-emerald-50 border-emerald-200 text-emerald-800'}`}>
            {toast.message}
          </div>
        </div>
      )}

      <main className="max-w-5xl mx-auto px-5 py-7 space-y-7">

        {/* ============================ SALES ============================ */}
        {tab === 'sales' && (
          <>
            <Card className="p-6">
              <h2 className="text-lg font-semibold font-['Space_Grotesk'] text-[#132A4E]">Buat order baru</h2>
              <p className="text-sm text-stone-500 mt-1 mb-6">Order langsung masuk antrean kepala operator untuk ditentukan nomor unit dan Job ID.</p>

              <form onSubmit={submitOrder} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Nama customer">
                    <input name="customer" value={formData.customer} onChange={handleChange} required placeholder="PT Mahligai Artha Sejahtera" className={inputClass} />
                  </Field>
                  <Field label="Nama proyek">
                    <input name="namaProyek" value={formData.namaProyek} onChange={handleChange} required placeholder="Land clearing blok 44" className={inputClass} />
                  </Field>
                  <Field label="Lokasi pengantaran" hint="Alamat lengkap atau tautan Google Maps">
                    <input name="lokasiPengantaran" value={formData.lokasiPengantaran} onChange={handleChange} required placeholder="Jl. Poros Malino Km. 7, Gowa" className={inputClass} />
                  </Field>
                  <Field label="PIC penerima di lokasi">
                    <input name="picPenerima" value={formData.picPenerima} onChange={handleChange} placeholder="Pak Budi (0812xxxxxxx)" className={inputClass} />
                  </Field>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Field label="Sales">
                    <select name="sales" value={formData.sales} onChange={handleChange} className={inputClass}>
                      {['ANS', 'UCI', 'CDP', 'FAN'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </Field>
                  <Field label="Skema kontrak">
                    <select name="jenisSewa" value={formData.jenisSewa} onChange={handleChange} className={inputClass}>
                      {['S1', 'S2', 'S3'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </Field>
                  <Field label="Rencana durasi">
                    <div className="flex gap-2">
                      <input type="number" min="1" name="jumlahDurasi" value={formData.jumlahDurasi} onChange={handleChange} required className={inputClass + ' w-20'} />
                      <select name="tipeDurasi" value={formData.tipeDurasi} onChange={handleChange} className={inputClass}>
                        {['Jam', 'Hari', 'Minggu', 'Bulan'].map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </Field>
                  <Field label="Jumlah unit">
                    <input type="number" min="1" name="jumlahUnit" value={formData.jumlahUnit} onChange={handleChange} required className={inputClass} />
                  </Field>
                </div>

                <Field label="Jenis alat dan attachment">
                  <select name="jenisAlat" value={formData.jenisAlat} onChange={handleChange} className={inputClass}>
                    {['Excavator 20 Ton - Bucket', 'Excavator 20 Ton - Breaker', 'Excavator Mini SY55 - Bucket',
                      'Excavator Mini SY55 - Breaker', 'Excavator Mini SY75 - Bucket', 'Excavator Mini SY75 - Breaker',
                      'Vibro Roller', 'Bulldozer', 'Motor Grader'].map(a => <option key={a}>{a}</option>)}
                  </select>
                </Field>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <Field label="Catatan untuk kepala operator" hint="Permintaan khusus customer, kondisi akses jalan, jam tiba, attachment tambahan.">
                    <textarea name="catatanSales" value={formData.catatanSales} onChange={handleChange} rows="3"
                      placeholder="Contoh: akses jalan sempit, tronton besar tidak bisa masuk. Unit harus tiba sebelum jam 7 pagi."
                      className={inputClass + ' resize-none bg-white'} />
                  </Field>
                </div>

                <Btn kind="accent" type="submit" className="w-full sm:w-auto py-3">Kirim ke kepala operator</Btn>
              </form>
            </Card>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold font-['Space_Grotesk'] text-[#132A4E]">Order yang sudah dibuat</h2>
              {orderList.length === 0 ? <Empty>Belum ada order. Isi formulir di atas untuk memulai.</Empty> :
                orderList.map(o => (
                  <Card key={o.id} className="p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold">{o.customer}</span><Chip tahap={o.tahap} />
                        </div>
                        <p className="text-sm text-stone-600 mt-1">{o.namaProyek} · {o.jenisAlat} · {o.jumlahUnit} unit · {o.rencanaDurasi}</p>
                        <p className="text-[12px] text-stone-500 mt-1">{o.id}{o.jobId && ` · Job ID ${o.jobId}`} · sales {o.sales} · {o.tanggalOrder}</p>
                      </div>
                      <Btn kind="small" onClick={() => deleteOrder(o.id)} className="text-rose-700 border-rose-200 hover:bg-rose-50">Hapus</Btn>
                    </div>
                    {o.catatanSales && <p className="mt-3 text-sm text-stone-700 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2">{o.catatanSales}</p>}
                    {o.kodeUnit && <p className="mt-2 text-[12px] text-stone-500">Unit {o.kodeUnit} · operator {o.namaOperator} · {o.statusLogistik}</p>}
                  </Card>
                ))}
            </section>
          </>
        )}

        {/* ======================= KEPALA OPERATOR ======================= */}
        {tab === 'operator' && (
          <>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold font-['Space_Grotesk'] text-[#132A4E]">Antrean alokasi unit</h2>
                <p className="text-sm text-stone-500 mt-1">Tentukan nomor unit yang digeser, posisinya sekarang, lokasi turun, dan HM awal.</p>
              </div>
              <Btn kind="small" onClick={exportOrders}>Unduh rekap order</Btn>
            </div>

            {antrianOperator.length === 0 ? <Empty>Antrean kosong. Order baru dari sales akan muncul di sini.</Empty> :
              antrianOperator.map(o => (
                <Card key={o.id} className="p-6 border-l-4 border-l-[#C1272D]">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold">{o.customer}</h3><Chip tahap={o.tahap} />
                      </div>
                      <p className="text-sm text-stone-600 mt-1">{o.namaProyek} · {o.jenisAlat} · {o.jumlahUnit} unit</p>
                      <p className="text-[12px] text-stone-500 mt-1">{o.id} · sales {o.sales} · skema {o.jenisSewa} · rencana {o.rencanaDurasi} · {o.tanggalOrder}</p>
                    </div>
                    <div className="text-[12px] text-stone-600 sm:text-right">PIC penerima: {o.picPenerima}</div>
                  </div>

                  {o.catatanSales && (
                    <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                      <div className="text-[12px] font-semibold text-amber-800 mb-1">Catatan dari sales {o.sales}</div>
                      <p className="text-sm text-amber-900">{o.catatanSales}</p>
                    </div>
                  )}

                  <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Field label="Job ID">
                      <div className="flex gap-2">
                        <input value={o.jobId} onChange={e => patchOrder(o.id, { jobId: e.target.value })} placeholder="0320-0526-ANS-S1" className={inputClass + ' font-mono'} />
                        <Btn kind="small" type="button" onClick={() => patchOrder(o.id, { jobId: suggestJobId(o) })} className="whitespace-nowrap">Buatkan</Btn>
                      </div>
                    </Field>

                    <Field label="Nomor unit yang digeser" hint="Nomor ini yang dipakai sopir tronton di lapangan.">
                      <select value={o.kodeUnit} onChange={e => patchOrder(o.id, { kodeUnit: e.target.value })} className={inputClass}>
                        <option value="">Pilih nomor unit</option>
                        {fleetDatabase.map(f => {
                          const st = fleetStatus[f.code] || 'Ready';
                          return <option key={f.code} value={f.code}>{f.code} — {f.class}{st !== 'Ready' ? ` (${st})` : ''}</option>;
                        })}
                      </select>
                    </Field>

                    <Field label="Operator">
                      <select value={o.namaOperator} onChange={e => patchOrder(o.id, { namaOperator: e.target.value })} className={inputClass}>
                        <option value="">Pilih operator</option>
                        {operatorDatabase.map(op => <option key={op}>{op}</option>)}
                      </select>
                    </Field>
                  </div>

                  <div className="mt-4 grid sm:grid-cols-2 gap-4 bg-sky-50/60 border border-sky-200 rounded-xl p-4">
                    <div className="space-y-2">
                      <Field label="Posisi unit sekarang" hint="Pool, site sebelumnya, atau titik parkir terakhir.">
                        <input value={o.posisiUnitSekarang} onChange={e => patchOrder(o.id, { posisiUnitSekarang: e.target.value })}
                          placeholder="Pool Parang Loe / Site PT Anugerah, Maros" className={inputClass} />
                      </Field>
                      <div className="flex items-center gap-2">
                        <input value={o.koordinatUnitSekarang} onChange={e => patchOrder(o.id, { koordinatUnitSekarang: e.target.value })}
                          placeholder="Koordinat maps" className={inputClass + ' font-mono text-[12px]'} />
                        <Btn kind="small" type="button" onClick={() => ambilKoordinat(o.id, 'koordinatUnitSekarang', 'Posisi unit')} className="whitespace-nowrap">GPS</Btn>
                      </div>
                      {mapsLink(o.koordinatUnitSekarang) && (
                        <a href={mapsLink(o.koordinatUnitSekarang)} target="_blank" rel="noreferrer" className="text-[12px] text-sky-700 underline">Buka di Google Maps</a>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Field label="Lokasi pengantaran / turun" hint="Dari order sales, boleh diperbaiki di sini.">
                        <input value={o.lokasiTurun} onChange={e => patchOrder(o.id, { lokasiTurun: e.target.value })}
                          placeholder="Site 44, Jl. Poros Malino Km. 7" className={inputClass} />
                      </Field>
                      <div className="flex items-center gap-2">
                        <input value={o.koordinatTurun} onChange={e => patchOrder(o.id, { koordinatTurun: e.target.value })}
                          placeholder="Koordinat maps" className={inputClass + ' font-mono text-[12px]'} />
                        <Btn kind="small" type="button" onClick={() => ambilKoordinat(o.id, 'koordinatTurun', 'Lokasi turun')} className="whitespace-nowrap">GPS</Btn>
                      </div>
                      {mapsLink(o.koordinatTurun) && (
                        <a href={mapsLink(o.koordinatTurun)} target="_blank" rel="noreferrer" className="text-[12px] text-sky-700 underline">Buka di Google Maps</a>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 grid sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Field label="HM awal dan BBM">
                        <input value={o.hmAwal} onChange={e => patchOrder(o.id, { hmAwal: e.target.value })} placeholder="1240.5 HM, solar penuh" className={inputClass} />
                      </Field>
                      <Field label="Catatan untuk logistik dan operator">
                        <input value={o.catatanOperator} onChange={e => patchOrder(o.id, { catatanOperator: e.target.value })}
                          placeholder="Bawa breaker dan selang hidrolik cadangan" className={inputClass} />
                      </Field>
                    </div>
                    <FotoBox label="Foto HM awal" url={o.fotoHmAwalUrl} waktu={o.timestampHmAwal}
                      note="Foto layar jam meter sebelum unit digeser"
                      onCapture={() => triggerCamera(o.id, 'hmawal')}
                      onShare={() => shareFotoWhatsApp(o, 'hmawal')} />
                  </div>

                  {opError[o.id] && <p className="mt-4 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">{opError[o.id]}</p>}

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Btn kind="accent" onClick={() => releaseOrder(o)}>Kirim ke tim lapangan</Btn>
                    <Btn onClick={() => waKeLogistik(o)}>Kabari logistik</Btn>
                    <Btn onClick={() => waKeGrup(o)}>Kabari grup</Btn>
                  </div>
                </Card>
              ))}

            {(dilapangan.length > 0 || selesai.length > 0) && (
              <section className="space-y-3 pt-2">
                <h3 className="text-sm font-semibold text-stone-500">Sudah dikirim ke lapangan</h3>
                {[...dilapangan, ...selesai].map(o => (
                  <Card key={o.id} className="px-4 py-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm">
                      <span className="font-mono text-[12px] text-stone-500">{o.jobId || o.id}</span>
                      <span className="mx-2 text-stone-300">|</span>
                      {o.customer} · unit <span className="font-mono font-semibold">{o.kodeUnit}</span> · {o.namaOperator}
                    </div>
                    <div className="flex items-center gap-2">
                      <Chip tahap={o.tahap} />
                      {o.tahap !== 'selesai' && (
                        <>
                          <Btn kind="small" onClick={() => waKeGrup(o)}>Kabari grup</Btn>
                          <Btn kind="small" onClick={() => closeOrder(o)}>Tutup pekerjaan</Btn>
                        </>
                      )}
                    </div>
                  </Card>
                ))}
              </section>
            )}

            {/* STATUS ARMADA — milik kepala operator */}
            <Card className="p-6">
              <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-lg font-semibold font-['Space_Grotesk'] text-[#132A4E]">Status armada</h2>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5">
                    {FLEET_STATUSES.map(s => (
                      <span key={s} className="inline-flex items-center gap-1.5 text-sm text-stone-600">
                        <span className={`w-2 h-2 rounded-full ${FLEET_STATUS_STYLE[s].dot}`} />
                        {hitungStatus(s)} {s}
                      </span>
                    ))}
                    <span className="text-sm text-stone-400">· total {fleetDatabase.length} unit</span>
                  </div>
                </div>
                <input value={fleetQuery} onChange={e => setFleetQuery(e.target.value)} placeholder="Cari nomor unit, misal EXC.08" className={inputClass + ' sm:w-64'} />
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {kelasList.map(k => (
                  <button key={k} onClick={() => setFleetKelas(k)}
                    className={`px-3 py-1.5 text-[12px] font-semibold rounded-full border transition cursor-pointer ${
                      fleetKelas === k ? 'text-white border-transparent' : 'bg-white border-stone-300 text-stone-600 hover:bg-stone-50'}`}
                    style={fleetKelas === k ? { backgroundColor: BRAND.navy } : undefined}>
                    {k}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 max-h-96 overflow-y-auto pr-1">
                {filteredFleet.map(f => {
                  const st = fleetStatus[f.code] || 'Ready';
                  const tone = (FLEET_STATUS_STYLE[st] || FLEET_STATUS_STYLE.Ready).card;
                  const pakai = orderList.find(o => o.kodeUnit === f.code && o.tahap !== 'selesai');
                  return (
                    <div key={f.code} className={`border rounded-xl p-3 ${tone}`}>
                      <div className="font-semibold text-sm font-mono">{f.code}</div>
                      <div className="text-[11px] text-stone-500 truncate">{f.class}</div>
                      {pakai && <div className="text-[11px] text-sky-800 truncate mt-0.5">{pakai.customer}</div>}
                      <select value={st} onChange={e => setFleetStatus(p => ({ ...p, [f.code]: e.target.value }))}
                        className="mt-2 w-full px-2 py-1 text-[12px] rounded-lg border border-stone-300 bg-white cursor-pointer outline-none">
                        {FLEET_STATUSES.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  );
                })}
              </div>
            </Card>
          </>
        )}

        {/* ===================== LAPANGAN & LOGISTIK ===================== */}
        {tab === 'lapangan' && (
          <>
            <div>
              <h2 className="text-lg font-semibold font-['Space_Grotesk'] text-[#132A4E]">Perintah geser unit</h2>
              <p className="text-sm text-stone-500 mt-1">Data dari kepala operator. Tentukan tronton dan sopir, lalu rekam foto serta titik maps saat muat dan tiba.</p>
            </div>

            {dilapangan.length === 0 ? <Empty>Belum ada unit yang dikirim kepala operator.</Empty> :
              dilapangan.map(o => (
                <Card key={o.id} className="p-6">
                  {/* Nomor unit ditonjolkan untuk sopir tronton */}
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="text-white rounded-xl px-4 py-3 text-center shrink-0" style={{ backgroundColor: BRAND.navy }}>
                        <div className="text-[10px] text-stone-400">Unit digeser</div>
                        <div className="text-xl font-bold font-['Space_Grotesk']">{o.kodeUnit || '—'}</div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold">{o.customer}</h3><Chip tahap={o.tahap} />
                        </div>
                        <p className="text-sm text-stone-600 mt-0.5">{o.namaProyek} · {o.jenisAlat} · operator {o.namaOperator}</p>
                        <p className="text-[12px] text-stone-500 font-mono mt-0.5">{o.jobId || o.id}</p>
                      </div>
                    </div>
                    <div className="text-[12px] text-stone-600">PIC penerima: {o.picPenerima}</div>
                  </div>

                  {/* Rute dari kepala operator */}
                  <div className="mt-4 grid sm:grid-cols-2 gap-3">
                    <div className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5">
                      <div className="text-[11px] font-semibold text-stone-500">Ambil unit di</div>
                      <div className="text-sm">{o.posisiUnitSekarang || '-'}</div>
                      {mapsLink(o.koordinatUnitSekarang) && (
                        <a href={mapsLink(o.koordinatUnitSekarang)} target="_blank" rel="noreferrer" className="text-[12px] text-sky-700 underline">Buka maps</a>
                      )}
                    </div>
                    <div className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5">
                      <div className="text-[11px] font-semibold text-stone-500">Turunkan di</div>
                      <div className="text-sm">{o.lokasiTurun || '-'}</div>
                      {mapsLink(o.koordinatTurun) && (
                        <a href={mapsLink(o.koordinatTurun)} target="_blank" rel="noreferrer" className="text-[12px] text-sky-700 underline">Buka maps</a>
                      )}
                    </div>
                  </div>

                  {(o.catatanSales || o.catatanOperator || o.hmAwal) && (
                    <div className="mt-3 grid sm:grid-cols-3 gap-3 text-sm">
                      {o.hmAwal && <div className="bg-white border border-stone-200 rounded-lg px-3 py-2"><div className="text-[11px] font-semibold text-stone-500">HM awal</div>{o.hmAwal}</div>}
                      {o.catatanOperator && <div className="bg-white border border-stone-200 rounded-lg px-3 py-2"><div className="text-[11px] font-semibold text-stone-500">Catatan kepala operator</div>{o.catatanOperator}</div>}
                      {o.catatanSales && <div className="bg-white border border-stone-200 rounded-lg px-3 py-2"><div className="text-[11px] font-semibold text-stone-500">Catatan sales</div>{o.catatanSales}</div>}
                    </div>
                  )}

                  {/* Tronton ditentukan di sini */}
                  <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Field label="Tronton pengangkut">
                      <select value={o.trontonUnit} onChange={e => patchOrder(o.id, { trontonUnit: e.target.value })} className={inputClass}>
                        <option value="">Pilih tronton</option>
                        {trontonFleet.map(t => <option key={t}>{t}</option>)}
                      </select>
                    </Field>
                    <Field label="Sopir tronton">
                      <input value={o.sopirTronton} onChange={e => patchOrder(o.id, { sopirTronton: e.target.value })} placeholder="Nama sopir" className={inputClass} />
                    </Field>
                    <Field label="Status pengiriman">
                      <select value={o.statusLogistik} onChange={e => {
                        const v = e.target.value;
                        patchOrder(o.id, { statusLogistik: v, tahap: v === 'Unit tiba di lokasi' ? 'lapangan' : o.tahap });
                      }} className={inputClass}>
                        {['Menunggu jadwal muat', 'Sedang muat', 'Dalam perjalanan', 'Unit tiba di lokasi'].map(s => <option key={s}>{s}</option>)}
                      </select>
                    </Field>
                    <Field label="Catatan lapangan">
                      <input value={o.catatanAktual} onChange={e => patchOrder(o.id, { catatanAktual: e.target.value })} placeholder="Kondisi terakhir" className={inputClass} />
                    </Field>
                  </div>

                  {/* Bukti muat dan tiba */}
                  <div className="mt-5 grid sm:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <FotoBox label="Foto saat muat alat" url={o.fotoMuatUrl} waktu={o.timestampMuat} koor={o.koordinatMuat}
                        onCapture={() => triggerCamera(o.id, 'muat')} onShare={() => shareFotoWhatsApp(o, 'muat')}
                        note="Titik maps ikut terekam saat foto diambil" />
                      <div className="flex gap-2">
                        <input value={o.koordinatMuat === '-' ? '' : o.koordinatMuat}
                          onChange={e => patchOrder(o.id, { koordinatMuat: e.target.value || '-' })}
                          placeholder="Titik maps posisi muat" className={inputClass + ' font-mono text-[12px]'} />
                        <Btn kind="small" type="button" onClick={() => ambilKoordinat(o.id, 'koordinatMuat', 'Titik muat')}>GPS</Btn>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <FotoBox label="Foto saat alat tiba" url={o.fotoTibaUrl} waktu={o.timestampTiba} koor={o.koordinatTiba}
                        onCapture={() => triggerCamera(o.id, 'tiba')} onShare={() => shareFotoWhatsApp(o, 'tiba')}
                        note="Titik maps ikut terekam saat foto diambil" />
                      <div className="flex gap-2">
                        <input value={o.koordinatTiba === '-' ? '' : o.koordinatTiba}
                          onChange={e => patchOrder(o.id, { koordinatTiba: e.target.value || '-' })}
                          placeholder="Titik maps posisi tiba" className={inputClass + ' font-mono text-[12px]'} />
                        <Btn kind="small" type="button" onClick={() => ambilKoordinat(o.id, 'koordinatTiba', 'Titik tiba')}>GPS</Btn>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Btn kind="solid" onClick={() => waUpdateGrup(o)}>Sampaikan ke grup</Btn>
                    <Btn onClick={() => waUpdateLogistik(o)}>Kabari logistik</Btn>
                    <Btn onClick={() => deleteOrder(o.id)} className="text-rose-700 border-rose-200 hover:bg-rose-50">Hapus</Btn>
                  </div>
                  <p className="mt-3 text-[12px] text-stone-500">Penutupan pekerjaan dilakukan oleh kepala operator, di tab Kepala operator. Hapus dipakai kalau data keliru atau unit sudah tiba dan tidak perlu direkap lagi di sini.</p>
                </Card>
              ))}

            {selesai.length > 0 && (
              <section className="space-y-3 pt-2">
                <h3 className="text-sm font-semibold text-stone-500">Pekerjaan selesai</h3>
                {selesai.map(o => (
                  <Card key={o.id} className="px-4 py-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm">
                      <span className="font-mono text-[12px] text-stone-500">{o.jobId || o.id}</span>
                      <span className="mx-2 text-stone-300">|</span>{o.customer} · unit <span className="font-mono">{o.kodeUnit}</span>
                    </div>
                    <Chip tahap={o.tahap} />
                  </Card>
                ))}
              </section>
            )}
          </>
        )}

        {/* ========================== TIMESHEET ========================== */}
        {tab === 'timesheet' && (
          <>
            <Card className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                <div>
                  <h2 className="text-lg font-semibold font-['Space_Grotesk'] text-[#132A4E]">Timesheet harian</h2>
                  <p className="text-sm text-stone-500 mt-1">Ambil data dari job yang berjalan, lalu isi jam meter.</p>
                </div>
                <select onChange={e => { prefillFromOrder(e.target.value); e.target.value = ''; }} defaultValue="" className={inputClass + ' sm:w-72'}>
                  <option value="">Ambil dari job</option>
                  {[...dilapangan, ...selesai].map(o => (
                    <option key={o.id} value={o.id}>{o.jobId || o.id} — {o.customer}{o.tahap === 'selesai' ? ' (selesai)' : ''}</option>
                  ))}
                </select>
              </div>

              {tsError && <p className="mb-4 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">{tsError}</p>}

              <form onSubmit={addTimesheet} className="space-y-5">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Field label="Job ID"><input value={tsForm.jobId} onChange={e => setTs('jobId', e.target.value)} required className={inputClass + ' font-mono'} /></Field>
                  <Field label="Kode gaji operator"><input value={tsForm.kodeGajiOp} onChange={e => setTs('kodeGajiOp', e.target.value)} className={inputClass} /></Field>
                  <Field label="Kode tagih"><input value={tsForm.kodeTagih} onChange={e => setTs('kodeTagih', e.target.value)} className={inputClass} /></Field>
                  <Field label="Job via"><input value={tsForm.jobVia} onChange={e => setTs('jobVia', e.target.value)} className={inputClass} /></Field>

                  <Field label="Tanggal"><input value={tsForm.tanggal} onChange={e => setTs('tanggal', e.target.value)} placeholder="11-Sep-26" required className={inputClass} /></Field>
                  <Field label="Hari"><input value={tsForm.hari} onChange={e => setTs('hari', e.target.value)} placeholder="Jumat" className={inputClass} /></Field>
                  <Field label="Operator">
                    <select value={tsForm.operator} onChange={e => setTs('operator', e.target.value)} className={inputClass}>
                      {operatorDatabase.map(op => <option key={op}>{op}</option>)}
                    </select>
                  </Field>
                  <Field label="Unit">
                    <select value={tsForm.unitCode} onChange={e => setTs('unitCode', e.target.value)} className={inputClass}>
                      {fleetDatabase.map(f => <option key={f.code} value={f.code}>{f.code} — {f.class}</option>)}
                    </select>
                  </Field>

                  <Field label="Attachment"><input value={tsForm.attach} onChange={e => setTs('attach', e.target.value)} className={inputClass} /></Field>
                  <Field label="Model alat"><input value={tsForm.model} onChange={e => setTs('model', e.target.value)} placeholder="SY215H" className={inputClass} /></Field>
                  <Field label="Nama penyewa"><input value={tsForm.namaPenyewa} onChange={e => setTs('namaPenyewa', e.target.value)} required className={inputClass} /></Field>
                  <Field label="Alamat proyek"><input value={tsForm.alamat} onChange={e => setTs('alamat', e.target.value)} className={inputClass} /></Field>
                </div>

                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Field label="HM start"><input type="number" step="0.1" value={tsForm.hmStart} onChange={e => setTs('hmStart', e.target.value)} required className={inputClass + ' font-mono'} /></Field>
                  <Field label="HM end"><input type="number" step="0.1" value={tsForm.hmEnd} onChange={e => setTs('hmEnd', e.target.value)} required className={inputClass + ' font-mono'} /></Field>
                  <Field label="Lembur (jam)"><input type="number" step="0.1" value={tsForm.ot} onChange={e => setTs('ot', e.target.value)} className={inputClass + ' font-mono'} /></Field>
                  <Field label="Total HM" hint="Dihitung otomatis">
                    <div className="px-3 py-2.5 rounded-lg bg-white border border-stone-300 text-sm font-mono">
                      {(() => {
                        const a = parseFloat(tsForm.hmStart), b = parseFloat(tsForm.hmEnd);
                        return !Number.isNaN(a) && !Number.isNaN(b) && b >= a ? (b - a).toFixed(2) : '—';
                      })()}
                    </div>
                  </Field>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Field label="Jam mulai"><input value={tsForm.jamMulai} onChange={e => setTs('jamMulai', e.target.value)} placeholder="Opsional" className={inputClass} /></Field>
                  <Field label="Jam selesai"><input value={tsForm.jamSelesai} onChange={e => setTs('jamSelesai', e.target.value)} placeholder="Opsional" className={inputClass} /></Field>
                  <Field label="Istirahat (jam)"><input value={tsForm.durasiIstirahat} onChange={e => setTs('durasiIstirahat', e.target.value)} placeholder="Opsional" className={inputClass} /></Field>
                  <Field label="Standby (jam)"><input value={tsForm.standby} onChange={e => setTs('standby', e.target.value)} placeholder="Opsional" className={inputClass} /></Field>
                  <Field label="Pencukupan"><input value={tsForm.pencukupan} onChange={e => setTs('pencukupan', e.target.value)} placeholder="Opsional" className={inputClass} /></Field>
                  <Field label="Tipe jam">
                    <select value={tsForm.tipeJam} onChange={e => setTs('tipeJam', e.target.value)} className={inputClass}>
                      <option>Hour Meter</option><option>Jam Dunia</option>
                    </select>
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Keterangan"><input value={tsForm.keterangan} onChange={e => setTs('keterangan', e.target.value)} placeholder="Cukup 200 jam" className={inputClass} /></Field>
                  </div>
                </div>

                <Btn kind="solid" type="submit" className="w-full sm:w-auto py-3">Simpan timesheet</Btn>
              </form>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-5">
                <h3 className="font-semibold mb-3">Jam kerja per operator</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {recapByOperator.length === 0 ? <p className="text-sm text-stone-500">Belum ada data.</p> :
                    recapByOperator.map(r => (
                      <div key={r.operator} className="flex items-center justify-between border border-stone-200 rounded-lg px-3 py-2">
                        <div>
                          <div className="text-sm font-medium">{r.operator}</div>
                          <div className="text-[11px] text-stone-500">{r.entries} entri · {r.hari.toFixed(2)} hari kerja</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold font-mono">{r.totalHm.toFixed(2)} HM</div>
                          {r.ot > 0 && <div className="text-[11px] text-amber-700">+{r.ot.toFixed(1)} lembur</div>}
                        </div>
                      </div>
                    ))}
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-semibold mb-3">Jam kerja per unit</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {recapByUnit.length === 0 ? <p className="text-sm text-stone-500">Belum ada data.</p> :
                    recapByUnit.map(r => (
                      <div key={r.unitCode} className="flex items-center justify-between border border-stone-200 rounded-lg px-3 py-2">
                        <div>
                          <div className="text-sm font-medium font-mono">{r.unitCode}</div>
                          <div className="text-[11px] text-stone-500">{r.entries} entri</div>
                        </div>
                        <div className="text-sm font-semibold font-mono">{r.totalHm.toFixed(2)} HM</div>
                      </div>
                    ))}
                </div>
              </Card>
            </div>

            <Card className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h3 className="font-semibold">Rekapitulasi</h3>
                <Btn kind="small" onClick={exportTimesheet}>Unduh rekap timesheet</Btn>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[12px] whitespace-nowrap">
                  <thead className="text-stone-500 border-b border-stone-200">
                    <tr>
                      {['Job ID', 'Tanggal', 'Operator', 'Unit', 'Penyewa', 'HM start', 'HM end', 'Total HM', 'Lembur', 'Hari kerja', 'Keterangan', ''].map(h => (
                        <th key={h} className="py-2.5 pr-4 font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {timesheetList.length === 0 ? (
                      <tr><td colSpan="12" className="py-8 text-center text-stone-500">Belum ada baris timesheet.</td></tr>
                    ) : timesheetList.map(t => (
                      <tr key={t.id} className="hover:bg-stone-50">
                        <td className="py-2.5 pr-4 font-mono">{t.jobId}</td>
                        <td className="py-2.5 pr-4">{t.tanggal}</td>
                        <td className="py-2.5 pr-4 font-medium">{t.operator}</td>
                        <td className="py-2.5 pr-4 font-mono">{t.unitCode}</td>
                        <td className="py-2.5 pr-4">{t.namaPenyewa}</td>
                        <td className="py-2.5 pr-4 font-mono">{Number(t.hmStart).toFixed(1)}</td>
                        <td className="py-2.5 pr-4 font-mono">{Number(t.hmEnd).toFixed(1)}</td>
                        <td className="py-2.5 pr-4 font-mono font-semibold">{Number(t.totalHm).toFixed(2)}</td>
                        <td className="py-2.5 pr-4 font-mono">{t.ot > 0 ? Number(t.ot).toFixed(1) : '—'}</td>
                        <td className="py-2.5 pr-4 font-mono">{Number(t.hariKerjaAlat).toFixed(2)}</td>
                        <td className="py-2.5 pr-4 text-stone-600">{t.keterangan}</td>
                        <td className="py-2.5">
                          <button onClick={() => deleteTimesheet(t.id)} className="text-rose-700 font-semibold hover:underline cursor-pointer">Hapus</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}
      </main>

      <footer className="max-w-5xl mx-auto px-5 pb-10 text-[12px] text-stone-500">
        Data tersimpan bersama untuk satu tim. Foto diberi cap waktu dan lokasi otomatis lalu hanya bertahan selama sesi browser — pakai tombol "Kirim foto ke WhatsApp" di setiap foto untuk mengirim gambarnya langsung, bukan cuma teks.
      </footer>
    </div>
  );
}
