// components/ReportMeasure3.tsx
"use client";

import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { Measure3Data } from '../../interfaces/measure';

interface Props { }

const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1', '#a4de6c',
  '#d0ed57', '#ffc0cb', '#d88884', '#84d8f8', '#ca82d8', '#c6ca82'
];

const ReportMeasure3: React.FC<Props> = () => {
  const [data, setData] = useState<Measure3Data | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeasure3 = async () => {
      try {
        const response = await fetch('/api/measure3', { method: 'GET' });
        console.log('API Response Status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedData: Measure3Data = await response.json();
        console.log('Fetched Data:', fetchedData);
        setData(fetchedData);
      } catch (err) {
        console.error('Error fetching Measure3 data:', err);
        setError('Failed to fetch Measure3 data');
      } finally {
        setLoading(false);
      }
    };

    fetchMeasure3();
  }, []);

  const calculateTotal = (field: keyof Measure3Data) => {
    return data ? data[field] : 0;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75" />
      </div>
    );
  }

  if (error || !data) {
    return <div className="p-6 text-red-500">{error || 'No data available'}</div>;
  }

  // เตรียมข้อมูลสำหรับ Pie Charts
  const pieDataHealthCheck = [
    { name: 'ตรวจสุขภาพโดยเจ้าหน้าที่', value: data.measure3_health_check_staff },
    { name: 'ตรวจสุขภาพโดยอาสาสมัคร', value: data.measure3_health_check_volunteer },
  ];

  const pieDataClinicsOpen = [
    { name: 'เปิดคลินิกมลพิษ', value: data.measure3_pollution_clinic_open },
    { name: 'เปิดบริการคลินิกมลพิษออนไลน์', value: data.measure3_online_clinic_open },
    { name: 'เปิดบริการห้องปลอดฝุ่น Nursery', value: data.measure3_nursery_dust_free_open },
    { name: 'เปิดบริการห้องปลอดฝุ่น รัฐ', value: data.measure3_gov_dust_free_open },
  ];

  const pieDataClinicsService = [
    { name: 'บริการคลินิกมลพิษ', value: data.measure3_pollution_clinic_service },
    { name: 'บริการคลินิกมลพิษออนไลน์', value: data.measure3_online_clinic_service },
    { name: 'บริการห้องปลอดฝุ่น Nursery', value: data.measure3_nursery_dust_free_service },
    { name: 'บริการห้องปลอดฝุ่น รัฐ', value: data.measure3_gov_dust_free_service },
  ];

  const pieDataTeams = [
    { name: 'ทีม 3 หมอ (รวม)', value: data.measure3_active_teams_3_doctors_total },
    { name: 'ทีม 3 หมอ (เพิ่ม)', value: data.measure3_active_teams_3_doctors_add },
    { name: 'ทีมหน่วยแพทย์เคลื่อนที่ (รวม)', value: data.measure3_active_teams_mobile_total },
    { name: 'ทีมหน่วยแพทย์เคลื่อนที่ (เพิ่ม)', value: data.measure3_active_teams_mobile_add },
    { name: 'ทีมหน่วยดูแลประชาชน (รวม)', value: data.measure3_active_teams_citizens_total },
    { name: 'ทีมหน่วยดูแลประชาชน (เพิ่ม)', value: data.measure3_active_teams_citizens_add },
  ];

  const pieDataMasks = [
    { name: 'N95 สำหรับผู้สูงอายุ', value: data.measure3_elderly_N95_mask },
    { name: 'หน้ากากอนามัยสำหรับผู้สูงอายุ', value: data.measure3_elderly_surgical_mask },
    { name: 'N95 สำหรับเด็กเล็ก', value: data.measure3_children_N95_mask },
    { name: 'หน้ากากอนามัยสำหรับเด็กเล็ก', value: data.measure3_children_surgical_mask },
    { name: 'N95 สำหรับหญิงตั้งครรภ์', value: data.measure3_pregnant_N95_mask },
    { name: 'หน้ากากอนามัยสำหรับหญิงตั้งครรภ์', value: data.measure3_pregnant_surgical_mask },
    { name: 'N95 สำหรับติดเตียง', value: data.measure3_bedridden_N95_mask },
    { name: 'หน้ากากอนามัยสำหรับติดเตียง', value: data.measure3_bedridden_surgical_mask },
    { name: 'N95 สำหรับผู้มีโรคประจำตัว', value: data.measure3_disease_N95_mask },
    { name: 'หน้ากากอนามัยสำหรับผู้มีโรคประจำตัว', value: data.measure3_disease_surgical_mask },
  ];

  // เตรียมข้อมูลสำหรับ Bar Chart
  const barChartData = [
    {
      name: 'ทีม 3 หมอ',
      Total: data.measure3_active_teams_3_doctors_total,
      Add: data.measure3_active_teams_3_doctors_add,
    },
    {
      name: 'ทีมแพทย์เคลื่อนที่',
      Total: data.measure3_active_teams_mobile_total,
      Add: data.measure3_active_teams_mobile_add,
    },
    {
      name: 'ทีมดูแลประชาชน',
      Total: data.measure3_active_teams_citizens_total,
      Add: data.measure3_active_teams_citizens_add,
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">รายงาน Measure 3</h1>

        {/* 4.1 การตรวจสุขภาพ */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">4. การตรวจสุขภาพ</h2>

          {/* Pie Chart สำหรับการตรวจสุขภาพ */}
          <div className="flex flex-col md:flex-row justify-center items-center mb-6">
            <div className="w-full md:w-1/2 h-64">
              <h3 className="text-lg font-medium mb-2 text-gray-600">4.1 ตรวจสุขภาพโดยเจ้าหน้าที่และอาสาสมัคร</h3>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieDataHealthCheck}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {pieDataHealthCheck.map((entry, index) => (
                      <Cell key={`cell-healthcheck-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 4.2 การเปิดบริการคลินิก */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">4.2 การเปิดบริการคลินิก</h2>

          {/* Pie Chart สำหรับการเปิดคลินิก */}
          <div className="flex flex-col md:flex-row justify-center items-center mb-6">
            <div className="w-full md:w-1/2 h-64">
              <h3 className="text-lg font-medium mb-2 text-gray-600">4.2.1 เปิดคลินิกต่าง ๆ</h3>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieDataClinicsOpen}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {pieDataClinicsOpen.map((entry, index) => (
                      <Cell key={`cell-clinics-open-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full md:w-1/2 h-64 mt-6 md:mt-0">
              <h3 className="text-lg font-medium mb-2 text-gray-600">4.2.2 บริการคลินิกต่าง ๆ</h3>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieDataClinicsService}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {pieDataClinicsService.map((entry, index) => (
                      <Cell key={`cell-clinics-service-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 4.3 ทีมแพทย์ */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">4.3 ทีมแพทย์</h2>

          {/* Bar Chart สำหรับทีมแพทย์ */}
          <div className="w-full h-64">
            <ResponsiveContainer>
              <BarChart
                data={barChartData}
                margin={{
                  top: 20, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Total" fill="#8884d8" />
                <Bar dataKey="Add" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4.4 อุปกรณ์ป้องกันส่วนบุคคล */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">4.4 อุปกรณ์ป้องกันส่วนบุคคล</h2>

          {/* Pie Chart สำหรับหน้ากากต่าง ๆ */}
          <div className="flex flex-col md:flex-row justify-center items-center mb-6">
            <div className="w-full h-64">
              <h3 className="text-lg font-medium mb-2 text-gray-600">4.4.1 หน้ากากต่าง ๆ</h3>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieDataMasks}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label
                  >
                    {pieDataMasks.map((entry, index) => (
                      <Cell key={`cell-masks-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 4.5 อื่น ๆ */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">4.5 อื่น ๆ</h2>

          {/* Pie Chart สำหรับ SKY doctor และรถกู้ชีพ */}
          <div className="flex flex-col md:flex-row justify-center items-center mb-6">
            <div className="w-full md:w-1/2 h-64">
              <h3 className="text-lg font-medium mb-2 text-gray-600">4.5.1 SKY doctor และรถกู้ชีพ</h3>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'SKY doctor', value: data.measure3_sky_doctor },
                      { name: 'รถกู้ชีพ ALS', value: data.measure3_ambulance },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {[
                      { name: 'SKY doctor', value: data.measure3_sky_doctor },
                      { name: 'รถกู้ชีพ ALS', value: data.measure3_ambulance },
                    ].map((entry, index) => (
                      <Cell key={`cell-other-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportMeasure3;
