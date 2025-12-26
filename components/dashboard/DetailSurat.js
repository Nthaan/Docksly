import { ArrowLeft, Edit, Bell, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DetailSurat() {
  const router = useRouter();

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

        {/* Icons with Tooltip */}
        <div className="flex items-center space-x-4 text-white">
          <div className="relative group">
            <Edit className="cursor-pointer hover:text-gray-300" size={18} />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
              Edit
            </span>
          </div>

          <div className="relative group">
            <Bell className="cursor-pointer hover:text-gray-300" size={18} />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
              Pin
            </span>
          </div>

          <div className="relative group">
            <Trash2 className="cursor-pointer hover:text-red-300" size={18} />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
              Delete
            </span>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="bg-[#C8D3C5] p-4">
        <div className="bg-white rounded-xl p-6">
          {/* Title and Date */}
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-2xl font-semibold text-gray-900">Title</h1>
            <span className="text-sm text-gray-400">dd/mm/yyyy</span>
          </div>

          {/* Sender Info */}
          <div className="mb-6">
            <p className="text-lg font-semibold text-gray-900 mb-3">Sender</p>
            <p className="text-sm text-gray-500 mb-1">Type — Category</p>
            <p className="text-sm text-gray-500">Ref. Number</p>
          </div>

          {/* Summary */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-3">
              Summary
            </h3>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum at nibh sit amet magna rutrum auctor. Maecenas a
                augue pulvinar, dapibus tortor sit amet, vulputate turpis.
                Pellentesque accumsan tincidunt mi, id sagittis sem laoreet a.
                Vivamus quam odio, pellentesque id condimentum quis, dictum at
                diam. Vestibulum consequat mauris nec iaculis dapibus. Cras
                varius pellentesque tincidunt. Quisque ultricies volutpat
                gravida. Suspendisse justo nunc, mollis ac mi quis, auctor
                pharetra augue. Donec posuere pharetra felis a feugiat. Sed
                fringilla tincidunt nunc, vel elementum ex vehicula nec. Morbi
                vel dui faucibus, dictum mauris consequat, aliquam turpis. Proin
                sagittis lorem sed risus iuctus pulvinar. Vestibulum ante ipsum
                primis in faucibus orci luctus et ultrices posuere cubilia
                curae; Suspendisse semper metus eu euismod blandit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
