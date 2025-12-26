"use client";
import { useState } from "react";
import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/Sidebar";
import Footer from "../../components/dashboard/Footer";

export default function PageLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F2E0]">
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
