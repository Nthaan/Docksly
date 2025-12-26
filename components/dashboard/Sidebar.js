import React from "react";
import Image from "next/image";
import Link from "next/link"; // ⬅️ tambahkan ini

export default function Sidebar({ isOpen }) {
  const menuItems = [
    { icon: "/images/dashboard.png", label: "Dashboard", href: "/dashboard-test/recent" },
    { icon: "/images/archive.png", label: "Archive", href: "/dashboard-test/tabel" },
    { icon: "/images/pinned.png", label: "Pinned", href: "/dashboard-test/pinned" },
    { icon: "/images/statistic.png", label: "Statistics", href: "/dashboard-test/stat" }, // ⬅️ route khusus
  ];

  return (
    <div
      className={`
        h-full bg-[#40616E] text-white fixed top-[88px] left-0 z-20 
        w-64
        transition-transform duration-300 transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="flex flex-col items-center mt-4 space-y-6 font-sans">
        {/* Logo */}
       {/* <Link
  href="https://ganapatih.com/"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center mb-4 gap-2"
>
  <Image
    src="/images/logo.png"
    alt="Logo"
    width={40}
    height={40}
    className="object-contain"
  />
  {isOpen && (
    <span className="text text-sm text-inter font-semibold text-gray-100">
      Ganapatih Akasa Solutions
    </span>
  )}
</Link> */}

        {/* Menu Items */}
        {menuItems.map(({ icon, label, href }, idx) => (
          <Link
            href={href}
            key={idx}
            className="flex items-center gap-4 w-full px-4 hover:bg-[#496A71] py-2 rounded-md cursor-pointer"
          >
            <Image src={icon} alt={label} width={20} height={20} />
            {isOpen && (
              <span className="text-sm font-medium text-gray-100">{label}</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
