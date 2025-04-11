"use client";
import DataTable from '@/app/components/(object)/DataTable';
import React, { useEffect, useState } from 'react';


const PherDashboard = () => {
  // กำหนดวันปัจจุบันเป็น default
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const today = yesterday.toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [injuryData, setInjuryData] = useState<any[]>([]);
  const [injuryTotalData, setInjuryTotalData] = useState<any[]>([]);
  const [riskVehicleData, setRiskVehicleData] = useState<any[]>([]);
  const [riskRTIData, setRiskRTIData] = useState<any[]>([]);
  const [riskRoadData, setRiskRoadData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // ดึงข้อมูลจาก API เมื่อ startDate หรือ endDate เปลี่ยนแปลง
  useEffect(() => {
    const payload = { start_date: startDate, end_date: endDate };
    const fetchData = async () => {
      setLoading(true);
      try {
        const [injuryRes, injuryTotalRes, riskVehicleRes, riskRTIRes, riskRoadRes] = await Promise.all([
          fetch('/api/getinjuryrti', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          }).then(res => res.json()),
          fetch('/api/getinjurytotal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          }).then(res => res.json()),
          fetch('/api/getriskvehicle', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          }).then(res => res.json()),
          fetch('/api/riskrti', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          }).then(res => res.json()),
          fetch('/api/riskroad', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          }).then(res => res.json())
        ]);
        const maxTime = Math.max(...injuryRes.map((item: any) => new Date(item.accident_date).getTime()));
        const latestInjuryData = injuryRes.filter(
          (item: any) => new Date(item.accident_date).getTime() === maxTime
        );
        setInjuryData(latestInjuryData);
        setInjuryTotalData(injuryTotalRes);
        setRiskVehicleData(riskVehicleRes);
        setRiskRTIData(riskRTIRes);
        setRiskRoadData(riskRoadRes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, [startDate, endDate]);

  // กำหนด headers สำหรับแต่ละ DataTable
  const injuryHeaders = [
    "accident_date",
    "hospital_province",
    "injury_case",
    "dead_case",
    "cumulative_injury_2025",
    "cumulative_dead_2025"
  ];
  const injuryHeadersTotal = [
    "accident_date",
    "hospital_province",
    "cumulative_injury_2024",
    "cumulative_injury_2025",
    "injury_pct_diff",
    "cumulative_dead_2024",
    "cumulative_dead_2025",
    "dead_pct_diff",
  ];

  // const injuryHeaders = [
  //   "accident_date",
  //   "hospital_province",
  //   "injury_case",
  //   "dead_case",
  //   "prev_injury_case",
  //   "prev_dead_case",
  //   "injury_pct_diff",
  //   "dead_pct_diff",
  //   "cumulative_injury_2025",
  //   "cumulative_dead_2025",
  //   "cumulative_injury_2024",
  //   "cumulative_dead_2024"
  // ];
  const riskVehicleHeaders = ["vehicle_type", "vehicle_count", "percentage"];
  const riskRTIHeaders = [
    "no_helmet_count",
    "helmet_count",
    "no_helmet_percentage",
    "no_belt_count",
    "belt_count",
    "no_belt_percentage",
    "alcohol_use_count",
    "alcohol_use_percentage",
    "drug_use_count",
    "drug_use_percentage",
    "phone_use_count",
    "phone_use_percentage",
    "total_cases"
  ];
  const riskRoadHeaders = ["accident_location_detail", "count_accident", "percentage"];

  return (
    <div className="p-4">
      {/* DatePicker สำหรับเลือกวันที่ */}
      <div className="mb-4 flex gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </div>
      {loading ? (
        <div className="text-center">กำลังโหลดข้อมูล...</div>
      ) : (
        // แสดง DataTable แบ่งเป็น grid 2 คอลัมน์
        <div className="grid grid-cols-2 gap-4">
          <DataTable
            title="ข้อมูล Injury RTI"
            headers={injuryHeaders}
            data={injuryData}
          />
          <DataTable
            title="ข้อมูล Injury RTI Total"
            headers={injuryHeadersTotal}
            data={injuryTotalData}
          />
          <DataTable
            title="ข้อมูล Risk Vehicle"
            headers={riskVehicleHeaders}
            data={riskVehicleData}
          />
          <DataTable
            title="ข้อมูล Risk RTI"
            headers={riskRTIHeaders}
            data={riskRTIData}
          />
          <DataTable
            title="ข้อมูล Risk Road"
            headers={riskRoadHeaders}
            data={riskRoadData}
          />
        </div>
      )}
    </div>
  );
};

export default PherDashboard;
