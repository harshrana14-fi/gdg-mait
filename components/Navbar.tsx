'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useState } from 'react';


export default function Navbar() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-blue-700 font-bold text-xl">
          <Image src="/images/gdglogo1.png" alt="desc" width={60} height={60} />
          <span>GDG MAIT</span>
        </Link>

        {/* Links */}
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className={cn(
              'relative text-gray-700 font-medium hover:text-purple-700 transition hover-underline',
              pathname === '/' && 'text-purple-700'
            )}
          >
            Home
          </Link>

          <Link
            href="/events"
            className={cn(
              'relative text-gray-700 font-medium hover:text-purple-700 transition hover-underline',
              pathname.startsWith('/events') && 'text-purple-700'
            )}
          >
            Events
          </Link>

          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="relative text-gray-700 font-medium hover:text-purple-700 transition hover-underline"
            >
              Societies
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border rounded-xl z-50 overflow-hidden">
                <Link
                  href="/auth/society/login"
                  className="block px-5 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition"
                  onClick={() => setDropdownOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/auth/society/register"
                  className="block px-5 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition"
                  onClick={() => setDropdownOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
