"use client";
import React, { useState, useEffect } from "react";
import { Plus, Trash2, Share, Pin } from "lucide-react";
import { useRouter } from "next/navigation";
import Form from "../dashboard/Form";

export default function Tabel() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState({}); // ✅ state checkbox

  // Ambil data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/surat/list");
        const data = await res.json();
        if (!data.error) setRows(data);
      } catch (err) {
        console.error("Gagal fetch data:", err);
      }
    };
    fetchData();
  }, []);

  const filteredRows = rows.filter((row) =>
    Object.values({
      judul: row.judul,
      pengirim: row.pengirim,
      tujuan: row.tujuan,
      jenis: row.jenis,
      departemen: row.departemen,
      refNumber: row.refNumber,
    })
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Toggle pin ke DB
  const togglePin = async (id, currentPinned) => {
    try {
      const res = await fetch(`/api/surat/${id}/pin`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pinned: !currentPinned }),
      });
      const updated = await res.json();

      setRows((prev) =>
        prev.map((row) =>
          row.id === id ? { ...row, pinned: updated.pinned } : row
        )
      );
    } catch (err) {
      console.error("Gagal update pinned:", err);
    }
  };

  // ✅ toggle checkbox
  const handleCheckbox = (id) => {
    setSelected((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // ✅ delete multiple surat
  const handleDeleteSelected = async () => {
    const idsToDelete = Object.keys(selected).filter((id) => selected[id]);

    if (idsToDelete.length === 0) {
      alert("Pilih surat dulu yang mau dihapus");
      return;
    }

    if (!confirm(`Yakin mau hapus ${idsToDelete.length} surat?`)) return;

    try {
      for (const id of idsToDelete) {
        await fetch(`/api/surat/${id}`, { method: "DELETE" });
      }

      // update state lokal (hapus surat yang dihapus)
      setRows((prev) => prev.filter((row) => !idsToDelete.includes(row.id)));
      setSelected({});
    } catch (err) {
      console.error("Gagal hapus surat:", err);
    }
  };

  const handleDownloadSelected = () => {
    const selectedRows = rows.filter((row) => selected[row.id] && row.fileUrl);

    if (selectedRows.length === 0) {
      alert("Pilih surat yang punya file untuk di-download");
      return;
    }

    selectedRows.forEach((row) => {
      const link = document.createElement("a");
      link.href = row.fileUrl;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <div className="flex justify-center mt-6">
      <div className="w-[90%] max-w-[1200px] bg-[#8CA79D] rounded-2xl overflow-hidden shadow-md">
        {/* Header Bar */}
        <div className="bg-[#41666b] flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between px-4 py-3 rounded-t-2xl">
          {/* Left */}
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 text-white hover:text-gray-200"
          >
            <Plus size={18} />
            <span className="font-medium">New Entry</span>
          </button>

          <input
            type="text"
            placeholder="Search surat..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 px-3 py-1.5 rounded-md bg-[#F7F3D6] text-[#2F4858] outline-none focus:ring-2 focus:ring-[#5A7D74]"
          />

          <div className="flex items-center gap-4 text-white">
            <button
              onClick={handleDownloadSelected}
              className="hover:text-green-300 transition"
              title="Download selected"
            >
              <Share size={18} />
            </button>
            {/* ✅ Trash sekarang aktif */}
            <button
              onClick={handleDeleteSelected}
              className="hover:text-red-400 transition"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Header Kolom */}
        <div className="grid grid-cols-[40px_40px_1fr_1fr_1fr_1fr_1fr_1fr_80px] bg-[#4D6D74] text-white px-4 py-2 font-semibold">
          <div></div>
          <div></div>
          <div>Title</div>
          <div>Type-purpose</div>
          <div>Category</div>
          <div>Sender</div>
          <div>Ref. Number</div>
          <div>Date</div>
          <div>File</div>
        </div>

        {/* Isi Tabel */}
        {filteredRows.length > 0 ? (
          filteredRows.map((row, i) => (
            <div
              key={row.id}
              className={`grid grid-cols-[40px_40px_1fr_1fr_1fr_1fr_1fr_1fr_80px] items-center px-4 py-2 text-sm border-t border-[#6f9089] ${
                i % 2 === 0 ? "bg-[#A3BFB7]" : "bg-[#9EB4AC]"
              }`}
            >
              {/* ✅ Checkbox aktif */}
              <input
                type="checkbox"
                checked={!!selected[row.id]}
                onChange={() => handleCheckbox(row.id)}
                className="w-4 h-4 accent-[#41666b] cursor-pointer"
              />

              {/* Tombol Pin */}
              <button
                onClick={() => togglePin(row.id, row.pinned)}
                className={`transition-colors ${
                  row.pinned ? "text-yellow-300" : "text-white"
                }`}
              >
                <Pin size={16} className="rotate-45" />
              </button>

              {/* Title */}
              <div
                className="text-white cursor-pointer hover:underline"
                onClick={() => router.push(`/dashboard-test/isi/${row.id}`)}
              >
                {row.judul}
              </div>

              <div className="text-white">
                {row.jenis} - {row.tujuan}
              </div>
              <div className="text-white">{row.departemen}</div>
              <div className="text-white">{row.pengirim}</div>
              <div className="text-white">{row.refNumber}</div>
              <div className="text-white">
                {new Date(row.createdAt).toLocaleDateString("id-ID")}
              </div>
              {row.fileUrl ? (
                <a
                  href={row.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-200 underline cursor-pointer"
                >
                  View
                </a>
              ) : (
                <span className="text-gray-300 italic">No File</span>
              )}
            </div>
          ))
        ) : (
          <div className="px-4 py-3 text-center text-white bg-[#9EB4AC]">
            Belum ada data surat.
          </div>
        )}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="relative rounded-lg shadow-lg w-[90%] sm:w-auto max-h-[90vh] overflow-hidden bg-[#A8B5A2]">
            <div className="overflow-y-auto max-h-[85vh]">
              <Form onCancel={() => setShowForm(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
