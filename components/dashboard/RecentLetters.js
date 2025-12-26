"use client";
import { FaUserNinja } from "react-icons/fa";
import { useRouter } from "next/navigation";
import useSWR from "swr";

// fetcher untuk SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function RecentLetters() {
  const router = useRouter();

  // pakai SWR dengan auto refresh tiap 5 detik
  const { data: letters = [], error, isLoading } = useSWR(
    "/api/surat/recent",
    fetcher,
    { refreshInterval: 5000 } 
  );

  const getAvatar = (jenis) => {
    if (jenis === "Formal") return "/images/scroll-text.png";
    if (jenis === "NonFormal") return "/images/loader-pinwheel.png";
    return "/images/default-avatar.png";
  };

  return (
    <div className="grid grid-cols-12 mt-7">
      <div className="col-span-12 bg-[#CED4C1] rounded-xl overflow-hidden shadow-md flex flex-col h-full">
        <div className="bg-[#4C6A6D] text-white px-4 py-3 font-semibold flex items-center gap-2 text-sm md:text-base">
          <FaUserNinja size={18} />
          <span>Recent Letters</span>
        </div>

        <div className="px-4 py-3 flex flex-col gap-3 flex-1 justify-between">
          <div className="space-y-3">
            {isLoading ? (
              <p className="text-gray-500 text-sm">Loading...</p>
            ) : error ? (
              <p className="text-red-500 text-sm">Gagal ambil data.</p>
            ) : letters.length > 0 ? (
              letters.map((letter) => (
                <div
                  key={letter.id}
                  className="flex items-center justify-between border-b pb-2 text-sm text-[#0D7B84] cursor-pointer rounded-md transition-all duration-200 hover:bg-[#d2dbc8] hover:scale-[1.02]"
                  onClick={() => router.push(`/dashboard-test/isi/${letter.id}`)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={getAvatar(letter.jenis)}
                      alt="user avatar"
                      className="w-6 h-6 rounded-full object-cover border border-gray-400"
                    />
                    <span className="text-xs md:text-sm truncate max-w-[250px] hover:underline">
                      {letter.judul} - {letter.tujuan} - {letter.jenis} -{" "}
                      {new Date(letter.createdAt).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">Belum ada surat terbaru.</p>
            )}
          </div>

          <div className="text-right mt-4">
            <button
              onClick={() => router.push("/dashboard-test/tabel")}
              className="text-[#007C98] text-xs px-4 py-1 rounded-md hover:bg-[#d2dbc8] transition"
            >
              View All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
