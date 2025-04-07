"use client"
import React, { useEffect, useState, useMemo } from 'react';
import DataTable from '../components/(object)/DataTable';

interface ClusterData {
  yr: number;
  mm: number;
  hospcode: string;
  hosname: string;
  province: string;
  amphur: string;
  groupname: string;
  diagtype: string;
  patient_count: number;
}

interface ColumnStyle {
  headerAlign?: 'left' | 'center' | 'right';
  bodyAlign?: 'left' | 'center' | 'right';
}

const ClusterPages: React.FC = () => {
  const [data, setData] = useState<ClusterData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // state สำหรับตัวกรอง
  const [filterYear, setFilterYear] = useState<string>(new Date().getFullYear().toString());
  const [filterMonth, setFilterMonth] = useState<string>("");
  const [filterProvince, setFilterProvince] = useState<string>("");
  const [filterDiagtype, setFilterDiagtype] = useState<string>("");
  // const [filterDiagcode, setFilterDiagcode] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/cluster');
        if (!res.ok) {
          throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูล');
        }
        const json = await res.json();
        if (Array.isArray(json)) {
          setData(json);
        } else {
          setData([json]);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ดึงปีที่มีอยู่ในข้อมูล (unique)
  const uniqueYears = useMemo(() => {
    const years = data.map(item => item.yr);
    return Array.from(new Set(years)).sort((a, b) => a - b);
  }, [data]);

  // ตัวเลือกเดือน
  const monthOptions = [
    { value: "", label: "เลือกเดือน" },
    { value: "1", label: "มกราคม" },
    { value: "2", label: "กุมภาพันธ์" },
    { value: "3", label: "มีนาคม" },
    { value: "4", label: "เมษายน" },
    { value: "5", label: "พฤษภาคม" },
    { value: "6", label: "มิถุนายน" },
    { value: "7", label: "กรกฎาคม" },
    { value: "8", label: "สิงหาคม" },
    { value: "9", label: "กันยายน" },
    { value: "10", label: "ตุลาคม" },
    { value: "11", label: "พฤศจิกายน" },
    { value: "12", label: "ธันวาคม" },
  ];

  const provinceOptions = [
    { value: "", label: "เลือกจังหวัด" },
    { value: "เชียงใหม่", label: "เชียงใหม่" },
    { value: "ลำพูน", label: "ลำพูน" },
    { value: "ลำปาง", label: "ลำปาง" },
    { value: "แพร่", label: "แพร่" },
    { value: "น่าน", label: "น่าน" },
    { value: "พะเยา", label: "พะเยา" },
    { value: "เชียงราย", label: "เชียงราย" },
    { value: "แม่ฮ่องสอน", label: "แม่ฮ่องสอน" },
  ]


  // ตัวเลือกประเภท diagtype
  const diagTypeOptions = [
    { value: "", label: "เลือกกลุ่มโรค" },
    { value: "โรคปอดอุดกั้นเรื้อรัง", label: "โรคปอดอุดกั้นเรื้อรัง" },
    { value: "โรคหืด", label: "โรคหืด" },
    { value: "โรคกล้ามเนื้อหัวใจตายเฉียบพลัน", label: "โรคกล้ามเนื้อหัวใจตายเฉียบพลัน" },
    { value: "โรคกล้ามเนื้อหัวใจที่ตายตามมา", label: "โรคกล้ามเนื้อหัวใจที่ตายตามมา" },
    { value: "โรคหัวใจขาดเลือดเฉียบพลัน", label: "โรคหัวใจขาดเลือดเฉียบพลัน" },
    { value: "โรคผิวหนังอักเสบ ไม่ระบุรายละเอียด", label: "โรคผิวหนังอักเสบ ไม่ระบุรายละเอียด" },
    { value: "โรคลมพิษ", label: "โรคลมพิษ" },
    { value: "โรคเยื่อตาอักเสบ", label: "โรคเยื่อตาอักเสบ" },
  ];

  // กรองข้อมูลตามเงื่อนไข
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchYear = filterYear ? item.yr.toString() === filterYear : true;
      const matchMonth = filterMonth ? item.mm.toString() === filterMonth : true;
      const matchProvince = filterProvince
        ? item.province.toLowerCase().includes(filterProvince.toLowerCase())
        : true;
      // const matchDiagcode = filterDiagcode
      //   ? item.groupname.toLowerCase().includes(filterDiagcode.toLowerCase())
      //   : true;
      const matchDiagtype = filterDiagtype
        ? item.groupname.toLowerCase() === filterDiagtype.toLowerCase()
        : true;
      return matchYear && matchMonth && matchProvince && matchDiagtype;
    });
  }, [data, filterYear, filterMonth, filterProvince, filterDiagtype]);
  const displayData = useMemo(() => {
    // สร้าง array สำหรับชื่อเดือนในภาษาไทย
    const monthNames = [
      "",
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];

    return filteredData.map(item => ({
      "ปี": (item.yr + 543).toString(), // แปลงปีเป็น string(ถ้าจำเป็น)
      "เดือน": monthNames[item.mm], // แปลงเลขเดือนเป็นชื่อเดือนภาษาไทย
      // "รหัส": item.hospcode,
      "โรงพยาบาล": item.hosname,
      "จังหวัด": item.province,
      "อำเภอ": item.amphur,
      "กลุ่มโรค": item.groupname,
      // "รหัสโรค": item.diagtype,
      "จำนวนผู้ป่วย": item.patient_count,
    }));
  }, [filteredData]);

  // กำหนด header ที่ต้องการแสดงในตาราง
  const headers = ["ปี", "เดือน", "โรงพยาบาล", "จังหวัด", "อำเภอ", "กลุ่มโรค", "จำนวนผู้ป่วย"];

  const columnStyles: Record<string, ColumnStyle> = {
    "ปี": { headerAlign: "center", bodyAlign: "right" },
    "เดือน": { headerAlign: "center", bodyAlign: "left" },
    // "รหัส": { headerAlign: "center", bodyAlign: "right" },
    "โรงพยาบาล": { headerAlign: "center", bodyAlign: "left" },
    "จังหวัด": { headerAlign: "center", bodyAlign: "left" },
    "อำเภอ": { headerAlign: "center", bodyAlign: "left" },
    "กลุ่มโรค": { headerAlign: "center", bodyAlign: "left" },
    "จำนวนผู้ป่วย": { headerAlign: "center", bodyAlign: "right" },
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">การเฝ้าระวังผู้ป่วยที่เข้าได้กับการสอบสวนทางระบาดวิทยา</h1>
      <div className="mb-4 flex flex-wrap gap-2">
        {/* เลือกปีจากข้อมูล API */}
        <select
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="border p-2"
        >
          <option value="">เลือกปี</option>
          {uniqueYears.map(year => (
            <option key={year} value={year.toString()}>{(year + 543)}</option>
          ))}
        </select>
        {/* เลือกเดือน */}
        <select
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
          className="border p-2"
        >
          {monthOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        {/* กรอกจังหวัด */}
        <select
          value={filterProvince}
          onChange={(e) => setFilterProvince(e.target.value)}
          className="border p-2"
        >
          {provinceOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>



        {/* <input
          type="text"
          placeholder="จังหวัด"
          value={filterProvince}
          onChange={(e) => setFilterProvince(e.target.value)}
          className="border p-2"
        /> */}
        {/* เลือกประเภท diagtype */}
        <select
          value={filterDiagtype}
          onChange={(e) => setFilterDiagtype(e.target.value)}
          className="border p-2"
        >
          {diagTypeOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        {/* กรอกรหัสโรค */}
        {/* <input
          type="text"
          placeholder="รหัสโรค (diagcode)"
          value={filterDiagcode}
          onChange={(e) => setFilterDiagcode(e.target.value)}
          className="border p-2"
        /> */}
      </div>
      {loading && <div>กำลังโหลดข้อมูล...</div>}
      {error && <div>เกิดข้อผิดพลาด: {error}</div>}
      {!loading && !error && (
        <DataTable
          columnStyles={columnStyles}
          titlespan="ตารางข้อมูล Cluster รายเดือน ที่มีรหัส Z58.1 ในเขตสุขภาพที่ 1"
          title="Cluster Data"
          headers={headers}
          data={displayData}
        />
      )}
    </div>
  );
};

export default ClusterPages;
