// components/ReportMeasure1.tsx
"use client";

import React, { useEffect, useState, useMemo } from 'react';
import PieChartSection from '../(object)/PieChartSection';
import DataTable from '../(object)/DataTable';
import Loading from '../(object)/Loading';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1', '#a4de6c', '#d0ed57', '#ffc0cb'];

interface ActivityData {
  provcode: number;
  provname: string;
  activityType: number;
  description: string;
  activityYear: number;
  activityCount: number;
}

const activityTypeLabels = [
  "เฝ้าระวังและติดตามฯ",
  "สื่อสารความเสี่ยงฯ",
  "ปรับปรุงสภาพแวดล้อมฯ",
  "ส่งเสริมการใช้หน้ากากฯ",
  "เตรียมการรองรับผู้ป่วยฯ",
  "กิจกรรมอื่นๆ"
];

const ReportMeasure1: React.FC = () => {
  const [data, setData] = useState<ActivityData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedActivityType, setSelectedActivityType] = useState<number | null>(null);

  // กรองข้อมูลตามจังหวัด, ปี และประเภทกิจกรรม (ถ้ากำหนด)
  const filteredData = useMemo(() => {
    return data
      .filter(item =>
        item.provname?.toLowerCase().includes(searchTerm.toLowerCase()) &&
        item.activityYear === selectedYear &&
        (selectedActivityType === null || item.activityType === selectedActivityType)
      )
      .sort((a) => a.provcode);
  }, [data, searchTerm, selectedYear, selectedActivityType]);
  const aggregateData = useMemo(() => {
    return {
      totalCount: filteredData.reduce((acc, item) => acc + item.activityCount, 0),
    };
  }, [filteredData]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/measure1');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedData: ActivityData[] = await response.json();
        if (Array.isArray(fetchedData) && fetchedData.length > 0) {
          setData(fetchedData);
          localStorage.setItem('measure1_data', JSON.stringify(fetchedData));
        } else {
          console.warn("API Response ไม่ถูกต้อง:", fetchedData);
          setError("ข้อมูลไม่ถูกต้องจาก API");
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('ไม่สามารถดึงข้อมูลได้');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // จัดกลุ่มข้อมูลสำหรับ Pie Chart โดยรวม activityCount ตามจังหวัด
  const pieChartData = useMemo(() => {
    const provinceCount: { [key: string]: number } = {};
    filteredData.forEach(item => {
      provinceCount[item.provname] = (provinceCount[item.provname] || 0) + item.activityCount;
    });
    return Object.entries(provinceCount).map(([name, value]) => ({ name, value }));
  }, [filteredData]);

  if (error) {
    return <div className="p-6 text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          {loading ? (
            <Loading />
          ) : (
            <>
              <PieChartSection
                title={`จำนวนกิจกรรมต่อจังหวัดในปี ${selectedYear}`}
                data={pieChartData}
                colors={COLORS}
              />
              <div className="mb-6 flex flex-wrap gap-6">
                <div className="flex flex-col flex-1 min-w-[250px]">
                  <label htmlFor="provinceSearch" className="mb-2 text-lg font-medium text-gray-700">
                    ค้นหาจังหวัด:
                  </label>
                  <input
                    id="provinceSearch"
                    type="text"
                    placeholder="ค้นหาจังหวัด..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="flex flex-col flex-1 min-w-[250px]">
                  <label htmlFor="yearFilter" className="mb-2 text-lg font-medium text-gray-700">
                    เลือกปี:
                  </label>
                  <input
                    id="yearFilter"
                    type="number"
                    placeholder="เลือกปี"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
              {/* ปุ่มกรองประเภทกิจกรรม 6 ปุ่ม */}
              <div className="mb-6 flex flex-wrap gap-4">
                {activityTypeLabels.map((label, index) => {
                  const typeValue = index + 1;
                  return (
                    <button
                      key={typeValue}
                      onClick={() =>
                        setSelectedActivityType(prev => (prev === typeValue ? null : typeValue))
                      }
                      className={`px-4 py-2 rounded border transition-colors duration-200 ${selectedActivityType === typeValue
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-blue-100'
                        }`}
                    >
                      {`${label}`}
                    </button>
                  );
                })}
              </div>
              <div className="mt-8">
                <DataTable
                  title={`รายงานกิจกรรมในปี ${selectedYear}`}
                  headers={[
                    'จังหวัด',
                    'ประเภทกิจกรรม',
                    'ปี',
                    'จำนวนกิจกรรม'
                  ]}
                  data={filteredData.map(item => ({
                    'จังหวัด': item.provname,
                    'ประเภทกิจกรรม': item.description,
                    'ปี': item.activityYear,
                    'จำนวนกิจกรรม': item.activityCount,
                  }))}
                  footer={{
                    'จังหวัด': 'เขตสุขภาพที่ 1',
                    'ประเภทกิจกรรม': '',
                    'ปี': '',
                    'จำนวนกิจกรรม': aggregateData.totalCount,
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportMeasure1;
