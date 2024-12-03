// components/ReportMeasure1.tsx
"use client";

import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { Measure1Data } from '../../interfaces/measure';

interface Props { }

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1', '#a4de6c', '#d0ed57', '#ffc0cb'];

const ReportMeasure1: React.FC<Props> = () => {
  const [data, setData] = useState<Measure1Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeasure1 = async () => {
      try {
        const response = await fetch('/api/measure1', {
          method: "GET",
          // credentials: "include",
        }); // เปลี่ยน URL หากจำเป็น
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedData: Measure1Data[] = await response.json();
        setData(fetchedData);
      } catch (err) {
        console.error('Error fetching Measure1 data:', err);
        setError('Failed to fetch Measure1 data');
      } finally {
        setLoading(false);
      }
    };

    fetchMeasure1();
  }, []);

  // ตัวอย่างการสรุปข้อมูลสำหรับ Pie Chart (จำนวนโครงการต่อจังหวัด)
  const pieChartData = data.map(item => ({
    name: item.province,
    value: 1, // สมมติว่าแต่ละจังหวัดมี 1 โครงการในแต่ละ measure
  }));

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">รายงาน Measure 1</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75" />
          </div>
        ) : (
          <>
            {/* Pie Chart: จำนวนโครงการต่อจังหวัด */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">จำนวนโครงการสื่อสารและส่งเสริมต่อจังหวัด</h2>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    label
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-pie-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend layout="vertical" align="right" verticalAlign="middle" />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* ตารางข้อมูล Measure1 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">รายละเอียด Measure 1</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead className="bg-green-600 text-white">
                    <tr>
                      <th className="py-3 px-6 text-left font-medium uppercase tracking-wider">จังหวัด</th>
                      <th className="py-3 px-6 text-left font-medium uppercase tracking-wider">1.1 สื่อสารสร้างความรอบรู้/สร้างความเข้มแข็งของชุมชนและประชาชน</th>
                      <th className="py-3 px-6 text-left font-medium uppercase tracking-wider">1.2 ส่งเสริมองค์กรลดมลพิษ Green Energy</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="py-4 px-6 text-gray-800">{item.province}</td>
                        <td className="py-4 px-6 text-gray-800">{item.measure1_1}</td>
                        <td className="py-4 px-6 text-gray-800">{item.measure1_2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ตัวอย่างการสรุปข้อมูลเพิ่มเติม (Word Frequency) */}
            {/* คุณสามารถเพิ่มการวิเคราะห์เชิงข้อความเพิ่มเติม เช่น การนับคำที่ใช้บ่อย เพื่อแสดงในกราฟ */}
            {/* ตัวอย่างนี้จะไม่รวมเนื่องจากความซับซ้อน แต่คุณสามารถใช้ไลบรารีเพิ่มเติมเช่น wordcloud.js หากต้องการ */}
          </>
        )}
      </div>
    </div>
  );
};

export default ReportMeasure1;
