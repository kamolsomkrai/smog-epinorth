// components/ReportMeasure1.tsx
"use client";

import React, { useEffect, useState, useMemo } from "react";
import PieChartSection from "../(object)/PieChartSection";
import DataTable from "../(object)/DataTable";
import Loading from "../(object)/Loading";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f50",
  "#8dd1e1",
  "#a4de6c",
  "#d0ed57",
  "#ffc0cb",
];

interface ActivityData {
  provcode: number;
  provname: string;
  activityType: number;
  description: string;
  activityYear: number;
  activityCount: number;
}

interface ActivityListData {
  activity_id: number;
  activity_catalog: string;
  catalogname: string;
  activity_detail: string;
  hosp_code: string;
  hospname: string;
  prov_code: string;
  provname: string;
  dist_code: string;
  updated_at: string;
  uploads: { file_path: string }[];
}

const activityTypeLabels = [
  "เฝ้าระวังและติดตามฯ",
  "สื่อสารความเสี่ยงฯ",
  "ปรับปรุงสภาพแวดล้อมฯ",
  "ส่งเสริมการใช้หน้ากากฯ",
  "เตรียมการรองรับผู้ป่วยฯ",
  "กิจกรรมอื่นๆ",
];

const ReportMeasure1: React.FC = () => {
  // สำหรับตาราง Measure1 (/api/measure1)
  const [measure1Data, setMeasure1Data] = useState<ActivityData[]>([]);
  const [loadingMeasure1, setLoadingMeasure1] = useState<boolean>(true);
  const [errorMeasure1, setErrorMeasure1] = useState<string | null>(null);

  // สำหรับตาราง Activity List (/api/activitylist)
  const [activityListData, setActivityListData] = useState<ActivityListData[]>([]);
  const [loadingActivityList, setLoadingActivityList] = useState<boolean>(true);
  const [errorActivityList, setErrorActivityList] = useState<string | null>(null);

  // ตัวกรองสำหรับตาราง Measure1
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedActivityType, setSelectedActivityType] = useState<number | null>(null);

  // ดึงข้อมูลจาก /api/measure1
  useEffect(() => {
    const fetchMeasure1Data = async () => {
      setLoadingMeasure1(true);
      try {
        const response = await fetch("/api/measure1");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedData: ActivityData[] = await response.json();
        if (Array.isArray(fetchedData) && fetchedData.length > 0) {
          setMeasure1Data(fetchedData);
          localStorage.setItem("measure1_data", JSON.stringify(fetchedData));
        } else {
          console.warn("API Response ไม่ถูกต้อง:", fetchedData);
          setErrorMeasure1("ข้อมูลไม่ถูกต้องจาก API");
        }
      } catch (err) {
        console.error("Error fetching measure1 data:", err);
        setErrorMeasure1("ไม่สามารถดึงข้อมูลจาก /api/measure1 ได้");
      } finally {
        setLoadingMeasure1(false);
      }
    };
    fetchMeasure1Data();
  }, []);

  // ดึงข้อมูลจาก /api/activitylist
  useEffect(() => {
    const fetchActivityListData = async () => {
      setLoadingActivityList(true);
      try {
        const response = await fetch("/api/activitylist");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedData: ActivityListData[] = await response.json();
        if (Array.isArray(fetchedData) && fetchedData.length > 0) {
          setActivityListData(fetchedData);
          localStorage.setItem("activitylist_data", JSON.stringify(fetchedData));
        } else {
          console.warn("API Response ไม่ถูกต้อง:", fetchedData);
          setErrorActivityList("ข้อมูลไม่ถูกต้องจาก API");
        }
      } catch (err) {
        console.error("Error fetching activity list data:", err);
        setErrorActivityList("ไม่สามารถดึงข้อมูลจาก /api/activitylist ได้");
      } finally {
        setLoadingActivityList(false);
      }
    };
    fetchActivityListData();
  }, []);

  // กรองข้อมูลสำหรับ Measure1 Table
  const filteredMeasure1Data = useMemo(() => {
    return measure1Data
      .filter(
        (item) =>
          item.provname?.toLowerCase().includes(searchTerm.toLowerCase()) &&
          item.activityYear === selectedYear &&
          (selectedActivityType === null || item.activityType === selectedActivityType)
      )
      .sort((a, b) => a.provcode - b.provcode);
  }, [measure1Data, searchTerm, selectedYear, selectedActivityType]);

  const aggregateMeasure1 = useMemo(() => {
    return {
      totalCount: filteredMeasure1Data.reduce((acc, item) => acc + item.activityCount, 0),
    };
  }, [filteredMeasure1Data]);

  // จัดกลุ่มข้อมูลสำหรับ Pie Chart (Measure1)
  const pieChartData = useMemo(() => {
    const provinceCount: { [key: string]: number } = {};
    filteredMeasure1Data.forEach((item) => {
      provinceCount[item.provname] = (provinceCount[item.provname] || 0) + item.activityCount;
    });
    return Object.entries(provinceCount).map(([name, value]) => ({ name, value }));
  }, [filteredMeasure1Data]);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* ตารางหลัก (Measure1) */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* <h1 className="text-2xl font-semibold mb-4">รายงาน Measure1</h1> */}
          {loadingMeasure1 ? (
            <Loading />
          ) : errorMeasure1 ? (
            <div className="text-red-500 text-center">{errorMeasure1}</div>
          ) : (
            <>
              <PieChartSection
                title={`จำนวนกิจกรรมต่อจังหวัดในปี ${selectedYear}`}
                data={pieChartData}
                colors={COLORS}
              />
              <div className="mb-6 flex flex-wrap gap-6">
                <div className="flex flex-col flex-1 min-w-[250px]">
                  <label
                    htmlFor="provinceSearch"
                    className="mb-2 text-lg font-medium text-gray-700"
                  >
                    ค้นหาจังหวัด:
                  </label>
                  <input
                    id="provinceSearch"
                    type="text"
                    placeholder="ค้นหาจังหวัด..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="flex flex-col flex-1 min-w-[250px]">
                  <label
                    htmlFor="yearFilter"
                    className="mb-2 text-lg font-medium text-gray-700"
                  >
                    เลือกปี:
                  </label>
                  <input
                    id="yearFilter"
                    type="number"
                    placeholder="เลือกปี"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
              {/* ปุ่มกรองประเภทกิจกรรม */}
              <div className="mb-6 flex flex-wrap gap-4">
                {activityTypeLabels.map((label, index) => {
                  const typeValue = index + 1;
                  return (
                    <button
                      key={typeValue}
                      onClick={() =>
                        setSelectedActivityType((prev) =>
                          prev === typeValue ? null : typeValue
                        )
                      }
                      className={`px-4 py-2 rounded border transition-colors duration-200 ${selectedActivityType === typeValue
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700 hover:bg-blue-100"
                        }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <DataTable
                title={`รายงานกิจกรรมในปี ${selectedYear}`}
                headers={["จังหวัด", "ประเภทกิจกรรม", "ปี", "จำนวนกิจกรรม"]}
                data={filteredMeasure1Data.map((item) => ({
                  จังหวัด: item.provname,
                  "ประเภทกิจกรรม": item.description,
                  ปี: item.activityYear,
                  "จำนวนกิจกรรม": item.activityCount,
                }))}
                footer={{
                  จังหวัด: "เขตสุขภาพที่ 1",
                  "ประเภทกิจกรรม": "",
                  ปี: "",
                  "จำนวนกิจกรรม": aggregateMeasure1.totalCount,
                }}
              />
            </>
          )}
        </div>

        {/* ตารางที่สอง (Activity List) */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-4">Activity List</h1>
          {loadingActivityList ? (
            <Loading />
          ) : errorActivityList ? (
            <div className="text-red-500 text-center">{errorActivityList}</div>
          ) : (
            <DataTable
              title="รายงาน Activity List"
              headers={[
                "Activity ID",
                "Activity Catalog",
                "Catalog Name",
                "Hosp Code",
                "Hosp Name",
                "Prov Code",
                "Prov Name",
                "Dist Code",
                "Updated At",
              ]}
              data={activityListData.map((item) => ({
                "Activity ID": item.activity_id,
                "Activity Catalog": item.activity_catalog,
                "Catalog Name": item.catalogname,
                "Hosp Code": item.hosp_code,
                "Hosp Name": item.hospname,
                "Prov Code": item.prov_code,
                "Prov Name": item.provname,
                "Dist Code": item.dist_code,
                "Updated At": item.updated_at,
              }))}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportMeasure1;
