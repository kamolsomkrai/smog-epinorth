"use client";

import React, { useEffect, useState, useMemo } from "react";
import BarChartComponent from "../(object)/BarChartComponent";
import PieChartComponent from "../(object)/PieChartComponent";
// import ProvincePieChartComponent from "../(object)/ProvincePieChartComponent";
import DataTableComponent from "../(object)/DataTableComponent";
import ExportToExcelButton from "../(object)/ExportToExcelButton";
import Loading from "../(object)/Loading";

interface SupplySummary {
  supplyname: string;
  category: string;
  [key: string]: string | number;
}

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f50",
  "#8dd1e1",
  "#a4de6c",
  "#d0ed57",
  "#ffc0cb",
];

const Summary: React.FC = () => {
  const [provinces, setProvinces] = useState<string[]>([]);
  const [supplies, setSupplies] = useState<SupplySummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/summary");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setProvinces(data.provinces);
      setSupplies(data.supplies);
    } catch (err) {
      console.error("Error fetching summary:", err);
      setError("ไม่สามารถดึงข้อมูลได้ในขณะนี้");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const calculateTotal = (supply: SupplySummary) =>
    provinces.reduce(
      (acc, province) =>
        acc +
        (typeof supply[province] === "number"
          ? (supply[province] as number)
          : parseFloat(supply[province] as string) || 0),
      0
    );

  const barChartData = useMemo(
    () =>
      supplies.map((supply) => ({
        supplyname: supply.supplyname,
        ...provinces.reduce(
          (acc, province) => ({
            ...acc,
            [province]:
              typeof supply[province] === "number"
                ? (supply[province] as number)
                : parseFloat(supply[province] as string) || 0,
          }),
          {}
        ),
        total: calculateTotal(supply),
      })),
    [supplies, provinces]
  );

  const pieChartData = useMemo(
    () =>
      supplies.map((supply) => ({
        name: supply.supplyname,
        value: calculateTotal(supply),
      })),
    [supplies, provinces]
  );

  if (error) {
    return (
      <div className="p-6 text-center text-red-500 text-lg font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <><Loading /></>
        ) : (
          <div>
            <h1 className="text-4xl font-extrabold mb-6 text-gray-800 text-center">
              สรุปรวมเวชภัณฑ์
            </h1>

            {/* Export to Excel */}
            <div className="mb-6 flex justify-end">
              <ExportToExcelButton supplies={supplies} provinces={provinces} />
            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              {/* <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                สรุปจำนวนเวชภัณฑ์ตามจังหวัด
              </h2> */}
              <BarChartComponent
                data={barChartData}
                provinces={provinces}
                colors={COLORS}
              />
            </div>

            {/* Pie Chart */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              {/* <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                สัดส่วนเวชภัณฑ์ทั้งหมด
              </h2> */}
              <PieChartComponent title="สัดส่วนเวชภัณฑ์ทั้งหมด" data={pieChartData} colors={COLORS} />
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <DataTableComponent
                supplies={supplies}
                provinces={provinces}
                calculateTotal={calculateTotal}
              />
            </div>

            {/* Pie Charts per Province */}
            {/* <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                สัดส่วนเวชภัณฑ์ในแต่ละจังหวัด
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {provinces.map((province) => {
                  const provinceData = supplies.map((supply) => ({
                    name: supply.supplyname,
                    value:
                      typeof supply[province] === "number"
                        ? (supply[province] as number)
                        : parseFloat(supply[province] as string) || 0,
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
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;
