"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Edit, Bell, Trash2 } from "lucide-react";

export default function DetailSurat() {
  const router = useRouter();
  const { id } = useParams();
  const [surat, setSurat] = useState(null);
  const [error, setError] = useState(null);

  // ✅ Delete handler
  const handleDelete = async () => {
    if (!confirm("Yakin hapus surat ini?")) return;

    try {
      const res = await fetch(`/api/surat/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Surat berhasil dihapus");
        router.push("/dashboard-test/tabel"); // balik ke tabel
      } else {
        alert("Gagal hapus surat");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi error saat hapus surat");
    }
  };

  // ✅ Ambil detail surat
  useEffect(() => {
    const fetchSurat = async () => {
      try {
        const res = await fetch(`/api/surat/${id}`);
        if (!res.ok) throw new Error("Surat tidak ditemukan");
        const data = await res.json();
        setSurat(data);
      } catch (err) {
        console.error("Gagal ambil surat:", err);
        setError(err.message);
      }
    };
    fetchSurat();
  }, [id]);

  // ✅ State: error
  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // ✅ State: loading
  if (!surat) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto my-11">
      {/* Header */}
      <div className="bg-slate-600 px-4 py-3 flex items-center justify-between">
        <button
          className="text-white hover:text-gray-300"
          onClick={() => router.back()}
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex items-center space-x-4 text-white">
          {/* Edit */}
          <div className="relative group">
            <Edit
              className="cursor-pointer hover:text-gray-300"
              size={18}
              onClick={() => router.push(`/dashboard-test/edit/${id}`)}
            />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 
                            bg-black text-white text-xs rounded py-1 px-2 
                            opacity-0 group-hover:opacity-100 transition 
                            pointer-events-none whitespace-nowrap">
              Edit
            </span>
          </div>

          {/* Pin (UI saja) */}
          <div className="relative group">
            <Bell className="cursor-pointer hover:text-gray-300" size={18} />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 
                            bg-black text-white text-xs rounded py-1 px-2 
                            opacity-0 group-hover:opacity-100 transition 
                            pointer-events-none whitespace-nowrap">
              Pin
            </span>
          </div>

          {/* Delete */}
          <div className="relative group">
            <Trash2
              className="cursor-pointer hover:text-red-300"
              size={18}
              onClick={handleDelete}
            />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 
                            bg-black text-white text-xs rounded py-1 px-2 
                            opacity-0 group-hover:opacity-100 transition 
                            pointer-events-none whitespace-nowrap">
              Delete
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-[#C8D3C5] p-4">
        <div className="bg-white rounded-xl p-6">
          {/* Title and Date */}
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-2xl font-semibold text-gray-900">
              {surat.judul}
            </h1>
            <span className="text-sm text-gray-400">
              {new Date(surat.createdAt).toLocaleDateString("id-ID")}
            </span>
          </div>

          {/* Sender Info */}
          <div className="mb-6">
            <p className="text-lg font-semibold text-gray-900 mb-3">
              {surat.pengirim}
            </p>
            <p className="text-sm text-gray-500 mb-1">
              {surat.jenis} — {surat.departemen}
            </p>
            <p className="text-sm text-gray-500">{surat.refNumber}</p>
          </div>

          {/* Summary */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-3">
              Summary
            </h3>
            <div className="border border-gray-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                {surat.isi}
              </p>
            </div>
          </div>

          {/* 📎 Attachment block */}
          {surat.fileUrl && (
            <div className="mt-6">
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Attachment
              </h3>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <a
                  href={surat.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#97AEA1] hover:underline"
                >
                   {surat.fileUrl.split("/").pop()}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
