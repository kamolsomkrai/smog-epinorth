"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Measure3Data } from "../../interfaces/newmeasure";
// import PieChartSection from "../(object)/PieChartSection";
// import BarChartSection from "../(object)/BarChartSection";
import DataTable from "../(object)/DataTable";
import Loading from "../(object)/Loading";

// สีสำหรับกราฟ
// const COLORS = [
//   "#8884d8",
//   "#82ca9d",
//   "#ffc658",
//   "#ff7f50",
//   "#8dd1e1",
//   "#a4de6c",
//   "#d0ed57",
//   "#ffc0cb",
//   "#d88884",
//   "#84d8f8",
//   "#ca82d8",
//   "#c6ca82",
// ];

const ReportMeasure3: React.FC = () => {
  const [data, setData] = useState<Measure3Data[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // ฟังก์ชันรวมข้อมูลจากทุกจังหวัด (aggregation) โดยใช้ keys จาก Measure3Data interface
  const aggregateData = (data: Measure3Data[]): Measure3Data => {
    return data.reduce(
      (acc, curr) => ({
        province: acc.province,
        pollutionClinicTotal: Number(acc.pollutionClinicTotal) + Number(curr.pollutionClinicTotal),
        pollutionCliniService: Number(acc.pollutionCliniService) + Number(curr.pollutionCliniService),
        onlinePollutionClinicTotal: Number(acc.onlinePollutionClinicTotal) + Number(curr.onlinePollutionClinicTotal),
        onlinePollutionCliniService: Number(acc.onlinePollutionCliniService) + Number(curr.onlinePollutionCliniService),
        mosquitoNetTotal: Number(acc.mosquitoNetTotal) + Number(curr.mosquitoNetTotal),
        mosquitoNetService: Number(acc.mosquitoNetService) + Number(curr.mosquitoNetService),
        nurseryDustFreeTotal: Number(acc.nurseryDustFreeTotal) + Number(curr.nurseryDustFreeTotal),
        nurseryDustFreeService: Number(acc.nurseryDustFreeService) + Number(curr.nurseryDustFreeService),
        publicHealthDustFreeTotal: Number(acc.publicHealthDustFreeTotal) + Number(curr.publicHealthDustFreeTotal),
        publicHealthDustFreeService: Number(acc.publicHealthDustFreeService) + Number(curr.publicHealthDustFreeService),
        officeDustFreeTotal: Number(acc.officeDustFreeTotal) + Number(curr.officeDustFreeTotal),
        officeDustFreeService: Number(acc.officeDustFreeService) + Number(curr.officeDustFreeService),
        buildingDustFreeTotal: Number(acc.buildingDustFreeTotal) + Number(curr.buildingDustFreeTotal),
        buildingDustFreeService: Number(acc.buildingDustFreeService) + Number(curr.buildingDustFreeService),
        otherDustFreeTotal: Number(acc.otherDustFreeTotal) + Number(curr.otherDustFreeTotal),
        otherDustFreeService: Number(acc.otherDustFreeService) + Number(curr.otherDustFreeService),
        team3DoctorTotal: Number(acc.team3DoctorTotal) + Number(curr.team3DoctorTotal),
        team3DoctorService: Number(acc.team3DoctorService) + Number(curr.team3DoctorService),
        mobileDoctorTotal: Number(acc.mobileDoctorTotal) + Number(curr.mobileDoctorTotal),
        mobileDoctorService: Number(acc.mobileDoctorService) + Number(curr.mobileDoctorService),
        civilTakeCareTotal: Number(acc.civilTakeCareTotal) + Number(curr.civilTakeCareTotal),
        civilTakeCareService: Number(acc.civilTakeCareService) + Number(curr.civilTakeCareService),
        shertTeamProvTotal: Number(acc.shertTeamProvTotal) + Number(curr.shertTeamProvTotal),
        shertTeamProvService: Number(acc.shertTeamProvService) + Number(curr.shertTeamProvService),
        shertTeamDistTotal: Number(acc.shertTeamDistTotal) + Number(curr.shertTeamDistTotal),
        shertTeamDistService: Number(acc.shertTeamDistService) + Number(curr.shertTeamDistService),
        envoCccuTotal: Number(acc.envoCccuTotal) + Number(curr.envoCccuTotal),
        envoCccuService: Number(acc.envoCccuService) + Number(curr.envoCccuService),
        n95MaskGiveCivil: Number(acc.n95MaskGiveCivil) + Number(curr.n95MaskGiveCivil),
        surgicalMaskGiveCivil: Number(acc.surgicalMaskGiveCivil) + Number(curr.surgicalMaskGiveCivil),
        n95MaskGiveChild: Number(acc.n95MaskGiveChild) + Number(curr.n95MaskGiveChild),
        surgicalMaskGiveChild: Number(acc.surgicalMaskGiveChild) + Number(curr.surgicalMaskGiveChild),
        n95MaskGiveOlder: Number(acc.n95MaskGiveOlder) + Number(curr.n95MaskGiveOlder),
        surgicalMaskGiveOlder: Number(acc.surgicalMaskGiveOlder) + Number(curr.surgicalMaskGiveOlder),
        n95MaskGivePregnant: Number(acc.n95MaskGivePregnant) + Number(curr.n95MaskGivePregnant),
        surgicalMaskGivePregnant: Number(acc.surgicalMaskGivePregnant) + Number(curr.surgicalMaskGivePregnant),
        n95MaskGiveBedridden: Number(acc.n95MaskGiveBedridden) + Number(curr.n95MaskGiveBedridden),
        surgicalMaskGiveBedridden: Number(acc.surgicalMaskGiveBedridden) + Number(curr.surgicalMaskGiveBedridden),
        n95MaskGiveSick: Number(acc.n95MaskGiveSick) + Number(curr.n95MaskGiveSick),
        surgicalMaskGiveSick: Number(acc.surgicalMaskGiveSick) + Number(curr.surgicalMaskGiveSick),
        n95MaskGiveHeart: Number(acc.n95MaskGiveHeart) + Number(curr.n95MaskGiveHeart),
        surgicalMaskGiveHeart: Number(acc.surgicalMaskGiveHeart) + Number(curr.surgicalMaskGiveHeart),
        n95MaskGiveCopd: Number(acc.n95MaskGiveCopd) + Number(curr.n95MaskGiveCopd),
        surgicalMaskGiveCopd: Number(acc.surgicalMaskGiveCopd) + Number(curr.surgicalMaskGiveCopd),
        skyDoctor: Number(acc.skyDoctor) + Number(curr.skyDoctor),
        ambulance: Number(acc.ambulance) + Number(curr.ambulance),
      }),
      {
        pollutionClinicTotal: 0,
        pollutionCliniService: 0,
        onlinePollutionClinicTotal: 0,
        onlinePollutionCliniService: 0,
        mosquitoNetTotal: 0,
        mosquitoNetService: 0,
        nurseryDustFreeTotal: 0,
        nurseryDustFreeService: 0,
        publicHealthDustFreeTotal: 0,
        publicHealthDustFreeService: 0,
        officeDustFreeTotal: 0,
        officeDustFreeService: 0,
        buildingDustFreeTotal: 0,
        buildingDustFreeService: 0,
        otherDustFreeTotal: 0,
        otherDustFreeService: 0,
        team3DoctorTotal: 0,
        team3DoctorService: 0,
        mobileDoctorTotal: 0,
        mobileDoctorService: 0,
        civilTakeCareTotal: 0,
        civilTakeCareService: 0,
        shertTeamProvTotal: 0,
        shertTeamProvService: 0,
        shertTeamDistTotal: 0,
        shertTeamDistService: 0,
        envoCccuTotal: 0,
        envoCccuService: 0,
        n95MaskGiveCivil: 0,
        surgicalMaskGiveCivil: 0,
        n95MaskGiveChild: 0,
        surgicalMaskGiveChild: 0,
        n95MaskGiveOlder: 0,
        surgicalMaskGiveOlder: 0,
        n95MaskGivePregnant: 0,
        surgicalMaskGivePregnant: 0,
        n95MaskGiveBedridden: 0,
        surgicalMaskGiveBedridden: 0,
        n95MaskGiveSick: 0,
        surgicalMaskGiveSick: 0,
        n95MaskGiveHeart: 0,
        surgicalMaskGiveHeart: 0,
        n95MaskGiveCopd: 0,
        surgicalMaskGiveCopd: 0,
        skyDoctor: 0,
        ambulance: 0,
      } as Measure3Data
    );
  };

  const aggregateMemo = useMemo(() => {
    return data ? aggregateData(data) : null;
  }, [data]);

  const filteredData = useMemo(() => {
    return data?.filter((item) =>
      item.province.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
  }, [data, searchTerm]);

  useEffect(() => {
    const fetchMeasure3 = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/measure3");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedData: Measure3Data[] = await response.json();
        if (Array.isArray(fetchedData) && fetchedData.length > 0) {
          setData(fetchedData);
          localStorage.setItem("Measure3Data", JSON.stringify(fetchedData));
        } else {
          console.warn("API Response ไม่ถูกต้อง:", fetchedData);
          setError("ข้อมูลไม่ถูกต้องจาก API");
        }
      } catch (err) {
        console.error("Error fetching Measure3 data:", err);
        setError("ไม่สามารถดึงข้อมูลมาตรการที่ 3 ได้");
      } finally {
        setLoading(false);
      }
    };

    fetchMeasure3();
  }, []);

  const calculateTotal = useMemo(() => (field: keyof Measure3Data): number => {
    return (data || []).reduce((acc, curr) => acc + Number(curr[field] ?? 0), 0);
  }, [data]);


  // // Pie chart data สำหรับคลินิก (จำนวนเปิดและบริการ)
  // const pieDataClinicsOpen = useMemo(
  //   () => [
  //     { name: "คลินิกมลพิษ", value: aggregateMemo?.pollutionClinicTotal || 0 },
  //     { name: "คลินิกมลพิษออนไลน์", value: aggregateMemo?.onlinePollutionClinicTotal || 0 },
  //   ],
  //   [aggregateMemo]
  // );

  // const pieDataClinicsService = useMemo(
  //   () => [
  //     { name: "บริการคลินิกมลพิษ", value: aggregateMemo?.pollutionCliniService || 0 },
  //     { name: "บริการคลินิกมลพิษออนไลน์", value: aggregateMemo?.onlinePollutionCliniService || 0 },
  //   ],
  //   [aggregateMemo]
  // );

  // // Pie chart data สำหรับห้องปลอดฝุ่น (แบ่งเป็นศูนย์เด็กเล็ก, หน่วยงาน, สำนักงาน, อาคาร, อื่น ๆ)
  // const pieDataDustFree = useMemo(
  //   () => [
  //     { name: "ศูนย์เด็กเล็ก", value: aggregateMemo?.nurseryDustFreeTotal || 0 },
  //     { name: "หน่วยงานสาธารณสุข", value: aggregateMemo?.publicHealthDustFreeTotal || 0 },
  //     { name: "สำนักงาน", value: aggregateMemo?.officeDustFreeTotal || 0 },
  //     { name: "อาคาร", value: aggregateMemo?.buildingDustFreeTotal || 0 },
  //     { name: "อื่น ๆ", value: aggregateMemo?.otherDustFreeTotal || 0 },
  //   ],
  //   [aggregateMemo]
  // );

  // const pieDataDustFreeService = useMemo(
  //   () => [
  //     { name: "ศูนย์เด็กเล็ก", value: aggregateMemo?.nurseryDustFreeService || 0 },
  //     { name: "หน่วยงานสาธารณสุข", value: aggregateMemo?.publicHealthDustFreeService || 0 },
  //     { name: "สำนักงาน", value: aggregateMemo?.officeDustFreeService || 0 },
  //     { name: "อาคาร", value: aggregateMemo?.buildingDustFreeService || 0 },
  //     { name: "อื่น ๆ", value: aggregateMemo?.otherDustFreeService || 0 },
  //   ],
  //   [aggregateMemo]
  // );

  // // Bar chart data สำหรับทีมแพทย์
  // const barChartData = useMemo(
  //   () => [
  //     {
  //       name: "ทีม 3 หมอ",
  //       Total: aggregateMemo?.team3DoctorTotal || 0,
  //       Add: aggregateMemo?.team3DoctorService || 0,
  //     },
  //     {
  //       name: "ทีมแพทย์เคลื่อนที่",
  //       Total: aggregateMemo?.mobileDoctorTotal || 0,
  //       Add: aggregateMemo?.mobileDoctorService || 0,
  //     },
  //     {
  //       name: "ทีมดูแลประชาชน",
  //       Total: aggregateMemo?.civilTakeCareTotal || 0,
  //       Add: aggregateMemo?.civilTakeCareService || 0,
  //     },
  //   ],
  //   [aggregateMemo]
  // );

  // // Pie chart data สำหรับหน้ากาก (N95 และ Surgical)
  // const pieDataMasksN95 = useMemo(
  //   () => [
  //     { name: "N95 ผู้สูงอายุ", value: aggregateMemo?.n95MaskGiveOlder || 0 },
  //     { name: "N95 เด็กเล็ก", value: aggregateMemo?.n95MaskGiveChild || 0 },
  //     { name: "N95 หญิงตั้งครรภ์", value: aggregateMemo?.n95MaskGivePregnant || 0 },
  //     { name: "N95 ติดเตียง", value: aggregateMemo?.n95MaskGiveBedridden || 0 },
  //     { name: "N95 ผู้มีโรคประจำตัว", value: aggregateMemo?.n95MaskGiveSick || 0 },
  //   ],
  //   [aggregateMemo]
  // );

  // const pieDataMasksSurgical = useMemo(
  //   () => [
  //     { name: "Surgical ผู้สูงอายุ", value: aggregateMemo?.surgicalMaskGiveOlder || 0 },
  //     { name: "Surgical เด็กเล็ก", value: aggregateMemo?.surgicalMaskGiveChild || 0 },
  //     { name: "Surgical หญิงตั้งครรภ์", value: aggregateMemo?.surgicalMaskGivePregnant || 0 },
  //     { name: "Surgical ติดเตียง", value: aggregateMemo?.surgicalMaskGiveBedridden || 0 },
  //     { name: "Surgical ผู้มีโรคประจำตัว", value: aggregateMemo?.surgicalMaskGiveSick || 0 },
  //   ],
  //   [aggregateMemo]
  // );

  // // Pie chart data สำหรับระบบรักษาส่งต่อผู้ป่วย
  // const pieDataOthers = useMemo(
  //   () => [
  //     { name: "SKY doctor", value: aggregateMemo?.skyDoctor || 0 },
  //     { name: "รถกู้ชีพ ALS", value: aggregateMemo?.ambulance || 0 },
  //   ],
  //   [aggregateMemo]
  // );

  return (
    <div className="space-y-8 p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Search Input */}
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
          <Loading />
        ) : (
          <>
            {error && <div className="text-red-500 text-center">{error}</div>}

            {/* Section: คลินิก */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">จำนวนคลินิกมลพิษและการให้บริการ</h2>
              {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <PieChartSection
                  title="จำนวนคลินิก (เปิด)"
                  data={pieDataClinicsOpen}
                  colors={COLORS}
                />
                <PieChartSection
                  title="จำนวนบริการคลินิก"
                  data={pieDataClinicsService}
                  colors={COLORS}
                />
              </div> */}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <DataTable
                  titlespan="จำนวนคลินิกมลพิษฯ"
                  title="จำนวนคลินิกมลพิษและคลินิกมลพิษออนไลน์"
                  headers={["จังหวัด", "คลินิกมลพิษ (แห่ง)", "คลินิกมลพิษออนไลน์ (แห่ง)"]}
                  data={filteredData.map((item) => ({
                    "จังหวัด": item.province,
                    "คลินิกมลพิษ (แห่ง)": item.pollutionClinicTotal ?? 0,
                    "คลินิกมลพิษออนไลน์ (แห่ง)": item.onlinePollutionClinicTotal ?? 0,
                  }))}
                  footer={{
                    "จังหวัด": "เขตสุขภาพที่ 1",
                    "คลินิกมลพิษ (แห่ง)": calculateTotal("pollutionClinicTotal"),
                    "คลินิกมลพิษออนไลน์ (แห่ง)": calculateTotal("onlinePollutionClinicTotal"),
                  }}
                />

                <DataTable
                  titlespan="จำนวนผู้รับบริการ คลินิกมลพิษฯ"
                  title="จำนวนผู้รับบริการ คลินิกมลพิษฯ"
                  headers={["จังหวัด", "คลินิกมลพิษ (ครั้ง)", "คลินิกมลพิษออนไลน์ (ครั้ง)"]}
                  data={filteredData.map((item) => ({
                    "จังหวัด": item.province,
                    "คลินิกมลพิษ (ครั้ง)": item.pollutionCliniService ?? 0,
                    "คลินิกมลพิษออนไลน์ (ครั้ง)": item.onlinePollutionCliniService ?? 0,
                  }))}
                  footer={{
                    "จังหวัด": "เขตสุขภาพที่ 1",
                    "คลินิกมลพิษ (ครั้ง)": calculateTotal("pollutionCliniService"),
                    "คลินิกมลพิษออนไลน์ (ครั้ง)": calculateTotal("onlinePollutionCliniService"),
                  }}
                />
              </div>

              <div className="mt-6">

              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">การสนับสนุนมุ้งสู้ฝุ่น (สะสม)</h2>
              <DataTable
                titlespan="จำนวนมุ้งสู้ฝุ่น และการสนับสนุนมุ้งสู้ฝุ่น"
                title="จำนวนผู้รับบริการ คลินิกมลพิษฯ"
                headers={["จังหวัด", "จำนวนคลังสะสม (หลัง)", "สนับสนุน/แจกจ่าย (หลัง)"]}
                data={filteredData.map((item) => ({
                  "จังหวัด": item.province,
                  "จำนวนคลังสะสม (หลัง)": item.mosquitoNetTotal ?? 0,
                  "สนับสนุน/แจกจ่าย (หลัง)": item.mosquitoNetService ?? 0,
                }))}
                footer={{
                  "จังหวัด": "เขตสุขภาพที่ 1",
                  "จำนวนคลังสะสม (หลัง)": calculateTotal("mosquitoNetTotal"),
                  "สนับสนุน/แจกจ่าย (หลัง)": calculateTotal("mosquitoNetService"),
                }}
              />
            </div>

            {/* Section: ห้องปลอดฝุ่น */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">จัดเตรียมห้องปลอดฝุ่น</h2>
              {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> */}
              <DataTable
                titlespan="จำนวนห้องปลอดฝุ่นสะสม"
                title="รายละเอียดห้องปลอดฝุ่น (ห้อง)"
                headers={["จังหวัด", "ศูนย์พัฒนาเด็ก (ห้อง)", "สถานบริการสาธารณสุข (ห้อง)", "อาคารสำนักงาน (ห้อง)", "ร้านอาหาร/กาแฟ/โรงแรม (ห้อง)", "อื่น ๆ (ห้อง)"]}
                data={filteredData.map((item) => ({
                  "จังหวัด": item.province,
                  "ศูนย์พัฒนาเด็ก (ห้อง)": item.nurseryDustFreeTotal ?? 0,
                  "สถานบริการสาธารณสุข (ห้อง)": item.publicHealthDustFreeTotal ?? 0,
                  "อาคารสำนักงาน (ห้อง)": item.officeDustFreeTotal ?? 0,
                  "ร้านอาหาร/กาแฟ/โรงแรม (ห้อง)": item.buildingDustFreeTotal ?? 0,
                  "อื่น ๆ (ห้อง)": item.otherDustFreeTotal ?? 0,
                }))}
                footer={{
                  "จังหวัด": "เขตสุขภาพที่ 1",
                  "ศูนย์พัฒนาเด็ก (ห้อง)": calculateTotal("nurseryDustFreeTotal"),
                  "สถานบริการสาธารณสุข (ห้อง)": calculateTotal("publicHealthDustFreeTotal"),
                  "อาคารสำนักงาน (ห้อง)": calculateTotal("officeDustFreeTotal"),
                  "ร้านอาหาร/กาแฟ/โรงแรม (ห้อง)": calculateTotal("buildingDustFreeTotal"),
                  "อื่น ๆ (ห้อง)": calculateTotal("otherDustFreeTotal"),
                }}
              />
              <DataTable
                titlespan="ให้บริการห้องปลอดฝุ่น"
                title="รายละเอียดบริการห้องปลอดฝุ่น"
                headers={["จังหวัด", "ศูนย์พัฒนาเด็ก (ครั้ง)", "สถานบริการสาธารณสุข (ครั้ง)", "อาคารสำนักงาน (ครั้ง)", "ร้านอาหาร/กาแฟ/โรงแรม (ครั้ง)", "อื่น ๆ (ครั้ง)"]}
                data={filteredData.map((item) => ({
                  "จังหวัด": item.province,
                  "ศูนย์พัฒนาเด็ก (ครั้ง)": item.nurseryDustFreeService ?? 0,
                  "สถานบริการสาธารณสุข (ครั้ง)": item.publicHealthDustFreeService ?? 0,
                  "อาคารสำนักงาน (ครั้ง)": item.officeDustFreeService ?? 0,
                  "ร้านอาหาร/กาแฟ/โรงแรม (ครั้ง)": item.buildingDustFreeService ?? 0,
                  "อื่น ๆ (ครั้ง)": item.otherDustFreeService ?? 0,
                }))}
                footer={{
                  "จังหวัด": "เขตสุขภาพที่ 1",
                  "ศูนย์พัฒนาเด็ก (ครั้ง)": calculateTotal("nurseryDustFreeService"),
                  "สถานบริการสาธารณสุข (ครั้ง)": calculateTotal("publicHealthDustFreeService"),
                  "อาคารสำนักงาน (ครั้ง)": calculateTotal("officeDustFreeService"),
                  "ร้านอาหาร/กาแฟ/โรงแรม (ครั้ง)": calculateTotal("buildingDustFreeService"),
                  "อื่น ๆ (ครั้ง)": calculateTotal("otherDustFreeService"),
                }}
              />
              {/* </div> */}
            </div>

            {/* Section: ทีมแพทย์ */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">ทีมปฏิบัติการด้านการแพทย์และสาธารณสุข</h2>
              {/* <BarChartSection
                title="ทีมแพทย์"
                data={barChartData}
                keys={["Total", "Add"]}
                colors={COLORS}
              /> */}
              <DataTable
                titlespan="จำนวนทีมปฏิบัติการด้านการแพทย์และสาธารณสุข (สะสม)"
                title="จำนวนทีมปฏิบัติการด้านการแพทย์และสาธารณสุข (สะสม)"
                headers={[
                  "จังหวัด",
                  "ทีม 3 หมอ",
                  "ทีมหน่วยแพทย์เคลื่อนที่",
                  "ทีมดูแลประชาชน",
                  "ทีม SHERT จังหวัด",
                  "ทีม SHERT อำเภอ",
                  "ทีม EnvOcc CU",
                ]}
                data={filteredData.map((item) => ({
                  "จังหวัด": item.province,
                  "ทีม 3 หมอ": item.team3DoctorTotal,
                  "ทีมหน่วยแพทย์เคลื่อนที่": item.mobileDoctorTotal,
                  "ทีมดูแลประชาชน": item.civilTakeCareTotal,
                  "ทีม SHERT จังหวัด": item.shertTeamProvTotal,
                  "ทีม SHERT อำเภอ": item.shertTeamDistTotal,
                  "ทีม EnvOcc CU": item.envoCccuTotal,
                }))}
                footer={{
                  "จังหวัด": "เขตสุขภาพที่ 1",
                  "ทีม 3 หมอ": aggregateMemo?.team3DoctorTotal || 0,
                  "ทีมหน่วยแพทย์เคลื่อนที่": aggregateMemo?.mobileDoctorTotal || 0,
                  "ทีมดูแลประชาชน": aggregateMemo?.civilTakeCareTotal || 0,
                  "ทีม SHERT จังหวัด": aggregateMemo?.shertTeamProvTotal || 0,
                  "ทีม SHERT อำเภอ": aggregateMemo?.shertTeamDistTotal || 0,
                  "ทีม EnvOcc CU": aggregateMemo?.envoCccuTotal || 0,
                }}
              />
              <DataTable
                titlespan="จำนวนทีมปฏิบัติการด้านการแพทย์และสาธารณสุข (ลงพื้นที่)"
                title="จำนวนทีมปฏิบัติการด้านการแพทย์และสาธารณสุข (ลงพื้นที่)"
                headers={[
                  "จังหวัด",
                  "ทีม 3 หมอ",
                  "ทีมหน่วยแพทย์เคลื่อนที่",
                  "ทีมดูแลประชาชน",
                  "ทีม SHERT จังหวัด",
                  "ทีม SHERT อำเภอ",
                  "ทีม EnvOcc CU",
                ]}
                data={filteredData.map((item) => ({
                  "จังหวัด": item.province,
                  "ทีม 3 หมอ": item.team3DoctorService,
                  "ทีมหน่วยแพทย์เคลื่อนที่": item.mobileDoctorService,
                  "ทีมดูแลประชาชน": item.civilTakeCareService,
                  "ทีม SHERT จังหวัด": item.shertTeamProvService,
                  "ทีม SHERT อำเภอ": item.shertTeamDistService,
                  "ทีม EnvOcc CU": item.envoCccuService,
                }))}
                footer={{
                  "จังหวัด": "เขตสุขภาพที่ 1",
                  "ทีม 3 หมอ": aggregateMemo?.team3DoctorService || 0,
                  "ทีมหน่วยแพทย์เคลื่อนที่": aggregateMemo?.mobileDoctorService || 0,
                  "ทีมดูแลประชาชน": aggregateMemo?.civilTakeCareService || 0,
                  "ทีม SHERT จังหวัด": aggregateMemo?.shertTeamProvService || 0,
                  "ทีม SHERT อำเภอ": aggregateMemo?.shertTeamDistService || 0,
                  "ทีม EnvOcc CU": aggregateMemo?.envoCccuService || 0,
                }}
              />
            </div>

            {/* Section: อุปกรณ์ป้องกันส่วนบุคคล */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                สนับสนุนอุปกรณ์ป้องกันส่วนบุคคลแก่กลุ่มเสี่ยง
              </h2>
              <div className="grid grid-cols-1 gap-8">
                {/* <PieChartSection
                  title="หน้ากาก N95"
                  data={pieDataMasksN95}
                  colors={COLORS}
                /> */}
                <DataTable
                  titlespan="สนับสนุน N95 Mask สะสม (ชิ้น)"
                  title="สนับสนุน N95 Mask สะสม (ชิ้น)"
                  headers={[
                    "จังหวัด",
                    "ประชาชน",
                    "ผู้สูงอายุ",
                    "เด็กเล็ก",
                    "หญิงตั้งครรภ์",
                    "ติดเตียง",
                    "ผู้มีโรคประจำตัว",
                    "ผู้ที่มีโรคหัวใจ",
                    "ผู้ที่มีโรคระบบทางเดินหายใจ",
                  ]}
                  data={filteredData.map((item) => ({
                    "จังหวัด": item.province,
                    "ประชาชน": item.n95MaskGiveCivil ?? 0,
                    "ผู้สูงอายุ": item.n95MaskGiveOlder ?? 0,
                    "เด็กเล็ก": item.n95MaskGiveChild ?? 0,
                    "หญิงตั้งครรภ์": item.n95MaskGivePregnant ?? 0,
                    "ติดเตียง": item.n95MaskGiveBedridden ?? 0,
                    "ผู้มีโรคประจำตัว": item.n95MaskGiveSick ?? 0,
                    "ผู้ที่มีโรคหัวใจ": item.n95MaskGiveHeart ?? 0,
                    "ผู้ที่มีโรคระบบทางเดินหายใจ": item.n95MaskGiveCopd ?? 0,
                  }))}
                  footer={{
                    "จังหวัด": "เขตสุขภาพที่ 1",
                    "ประชาชน": calculateTotal("n95MaskGiveCivil"),
                    "ผู้สูงอายุ": calculateTotal("n95MaskGiveOlder"),
                    "เด็กเล็ก": calculateTotal("n95MaskGiveChild"),
                    "หญิงตั้งครรภ์": calculateTotal("n95MaskGivePregnant"),
                    "ติดเตียง": calculateTotal("n95MaskGiveBedridden"),
                    "ผู้มีโรคประจำตัว": calculateTotal("n95MaskGiveSick"),
                    "ผู้ที่มีโรคหัวใจ": calculateTotal("n95MaskGiveHeart"),
                    "ผู้ที่มีโรคระบบทางเดินหายใจ": calculateTotal("n95MaskGiveCopd"),
                  }}
                />
                {/* <PieChartSection
                  title="หน้ากากอนามัย"
                  data={pieDataMasksSurgical}
                  colors={COLORS}
                /> */}
                <DataTable
                  titlespan="สนับสนุน Surgical Mask สะสม (ชิ้น)"
                  title="สนับสนุน Surgical Mask สะสม (ชิ้น)"
                  headers={[
                    "จังหวัด",
                    "ประชาชน",
                    "ผู้สูงอายุ",
                    "เด็กเล็ก",
                    "หญิงตั้งครรภ์",
                    "ติดเตียง",
                    "ผู้มีโรคประจำตัว",
                    "ผู้ที่มีโรคหัวใจ",
                    "ผู้ที่มีโรคระบบทางเดินหายใจ",
                  ]}
                  data={filteredData.map((item) => ({
                    "จังหวัด": item.province,
                    "ประชาชน": item.surgicalMaskGiveCivil ?? 0,
                    "ผู้สูงอายุ": item.surgicalMaskGiveOlder ?? 0,
                    "เด็กเล็ก": item.surgicalMaskGiveChild ?? 0,
                    "หญิงตั้งครรภ์": item.surgicalMaskGivePregnant ?? 0,
                    "ติดเตียง": item.surgicalMaskGiveBedridden ?? 0,
                    "ผู้มีโรคประจำตัว": item.surgicalMaskGiveSick ?? 0,
                    "ผู้ที่มีโรคหัวใจ": item.surgicalMaskGiveHeart ?? 0,
                    "ผู้ที่มีโรคระบบทางเดินหายใจ": item.surgicalMaskGiveCopd ?? 0,
                  }))}
                  footer={{
                    "จังหวัด": "เขตสุขภาพที่ 1",
                    "ประชาชน": calculateTotal("surgicalMaskGiveCivil"),
                    "ผู้สูงอายุ": calculateTotal("surgicalMaskGiveOlder"),
                    "เด็กเล็ก": calculateTotal("surgicalMaskGiveChild"),
                    "หญิงตั้งครรภ์": calculateTotal("surgicalMaskGivePregnant"),
                    "ติดเตียง": calculateTotal("surgicalMaskGiveBedridden"),
                    "ผู้มีโรคประจำตัว": calculateTotal("surgicalMaskGiveSick"),
                    "ผู้ที่มีโรคหัวใจ": calculateTotal("surgicalMaskGiveHeart"),
                    "ผู้ที่มีโรคระบบทางเดินหายใจ": calculateTotal("surgicalMaskGiveCopd"),
                  }}
                />
              </div>
            </div>

            {/* Section: ระบบรักษาส่งต่อผู้ป่วย */}
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* <PieChartSection
                title="ระบบรักษาส่งต่อผู้ป่วย"
                data={pieDataOthers}
                colors={COLORS}
              /> */}
              <DataTable
                titlespan="ระบบรักษาส่งต่อผู้ป่วย"
                title="รายละเอียดระบบรักษาส่งต่อผู้ป่วย"
                headers={["จังหวัด", "SKY doctor", "ทีมกู้ชีพ ALS"]}
                data={filteredData.map((item) => ({
                  "จังหวัด": item.province,
                  "SKY doctor": item.skyDoctor ?? 0,
                  "ทีมกู้ชีพ ALS": item.ambulance ?? 0,
                }))}
                footer={{
                  "จังหวัด": "เขตสุขภาพที่ 1",
                  "SKY doctor": aggregateMemo?.skyDoctor || 0,
                  "ทีมกู้ชีพ ALS": aggregateMemo?.ambulance || 0,
                }}
              />
            </div>
          </>
        )}
      </div>
    </div >
  );
};

export default ReportMeasure3;
