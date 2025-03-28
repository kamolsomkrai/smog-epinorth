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
  diagtype: string;
  diagcode: string;
  patient_count: number;
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
  const [filterDiagcode, setFilterDiagcode] = useState<string>("");

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

  // ตัวเลือกประเภท diagtype
  const diagTypeOptions = [
    { value: "", label: "เลือกประเภท" },
    { value: "Principal Diagnosis", label: "Principal Diagnosis" },
    { value: "Comorbidity", label: "Comorbidity" },
    { value: "Complication", label: "Complication" },
    { value: "Other", label: "Other" },
    { value: "External Cause", label: "External Cause" },
    { value: "Additional Code", label: "Additional Code" },
    { value: "Morphology Code", label: "Morphology Code" },
  ];

  // กรองข้อมูลตามเงื่อนไข
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchYear = filterYear ? item.yr.toString() === filterYear : true;
      const matchMonth = filterMonth ? item.mm.toString() === filterMonth : true;
      const matchProvince = filterProvince
        ? item.province.toLowerCase().includes(filterProvince.toLowerCase())
        : true;
      const matchDiagtype = filterDiagtype
        ? item.diagtype.toLowerCase() === filterDiagtype.toLowerCase()
        : true;
      const matchDiagcode = filterDiagcode
        ? item.diagcode.toLowerCase().includes(filterDiagcode.toLowerCase())
        : true;
      return matchYear && matchMonth && matchProvince && matchDiagtype && matchDiagcode;
    });
  }, [data, filterYear, filterMonth, filterProvince, filterDiagtype, filterDiagcode]);
  const displayData = useMemo(() => {
    // สร้าง array สำหรับชื่อเดือนในภาษาไทย
    const monthNames = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];

    return filteredData.map(item => ({
      "ปี": item.yr,
      "เดือน": monthNames[item.mm], // แปลงเลขเดือนเป็นชื่อเดือนภาษาไทย
      "รหัส": item.hospcode,
      "ชื่อ รพ": item.hosname,
      "จังหวัด": item.province,
      "อำเภอ": item.amphur,
      "ประเภท": item.diagtype,
      "รหัสโรค": item.diagcode,
      "จำนวนผู้ป่วย": item.patient_count,
    }));
  }, [filteredData]);

  // กำหนด header ที่ต้องการแสดงในตาราง
  const headers = ["ปี", "เดือน", "รหัส", "ชื่อ รพ", "จังหวัด", "อำเภอ", "ประเภท", "รหัสโรค", "จำนวนผู้ป่วย"];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cluster Data</h1>
      <div className="mb-4 flex flex-wrap gap-2">
        {/* เลือกปีจากข้อมูล API */}
        <select
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="border p-2"
        >
          <option value="">เลือกปี</option>
          {uniqueYears.map(year => (
            <option key={year} value={year.toString()}>{year}</option>
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
        <input
          type="text"
          placeholder="จังหวัด"
          value={filterProvince}
          onChange={(e) => setFilterProvince(e.target.value)}
          className="border p-2"
        />
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
        <input
          type="text"
          placeholder="รหัสโรค (diagcode)"
          value={filterDiagcode}
          onChange={(e) => setFilterDiagcode(e.target.value)}
          className="border p-2"
        />
      </div>
      {loading && <div>กำลังโหลดข้อมูล...</div>}
      {error && <div>เกิดข้อผิดพลาด: {error}</div>}
      {!loading && !error && (
        <DataTable
          titlespan="ตารางข้อมูล Cluster"
          title="Cluster Data"
          headers={headers}
          data={displayData}
        />
      )}
    </div>
  );
};

export default ClusterPages;
