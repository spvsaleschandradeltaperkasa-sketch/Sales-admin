import React, { useState } from "reaCt";

export default function AdminTimesheet() {

  const [timesheetList, setTimesheetList] = useState([]);

  const [form, setForm] = useState({
    kodeGajiOp: "",
    kodeTagih: "",
    jobId: "",
    tanggal: "",
    hari: "",
    operator: "",
    attach: "",
    unitCode: "",
    model: "",
    namaPenyewa: "",
    alamat: "",
    jobVia: "",
    jamMulai: "",
    jamSelesai: "",
    durasiIstirahat: "",
    standby: "",
    totalJamKerja: "",
    hmStart: 0,
    hmEnd: 0,
    ot: 0,
    pencukupan: "",
    keterangan: "",
    tipeJam: "Hour Meter",
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const hmStart =
      Number(form.hmStart) || 0;

    const hmEnd =
      Number(form.hmEnd) || 0;

    const totalHM =
      Number((hmEnd - hmStart).toFixed(2));

    const newData = {

      id:
        "TS-" +
        Math.floor(1000 + Math.random() * 9000),

      ...form,

      hmStart,
      hmEnd,

      totalHm: totalHM,

      unitWorkingHour:
        totalHM > 0 ? totalHM : 0,

      opWorkingHour:
        totalHM > 0 ? totalHM : 0,

      hariKerjaAlat:
        totalHM > 0 ? 1 : 0,
    };

    setTimesheetList((prev) => [
      newData,
      ...prev,
    ]);

  };

  const fields = [
    ["kodeGajiOp", "Kode Gaji Operator"],
    ["kodeTagih", "Kode Tagih"],
    ["jobId", "Job ID"],
    ["tanggal", "Tanggal"],
    ["hari", "Hari"],
    ["operator", "Operator"],
    ["attach", "Attachment"],
    ["unitCode", "Unit Code"],
    ["model", "Model"],
    ["namaPenyewa", "Nama Penyewa"],
    ["alamat", "Alamat Proyek"],
    ["jobVia", "Job Via"],
    ["jamMulai", "Jam Mulai"],
    ["jamSelesai", "Jam Selesai"],
    ["durasiIstirahat", "Durasi Istirahat"],
    ["standby", "Standby"],
    ["totalJamKerja", "Total Jam Kerja"],
    ["pencukupan", "Pencukupan"],
    ["keterangan", "Keterangan"],
  ];

  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-2xl font-black">
          ⏱️ Admin Timesheet
        </h2>

        <p className="text-sm text-slate-400">
          Input dan rekap timesheet harian operator.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

        <h3 className="text-lg font-black mb-5">
          Input Timesheet Harian
        </h3>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-4 gap-4"
        >

          {fields.map(([name, label]) => (

            <div key={name}>

              <label className="block text-xs text-slate-400 font-bold mb-1">
                {label}
              </label>

              <input
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm"
              />

            </div>

          ))}

          <div>

            <label className="block text-xs text-teal-400 font-bold mb-1">
              HM Start
            </label>

            <input
              type="number"
              step="0.1"
              name="hmStart"
              value={form.hmStart}
              onChange={handleChange}
              className="input"
            />

          </div>

          <div>

            <label className="block text-xs text-teal-400 font-bold mb-1">
              HM End
            </label>

            <input
              type="number"
              step="0.1"
              name="hmEnd"
              value={form.hmEnd}
              onChange={handleChange}
              className="input"
            />

          </div>

          <div>

            <label className="block text-xs text-amber-400 font-bold mb-1">
              Overtime
            </label>

            <input
              type="number"
              step="0.1"
              name="ot"
              value={form.ot}
              onChange={handleChange}
              className="input"
            />

          </div>

          <div>

            <label className="block text-xs text-purple-400 font-bold mb-1">
              Tipe Jam
            </label>

            <select
              name="tipeJam"
              value={form.tipeJam}
              onChange={handleChange}
              className="input"
            >
              <option value="Hour Meter">
                Hour Meter
              </option>

              <option value="Jam Dunia">
                Jam Dunia
              </option>
            </select>

          </div>

          <button
            type="submit"
            className="md:col-span-4 bg-amber-500 hover:bg-amber-400 text-slate-950 py-4 rounded-xl font-black"
          >
            SIMPAN TIMESHEET →
          </button>

        </form>

      </div>

      {/* REKAP */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 overflow-hidden">

        <h3 className="font-black text-lg mb-5">
          Rekap Timesheet
        </h3>

        <div className="overflow-x-auto">

          <table className="w-full text-xs whitespace-nowrap">

            <thead>
              <tr className="border-b border-slate-800 text-slate-400">

                <th className="p-3">Kode Gaji</th>
                <th className="p-3">Kode Tagih</th>
                <th className="p-3">Job ID</th>
                <th className="p-3">Tanggal</th>
                <th className="p-3">Operator</th>
                <th className="p-3">Unit</th>
                <th className="p-3">HM Start</th>
                <th className="p-3">HM End</th>
                <th className="p-3">Total HM</th>
                <th className="p-3">OT</th>
                <th className="p-3">Working Hour</th>

              </tr>
            </thead>

            <tbody>

              {timesheetList.map((item) => (

                <tr
                  key={item.id}
                  className="border-b border-slate-800/60"
                >

                  <td className="p-3">
                    {item.kodeGajiOp}
                  </td>

                  <td className="p-3">
                    {item.kodeTagih}
                  </td>

                  <td className="p-3">
                    {item.jobId}
                  </td>

                  <td className="p-3">
                    {item.tanggal}
                  </td>

                  <td className="p-3 font-bold">
                    {item.operator}
                  </td>

                  <td className="p-3 text-amber-400">
                    {item.unitCode}
                  </td>

                  <td className="p-3">
                    {item.hmStart}
                  </td>

                  <td className="p-3">
                    {item.hmEnd}
                  </td>

                  <td className="p-3 text-amber-400 font-bold">
                    {item.totalHm}
                  </td>

                  <td className="p-3">
                    {item.ot}
                  </td>

                  <td className="p-3 text-cyan-400 font-bold">
                    {item.unitWorkingHour}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}
