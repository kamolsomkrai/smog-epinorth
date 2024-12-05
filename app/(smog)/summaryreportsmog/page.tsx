// pages/report.tsx
"use client";

import React, { useState } from 'react';
import ReportMeasure1 from '../../components/(measure)/ReportMeasure1';
import ReportMeasure2 from '../../components/(measure)/ReportMeasure2';
import ReportMeasure3 from '../../components/(measure)/ReportMeasure3';
import ReportMeasure4 from '../../components/(measure)/ReportMeasure4';

const ReportPage: React.FC = () => {
  const [selectedMeasure, setSelectedMeasure] = useState<number>(1);

  const renderReport = () => {
    switch (selectedMeasure) {
      case 1:
        return <ReportMeasure1 />;
      case 2:
        return <ReportMeasure2 />;
      case 3:
        return <ReportMeasure3 />;
      case 4:
        return <ReportMeasure4 />;
      default:
        return <ReportMeasure1 />;
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">รายงานสรุป</h1>

        {/* ปุ่มสำหรับเลือก Measure */}
        <div className="mb-6 flex space-x-4">
          <button
            onClick={() => setSelectedMeasure(1)}
            className={`px-4 py-2 rounded-md font-semibold ${selectedMeasure === 1
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-200'
              }`}
          >
            มาตรการที่ 1
          </button>
          <button
            onClick={() => setSelectedMeasure(2)}
            className={`px-4 py-2 rounded-md font-semibold ${selectedMeasure === 2
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-200'
              }`}
          >
            มาตรการที่ 2
          </button>
          <button
            onClick={() => setSelectedMeasure(3)}
            className={`px-4 py-2 rounded-md font-semibold ${selectedMeasure === 3
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-200'
              }`}
          >
            มาตรการที่ 3
          </button>
          <button
            onClick={() => setSelectedMeasure(4)}
            className={`px-4 py-2 rounded-md font-semibold ${selectedMeasure === 4
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-200'
              }`}
          >
            มาตรการที่ 4
          </button>
        </div>

        {/* แสดงรายงานตาม Measure ที่เลือก */}
        <div>
          {renderReport()}
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
