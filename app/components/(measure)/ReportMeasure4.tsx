// components/ReportMeasure4.tsx
"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { Measure4Data } from '../../interfaces/newmeasure';
// import PieChartSection from '../(object)/PieChartSection';
// import BarChartSection from '../(object)/BarChartSection';
import DataTable from '../(object)/DataTable';
import Loading from '../(object)/Loading';

// const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1', '#a4de6c', '#d0ed57', '#ffc0cb'];

const ReportMeasure4: React.FC = () => {
  const [data, setData] = useState<Measure4Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedProvince, setSelectedProvince] = useState<string>("");

  const formatDate = (dateStr: string | undefined): string | null => {
    if (dateStr) {
      return dateStr.split('T')[0];
    }
    return null;
  };
  // ใช้ useMemo สำหรับการคำนวณ
  // ฟังก์ชันคำนวณจำนวนวันเปิด โดยตรวจสอบค่า null และรูปแบบวันที่
  const calculateDaysOpen = useMemo(() => {
    return (openDate?: string | null, closeDate?: string | null): number => {
      if (!openDate) {
        console.error("openDate จำเป็นต้องมีค่า");
        return 0;
      }
      const start = new Date(openDate);
      const end = closeDate ? new Date(closeDate) : new Date();

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        console.error("รูปแบบวันที่ไม่ถูกต้อง");
        return 0;
      }

      return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    };
  }, []);

  // กรองข้อมูลโดยตรวจสอบค่า null ของ data และ searchTerm เพื่อป้องกัน error
  const filteredData = useMemo(() => {
    return selectedProvince
      ? data?.filter((item) =>
        item.province.toLowerCase() === selectedProvince.toLowerCase()
      )
      : data;
  }, [data, selectedProvince]);


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

  // // เตรียมข้อมูลสำหรับ Bar Chart (จำนวนวันที่เปิด EOC ต่อจังหวัด)
  // const barChartData = useMemo(() => {
  //   return filteredData.map(item => ({
  //     province: item.province,
  //     daysOpen: calculateDaysOpen(item.openPheocDate, item.closePheocDate),
  //   }));
  // }, [filteredData, calculateDaysOpen]);

  // // เตรียมข้อมูลสำหรับ Pie Chart (สัดส่วนการจับปรับ)
  // const pieChartData = useMemo(() => {
  //   return filteredData.map(item => ({
  //     name: item.province,
  //     value: item.lawEnforcement,
  //   }));
  // }, [filteredData]);

  // const burnData = useMemo(() => {
  //   return filteredData.map(item => ({
  //     name: item.province,
  //     daysOpen: calculateDaysOpen(item.openDontBurnDate, item.closeDontBurnDate),
  //   }));
  // }, [filteredData, calculateDaysOpen]);

  // คำนวณรวมสำหรับ Bar Chart และ Pie Chart
  // const aggregateData = useMemo(() => {
  //   return {
  //     totalPheocDaysOpen: filteredData.reduce((acc, item) => acc + calculateDaysOpen(item.openPheocDate, item.closePheocDate), 0),
  //     totalBurnDaysOpen: filteredData.reduce((acc, item) => acc + calculateDaysOpen(item.openDontBurnDate, item.closeDontBurnDate), 0),
  //     totalFine: filteredData.reduce((acc, item) => acc + item.lawEnforcement, 0),
  //   };
  // }, [filteredData, calculateDaysOpen]);

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-8 p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* <h1 className="text-4xl font-bold text-gray-800 mb-8">รายงาน Measure 4</h1> */}

        {/* เพิ่ม Search Input */}
        <div className="grid grid-cols-1 md:grid-rows-2">
          <label htmlFor="">กรองจังหวัด</label>
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="p-2 border rounded w-full md:w-1/3"
          >
            <option value="">ทั้งหมด</option>
            <option value="เชียงใหม่">เชียงใหม่</option>
            <option value="ลำพูน">ลำพูน</option>
            <option value="ลำปาง">ลำปาง</option>
            <option value="แพร่">แพร่</option>
            <option value="น่าน">น่าน</option>
            <option value="พะเยา">พะเยา</option>
            <option value="เชียงราย">เชียงราย</option>
            <option value="แม่ฮ่องสอน">แม่ฮ่องสอน</option>
          </select>
        </div>

        {loading ? (
          <><Loading /></>
        ) : (
          <>
            {/* ตารางข้อมูล */}
            <DataTable
              titlespan="มาตรการภาวะฉุกเฉินทางสาธารณสุข"
              title="มาตรการภาวะฉุกเฉินทางสาธารณสุข"
              headers={[
                'จังหวัด',
                'วันเปิด EOC',
                'วันปิด EOC',
                'จำนวนวันที่เปิด EOC'
              ]}
              data={filteredData.map(item => ({
                'จังหวัด': item.province,
                'วันเปิด EOC': item.openPheocDate ? formatDate(item.openPheocDate) : 'ยังไม่เปิด',
                'วันปิด EOC': item.closePheocDate ? formatDate(item.closePheocDate) : 'ยังไม่ปิด',
                'จำนวนวันที่เปิด EOC': calculateDaysOpen(item.openPheocDate, item.closePheocDate),
              }))}
            // footer={{
            //   'จังหวัด': 'เขตสุขภาพที่ 1',
            //   'วันเปิด EOC': '',
            //   'วันปิด EOC': '',
            //   'จำนวนวันที่เปิด EOC': aggregateData.totalPheocDaysOpen,
            //   'การจับปรับ (ครั้ง)': new Intl.NumberFormat().format(aggregateData.totalFine),
            // }}
            />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <DataTable
                titlespan='การบังคับใช้กฎหมาย'
                title="การบังคับใช้กฎหมาย"
                headers={[
                  'จังหวัด', 'การจับ/ปรับ (ครั้ง)'
                ]}
                data={filteredData.map(item => ({
                  'จังหวัด': item.province,
                  'การจับ/ปรับ (ครั้ง)': new Intl.NumberFormat().format(item.lawEnforcement),
                }))} />

              <DataTable
                titlespan='ระยะเวลาห้ามเผา'
                title="ระยะเวลาห้ามเผา"
                headers={[
                  'จังหวัด',
                  'ช่วงระยะเวลาการห้ามเผา',
                  'จำนวนวัน',
                ]}
                data={filteredData.map(item => ({
                  'จังหวัด': item.province,
                  'ช่วงระยะเวลาการห้ามเผา': item.openDontBurnDate && item.closeDontBurnDate ? formatDate(item.openDontBurnDate) + " - " + formatDate(item.closeDontBurnDate) : "ไม่มีข้อมูล",
                  'จำนวนวัน': calculateDaysOpen(item.openDontBurnDate, item.closeDontBurnDate),
                }))}
              // footer={{
              //   'จังหวัด': 'เขตสุขภาพที่ 1',
              //   'วันเปิดมาตรการห้ามเผา': '',
              //   'วันปิดมาตรการห้ามเผา': '',
              //   'จำนวนวันที่เปิดมาตรการห้ามเผา': aggregateData.totalBurnDaysOpen,
              // }}
              /></div>



            {/* Bar Chart: จำนวนวันที่เปิด EOC ต่อจังหวัด */}
            {/* <BarChartSection
              title="จำนวนวันที่เปิด EOC ต่อจังหวัด"
              data={barChartData}
              keys={['daysOpen']}
              colors={['#8884d8']}
            /> */}

            {/* Pie Chart: สัดส่วนการจับปรับ */}
            {/* <PieChartSection
              title="สัดส่วนการจับปรับ"
              data={pieChartData}
              colors={COLORS}
            /> */}


          </>
        )}
      </div>
    </div>
  );
};

export default ReportMeasure4;
