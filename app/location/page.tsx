'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// โหลด MapComponent แบบ dynamic โดยไม่ใช้ server-side rendering
const MapComponent = dynamic(() => import('../components/MapComponent'), {
  ssr: false, // ปิดการใช้งาน server-side rendering
});

const LocationPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100">
      {/* Hero Section */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-extrabold text-center text-gray-800">
            แผนที่แสดงตำแหน่งที่เกิดอุบัติเหตุ
          </h1>
          <p className="mt-4 text-center text-gray-600">
            ช่วยให้คุณมองเห็นและวิเคราะห์ตำแหน่งที่เกิดอุบัติเหตุภายในโรงเรียน
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="w-full">
          <MapComponent />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} โรงเรียนปริ้นส์รอยแยลวิทยาลัย. สงวนลิขสิทธิ์.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LocationPage;