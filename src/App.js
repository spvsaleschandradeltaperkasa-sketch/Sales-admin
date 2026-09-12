<td className="py-4 px-4 align-top space-y-2">
                      <div className="flex items-center gap-2">
                        <select 
                          value={order.kodeUnit} 
                          onChange={(e) => {
                            const val = e.target.value;
                            setOrderList(orderList.map(o => o.id === order.id ? { ...o, kodeUnit: val } : o));
                          }}
                          className="px-2 py-1.5 bg-[#121824] border border-slate-700 rounded-lg text-xs font-bold text-amber-300 outline-none"
                        >
                          <option value="Belum Dipilih">Pilih Unit...</option>
                          {fleetDatabase.map(f => (
                            <option key={f.code} value={f.code}>{f.code} - {f.class}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-2">
                        <select 
                          value={order.namaOperator} 
                          onChange={(e) => {
                            const val = e.target.value;
                            setOrderList(orderList.map(o => o.id === order.id ? { ...o, namaOperator: val } : o));
                          }}
                          className="px-2 py-1.5 bg-[#121824] border border-slate-700 rounded-lg text-xs font-bold text-purple-300 outline-none"
                        >
                          <option value="Belum Ditentukan">Pilih Operator...</option>
                          {operatorDatabase.map(op => (
                            <option key={op} value={op}>{op}</option>
                          ))}
                        </select>
                      </div>

                      <div className="text-[10px] text-slate-400">
                        HM Awal: <input 
                          type="text" 
                          value={order.hmAwal} 
                          onChange={(e) => {
                            const val = e.target.value;
                            setOrderList(orderList.map(o => o.id === order.id ? { ...o, hmAwal: val } : o));
                          }}
                          className="w-20 bg-[#121824] border border-slate-700 px-1 rounded text-white ml-1"
                        />
                      </div>
                    </td>

                    <td className="py-4 px-4 align-top space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <button 
                          onClick={() => triggerCamera(order.id, 'muat')} 
                          className="px-2.5 py-1.5 bg-purple-600/80 hover:bg-purple-600 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer shadow"
                        >
                          📷 Foto Muat ({order.fotoMuatUrl ? '✔' : '0'})
                        </button>
                        <button 
                          onClick={() => triggerCamera(order.id, 'tiba')} 
                          className="px-2.5 py-1.5 bg-teal-600/80 hover:bg-teal-600 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer shadow"
                        >
                          📍 Foto Tiba ({order.fotoTibaUrl ? '✔' : '0'})
                        </button>
                      </div>
                      
                      <div className="text-[10px] text-slate-400 space-y-0.5">
                        <div>Muat: <span className="text-white">{order.timestampMuat}</span></div>
                        <div>Tiba: <span className="text-white">{order.timestampTiba}</span></div>
                      </div>

                      {order.fotoMuatUrl && (
                        <div className="flex gap-2 mt-1">
                          <a href={order.fotoMuatUrl} target="_blank" rel="noreferrer" className="text-[10px] text-amber-400 underline">Lihat Foto Muat</a>
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-4 align-top space-y-3">
                      <select 
                        value={order.status} 
                        onChange={(e) => {
                          const val = e.target.value;
                          setOrderList(orderList.map(o => o.id === order.id ? { ...o, status: val } : o));
                        }}
                        className="w-full px-2.5 py-1.5 bg-[#121824] border border-slate-700 rounded-lg text-xs font-bold text-emerald-400 outline-none"
                      >
                        <option value="Menunggu Alokasi Unit">Menunggu Alokasi Unit</option>
                        <option value="Unit Ready / Dispatched">Unit Ready / Dispatched</option>
                        <option value="🚚 Dalam Perjalanan (OTW)">🚚 Dalam Perjalanan (OTW)</option>
                        <option value="✅ Tiba di Lokasi & Mulai Kerja">✅ Tiba di Lokasi & Mulai Kerja</option>
                        <option value="Selesai / Closed">Selesai / Closed</option>
                      </select>

                      <a 
                        href={`https://wa.me/${logisticsPhone}?text=${encodeURIComponent(`Halo Logistik Delta Perkasa,\n\nUpdate Order #${order.id}\nCustomer: ${order.customer}\nProyek: ${order.namaProyek}\nAlat: ${order.jenisAlat}\nUnit: ${order.kodeUnit}\nOperator: ${order.namaOperator}\nStatus: ${order.status}\n\nMohon koordinasi pengiriman.`)}`}
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center justify-center w-full py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-bold tracking-wide shadow transition-all"
                      >
                        💬 Kirim WA Logistik
                      </a>
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
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-black text-emerald-400">📊 Menu Admin Timesheet & Rekap Spreadsheet</h2>
              <p className="text-xs text-slate-400">Link khusus: <code className="text-emerald-300 bg-black/40 px-2 py-1 rounded">?role=timesheet</code></p>
            </div>
            <button onClick={() => exportToExcel('timesheet')} className="px-3 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl">📥 Export Timesheet CSV</button>
          </div>

          <form onSubmit={handleTimesheetSubmit} className="bg-[#121824] p-4 md:p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-xs font-black uppercase text-amber-400 tracking-wider">Form Input Data Timesheet Baru</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Job ID</label>
                <input type="text" value={timesheetForm.jobId} onChange={(e) => setTimesheetForm({ ...timesheetForm, jobId: e.target.value })} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-lg text-xs text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Tanggal</label>
                <input type="text" value={timesheetForm.tanggal} onChange={(e) => setTimesheetForm({ ...timesheetForm, tanggal: e.target.value })} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-lg text-xs text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Operator</label>
                <input type="text" value={timesheetForm.operator} onChange={(e) => setTimesheetForm({ ...timesheetForm, operator: e.target.value })} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-lg text-xs text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Kode Unit</label>
                <input type="text" value={timesheetForm.unitCode} onChange={(e) => setTimesheetForm({ ...timesheetForm, unitCode: e.target.value })} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-lg text-xs text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Nama Penyewa</label>
                <input type="text" value={timesheetForm.namaPenyewa} onChange={(e) => setTimesheetForm({ ...timesheetForm, namaPenyewa: e.target.value })} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-lg text-xs text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">HM Start</label>
                <input type="text" value={timesheetForm.hmStart} onChange={(e) => setTimesheetForm({ ...timesheetForm, hmStart: e.target.value })} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-lg text-xs text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">HM End</label>
                <input type="text" value={timesheetForm.hmEnd} onChange={(e) => setTimesheetForm({ ...timesheetForm, hmEnd: e.target.value })} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-lg text-xs text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Keterangan</label>
                <input type="text" value={timesheetForm.keterangan} onChange={(e) => setTimesheetForm({ ...timesheetForm, keterangan: e.target.value })} className="w-full px-3 py-2 bg-[#0b0e17] border border-slate-700 rounded-lg text-xs text-white" />
              </div>
            </div>
            <button type="submit" className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl cursor-pointer">
              Simpan Timesheet ke Sistem & Spreadsheet
            </button>
          </form>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#121824] border-b border-slate-800 text-slate-400 uppercase">
                  <th className="py-2.5 px-3">ID</th>
                  <th className="py-2.5 px-3">Tanggal</th>
                  <th className="py-2.5 px-3">Operator</th>
                  <th className="py-2.5 px-3">Unit</th>
                  <th className="py-2.5 px-3">Penyewa</th>
                  <th className="py-2.5 px-3">HM Start</th>
                  <th className="py-2.5 px-3">HM End</th>
                  <th className="py-2.5 px-3 text-amber-400">Total HM</th>
                  <th className="py-2.5 px-3">Keterangan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {timesheetList.map(ts => (
                  <tr key={ts.id} className="hover:bg-[#121824]/40">
                    <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">{ts.id}</td>
                    <td className="py-2.5 px-3 text-slate-300">{ts.tanggal}</td>
                    <td className="py-2.5 px-3 font-bold text-white">{ts.operator}</td>
                    <td className="py-2.5 px-3 text-teal-300 font-bold">{ts.unitCode}</td>
                    <td className="py-2.5 px-3 text-slate-200">{ts.namaPenyewa}</td>
                    <td className="py-2.5 px-3 font-mono">{ts.hmStart}</td>
                    <td className="py-2.5 px-3 font-mono">{ts.hmEnd}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-amber-400">{ts.totalHm}</td>
                    <td className="py-2.5 px-3 text-slate-400">{ts.keterangan}</td>
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
