// components/ReportMeasure1.tsx
"use client";

import React, { useEffect, useState, useMemo } from 'react';
// import { Measure1Data } from '../../interfaces/measure';
import PieChartSection from '../(object)/PieChartSection';
import DataTable from '../(object)/DataTable';
import Loading from '../(object)/Loading';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1', '#a4de6c', '#d0ed57', '#ffc0cb'];

interface measure1_1 {
  "province": string,
  "measure1_1": number,
  "measure1_2": number,

}

const ReportMeasure1: React.FC = () => {
  const [data, setData] = useState<measure1_1[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // ใช้ useMemo สำหรับการคำนวณ
  const calculateTotal = useMemo(() => (field: keyof measure1_1): number => {
    return data.reduce((acc, curr) => acc + (typeof curr[field] === 'number' ? curr[field] : 0), 0);
  }, [data]);

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
        const response = await fetch('/api/measure1');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const fetchedData: measure1_1[] = await response.json();

        // ตรวจสอบข้อมูลก่อนบันทึกลงใน localStorage
        if (Array.isArray(fetchedData) && fetchedData.length > 0) {
          setData(fetchedData);
          localStorage.setItem('measure1_1', JSON.stringify(fetchedData));
        } else {
          console.warn("API Response ไม่ถูกต้อง:", fetchedData);
          setError("ข้อมูลไม่ถูกต้องจาก API");
        }
      } catch (err) {
        console.error('Error fetching Measure1 data:', err);
        setError('ไม่สามารถดึงข้อมูล Measure1 ได้');
      } finally {
        setLoading(false); // ยกเลิก loading เมื่อโหลดข้อมูลเสร็จ
      }
    };

    fetchMeasure1();
  }, []);



  // ข้อมูลสำหรับ Pie Chart: จำนวนโครงการต่อจังหวัด
  const pieChartData = useMemo(() => {
    const projectCount: { [key: string]: number } = {};
    filteredData.forEach(item => {
      projectCount[item.province] = (item.measure1_1 || 0);
    });
    return Object.entries(projectCount).map(([name, value]) => ({ name, value }));
  }, [filteredData]);

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-8 p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">


        {loading ? (
          <><Loading /></>
        ) : (
          <>
            <div className="mb-4">
              <input
                type="text"
                placeholder="ค้นหาจังหวัด..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border rounded w-full md:w-1/3"
              />
            </div>
            {/* Pie Chart: จำนวนโครงการต่อจังหวัด */}
            <PieChartSection
              title="จำนวนโครงการสื่อสารและส่งเสริมต่อจังหวัด"
              data={pieChartData}
              colors={COLORS}
            />

            {/* ตารางข้อมูล Measure1 */}
            <DataTable
              title="จำนวนโครงการสื่อสารและส่งเสริม"
              headers={[
                'จังหวัด',
                '1.1 สื่อสารสร้างความรอบรู้/สร้างความเข้มแข็งของชุมชนและประชาชน (ครั้ง)',
                '1.2 ส่งเสริมองค์กรลดมลพิษ Green Energy (ครั้ง)'
              ]}
              data={filteredData.map(item => ({
                'จังหวัด': item.province,
                '1.1 สื่อสารสร้างความรอบรู้/สร้างความเข้มแข็งของชุมชนและประชาชน (ครั้ง)': item.measure1_1 ?? 0,
                '1.2 ส่งเสริมองค์กรลดมลพิษ Green Energy (ครั้ง)': item.measure1_2 ?? 0,
              }))}
              footer={{
                'จังหวัด': 'เขตสุขภาพที่ 1',
                '1.1 สื่อสารสร้างความรอบรู้/สร้างความเข้มแข็งของชุมชนและประชาชน (ครั้ง)': calculateTotal('measure1_1'),
                '1.2 ส่งเสริมองค์กรลดมลพิษ Green Energy (ครั้ง)': calculateTotal('measure1_2'),
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ReportMeasure1;
