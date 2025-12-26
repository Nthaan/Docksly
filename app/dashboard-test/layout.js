"use client";
<<<<<<< HEAD
import { useState } from "react";
import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/Sidebar";
import Footer from "../../components/dashboard/Footer";
=======

import React, { useState } from "react";
import Navbar from "../../components/dashboard/Navbar";
import Footer from "../../components/dashboard/Footer";
import Sidebar from "../../components/dashboard/Sidebar";
// import Navbar from "@/components/dashboard/Navbar";
// import Footer from "@/components/dashboard/Footer";
>>>>>>> ac4dc7b032a8defcd42a1ef64d5bc83fd45740e0

export default function PageLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F2E0]">
<<<<<<< HEAD
      {/* Navbar */}
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content Area */}
      <div className="flex flex-1 pt-[88px]">
        <Sidebar isOpen={sidebarOpen} />

        {/* MAIN CONTENT */}
        <main
          className={`
            w-full transition-all duration-300
            ${sidebarOpen ? "ml-64" : "ml-0"}
            pb-32
          `}
        >
          {children}
        </main>
      </div>

      {/* Floating Footer */}
      <Footer />
    </div>
  );
}
=======
      {/* Navbar fixed */}
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-row flex-1 pt-[88px] transition-all duration-300">
        {/* Sidebar (mulai di bawah navbar) */}
        <Sidebar isOpen={sidebarOpen} />

        {/* Konten halaman utama */}
     <main
        className={`
          transition-all duration-300 block w-full
          ${sidebarOpen ? "ml-64" : "ml-0"}
        `}
      >
        {children}
      </main>
      </div>

      <Footer />
    </div>
  );
//   <section className="min-h-screen flex flex-col bg-gradient-to-b from-[#FFF9E5] to-[#496A71]">
//     {/* <Navbar /> */}
//     <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
//     {/* <Footer /> */}
//   </section>
// </div>
}

>>>>>>> ac4dc7b032a8defcd42a1ef64d5bc83fd45740e0
