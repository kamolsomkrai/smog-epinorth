"use client"
import React, { useEffect, useState, useMemo } from 'react';
import DataTable from '../components/(object)/DataTable';

interface ClusterData {
  yr: number;
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
  const [filterYear, setFilterYear] = useState<string>("");
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

  // กรองข้อมูลตามเงื่อนไข (กรอง yr แต่ไม่แสดงในตาราง)
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchYear = filterYear ? item.yr.toString() === filterYear : true;
      const matchProvince = filterProvince
        ? item.province.toLowerCase().includes(filterProvince.toLowerCase())
        : true;
      const matchDiagtype = filterDiagtype
        ? item.diagtype.toLowerCase().includes(filterDiagtype.toLowerCase())
        : true;
      const matchDiagcode = filterDiagcode
        ? item.diagcode.toLowerCase().includes(filterDiagcode.toLowerCase())
        : true;
      return matchYear && matchProvince && matchDiagtype && matchDiagcode;
    });
  }, [data, filterYear, filterProvince, filterDiagtype, filterDiagcode]);

  // แปลงข้อมูลสำหรับแสดงผล โดยซ่อน yr และเปลี่ยนชื่อ key ให้ตรงกับ header ที่ต้องการ
  const displayData = useMemo(() => {
    return filteredData.map(item => ({
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
  const headers = ["รหัส", "ชื่อ รพ", "จังหวัด", "อำเภอ", "ประเภท", "รหัสโรค", "จำนวนผู้ป่วย"];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cluster Data</h1>
      <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="ปี"
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="จังหวัด"
          value={filterProvince}
          onChange={(e) => setFilterProvince(e.target.value)}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="diagtype"
          value={filterDiagtype}
          onChange={(e) => setFilterDiagtype(e.target.value)}
          className="border p-2"
        />
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