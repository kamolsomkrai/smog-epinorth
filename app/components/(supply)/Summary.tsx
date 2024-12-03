// app/summary/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

interface SupplySummary {
  supplyname: string;
  category: string;
  [key: string]: string | number;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1', '#a4de6c', '#d0ed57', '#ffc0cb'];

const Summary: React.FC = () => {
  const [provinces, setProvinces] = useState<string[]>([]);
  const [supplies, setSupplies] = useState<SupplySummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch('/api/summary'); // เปลี่ยน URL หากจำเป็น
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProvinces(data.provinces);
        setSupplies(data.supplies);
      } catch (err) {
        console.error('Error fetching summary:', err);
        setError('Failed to fetch summary data');
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const calculateTotal = (supply: SupplySummary) => {
    return provinces.reduce((acc, province) => {
      const value = typeof supply[province] === 'number' ? (supply[province] as number) : parseFloat(supply[province] as string) || 0;
      return acc + value;
    }, 0);
  };

  // เตรียมข้อมูลสำหรับ Bar Chart
  const barChartData = supplies.map(supply => ({
    supplyname: supply.supplyname,
    ...provinces.reduce((acc, province) => {
      acc[province] = typeof supply[province] === 'number' ? (supply[province] as number) : parseFloat(supply[province] as string) || 0;
      return acc;
    }, {} as { [key: string]: number }),
    total: calculateTotal(supply),
  }));

  // เตรียมข้อมูลสำหรับ Pie Chart (รวมทั้งหมด)
  const pieChartData = supplies.map(supply => ({
    name: supply.supplyname,
    value: calculateTotal(supply),
  }));

  if (error) {
    return <div className="p-6">{error}</div>;
  }

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75" />
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">สรุปรวมเวชภัณฑ์</h1>

            {/* Bar Chart */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">ปริมาณเวชภัณฑ์แต่ละประเภทในแต่ละจังหวัด</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={barChartData}
                  margin={{
                    top: 20, right: 30, left: 20, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="supplyname" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {provinces.map((province, index) => (
                    <Bar key={province} dataKey={province} fill={COLORS[index % COLORS.length]} />
                  ))}
                  <Bar dataKey="total" fill="#d0ed57" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">สัดส่วนเวชภัณฑ์ทั้งหมด</h2>
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
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend layout="vertical" align="right" verticalAlign="middle" />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* ตารางข้อมูล */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead className="bg-green-600 text-white">
                    <tr>
                      <th className="py-3 px-6 text-left font-medium uppercase tracking-wider">
                        เวชภัณฑ์
                      </th>
                      {provinces.map(province => (
                        <th key={province} className="py-3 px-6 text-right font-medium uppercase tracking-wider">
                          {province}
                        </th>
                      ))}
                      <th className="py-3 px-6 text-right font-medium uppercase tracking-wider">
                        เขต1
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {supplies.map((supply, index) => {
                      const total = calculateTotal(supply);

                      return (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="py-4 px-6 text-gray-800">{supply.supplyname}</td>
                          {provinces.map(province => (
                            <td key={province} className="py-4 px-6 text-gray-800 text-right">
                              {new Intl.NumberFormat().format(supply[province] || 0)}
                            </td>
                          ))}
                          <td className="py-4 px-6 text-gray-800 text-right">
                            {new Intl.NumberFormat().format(total)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* เพิ่ม Pie Chart เพื่อแสดงสัดส่วนเวชภัณฑ์ในแต่ละจังหวัด */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">สัดส่วนเวชภัณฑ์ในแต่ละจังหวัด</h2>
              {provinces.map((province, index) => {
                const provinceData = supplies.map(supply => ({
                  name: supply.supplyname,
                  value: typeof supply[province] === 'number' ? (supply[province] as number) : parseFloat(supply[province] as string) || 0,
                }));

                return (
                  <div key={province} className="mb-8">
                    <h3 className="text-xl font-semibold mb-2 text-gray-600">{province}</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={provinceData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#82ca9d"
                          label
                        >
                          {provinceData.map((entry, idx) => (
                            <Cell key={`cell-${province}-${idx}`} fill={COLORS[idx % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend layout="vertical" align="right" verticalAlign="middle" />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;
