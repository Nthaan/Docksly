"use client";
import React, { useState } from "react";
import { Plus, Trash2, Share, Pin } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Tabel() {
  const router = useRouter();
  const [pinnedRows, setPinnedRows] = useState({}); // nyimpen status pin tiap row

  const togglePin = (index) => {
    setPinnedRows((prev) => ({
      ...prev,
      [index]: !prev[index], // toggle true/false
    }));
  };

  const allRows = [...Array(10)]; // data dummy
  const pinnedOnly = allRows.filter((_, i) => pinnedRows[i]);

  const TableHeader = () => (
    <div className="grid grid-cols-[40px_40px_1fr_1fr_1fr_1fr_1fr_1fr_80px] bg-[#4D6D74] text-white px-4 py-2 font-semibold">
      <div></div> {/* Checkbox */}
      <div></div> {/* Pin */}
      <div>Title</div>
      <div>Type-purpose</div>
      <div>Category</div>
      <div>Sender</div>
      <div>Ref. Number</div>
      <div>Date</div>
      <div>File</div>
    </div>
  );

  const TableRow = ({ i }) => (
    <div
      className={`grid grid-cols-[40px_40px_1fr_1fr_1fr_1fr_1fr_1fr_80px] items-center px-4 py-2 text-sm border-t border-[#6f9089] ${
        i % 2 === 0 ? "bg-[#A3BFB7]" : "bg-[#9EB4AC]"
      }`}
    >
      <input type="checkbox" className="accent-[#4D6D74]" />

      <button
        onClick={() => togglePin(i)}
        className={`transition-colors ${
          pinnedRows[i] ? "text-yellow-300" : "text-white"
        }`}
      >
        <Pin size={16} className="rotate-45" />
      </button>

      <div
        className="text-white cursor-pointer hover:underline"
        onClick={() => router.push("/dashboard-test/isi")}
      >
        {`Title ${i + 1}`}
      </div>

      <div className="text-white">Type</div>
      <div className="text-white">Dept Code</div>
      <div className="text-white">Sender</div>
      <div className="text-white">xxx/xxx/xxx/202x</div>
      <div className="text-white">xxx/xxx/xxx/202x</div>
      <div className="text-blue-200 underline cursor-pointer">View</div>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Tabel Utama */}
      <div className="w-[90%] max-w-[1200px] bg-[#8CA79D] rounded-2xl overflow-hidden shadow-md">
        <div className="bg-[#41666b] flex items-center justify-between px-4 py-2 rounded-t-2xl">
          <div className="flex items-center gap-2 text-white">
            <Plus size={18} />
            <span className="font-medium">New Entry</span>
          </div>
          <div className="flex items-center gap-4 text-white">
            <Share size={18} />
            <Trash2 size={18} />
          </div>
        </div>

        <TableHeader />
        {allRows.map((_, i) => (
          <TableRow key={i} i={i} />
        ))}
      </div>

      {/* Tabel Pinned */}
      {pinnedOnly.length > 0 && (
        <div className="w-[90%] max-w-[1200px] bg-[#8CA79D] rounded-2xl overflow-hidden shadow-md">
          <div className="bg-[#41666b] flex items-center justify-between px-4 py-2 rounded-t-2xl">
            <div className="flex items-center gap-2 text-white">
              <Pin size={18} />
              <span className="font-medium">Pinned</span>
            </div>
          </div>

          <TableHeader />
          {pinnedOnly.map((_, idx) => {
            // Cari index asli dari row yang dipin
            const originalIndex = allRows.findIndex(
              (_, i) => pinnedRows[i] && allRows[i] === pinnedOnly[idx]
            );
            return <TableRow key={originalIndex} i={originalIndex} />;
          })}
        </div>
      )}
    </div>
  );
}
