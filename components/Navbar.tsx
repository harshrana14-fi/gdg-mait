'use client';

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const links = [
  { label: "Home", to: "#home" },
  { label: "About", to: "#about" },
  { label: "Events", to: "#events" },
  { label: "Certificates", to: "#certificate" },
  { label: "Team", to: "#team" },
  { label: "Contact", to: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Image src="/images/gdglogo1.png" alt="GDG MAIT" width={40} height={40} />
        <span className="text-xl font-bold text-gray-800">GDG MAIT</span>
      </div>

      <div className="hidden md:flex gap-6">
        {links.map(({ label, to }) => (
          <a
            key={label}
            href={to}
            className="text-gray-700 hover:text-blue-600 transition"
          >
            {label}
          </a>
        ))}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center md:hidden">
          {links.map(({ label, to }) => (
            <a
              key={label}
              href={to}
              className="py-3 text-gray-700 hover:text-blue-600 w-full text-center"
              onClick={() => setIsOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
