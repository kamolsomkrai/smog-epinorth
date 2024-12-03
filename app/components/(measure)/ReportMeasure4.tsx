// components/ReportMeasure4.tsx
"use client";

import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { Measure4Data } from '../../interfaces/measure';

// สีสำหรับกราฟ
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1', '#a4de6c', '#d0ed57', '#ffc0cb'];

interface Props { }

const ReportMeasure4: React.FC<Props> = () => {
  const [data, setData] = useState<Measure4Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeasure4 = async () => {
      try {
        const response = await fetch('/api/measure4'); // เปลี่ยน URL หากจำเป็น
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedData: Measure4Data[] = await response.json();
        setData(fetchedData);
      } catch (err) {
        console.error('Error fetching Measure4 data:', err);
        setError('Failed to fetch Measure4 data');
      } finally {
        setLoading(false);
      }
    };

    fetchMeasure4();
  }, []);

  // ฟังก์ชั่นคำนวณจำนวนวันที่เปิด EOC
  const calculateDaysOpen = (openDate: string, closeDate: string): number => {
    const start = new Date(openDate);
    const end = new Date(closeDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // เตรียมข้อมูลสำหรับ Bar Chart (จำนวนวันที่เปิด EOC ต่อจังหวัด)
  const barChartData = data.map(item => ({
    province: item.province,
    daysOpen: calculateDaysOpen(item.measure4_eoc_open_date, item.measure4_eoc_close_date),
  }));

  // เตรียมข้อมูลสำหรับ Pie Chart (สัดส่วนการจับปรับ)
  const pieChartData = data.map(item => ({
    name: item.province,
    value: item.measure4_law_enforcement_fine,
  }));

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">รายงาน Measure 4</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75" />
          </div>
        ) : (
          <>
            {/* Bar Chart: จำนวนวันที่เปิด EOC ต่อจังหวัด */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">จำนวนวันที่เปิด EOC ต่อจังหวัด</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={barChartData}
                  margin={{
                    top: 20, right: 30, left: 20, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="province" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="daysOpen" fill="#8884d8" name="จำนวนวันที่เปิด EOC" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart: สัดส่วนการจับปรับ */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">สัดส่วนการจับปรับ</h2>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#82ca9d"
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

            {/* ตารางข้อมูล */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">รายละเอียด Measure 4</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead className="bg-green-600 text-white">
                    <tr>
                      <th className="py-3 px-6 text-left font-medium uppercase tracking-wider">จังหวัด</th>
                      <th className="py-3 px-6 text-left font-medium uppercase tracking-wider">วันเปิด EOC</th>
                      <th className="py-3 px-6 text-left font-medium uppercase tracking-wider">วันปิด EOC</th>
                      <th className="py-3 px-6 text-right font-medium uppercase tracking-wider">จำนวนวันที่เปิด EOC</th>
                      <th className="py-3 px-6 text-right font-medium uppercase tracking-wider">การจับปรับ (บาท)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item, index) => {
                      const daysOpen = calculateDaysOpen(item.measure4_eoc_open_date, item.measure4_eoc_close_date);
                      return (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="py-4 px-6 text-gray-800">{item.province}</td>
                          <td className="py-4 px-6 text-gray-800">{item.measure4_eoc_open_date}</td>
                          <td className="py-4 px-6 text-gray-800">{item.measure4_eoc_close_date}</td>
                          <td className="py-4 px-6 text-gray-800 text-right">{daysOpen}</td>
                          <td className="py-4 px-6 text-gray-800 text-right">
                            {new Intl.NumberFormat().format(item.measure4_law_enforcement_fine)}
                          </td>
                        </tr>
                      );
                    })}
                    <tr className="font-bold text-center">
                      <td className="py-2 px-6 border-t">รวม</td>
                      <td className="py-2 px-6 border-t" colSpan={2}></td>
                      <td className="py-2 px-6 border-t">
                        {data.reduce((acc, item) => acc + calculateDaysOpen(item.measure4_eoc_open_date, item.measure4_eoc_close_date), 0)}
                      </td>
                      <td className="py-2 px-6 border-t">
                        {new Intl.NumberFormat().format(data.reduce((acc, item) => acc + item.measure4_law_enforcement_fine, 0))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReportMeasure4;
