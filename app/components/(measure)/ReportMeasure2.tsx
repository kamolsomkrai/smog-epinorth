"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { Measure2Data } from '../../interfaces/newmeasure';
import DataTable from '../(object)/DataTable';
import Loading from '../(object)/Loading';
import VulnerableRateChart from '../(object)/VulnerableRateChart';

const ReportMeasure2: React.FC = () => {
  const [data, setData] = useState<Measure2Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedProvince, setSelectedProvince] = useState<string>("");

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  // const calculateTotal = useMemo(() => (field: keyof Measure2Data): number => {
  //   return data.reduce((acc, curr) => {
  //     const value = curr[field];
  //     let num = 0;
  //     if (typeof value === 'number') {
  //       num = value;
  //     } else if (typeof value === 'string') {
  //       num = parseFloat(value) || 0;
  //     }
  //     return acc + num;
  //   }, 0);
  // }, [data]);

  const filteredData = useMemo(() => {
    return selectedProvince
      ? data?.filter((item) =>
        item.province.toLowerCase() === selectedProvince.toLowerCase()
      )
      : data;
  }, [data, selectedProvince]);

  const calculateFilteredTotal = useMemo(() => (field: keyof Measure2Data): number => {
    return filteredData.reduce((acc, curr) => {
      const value = curr[field];
      let num = 0;
      if (typeof value === "number") {
        num = value;
      } else if (typeof value === "string") {
        num = parseFloat(value) || 0;
      }
      return acc + num;
    }, 0);
  }, [filteredData]);

  useEffect(() => {
    const fetchMeasure1 = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/measure2');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedData: Measure2Data[] = await response.json();
        if (Array.isArray(fetchedData) && fetchedData.length > 0) {
          setData(fetchedData);
          localStorage.setItem('Measure2Data', JSON.stringify(fetchedData));
        } else {
          setError("ข้อมูลไม่ถูกต้องจาก API");
        }
      } catch (err) {
        setError('ไม่สามารถดึงข้อมูล มาตรการที่ 2 ได้');
      } finally {
        setLoading(false);
      }
    };
    fetchMeasure1();
  }, []);

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  if (loading) {
    return <Loading />;
  }

  if (!data.length) {
    return <div className="p-6 text-gray-500">ไม่มีข้อมูลสำหรับรายงาน Measure2</div>;
  }

  return (
    <div className="space-y-8 p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
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

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl mb-6 text-gray-800">2.1 เฝ้าระวังและแจ้งเตือนความเสี่ยงต่อสุขภาพ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DataTable
              titlespan="2.1.1 จัดทาสื่อ Info ประชาสัมพันธ์"
              title="จำนวนโครงการสื่อสารและส่งเสริมต่อจังหวัด"
              headers={['จังหวัด', 'จัดทำสื่อ Info ประชาสัมพันธ์ (ชิ้น)']}
              data={filteredData.map(item => ({
                'จังหวัด': item.province,
                'จัดทำสื่อ Info ประชาสัมพันธ์ (ชิ้น)': formatNumber(Number(item.riskHealthInfo))
              }))}
              footer={{
                'จังหวัด': 'เขตสุขภาพที่ 1',
                'จัดทำสื่อ Info ประชาสัมพันธ์ (ชิ้น)': formatNumber(calculateFilteredTotal('riskHealthInfo'))
              }}
            />

            <DataTable
              titlespan="2.1.2 แจ้งเตือนความเสี่ยงผ่านช่องทางต่าง ๆ"
              title=""
              headers={['จังหวัด', 'แจ้งเตือนความเสี่ยงผ่านช่องทางต่าง ๆ(ครั้ง)']}
              data={filteredData.map(item => ({
                'จังหวัด': item.province,
                'แจ้งเตือนความเสี่ยงผ่านช่องทางต่าง ๆ(ครั้ง)': formatNumber(Number(item.riskHealthSocial))
              }))}
              footer={{
                'จังหวัด': 'เขตสุขภาพที่ 1',
                'แจ้งเตือนความเสี่ยงผ่านช่องทางต่าง ๆ(ครั้ง)': formatNumber(calculateFilteredTotal('riskHealthSocial'))
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl mb-6 text-gray-800">2.2 กลุ่มเปราะบาง</h2>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl mb-6 text-gray-800">
              อัตราการได้รับการดูแลเปรียบเทียบกับจำนวนกลุ่มเปราะบาง
            </h2>
            <VulnerableRateChart
              calculateTotal={calculateFilteredTotal}
              formatNumber={formatNumber}
            />
          </div>

          <div className="mt-6 overflow-x-auto">
            <DataTable
              titlespan="จำนวนทั้งหมด"
              title="จำนวนทั้งหมด"
              headers={[
                'จังหวัด',
                'เด็กเล็ก (คน)',
                'ผู้สูงอายุ (คน)',
                'หญิงตั้งครรภ์ (คน)',
                'ติดเตียง (คน)',
                'ผู้ที่มีโรคหัวใจ (คน)',
                'ผู้ที่มีโรคระบบทางเดินหายใจ (คน)'
              ]}
              data={filteredData.map(item => ({
                'จังหวัด': item.province,
                'เด็กเล็ก (คน)': formatNumber(Number(item.riskChildTotal)),
                'ผู้สูงอายุ (คน)': formatNumber(Number(item.riskOlderTotal)),
                'หญิงตั้งครรภ์ (คน)': formatNumber(Number(item.riskPregnantTotal)),
                'ติดเตียง (คน)': formatNumber(Number(item.riskBedriddenTotal)),
                'ผู้ที่มีโรคหัวใจ (คน)': formatNumber(Number(item.riskHeartTotal)),
                'ผู้ที่มีโรคระบบทางเดินหายใจ (คน)': formatNumber(Number(item.riskCopdTotal))
              }))}
              footer={{
                'จังหวัด': 'เขตสุขภาพที่ 1',
                'เด็กเล็ก (คน)': formatNumber(calculateFilteredTotal('riskChildTotal')),
                'ผู้สูงอายุ (คน)': formatNumber(calculateFilteredTotal('riskOlderTotal')),
                'หญิงตั้งครรภ์ (คน)': formatNumber(calculateFilteredTotal('riskPregnantTotal')),
                'ติดเตียง (คน)': formatNumber(calculateFilteredTotal('riskBedriddenTotal')),
                'ผู้ที่มีโรคหัวใจ (คน)': formatNumber(calculateFilteredTotal('riskHeartTotal')),
                'ผู้ที่มีโรคระบบทางเดินหายใจ (คน)': formatNumber(calculateFilteredTotal('riskCopdTotal'))
              }}
            />
          </div>

          <div className="mt-6 overflow-x-auto">
            <DataTable
              titlespan="ได้รับการดูแล"
              title="ได้รับการดูแล"
              headers={[
                'จังหวัด',
                'เด็กเล็ก (คน)',
                'ผู้สูงอายุ (คน)',
                'หญิงตั้งครรภ์ (คน)',
                'ติดเตียง (คน)',
                'ผู้ที่มีโรคหัวใจ (คน)',
                'ผู้ที่มีโรคระบบทางเดินหายใจ (คน)'
              ]}
              data={filteredData.map(item => ({
                'จังหวัด': item.province,
                'เด็กเล็ก (คน)': formatNumber(Number(item.riskChildTakeCare)),
                'ผู้สูงอายุ (คน)': formatNumber(Number(item.riskOlderTakeCare)),
                'หญิงตั้งครรภ์ (คน)': formatNumber(Number(item.riskPregnantTakeCare)),
                'ติดเตียง (คน)': formatNumber(Number(item.riskBedriddenTakeCare)),
                'ผู้ที่มีโรคหัวใจ (คน)': formatNumber(Number(item.riskHeartTakeCare)),
                'ผู้ที่มีโรคระบบทางเดินหายใจ (คน)': formatNumber(Number(item.riskCopdTakeCare))
              }))}
              footer={{
                'จังหวัด': 'เขตสุขภาพที่ 1',
                'เด็กเล็ก (คน)': formatNumber(calculateFilteredTotal('riskChildTakeCare')),
                'ผู้สูงอายุ (คน)': formatNumber(calculateFilteredTotal('riskOlderTakeCare')),
                'หญิงตั้งครรภ์ (คน)': formatNumber(calculateFilteredTotal('riskPregnantTakeCare')),
                'ติดเตียง (คน)': formatNumber(calculateFilteredTotal('riskBedriddenTakeCare')),
                'ผู้ที่มีโรคหัวใจ (คน)': formatNumber(calculateFilteredTotal('riskHeartTakeCare')),
                'ผู้ที่มีโรคระบบทางเดินหายใจ (คน)': formatNumber(calculateFilteredTotal('riskCopdTakeCare'))
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl mb-6 text-gray-800">2.3 การตรวจสุขภาพเจ้าหน้าที่/อาสาสมัครดับไฟป่า</h2>
          <div className="mt-6">
            <DataTable
              title=""
              headers={['จังหวัด', 'ตรวจสุขภาพเจ้าหน้าที่ (คน)']}
              data={filteredData.map(item => ({
                'จังหวัด': item.province,
                'ตรวจสุขภาพเจ้าหน้าที่ (คน)': formatNumber(Number(item.healthcareOfficer))
              }))}
              footer={{
                'จังหวัด': 'เขตสุขภาพที่ 1',
                'ตรวจสุขภาพเจ้าหน้าที่ (คน)': formatNumber(calculateFilteredTotal('healthcareOfficer'))
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportMeasure2;
