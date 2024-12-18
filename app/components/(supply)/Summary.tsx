// app/summary/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import BarChartComponent from '../(object)/BarChartComponent';
import PieChartComponent from '../(object)/PieChartComponent';
import ProvincePieChartComponent from '../(object)/ProvincePieChartComponent';
import DataTableComponent from '../(object)/DataTableComponent';
import ExportToExcelButton from '../(object)/ExportToExcelButton';

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
        const response = await fetch('/api/summary'); // Update URL if necessary
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

  // Prepare data for Bar Chart
  const barChartData = supplies.map(supply => ({
    supplyname: supply.supplyname,
    ...provinces.reduce((acc, province) => {
      acc[province] = typeof supply[province] === 'number' ? (supply[province] as number) : parseFloat(supply[province] as string) || 0;
      return acc;
    }, {} as { [key: string]: number }),
    total: calculateTotal(supply),
  }));

  // Prepare data for Pie Chart (Total per supply)
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

            {/* Export to Excel Button */}
            <ExportToExcelButton supplies={supplies} provinces={provinces} />

            {/* Bar Chart */}
            <BarChartComponent data={barChartData} provinces={provinces} colors={COLORS} />

            {/* Pie Chart */}
            <PieChartComponent data={pieChartData} colors={COLORS} title="สัดส่วนเวชภัณฑ์ทั้งหมด" />

            {/* Data Table */}
            <DataTableComponent supplies={supplies} provinces={provinces} calculateTotal={calculateTotal} />

            {/* Pie Charts per Province */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">สัดส่วนเวชภัณฑ์ในแต่ละจังหวัด</h2>
              {provinces.map((province) => {
                const provinceData = supplies.map(supply => ({
                  name: supply.supplyname,
                  value: typeof supply[province] === 'number' ? (supply[province] as number) : parseFloat(supply[province] as string) || 0,
                }));

                return (
                  <ProvincePieChartComponent
                    key={province}
                    province={province}
                    data={provinceData}
                    colors={COLORS}
                  />
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
