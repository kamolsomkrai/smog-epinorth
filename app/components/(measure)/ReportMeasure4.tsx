// components/ReportMeasure4.tsx
"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { Measure4Data } from '../../interfaces/measure';
import PieChartSection from '../(object)/PieChartSection';
import BarChartSection from '../(object)/BarChartSection';
import DataTable from '../(object)/DataTable';
import Loading from '../(object)/Loading';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1', '#a4de6c', '#d0ed57', '#ffc0cb'];

const ReportMeasure4: React.FC = () => {
  const [data, setData] = useState<Measure4Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const formatDate = (dateStr: string | undefined): string | null => {
    if (dateStr) {
      return dateStr.split('T')[0];
    }
    return null;
  };
  // ใช้ useMemo สำหรับการคำนวณ
  const calculateDaysOpen = useMemo(() => (openDate: string, closeDate?: string): number => {
    const start = new Date(openDate);
    const end = closeDate ? new Date(closeDate) : new Date();

    // ตรวจสอบว่าวันที่ถูกต้องหรือไม่
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      console.error("Invalid date format provided."); // เพิ่มข้อความ error 
      return 0;
    }

    // คำนวณความแตกต่างของวันโดยไม่ใช้ Math.ceil 
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return diffDays; // ไม่จำเป็นต้องตรวจสอบ diffDays > 0 อีกต่อไป
  }, []);

  // ใช้ useMemo สำหรับการกรองข้อมูลตาม searchTerm
  const filteredData = useMemo(() => {
    return data.filter(item =>
      item.province.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  useEffect(() => {
    const fetchMeasure1 = async () => {
      setLoading(true); // ตั้งค่า loading ก่อนเรียก API

      try {
        const response = await fetch('/api/measure4');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const fetchedData: Measure4Data[] = await response.json();

        // ตรวจสอบข้อมูลก่อนบันทึกลงใน localStorage
        if (Array.isArray(fetchedData) && fetchedData.length > 0) {
          setData(fetchedData);
          localStorage.setItem('Measure4Data', JSON.stringify(fetchedData));
        } else {
          console.warn("API Response ไม่ถูกต้อง:", fetchedData);
          setError("ข้อมูลไม่ถูกต้องจาก API");
        }
      } catch (err) {
        console.error('Error fetching Measure4 data:', err);
        setError('ไม่สามารถดึงข้อมูล มาตรการที่ 4 ได้');
      } finally {
        setLoading(false); // ยกเลิก loading เมื่อโหลดข้อมูลเสร็จ
      }
    };

    fetchMeasure1();
  }, []);

  // เตรียมข้อมูลสำหรับ Bar Chart (จำนวนวันที่เปิด EOC ต่อจังหวัด)
  const barChartData = useMemo(() => {
    return filteredData.map(item => ({
      province: item.province,
      daysOpen: calculateDaysOpen(item.eoc_open_date, item.eoc_close_date),
    }));
  }, [filteredData, calculateDaysOpen]);

  // เตรียมข้อมูลสำหรับ Pie Chart (สัดส่วนการจับปรับ)
  const pieChartData = useMemo(() => {
    return filteredData.map(item => ({
      name: item.province,
      value: item.law_enforcement_fine,
    }));
  }, [filteredData]);

  // คำนวณรวมสำหรับ Bar Chart และ Pie Chart
  const aggregateData = useMemo(() => {
    return {
      totalDaysOpen: barChartData.reduce((acc, item) => acc + item.daysOpen, 0),
      totalFine: filteredData.reduce((acc, item) => acc + item.law_enforcement_fine, 0),
    };
  }, [barChartData, filteredData]);

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-8 p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* <h1 className="text-4xl font-bold text-gray-800 mb-8">รายงาน Measure 4</h1> */}

        {/* เพิ่ม Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="ค้นหาจังหวัด..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded w-full md:w-1/3"
          />
        </div>

        {loading ? (
          <><Loading /></>
        ) : (
          <>
            {/* ตารางข้อมูล */}
            <DataTable
              title="จำนวนวันที่เปิดEOCต่อจังหวัด"
              headers={[
                'จังหวัด',
                'วันเปิด EOC',
                'วันปิด EOC',
                'จำนวนวันที่เปิด EOC',
                'การจับปรับ (ครั้ง)'
              ]}
              data={filteredData.map(item => ({
                'จังหวัด': item.province,
                'วันเปิด EOC': formatDate(item.eoc_open_date),
                'วันปิด EOC': item.eoc_close_date ? formatDate(item.eoc_close_date) : 'ยังไม่ปิด',
                'จำนวนวันที่เปิด EOC': calculateDaysOpen(item.eoc_open_date, item.eoc_close_date),
                'การจับปรับ (ครั้ง)': new Intl.NumberFormat().format(item.law_enforcement_fine),
              }))}
              footer={{
                'จังหวัด': 'เขตสุขภาพที่ 1',
                'วันเปิด EOC': '',
                'วันปิด EOC': '',
                'จำนวนวันที่เปิด EOC': aggregateData.totalDaysOpen,
                'การจับปรับ (ครั้ง)': new Intl.NumberFormat().format(aggregateData.totalFine),
              }}
            />
            {/* Bar Chart: จำนวนวันที่เปิด EOC ต่อจังหวัด */}
            <BarChartSection
              title="จำนวนวันที่เปิด EOC ต่อจังหวัด"
              data={barChartData}
              keys={['daysOpen']}
              colors={['#8884d8']}
            />

            {/* Pie Chart: สัดส่วนการจับปรับ */}
            <PieChartSection
              title="สัดส่วนการจับปรับ"
              data={pieChartData}
              colors={COLORS}
            />


          </>
        )}
      </div>
    </div>
  );
};

export default ReportMeasure4;
