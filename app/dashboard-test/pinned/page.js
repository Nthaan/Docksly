"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PinnedPage() {
  const [rows, setRows] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPinned = async () => {
      try {
        const res = await fetch("/api/surat/list?pinned=true");
        const data = await res.json();
        setRows(data);
      } catch (err) {
        console.error("Gagal fetch pinned:", err);
      }
    };
    fetchPinned();
  }, []);

  return (
    <div className="flex justify-center mt-8">
      <div className="w-[90%] max-w-[1200px] bg-[#8CA79D] rounded-2xl overflow-hidden shadow-md">
        <div className="bg-[#41666b] px-4 py-2 text-white font-semibold">
          Pinned Letters
        </div>

        {/* header kolom sama kayak tabel biasa */}
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] bg-[#4D6D74] text-white px-4 py-2 font-semibold">
          <div>Title</div>
          <div>Type-purpose</div>
          <div>Sender</div>
          <div>Ref. Number</div>
          <div>Date</div>
        </div>

        {rows.length > 0 ? (
          rows.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] px-4 py-2 text-sm border-t border-[#6f9089] bg-[#A3BFB7]"
            >
              <div
                className="text-white cursor-pointer hover:underline"
                onClick={() => router.push(`/dashboard-test/isi/${row.id}`)}
              >
                {row.judul}
              </div>
              <div className="text-white">{row.jenis} - {row.tujuan}</div>
              <div className="text-white">{row.pengirim}</div>
              <div className="text-white">{row.refNumber}</div>
              <div className="text-white">
                {new Date(row.createdAt).toLocaleDateString("id-ID")}
              </div>
            </div>
          ))
        ) : (
          <div className="px-4 py-3 text-center text-white bg-[#9EB4AC]">
            Belum ada surat yang di-pin.
          </div>
        )}
      </div>
    </div>
  );
}
