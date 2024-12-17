// components/ReportMeasure3.tsx
"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { Measure3Data } from '../../interfaces/measure';
import PieChartSection from '../(object)/PieChartSection';
import BarChartSection from '../(object)/BarChartSection';
import DataTable from '../(object)/DataTable';

// สีสำหรับกราฟ
const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1', '#a4de6c',
  '#d0ed57', '#ffc0cb', '#d88884', '#84d8f8', '#ca82d8', '#c6ca82'
];

const ReportMeasure3: React.FC = () => {
  const [data, setData] = useState<Measure3Data[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // ฟังก์ชั่นคำนวณจำนวนวันที่เปิด EOC
  const calculateTotal = useMemo(() => (field: keyof Measure3Data): number => {
    return data?.reduce((acc, curr) => acc + (typeof curr[field] === 'number' ? curr[field] : 0), 0) || 0;
  }, [data]);

  // ฟังก์ชันเพื่อรวมข้อมูลจากหลายจังหวัด
  const aggregateData = (data: Measure3Data[]) => {
    return data.reduce((acc, curr) => {
      acc.pollution_clinic_open += curr.pollution_clinic_open;
      acc.pollution_clinic_service += curr.pollution_clinic_service;
      acc.online_clinic_open += curr.online_clinic_open;
      acc.online_clinic_service += curr.online_clinic_service;
      acc.nursery_dust_free_open += curr.nursery_dust_free_open;
      acc.nursery_dust_free_service += curr.nursery_dust_free_service;
      acc.gov_dust_free_open += curr.gov_dust_free_open;
      acc.gov_dust_free_service += curr.gov_dust_free_service;
      acc.active_teams_3_doctors_total += curr.active_teams_3_doctors_total;
      acc.active_teams_3_doctors_add += curr.active_teams_3_doctors_add;
      acc.active_teams_mobile_total += curr.active_teams_mobile_total;
      acc.active_teams_mobile_add += curr.active_teams_mobile_add;
      acc.active_teams_citizens_total += curr.active_teams_citizens_total;
      acc.active_teams_citizens_add += curr.active_teams_citizens_add;
      acc.elderly_N95_mask += curr.elderly_N95_mask;
      acc.elderly_surgical_mask += curr.elderly_surgical_mask;
      acc.children_N95_mask += curr.children_N95_mask;
      acc.children_surgical_mask += curr.children_surgical_mask;
      acc.pregnant_N95_mask += curr.pregnant_N95_mask;
      acc.pregnant_surgical_mask += curr.pregnant_surgical_mask;
      acc.bedridden_N95_mask += curr.bedridden_N95_mask;
      acc.bedridden_surgical_mask += curr.bedridden_surgical_mask;
      acc.disease_N95_mask += curr.disease_N95_mask;
      acc.disease_surgical_mask += curr.disease_surgical_mask;
      acc.sky_doctor += curr.sky_doctor;
      acc.ambulance += curr.ambulance;
      return acc;
    }, {
      pollution_clinic_open: 0,
      pollution_clinic_service: 0,
      online_clinic_open: 0,
      online_clinic_service: 0,
      nursery_dust_free_open: 0,
      nursery_dust_free_service: 0,
      gov_dust_free_open: 0,
      gov_dust_free_service: 0,
      active_teams_3_doctors_total: 0,
      active_teams_3_doctors_add: 0,
      active_teams_mobile_total: 0,
      active_teams_mobile_add: 0,
      active_teams_citizens_total: 0,
      active_teams_citizens_add: 0,
      elderly_N95_mask: 0,
      elderly_surgical_mask: 0,
      children_N95_mask: 0,
      children_surgical_mask: 0,
      pregnant_N95_mask: 0,
      pregnant_surgical_mask: 0,
      bedridden_N95_mask: 0,
      bedridden_surgical_mask: 0,
      disease_N95_mask: 0,
      disease_surgical_mask: 0,
      sky_doctor: 0,
      ambulance: 0,
    } as Measure3Data);
  };

  // ใช้ useMemo สำหรับการคำนวณ
  const aggregateMemo = useMemo(() => {
    if (data) {
      return aggregateData(data);
    }
    return null;
  }, [data]);

  // ใช้ useMemo สำหรับการกรองข้อมูลตาม searchTerm
  const filteredData = useMemo(() => {
    return data?.filter(item =>
      item.province.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
  }, [data, searchTerm]);

  useEffect(() => {
    const fetchMeasure1 = async () => {
      setLoading(true); // ตั้งค่า loading ก่อนเรียก API

      try {
        const response = await fetch('/api/measure3');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const fetchedData: Measure3Data[] = await response.json();

        // ตรวจสอบข้อมูลก่อนบันทึกลงใน localStorage
        if (Array.isArray(fetchedData) && fetchedData.length > 0) {
          setData(fetchedData);
          localStorage.setItem('Measure3Data', JSON.stringify(fetchedData));
        } else {
          console.warn("API Response ไม่ถูกต้อง:", fetchedData);
          setError("ข้อมูลไม่ถูกต้องจาก API");
        }
      } catch (err) {
        console.error('Error fetching Measure3 data:', err);
        setError('ไม่สามารถดึงข้อมูล มาตรการที่ 3 ได้');
      } finally {
        setLoading(false); // ยกเลิก loading เมื่อโหลดข้อมูลเสร็จ
      }
    };

    fetchMeasure1();
  }, []);

  // เตรียมข้อมูลสำหรับ Pie Charts
  const pieDataClinicsOpen = useMemo(() => [
    { name: 'คลินิกมลพิษ', value: aggregateMemo?.pollution_clinic_open || 0 },
    { name: 'คลินิกมลพิษออนไลน์', value: aggregateMemo?.online_clinic_open || 0 },
    { name: 'ห้องปลอดฝุ่นศูนย์เด็กเล็ก', value: aggregateMemo?.nursery_dust_free_open || 0 },
    { name: 'ห้องปลอดฝุ่นหน่วยงาน', value: aggregateMemo?.gov_dust_free_open || 0 },
  ], [aggregateMemo]);

  const pieDataClinicsService = useMemo(() => [
    { name: 'บริการคลินิกมลพิษ', value: aggregateMemo?.pollution_clinic_service || 0 },
    { name: 'บริการคลินิกมลพิษออนไลน์', value: aggregateMemo?.online_clinic_service || 0 },
    { name: 'บริการห้องปลอดฝุ่นศูนย์เด็กเล็ก', value: aggregateMemo?.nursery_dust_free_service || 0 },
    { name: 'บริการห้องปลอดฝุ่นหน่วยงาน', value: aggregateMemo?.gov_dust_free_service || 0 },
  ], [aggregateMemo]);

  const pieDataMasksN95 = useMemo(() => [
    { name: 'N95 สำหรับผู้สูงอายุ', value: aggregateMemo?.elderly_N95_mask || 0 },
    { name: 'N95 สำหรับเด็กเล็ก', value: aggregateMemo?.children_N95_mask || 0 },
    { name: 'N95 สำหรับหญิงตั้งครรภ์', value: aggregateMemo?.pregnant_N95_mask || 0 },
    { name: 'N95 สำหรับติดเตียง', value: aggregateMemo?.bedridden_N95_mask || 0 },
    { name: 'N95 สำหรับผู้มีโรคประจำตัว', value: aggregateMemo?.disease_N95_mask || 0 },
  ], [aggregateMemo]);

  const pieDataMasksSurgical = useMemo(() => [
    { name: 'หน้ากากอนามัยสำหรับผู้สูงอายุ', value: aggregateMemo?.elderly_surgical_mask || 0 },
    { name: 'หน้ากากอนามัยสำหรับเด็กเล็ก', value: aggregateMemo?.children_surgical_mask || 0 },
    { name: 'หน้ากากอนามัยสำหรับหญิงตั้งครรภ์', value: aggregateMemo?.pregnant_surgical_mask || 0 },
    { name: 'หน้ากากอนามัยสำหรับติดเตียง', value: aggregateMemo?.bedridden_surgical_mask || 0 },
    { name: 'หน้ากากอนามัยสำหรับผู้มีโรคประจำตัว', value: aggregateMemo?.disease_surgical_mask || 0 },
  ], [aggregateMemo]);

  // เตรียมข้อมูลสำหรับ Bar Chart
  const barChartData = useMemo(() => [
    {
      name: 'ทีม 3 หมอ',
      Total: aggregateMemo?.active_teams_3_doctors_total || 0,
      Add: aggregateMemo?.active_teams_3_doctors_add || 0,
    },
    {
      name: 'ทีมแพทย์เคลื่อนที่',
      Total: aggregateMemo?.active_teams_mobile_total || 0,
      Add: aggregateMemo?.active_teams_mobile_add || 0,
    },
    {
      name: 'ทีมดูแลประชาชน',
      Total: aggregateMemo?.active_teams_citizens_total || 0,
      Add: aggregateMemo?.active_teams_citizens_add || 0,
    },
  ], [aggregateMemo]);

  // เตรียมข้อมูลสำหรับ Pie Chart ในส่วน 4.5 อื่น ๆ
  const pieDataOthers = useMemo(() => [
    { name: 'SKY doctor', value: aggregateMemo?.sky_doctor || 0 },
    { name: 'รถกู้ชีพ ALS', value: aggregateMemo?.ambulance || 0 },
  ], [aggregateMemo]);

  return (
    <div className="space-y-8 p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* <h1 className="text-4xl font-bold text-gray-800 mb-8">รายงาน Measure 3</h1> */}

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
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75" />
          </div>
        ) : (
          <>
            {/* แสดงข้อความแสดงข้อผิดพลาดถ้ามี */}
            {error && (
              <div className="text-red-500 text-center">
                {error}
              </div>
            )}

            {/* 4.2 การเปิดบริการคลินิก */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">4.2 การเปิดบริการคลินิก</h2>

              {/* Pie Charts สำหรับ 4.2.1 และ 4.2.2 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 4.2.1 เปิดคลินิกต่าง ๆ */}
                <PieChartSection
                  title="4.2.1 เปิดคลินิกต่าง ๆ"
                  data={pieDataClinicsOpen}
                  colors={COLORS}
                />

                {/* 4.2.2 บริการคลินิกต่าง ๆ */}
                <PieChartSection
                  title="4.2.2 บริการคลินิกต่าง ๆ"
                  data={pieDataClinicsService}
                  colors={COLORS}
                />
              </div>
            </div>

            {/* 4.3 ทีมแพทย์ */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">4.3 ทีมแพทย์</h2>

              {/* Bar Chart สำหรับทีมแพทย์ */}
              <BarChartSection
                title="4.3 ทีมแพทย์"
                data={barChartData}
                keys={['Total', 'Add']}
                colors={COLORS}
              />

              {/* ตารางข้อมูลสำหรับ 4.3 */}
              <DataTable
                title="รายละเอียดทีมแพทย์"
                headers={[
                  'จังหวัด',
                  'ทีม 3 หมอ (รวม)',
                  'ทีม 3 หมอ (เพิ่ม)',
                  'ทีมแพทย์เคลื่อนที่ (รวม)',
                  'ทีมแพทย์เคลื่อนที่ (เพิ่ม)',
                  'ทีมดูแลประชาชน (รวม)',
                  'ทีมดูแลประชาชน (เพิ่ม)'
                ]}
                data={filteredData.map(item => ({
                  'จังหวัด': item.province,
                  'ทีม 3 หมอ (รวม)': item.active_teams_3_doctors_total,
                  'ทีม 3 หมอ (เพิ่ม)': item.active_teams_3_doctors_add,
                  'ทีมแพทย์เคลื่อนที่ (รวม)': item.active_teams_mobile_total,
                  'ทีมแพทย์เคลื่อนที่ (เพิ่ม)': item.active_teams_mobile_add,
                  'ทีมดูแลประชาชน (รวม)': item.active_teams_citizens_total,
                  'ทีมดูแลประชาชน (เพิ่ม)': item.active_teams_citizens_add,
                }))}
                footer={{
                  'จังหวัด': 'เขตสุขภาพที่ 1',
                  'ทีม 3 หมอ (รวม)': aggregateMemo?.active_teams_3_doctors_total || 0,
                  'ทีม 3 หมอ (เพิ่ม)': aggregateMemo?.active_teams_3_doctors_add || 0,
                  'ทีมแพทย์เคลื่อนที่ (รวม)': aggregateMemo?.active_teams_mobile_total || 0,
                  'ทีมแพทย์เคลื่อนที่ (เพิ่ม)': aggregateMemo?.active_teams_mobile_add || 0,
                  'ทีมดูแลประชาชน (รวม)': aggregateMemo?.active_teams_citizens_total || 0,
                  'ทีมดูแลประชาชน (เพิ่ม)': aggregateMemo?.active_teams_citizens_add || 0,
                }}
              />
            </div>

            {/* 4.4 อุปกรณ์ป้องกันส่วนบุคคล */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">4.4 อุปกรณ์ป้องกันส่วนบุคคล</h2>

              {/* Pie Chart สำหรับหน้ากาก N95 */}
              <div>
                <PieChartSection
                  title="4.4.1 หน้ากาก N95"
                  data={pieDataMasksN95}
                  colors={COLORS}
                />
              </div>

              {/* ตารางข้อมูลสำหรับหน้ากาก N95 */}
              <div className="mt-6">
                <DataTable
                  title="รายละเอียดหน้ากาก N95"
                  headers={[
                    'จังหวัด',
                    'ผู้สูงอายุ',
                    'เด็กเล็ก',
                    'หญิงตั้งครรภ์',
                    'ติดเตียง',
                    'ผู้มีโรคประจำตัว'
                  ]}
                  data={filteredData.map(item => ({
                    'จังหวัด': item.province,
                    'ผู้สูงอายุ': item.elderly_N95_mask ?? 0,
                    'เด็กเล็ก': item.children_N95_mask ?? 0,
                    'หญิงตั้งครรภ์': item.pregnant_N95_mask ?? 0,
                    'ติดเตียง': item.bedridden_N95_mask ?? 0,
                    'ผู้มีโรคประจำตัว': item.disease_N95_mask ?? 0,
                  }))}
                  footer={{
                    'จังหวัด': 'เขตสุขภาพที่ 1',
                    'ผู้สูงอายุ': calculateTotal('elderly_N95_mask'),
                    'เด็กเล็ก': calculateTotal('children_N95_mask'),
                    'หญิงตั้งครรภ์': calculateTotal('pregnant_N95_mask'),
                    'ติดเตียง': calculateTotal('bedridden_N95_mask'),
                    'ผู้มีโรคประจำตัว': calculateTotal('disease_N95_mask'),
                  }}
                />
              </div>

              {/* 4.4.2 หน้ากากอนามัย */}

              {/* Pie Chart สำหรับหน้ากากอนามัย */}
              <div className="mt-6">
                <PieChartSection
                  title="4.4.2 หน้ากากอนามัย"
                  data={pieDataMasksSurgical}
                  colors={COLORS}
                />
              </div>

              {/* ตารางข้อมูลสำหรับหน้ากากอนามัย */}
              <div className="mt-6">
                <DataTable
                  title="รายละเอียดหน้ากากอนามัย"
                  headers={[
                    'จังหวัด',
                    'ผู้สูงอายุ',
                    'เด็กเล็ก',
                    'หญิงตั้งครรภ์',
                    'ติดเตียง',
                    'ผู้มีโรคประจำตัว'
                  ]}
                  data={filteredData.map(item => ({
                    'จังหวัด': item.province,
                    'ผู้สูงอายุ': item.elderly_surgical_mask ?? 0,
                    'เด็กเล็ก': item.children_surgical_mask ?? 0,
                    'หญิงตั้งครรภ์': item.pregnant_surgical_mask ?? 0,
                    'ติดเตียง': item.bedridden_surgical_mask ?? 0,
                    'ผู้มีโรคประจำตัว': item.disease_surgical_mask ?? 0,
                  }))}
                  footer={{
                    'จังหวัด': 'เขตสุขภาพที่ 1',
                    'ผู้สูงอายุ': calculateTotal('elderly_surgical_mask'),
                    'เด็กเล็ก': calculateTotal('children_surgical_mask'),
                    'หญิงตั้งครรภ์': calculateTotal('pregnant_surgical_mask'),
                    'ติดเตียง': calculateTotal('bedridden_surgical_mask'),
                    'ผู้มีโรคประจำตัว': calculateTotal('disease_surgical_mask'),
                  }}
                />
              </div>
            </div>

            {/* 4.5 อื่น ๆ */}
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Pie Chart สำหรับ SKY doctor และรถกู้ชีพ */}
              <div>
                <PieChartSection
                  title="4.5 อื่น ๆ"
                  data={pieDataOthers}
                  colors={COLORS}
                />
              </div>
              <div className="mt-6">
                <DataTable
                  title="รายละเอียดอื่น ๆ"
                  headers={['จังหวัด', 'SKY doctor', 'รถกู้ชีพ ALS']}
                  data={filteredData.map(item => ({
                    'จังหวัด': item.province,
                    'SKY doctor': item.sky_doctor ?? 0,
                    'รถกู้ชีพ ALS': item.ambulance ?? 0,
                  }))}
                  footer={{
                    'จังหวัด': 'เขตสุขภาพที่ 1',
                    'SKY doctor': aggregateMemo?.sky_doctor || 0,
                    'รถกู้ชีพ ALS': aggregateMemo?.ambulance || 0,
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReportMeasure3;
