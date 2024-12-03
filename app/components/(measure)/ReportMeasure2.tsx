"use client";

import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Measure2Data } from '../../interfaces/measure';

interface Props { }

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1', '#a4de6c', '#d0ed57', '#ffc0cb'];

const ReportMeasure2: React.FC<Props> = () => {
  const [data, setData] = useState<Measure2Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeasure2 = async () => {
      try {
        const response = await fetch('/api/measure2', { method: 'GET' });
        console.log('API Response Status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedData: Measure2Data[] = await response.json();
        console.log('Fetched Data:', fetchedData);
        setData(fetchedData);
      } catch (err) {
        console.error('Error fetching Measure2 data:', err);
        setError('Failed to fetch Measure2 data');
      } finally {
        setLoading(false);
      }
    };

    fetchMeasure2();
  }, []);

  const calculateTotal = (field: keyof Measure2Data): number => {
    return data.reduce((acc, curr) => acc + (typeof curr[field] === 'number' ? curr[field] : 0), 0);
  };

  const safeAdd = (...nums: (number | undefined)[]): number => {
    return nums.reduce((acc, num) => acc + (typeof num === 'number' ? num : 0), 0);
  };

  // ข้อมูลสำหรับ Pie Chart ในส่วน 2.1
  const pieData2_1_1 = data.map(item => ({
    name: item.province,
    value: typeof item.risk_health_monitoring_1_1 === 'number' ? item.risk_health_monitoring_1_1 : 0,
  }));

  const pieData2_1_2 = data.map(item => ({
    name: item.province,
    value: typeof item.risk_health_monitoring_1_1 === 'number' ? item.risk_health_monitoring_1_1 : 0,
  }));

  // ข้อมูลสำหรับ Pie Chart ในส่วน 2.2
  const pieData2_2 = [
    { name: 'เด็กเล็ก', value: calculateTotal('child') },
    { name: 'ผู้สูงอายุ', value: calculateTotal('elderly') },
    { name: 'หญิงตั้งครรภ์', value: calculateTotal('pregnant') },
    { name: 'ติดเตียง', value: calculateTotal('bedridden') },
    { name: 'ผู้มีโรคประจำตัว', value: calculateTotal('asthma') + calculateTotal('copd') + calculateTotal('asthma_copd') },
  ];

  // ข้อมูลสำหรับ Pie Chart ในส่วน 2.3
  const pieData2_3 = [
    { name: 'Asthma', value: calculateTotal('asthma') },
    { name: 'COPD', value: calculateTotal('copd') },
    { name: 'Asthma + COPD', value: calculateTotal('asthma_copd') },
  ];

  // ข้อมูลสำหรับ Pie Chart ในส่วน 4.1 และ 4.2
  const pieData2_4_staff = [
    { name: 'ตรวจสุขภาพโดยเจ้าหน้าที่', value: calculateTotal('health_check_staff') },
    { name: 'ตรวจสุขภาพโดยอาสาสมัคร', value: calculateTotal('health_check_volunteer') },
  ];

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  if (loading) {
    return <div className="p-6 text-gray-500">Loading...</div>;
  }

  return (
    <div className="space-y-8 p-4 bg-gray-100 min-h-screen">
      {/* 2.1 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-6 text-gray-800">2.1 เฝ้าระวังและแจ้งเตือนความเสี่ยงต่อสุขภาพ</h3>

        {/* Pie Charts สำหรับ 2.1.1 และ 2.1.2 */}
        <div className="flex flex-col md:flex-row justify-center items-center mb-6">
          <div className="w-full md:w-1/2 h-64">
            {/* <h4 className="text-md font-semibold mb-2 text-gray-700">2.1.1 จัดทาสื่อ Info ประชาสัมพันธ์</h4> */}
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData2_1_1}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData2_1_1.map((entry, index) => (
                    <Cell key={`cell-2.1.1-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/2 h-64 mt-6 md:mt-0">
            {/* <h4 className="text-md font-semibold mb-2 text-gray-700">2.1.2 แจ้งเตือนความเสี่ยงผ่านช่องทางต่าง ๆ</h4> */}
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData2_1_2}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData2_1_2.map((entry, index) => (
                    <Cell key={`cell-2.1.2-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ตารางข้อมูลสำหรับ 2.1 */}
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">จังหวัด</th>
                <th className="py-2 px-4 border-b">จัดทาสื่อ Info ประชาสัมพันธ์ (ชิ้น)</th>
                <th className="py-2 px-4 border-b">แจ้งเตือนความเสี่ยงผ่านช่องทางต่าง ๆ (ครั้ง)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4 border-b">{item.province}</td>
                  <td className="py-2 px-4 border-b">{item.risk_health_monitoring_1_1 ?? 0}</td>
                  <td className="py-2 px-4 border-b">{item.risk_health_monitoring_1_2 ?? 0}</td>
                </tr>
              ))}
              <tr className="font-bold text-center">
                <td className="py-2 px-4 border-t">รวม</td>
                <td className="py-2 px-4 border-t">{calculateTotal('risk_health_monitoring_1_1')}</td>
                <td className="py-2 px-4 border-t">{calculateTotal('risk_health_monitoring_1_2')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2.2 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-6 text-gray-800">2.2 กลุ่มเปราะบาง</h3>

        {/* Pie Chart สำหรับ 2.2 */}
        <div className="flex justify-center mb-6">
          <div className="w-full md:w-1/2 h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData2_2}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData2_2.map((entry, index) => (
                    <Cell key={`cell-2.2-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ตารางข้อมูลสำหรับ 2.2 */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">จังหวัด</th>
                <th className="py-2 px-4 border-b">เด็กเล็ก (คน)</th>
                <th className="py-2 px-4 border-b">ผู้สูงอายุ (คน)</th>
                <th className="py-2 px-4 border-b">หญิงตั้งครรภ์ (คน)</th>
                <th className="py-2 px-4 border-b">ติดเตียง (คน)</th>
                <th className="py-2 px-4 border-b">ผู้มีโรคประจำตัว (คน)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4 border-b">{item.province}</td>
                  <td className="py-2 px-4 border-b">{item.child ?? 0}</td>
                  <td className="py-2 px-4 border-b">{item.elderly ?? 0}</td>
                  <td className="py-2 px-4 border-b">{item.pregnant ?? 0}</td>
                  <td className="py-2 px-4 border-b">{item.bedridden ?? 0}</td>
                  <td className="py-2 px-4 border-b">
                    {safeAdd(item.asthma, item.copd, item.asthma_copd)}
                  </td>
                </tr>
              ))}
              <tr className="font-bold text-center">
                <td className="py-2 px-4 border-t">รวม</td>
                <td className="py-2 px-4 border-t">{calculateTotal('child')}</td>
                <td className="py-2 px-4 border-t">{calculateTotal('elderly')}</td>
                <td className="py-2 px-4 border-t">{calculateTotal('pregnant')}</td>
                <td className="py-2 px-4 border-t">{calculateTotal('bedridden')}</td>
                <td className="py-2 px-4 border-t">
                  {calculateTotal('asthma') + calculateTotal('copd') + calculateTotal('asthma_copd')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2.3 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-6 text-gray-800">2.3 ผู้ป่วยโรคเรื้อรัง</h3>

        {/* Pie Chart สำหรับ 2.3 */}
        <div className="flex justify-center mb-6">
          <div className="w-full h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData2_3}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData2_3.map((entry, index) => (
                    <Cell key={`cell-2.3-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ตารางข้อมูลสำหรับ 2.3 */}
        <div className="mt-6">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">จังหวัด</th>
                <th className="py-2 px-4 border-b">Asthma</th>
                <th className="py-2 px-4 border-b">COPD</th>
                <th className="py-2 px-4 border-b">Asthma + COPD</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4 border-b">{item.province}</td>
                  <td className="py-2 px-4 border-b">{item.asthma ?? 0}</td>
                  <td className="py-2 px-4 border-b">{item.copd ?? 0}</td>
                  <td className="py-2 px-4 border-b">{item.asthma_copd ?? 0}</td>
                </tr>
              ))}
              <tr className="font-bold text-center">
                <td className="py-2 px-4 border-t">รวม</td>
                <td className="py-2 px-4 border-t">{calculateTotal('asthma')}</td>
                <td className="py-2 px-4 border-t">{calculateTotal('copd')}</td>
                <td className="py-2 px-4 border-t">{calculateTotal('asthma_copd')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. การตรวจสุขภาพ */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-6 text-gray-800">4. การตรวจสุขภาพ</h3>

        {/* Pie Charts สำหรับ 4.1 และ 4.2 */}
        <div className="flex flex-col md:flex-row justify-center items-center mb-6">
          <div className="w-full md:w-1/2 h-64">
            {/* <h4 className="text-md font-semibold mb-2 text-gray-700">4.1 ตรวจสุขภาพโดยเจ้าหน้าที่</h4> */}
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData2_4_staff}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData2_4_staff.map((entry, index) => (
                    <Cell key={`cell-2.4.staff-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* <div className="w-full md:w-1/2 h-64 mt-6 md:mt-0">
            <h4 className="text-md font-semibold mb-2 text-gray-700">4.2 ตรวจสุขภาพโดยอาสาสมัคร</h4>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData2_4_volunteer}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData2_4_volunteer.map((entry, index) => (
                    <Cell key={`cell-2.4.volunteer-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div> */}
        </div>

        {/* ตารางข้อมูลสำหรับ 4 */}
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">จังหวัด</th>
                <th className="py-2 px-4 border-b">ตรวจสุขภาพโดยเจ้าหน้าที่ (คน)</th>
                <th className="py-2 px-4 border-b">ตรวจสุขภาพโดยอาสาสมัคร (คน)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4 border-b">{item.province}</td>
                  <td className="py-2 px-4 border-b">{item.health_check_staff ?? 0}</td>
                  <td className="py-2 px-4 border-b">{item.health_check_volunteer ?? 0}</td>
                </tr>
              ))}
              <tr className="font-bold text-center">
                <td className="py-2 px-4 border-t">รวม</td>
                <td className="py-2 px-4 border-t">{calculateTotal('health_check_staff')}</td>
                <td className="py-2 px-4 border-t">{calculateTotal('health_check_volunteer')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportMeasure2;

