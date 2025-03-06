"use client";

import React, { useEffect, useState, useMemo } from "react";
import BarChartComponent from "../(object)/BarChartComponent";
import PieChartComponent from "../(object)/PieChartComponent";
import DataTable from "../(object)/DataTableDashboard";
import Loading from "../(object)/Loading";
import { SupplySummary } from "../../types/types";

interface SupplySummaryData extends SupplySummary {
  id: number;
  provcode: string;
  provname: string;
  hospcode: string;
  hospname: string;
  supplie_id: number;
  suppliename: string;
  quantity_stock: number;
  supplietype: string;
  suppliecatalog: string;
  updated_at: string;
  [key: string]: string | number;
}

// Map รหัสจังหวัด 8 จังหวัดเป็นชื่อจังหวัด
const provinceMap: { [key: string]: string } = {
  "50": "เชียงใหม่",
  "51": "ลำพูน",
  "52": "ลำปาง",
  "53": "แพร่",
  "54": "น่าน",
  "55": "พะเยา",
  "56": "เชียงราย",
  "57": "แม่ฮ่องสอน",
};

// ฟังก์ชัน group ข้อมูลโดยให้แถวคือ supplyname และคอลัมน์เป็น 8 จังหวัด + "เขตสุขภาพที่ 1"
const groupDataBySupply = (data: SupplySummaryData[]): any[] => {
  const result: { [key: string]: any } = {};
  data.forEach((item) => {
    const supplyName = item.suppliename;
    const provinceName = provinceMap[item.provcode];
    if (!provinceName) return;

    if (!result[supplyName]) {
      result[supplyName] = {
        supplyname: supplyName,
        "เชียงใหม่": 0,
        "ลำพูน": 0,
        "ลำปาง": 0,
        "แพร่": 0,
        "น่าน": 0,
        "พะเยา": 0,
        "เชียงราย": 0,
        "แม่ฮ่องสอน": 0,
        "เขตสุขภาพที่ 1": 0,
      };
    }
    result[supplyName][provinceName] += item.quantity_stock;
    result[supplyName]["เขตสุขภาพที่ 1"] += item.quantity_stock;
  });
  return Object.values(result);
};

const Summary: React.FC = () => {
  const [rawData, setRawData] = useState<SupplySummaryData[]>([]);
  const [groupedData, setGroupedData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // กำหนดรายชื่อจังหวัด (order ตามที่ต้องการ) โดยใช้ useMemo เพื่อให้ค่าไม่เปลี่ยนทุก render
  const provinceHeaders = useMemo(
    () => [
      "เชียงใหม่",
      "ลำพูน",
      "ลำปาง",
      "แพร่",
      "น่าน",
      "พะเยา",
      "เชียงราย",
      "แม่ฮ่องสอน",
    ],
    []
  );

  const fetchSummary = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/summary", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: SupplySummaryData[] = await response.json();
      setRawData(data);
      const grouped = groupDataBySupply(data);
      setGroupedData(grouped);
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

  // กำหนด headers สำหรับตาราง โดยคอลัมน์แรกเป็น supplyname ตามด้วย 8 จังหวัด และ "เขตสุขภาพที่ 1"
  const headers = useMemo(
    () => ["supplyname", ...provinceHeaders, "เขตสุขภาพที่ 1"],
    [provinceHeaders]
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
      <div className="container mx-auto">
        {loading ? (
          <Loading />
        ) : (
          <div>
            <h1 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
              สรุปรวมเวชภัณฑ์ เขตสุขภาพที่ 1
            </h1>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <DataTable
                titlespan="ข้อมูลเวชภัณฑ์"
                title="สรุปรวมเวชภัณฑ์"
                headers={headers}
                data={groupedData}
              />
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <BarChartComponent
                data={groupedData}
                provinces={provinceHeaders}
                colors={[
                  "#8884d8",
                  "#82ca9d",
                  "#ffc658",
                  "#ff7f50",
                  "#8dd1e1",
                  "#a4de6c",
                  "#d0ed57",
                  "#ffc0cb",
                ]}
              />
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <PieChartComponent
                title="สัดส่วนเวชภัณฑ์ทั้งหมด"
                data={groupedData.map((item) => ({
                  name: item.supplyname,
                  value: item["เขตสุขภาพที่ 1"],
                }))}
                colors={[
                  "#8884d8",
                  "#82ca9d",
                  "#ffc658",
                  "#ff7f50",
                  "#8dd1e1",
                  "#a4de6c",
                  "#d0ed57",
                  "#ffc0cb",
                ]}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;
