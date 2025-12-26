"use client";

import React from "react";
import { Search, Filter } from "lucide-react";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  return (
    <nav className="bg-[#2F4858] text-white py-6 px-[120px] grid grid-cols-12 items-center fixed top-0 left-0 right-0 z-50 rounded-b-2xl">
      {/* Segitiga toggle sidebar */}
      <div className="col-span-2 flex justify-start">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`w-0 h-0 border-l-[12px] border-r-[12px] border-b-[18px] border-transparent border-b-[#F7F2E0] transition-transform duration-300 
            ${sidebarOpen ? "rotate-90" : "rotate-0"}`}
        />
      </div>

      {/* Search input
      <div className="col-span-8 flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search by keywords"
            className="bg-[#F7F3D6] text-[#97AEA1] px-4 py-2 rounded-md w-full pr-20"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2 text-[#5A7D74]">
            <button
              onClick={() => console.log("Search clicked")}
              className="p-1 rounded-md hover:scale-110 active:scale-90 transition-transform duration-150"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => console.log("Filter clicked")}
              className="p-1 rounded-md hover:scale-110 active:scale-90 transition-transform duration-150"
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div> */}

      {/* User Info */}
      <div className="col-span-10 flex justify-end items-center gap-2 truncate">
        <p className="truncate">Hi, Anaxagoras!</p>
        <img
          src="/images/anaxa icon.png"
          alt="User profile"
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>
    </nav>
  );
}
