import React, { useState } from "react";

const salesOptions = [
  { label: "ANS", value: "ANS" },
  { label: "UCI", value: "UCI" },
  { label: "CDP", value: "CDP" },
  { label: "FAN", value: "FAN" },
];

const alatOptions = [
  "Excavator 20 Ton - Bucket",
  "Excavator 20 Ton - Breaker",
  "Excavator Mini SY55 - Bucket",
  "Excavator Mini SY55 - Breaker",
  "Excavator Mini SY75 - Bucket",
  "Excavator Mini SY75 - Breaker",
  "Vibro Roller",
  "Bulldozer",
  "Motor Grader",
];

export default function SalesOrder() {

  const [formData, setFormData] = useState({
    customer: "",
    namaProyek: "",
    lokasi: "",
    lokasiPengantaran: "",
    picPenerima: "",
    sales: "ANS",
    jenisAlat: "Excavator 20 Ton - Bucket",
    jenisSewa: "S1",
    tipeDurasi: "Jam",
    jumlahDurasi: 8,
    jumlahUnit: 1,
  });

  const [orderList, setOrderList] = useState([]);

  const [notification, setNotification] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderNo =
      "SO-" + Math.floor(1000 + Math.random() * 9000);

    const newOrder = {
      id: orderNo,

      customer: formData.customer,
      namaProyek: formData.namaProyek,

      lokasi: formData.lokasi,
      lokasiPengantaran: formData.lokasiPengantaran,

      picPenerima: formData.picPenerima,

      sales: formData.sales,

      jenisAlat: formData.jenisAlat,
      jenisSewa: formData.jenisSewa,

      durasi:
        `${formData.jumlahDurasi} ${formData.tipeDurasi}`,

      jumlahUnit:
        Number(formData.jumlahUnit) || 1,

      status: "Menunggu Alokasi Unit",

      createdAt:
        new Date().toLocaleString("id-ID"),
    };

    setOrderList((prev) => [
      newOrder,
      ...prev,
    ]);

    setNotification(
      `Sales Order ${orderNo} berhasil dibuat`
    );

    setFormData({
      customer: "",
      namaProyek: "",
      lokasi: "",
      lokasiPengantaran: "",
      picPenerima: "",
      sales: "ANS",
      jenisAlat: "Excavator 20 Ton - Bucket",
      jenisSewa: "S1",
      tipeDurasi: "Jam",
      jumlahDurasi: 8,
      jumlahUnit: 1,
    });

    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  return (
    <div className="space-y-6">

      {/* TITLE */}
      <div>
        <h2 className="text-2xl font-black">
          📋 Sales Order
        </h2>

        <p className="text-sm text-slate-400">
          Pembuatan order rental alat berat
        </p>
      </div>

      {/* NOTIFICATION */}
      {notification && (
        <div className="bg-emerald-950 border border-emerald-500 text-emerald-300 p-4 rounded-xl">
          {notification}
        </div>
      )}

      {/* FORM */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

        <h3 className="font-black text-lg mb-5">
          Form Sales Order
        </h3>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            placeholder="Nama Customer / PT / CV"
            required
            className="input"
          />

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              name="namaProyek"
              value={formData.namaProyek}
              onChange={handleChange}
              placeholder="Nama Proyek"
              required
              className="input"
            />

            <input
              type="text"
              name="lokasi"
              value={formData.lokasi}
              onChange={handleChange}
              placeholder="Lokasi Proyek"
              required
              className="input"
            />

          </div>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              name="lokasiPengantaran"
              value={formData.lokasiPengantaran}
              onChange={handleChange}
              placeholder="Lokasi Pengantaran / Drop Unit"
              className="input"
            />

            <input
              type="text"
              name="picPenerima"
              value={formData.picPenerima}
              onChange={handleChange}
              placeholder="PIC Penerima + No HP"
              className="input"
            />

          </div>

          <div className="grid md:grid-cols-2 gap-4">

            <select
              name="sales"
              value={formData.sales}
              onChange={handleChange}
              className="input"
            >
              {salesOptions.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </option>
              ))}
            </select>

            <select
              name="jenisSewa"
              value={formData.jenisSewa}
              onChange={handleChange}
              className="input"
            >
              <option value="S1">S1</option>
              <option value="S2">S2</option>
              <option value="S3">S3</option>
            </select>

          </div>

          <div className="grid md:grid-cols-3 gap-4">

            <select
              name="jenisAlat"
              value={formData.jenisAlat}
              onChange={handleChange}
              className="input"
            >
              {alatOptions.map((alat) => (
                <option key={alat} value={alat}>
                  {alat}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="jumlahUnit"
              min="1"
              value={formData.jumlahUnit}
              onChange={handleChange}
              placeholder="Jumlah Unit"
              className="input"
            />

            <div className="flex gap-2">

              <input
                type="number"
                name="jumlahDurasi"
                min="1"
                value={formData.jumlahDurasi}
                onChange={handleChange}
                className="input"
              />

              <select
                name="tipeDurasi"
                value={formData.tipeDurasi}
                onChange={handleChange}
                className="input"
              >
                <option value="Jam">Jam</option>
                <option value="Hari">Hari</option>
                <option value="Minggu">Minggu</option>
                <option value="Bulan">Bulan</option>
              </select>

            </div>

          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-black"
          >
            TERBITKAN SALES ORDER →
          </button>

        </form>

      </div>

      {/* REKAP SO */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

        <h3 className="font-black text-lg mb-5">
          Rekap Sales Order
        </h3>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="p-3 text-left">SO</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Proyek</th>
                <th className="p-3 text-left">Sales</th>
                <th className="p-3 text-left">Alat</th>
                <th className="p-3 text-left">Unit</th>
                <th className="p-3 text-left">Durasi</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>

              {orderList.map((order) => (

                <tr
                  key={order.id}
                  className="border-b border-slate-800/60"
                >

                  <td className="p-3 font-black text-blue-400">
                    {order.id}
                  </td>

                  <td className="p-3">
                    {order.customer}
                  </td>

                  <td className="p-3">
                    {order.namaProyek}
                  </td>

                  <td className="p-3">
                    {order.sales}
                  </td>

                  <td className="p-3">
                    {order.jenisAlat}
                  </td>

                  <td className="p-3">
                    {order.jumlahUnit}
                  </td>

                  <td className="p-3">
                    {order.durasi}
                  </td>

                  <td className="p-3 text-amber-400">
                    {order.status}
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
