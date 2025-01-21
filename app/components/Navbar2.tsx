'use client'; // ใช้ client component เนื่องจากมีการใช้ React hooks

import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* โลโก้ */}
          <div className="flex items-center">
            <Link href="/location" className="text-xl md:text-2xl font-extrabold text-white transition-colors duration-300 hover:text-gray-200">
              จุดเสี่ยงอุบัติเหตุภายใน
              <br className="hidden md:block" />
              <span className="text-sm md:text-base">โรงเรียนปริ้นส์รอยแยลวิทยาลัย</span>
            </Link>
          </div>

          {/* เมนูหลัก (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/location"
              className="text-white hover:bg-white/20 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
            >
              หน้าแรก
            </Link>
            <Link
              href="/form"
              className="text-white hover:bg-white/20 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
            >
              แบบสำรวจ
            </Link>
            {/* <Link
              href="/about"
              className="text-white hover:bg-white/20 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
            >
              เกี่ยวกับเรา
            </Link> */}
          </div>

          {/* ปุ่มเมนู Mobile */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-200 focus:outline-none transition-colors duration-300"
            >
              {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* เมนู Mobile */}
        {isOpen && (
          <div className="md:hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            <div className="flex justify-end px-4 pt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 focus:outline-none transition-colors duration-300"
              >
                {/* <FaTimes className="w-6 h-6" /> */}
              </button>
            </div>
            <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
              <Link
                href="/location"
                className="block text-white hover:bg-white/20 hover:text-white px-3 py-3 rounded-md text-lg font-medium transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                หน้าแรก
              </Link>
              <Link
                href="/form"
                className="block text-white hover:bg-white/20 hover:text-white px-3 py-3 rounded-md text-lg font-medium transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                แบบสำรวจ
              </Link>
              {/* <Link
                href="/about"
                className="block text-white hover:bg-white/20 hover:text-white px-3 py-3 rounded-md text-lg font-medium transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                เกี่ยวกับเรา
              </Link> */}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;