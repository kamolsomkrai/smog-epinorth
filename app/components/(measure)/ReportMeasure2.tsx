// components/ReportMeasure2.tsx
"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { Measure2Data } from '../../interfaces/measure';
import PieChartSection from '../(object)/PieChartSection';
import DataTable from '../(object)/DataTable';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1', '#a4de6c', '#d0ed57', '#ffc0cb'];

const ReportMeasure2: React.FC = () => {
  const [data, setData] = useState<Measure2Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // ใช้ useMemo สำหรับการคำนวณ
  const calculateTotal = useMemo(() => (field: keyof Measure2Data): number => {
    return data.reduce((acc, curr) => acc + (typeof curr[field] === 'number' ? curr[field] : 0), 0);
  }, [data]);

  const safeAdd = useMemo(() => (...nums: (number | undefined)[]): number => {
    return nums
      .filter((num): num is number => num !== undefined)
      .reduce((acc, num) => acc + num, 0);
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
        const response = await fetch('/api/measure2');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const fetchedData: Measure2Data[] = await response.json();

        // ตรวจสอบข้อมูลก่อนบันทึกลงใน localStorage
        if (Array.isArray(fetchedData) && fetchedData.length > 0) {
          setData(fetchedData);
          localStorage.setItem('Measure2Data', JSON.stringify(fetchedData));
        } else {
          console.warn("API Response ไม่ถูกต้อง:", fetchedData);
          setError("ข้อมูลไม่ถูกต้องจาก API");
        }
      } catch (err) {
        console.error('Error fetching Measure1 data:', err);
        setError('ไม่สามารถดึงข้อมูล มาตรการที่ 2 ได้');
      } finally {
        setLoading(false); // ยกเลิก loading เมื่อโหลดข้อมูลเสร็จ
      }
    };

    fetchMeasure1();
  }, []);
  // ข้อมูลสำหรับ Pie Chart ในส่วน 2.1
  const pieData2_1_1 = useMemo(() => {
    return filteredData.map(item => ({
      name: item.province,
      value: typeof item.risk_health_monitoring_1_1 === 'number' ? item.risk_health_monitoring_1_1 : 0,
    }));
  }, [filteredData]);

  const pieData2_1_2 = useMemo(() => {
    return filteredData.map(item => ({
      name: item.province,
      value: typeof item.risk_health_monitoring_1_2 === 'number' ? item.risk_health_monitoring_1_2 : 0,
    }));
  }, [filteredData]);

  // ข้อมูลสำหรับ Pie Chart ในส่วน 2.2
  const pieData2_2 = useMemo(() => [
    { name: 'เด็กเล็ก', value: calculateTotal('child') },
    { name: 'ผู้สูงอายุ', value: calculateTotal('elderly') },
    { name: 'หญิงตั้งครรภ์', value: calculateTotal('pregnant') },
    { name: 'ติดเตียง', value: calculateTotal('bedridden') },
    { name: 'ผู้มีโรคประจำตัว', value: safeAdd(calculateTotal('asthma'), calculateTotal('copd'), calculateTotal('asthma_copd')) },
  ], [calculateTotal, safeAdd]);

  // ข้อมูลสำหรับ Pie Chart ในส่วน 2.3
  // const pieData2_3 = useMemo(() => [
  //   { name: 'Asthma', value: calculateTotal('asthma') },
  //   { name: 'COPD', value: calculateTotal('copd') },
  //   { name: 'Asthma + COPD', value: calculateTotal('asthma_copd') },
  // ], [calculateTotal]);

  // ข้อมูลสำหรับ Pie Chart ในส่วน 4.1
  const pieData2_4_staff = useMemo(() => [
    { name: 'ตรวจสุขภาพโดยเจ้าหน้าที่', value: calculateTotal('health_check_staff') },
    { name: 'ตรวจสุขภาพโดยอาสาสมัคร', value: calculateTotal('health_check_volunteer') },
  ], [calculateTotal]);

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75" />
      </div>
    );
  }

  if (!data.length) {
    return <div className="p-6 text-gray-500">ไม่มีข้อมูลสำหรับรายงาน Measure2</div>;
  }

  return (
    <div className="space-y-8 p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* <h1 className="text-4xl font-bold text-gray-800 mb-8">รายงาน Measure 2</h1> */}

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

        {/* 2.1 เฝ้าระวังและแจ้งเตือนความเสี่ยงต่อสุขภาพ */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">2.1 เฝ้าระวังและแจ้งเตือนความเสี่ยงต่อสุขภาพ</h2>

          {/* Pie Charts สำหรับ 2.1.1 และ 2.1.2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 2.1.1 จัดทาสื่อ Info ประชาสัมพันธ์ */}
            <PieChartSection
              title="2.1.1 จัดทาสื่อ Info ประชาสัมพันธ์"
              data={pieData2_1_1}
              colors={COLORS}
            />

            {/* 2.1.2 แจ้งเตือนความเสี่ยงผ่านช่องทางต่าง ๆ */}
            <PieChartSection
              title="2.1.2 แจ้งเตือนความเสี่ยงผ่านช่องทางต่าง ๆ"
              data={pieData2_1_2}
              colors={COLORS}
            />
          </div>

          {/* ตารางข้อมูลสำหรับ 2.1 */}
          <div className="mt-6 overflow-x-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* ตารางสำหรับ 2.1.1 */}
              <DataTable
                title="จำนวนโครงการสื่อสารและส่งเสริมต่อจังหวัด"
                headers={['จังหวัด', 'จัดทำสื่อInfoประชาสัมพันธ์(ชิ้น)']}
                data={filteredData.map(item => ({
                  'จังหวัด': item.province,
                  'จัดทาสื่อ Info ประชาสัมพันธ์ (ชิ้น)': item.risk_health_monitoring_1_1 ?? 0,
                }))}
                footer={{
                  'จังหวัด': 'เขตสุขภาพที่ 1',
                  'จัดทาสื่อ Info ประชาสัมพันธ์ (ชิ้น)': calculateTotal('risk_health_monitoring_1_1'),
                }}
              />

              {/* ตารางสำหรับ 2.1.2 */}
              <DataTable
                title=""
                headers={['จังหวัด', 'แจ้งเตือนความเสี่ยงผ่านช่องทางต่าง ๆ(ครั้ง)']}
                data={filteredData.map(item => ({
                  'จังหวัด': item.province,
                  'แจ้งเตือนความเสี่ยงผ่านช่องทางต่าง ๆ (ครั้ง)': item.risk_health_monitoring_1_2 ?? 0,
                }))}
                footer={{
                  'จังหวัด': 'เขตสุขภาพที่ 1',
                  'แจ้งเตือนความเสี่ยงผ่านช่องทางต่าง ๆ (ครั้ง)': calculateTotal('risk_health_monitoring_1_2'),
                }}
              />
            </div>
          </div>
        </div>

        {/* 2.2 กลุ่มเปราะบาง */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">2.2 กลุ่มเปราะบาง</h2>

          {/* Pie Chart สำหรับ 2.2 */}
          <PieChartSection
            title=""
            data={pieData2_2}
            colors={COLORS}
          />

          {/* ตารางข้อมูลสำหรับ 2.2 */}
          <div className="mt-6 overflow-x-auto">
            <DataTable
              title=""
              headers={['จังหวัด', 'เด็กเล็ก (คน)', 'ผู้สูงอายุ (คน)', 'หญิงตั้งครรภ์ (คน)', 'ติดเตียง (คน)', 'ผู้มีโรคประจำตัว (คน)']}
              data={filteredData.map(item => ({
                'จังหวัด': item.province,
                'เด็กเล็ก (คน)': item.child ?? 0,
                'ผู้สูงอายุ (คน)': item.elderly ?? 0,
                'หญิงตั้งครรภ์ (คน)': item.pregnant ?? 0,
                'ติดเตียง (คน)': item.bedridden ?? 0,
                'ผู้มีโรคประจำตัว (คน)': safeAdd(item.asthma, item.copd, item.asthma_copd),
              }))}
              footer={{
                'จังหวัด': 'เขตสุขภาพที่ 1',
                'เด็กเล็ก (คน)': calculateTotal('child'),
                'ผู้สูงอายุ (คน)': calculateTotal('elderly'),
                'หญิงตั้งครรภ์ (คน)': calculateTotal('pregnant'),
                'ติดเตียง (คน)': calculateTotal('bedridden'),
                'ผู้มีโรคประจำตัว (คน)': safeAdd(calculateTotal('asthma'), calculateTotal('copd'), calculateTotal('asthma_copd')),
              }}
            />
          </div>
        </div>

        {/* 4. การตรวจสุขภาพ */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">2.3 การตรวจสุขภาพ</h2>

          {/* Pie Charts สำหรับ 4.1 */}

          {/* 4.1 ตรวจสุขภาพโดยเจ้าหน้าที่ */}
          <PieChartSection
            title=""
            data={pieData2_4_staff}
            colors={COLORS}
          />

          {/* ตารางข้อมูลสำหรับ 4 */}
          {/* <div className="overflow-x-auto"> */}
          <div className='mt-6'>
            <DataTable
              title=""
              headers={['จังหวัด', 'ตรวจสุขภาพโดยเจ้าหน้าที่ (คน)', 'ตรวจสุขภาพโดยอาสาสมัคร (คน)']}
              data={filteredData.map(item => ({
                'จังหวัด': item.province,
                'ตรวจสุขภาพโดยเจ้าหน้าที่ (คน)': item.health_check_staff ?? 0,
                'ตรวจสุขภาพโดยอาสาสมัคร (คน)': item.health_check_volunteer ?? 0,
              }))}
              footer={{
                'จังหวัด': 'เขตสุขภาพที่ 1',
                'ตรวจสุขภาพโดยเจ้าหน้าที่ (คน)': calculateTotal('health_check_staff'),
                'ตรวจสุขภาพโดยอาสาสมัคร (คน)': calculateTotal('health_check_volunteer'),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportMeasure2;
