"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Measure3Data } from "../../interfaces/newmeasure";
import DataTable from "../(object)/DataTable";
import Loading from "../(object)/Loading";

const ReportMeasure3: React.FC = () => {
  const [data, setData] = useState<Measure3Data[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProvince, setSelectedProvince] = useState<string>("");

  // ฟังก์ชันแปลงตัวเลขให้มีคอมม่า เช่น 1,000
  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  // ฟังก์ชันรวมข้อมูลจากทุกจังหวัด
  const aggregateData = (data: Measure3Data[]): Measure3Data => {
    return data.reduce(
      (acc, curr) => ({
        province: acc.province,
        pollutionClinicTotal:
          Number(acc.pollutionClinicTotal) + Number(curr.pollutionClinicTotal),
        pollutionCliniService:
          Number(acc.pollutionCliniService) + Number(curr.pollutionCliniService),
        onlinePollutionClinicTotal:
          Number(acc.onlinePollutionClinicTotal) + Number(curr.onlinePollutionClinicTotal),
        onlinePollutionCliniService:
          Number(acc.onlinePollutionCliniService) + Number(curr.onlinePollutionCliniService),
        mosquitoNetTotal:
          Number(acc.mosquitoNetTotal) + Number(curr.mosquitoNetTotal),
        mosquitoNetService:
          Number(acc.mosquitoNetService) + Number(curr.mosquitoNetService),
        nurseryDustFreeTotal:
          Number(acc.nurseryDustFreeTotal) + Number(curr.nurseryDustFreeTotal),
        nurseryDustFreeService:
          Number(acc.nurseryDustFreeService) + Number(curr.nurseryDustFreeService),
        publicHealthDustFreeTotal:
          Number(acc.publicHealthDustFreeTotal) + Number(curr.publicHealthDustFreeTotal),
        publicHealthDustFreeService:
          Number(acc.publicHealthDustFreeService) + Number(curr.publicHealthDustFreeService),
        officeDustFreeTotal:
          Number(acc.officeDustFreeTotal) + Number(curr.officeDustFreeTotal),
        officeDustFreeService:
          Number(acc.officeDustFreeService) + Number(curr.officeDustFreeService),
        buildingDustFreeTotal:
          Number(acc.buildingDustFreeTotal) + Number(curr.buildingDustFreeTotal),
        buildingDustFreeService:
          Number(acc.buildingDustFreeService) + Number(curr.buildingDustFreeService),
        otherDustFreeTotal:
          Number(acc.otherDustFreeTotal) + Number(curr.otherDustFreeTotal),
        otherDustFreeService:
          Number(acc.otherDustFreeService) + Number(curr.otherDustFreeService),
        team3DoctorTotal:
          Number(acc.team3DoctorTotal) + Number(curr.team3DoctorTotal),
        team3DoctorService:
          Number(acc.team3DoctorService) + Number(curr.team3DoctorService),
        mobileDoctorTotal:
          Number(acc.mobileDoctorTotal) + Number(curr.mobileDoctorTotal),
        mobileDoctorService:
          Number(acc.mobileDoctorService) + Number(curr.mobileDoctorService),
        civilTakeCareTotal:
          Number(acc.civilTakeCareTotal) + Number(curr.civilTakeCareTotal),
        civilTakeCareService:
          Number(acc.civilTakeCareService) + Number(curr.civilTakeCareService),
        shertTeamProvTotal:
          Number(acc.shertTeamProvTotal) + Number(curr.shertTeamProvTotal),
        shertTeamProvService:
          Number(acc.shertTeamProvService) + Number(curr.shertTeamProvService),
        shertTeamDistTotal:
          Number(acc.shertTeamDistTotal) + Number(curr.shertTeamDistTotal),
        shertTeamDistService:
          Number(acc.shertTeamDistService) + Number(curr.shertTeamDistService),
        envoCccuTotal:
          Number(acc.envoCccuTotal) + Number(curr.envoCccuTotal),
        envoCccuService:
          Number(acc.envoCccuService) + Number(curr.envoCccuService),
        n95MaskGiveCivil:
          Number(acc.n95MaskGiveCivil) + Number(curr.n95MaskGiveCivil),
        surgicalMaskGiveCivil:
          Number(acc.surgicalMaskGiveCivil) + Number(curr.surgicalMaskGiveCivil),
        n95MaskGiveChild:
          Number(acc.n95MaskGiveChild) + Number(curr.n95MaskGiveChild),
        surgicalMaskGiveChild:
          Number(acc.surgicalMaskGiveChild) + Number(curr.surgicalMaskGiveChild),
        n95MaskGiveOlder:
          Number(acc.n95MaskGiveOlder) + Number(curr.n95MaskGiveOlder),
        surgicalMaskGiveOlder:
          Number(acc.surgicalMaskGiveOlder) + Number(curr.surgicalMaskGiveOlder),
        n95MaskGivePregnant:
          Number(acc.n95MaskGivePregnant) + Number(curr.n95MaskGivePregnant),
        surgicalMaskGivePregnant:
          Number(acc.surgicalMaskGivePregnant) + Number(curr.surgicalMaskGivePregnant),
        n95MaskGiveBedridden:
          Number(acc.n95MaskGiveBedridden) + Number(curr.n95MaskGiveBedridden),
        surgicalMaskGiveBedridden:
          Number(acc.surgicalMaskGiveBedridden) + Number(curr.surgicalMaskGiveBedridden),
        n95MaskGiveSick:
          Number(acc.n95MaskGiveSick) + Number(curr.n95MaskGiveSick),
        surgicalMaskGiveSick:
          Number(acc.surgicalMaskGiveSick) + Number(curr.surgicalMaskGiveSick),
        n95MaskGiveHeart:
          Number(acc.n95MaskGiveHeart) + Number(curr.n95MaskGiveHeart),
        surgicalMaskGiveHeart:
          Number(acc.surgicalMaskGiveHeart) + Number(curr.surgicalMaskGiveHeart),
        n95MaskGiveCopd:
          Number(acc.n95MaskGiveCopd) + Number(curr.n95MaskGiveCopd),
        surgicalMaskGiveCopd:
          Number(acc.surgicalMaskGiveCopd) + Number(curr.surgicalMaskGiveCopd),
        skyDoctor:
          Number(acc.skyDoctor) + Number(curr.skyDoctor),
        ambulance:
          Number(acc.ambulance) + Number(curr.ambulance),
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
    return selectedProvince
      ? data?.filter((item) =>
        item.province.toLowerCase() === selectedProvince.toLowerCase()
      )
      : data;
  }, [data, selectedProvince]);

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
          setError("ข้อมูลไม่ถูกต้องจาก API");
        }
      } catch (err) {
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
        {loading ? (
          <Loading />
        ) : (
          <>
            {error && <div className="text-red-500 text-center">{error}</div>}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl mb-6 text-gray-800">
                จำนวนคลินิกมลพิษและการให้บริการ
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <DataTable
                  titlespan="จำนวนคลินิกมลพิษฯ"
                  title="จำนวนคลินิกมลพิษและคลินิกมลพิษออนไลน์"
                  headers={[
                    "จังหวัด",
                    "คลินิกมลพิษ (แห่ง)",
                    "คลินิกมลพิษออนไลน์ (แห่ง)",
                  ]}
                  data={(filteredData ?? []).map((item) => ({
                    "จังหวัด": item.province,
                    "คลินิกมลพิษ (แห่ง)": formatNumber(Number(item.pollutionClinicTotal)),
                    "คลินิกมลพิษออนไลน์ (แห่ง)": formatNumber(Number(item.onlinePollutionClinicTotal)),
                  }))}
                  footer={{
                    "จังหวัด": "เขตสุขภาพที่ 1",
                    "คลินิกมลพิษ (แห่ง)": formatNumber(calculateTotal("pollutionClinicTotal")),
                    "คลินิกมลพิษออนไลน์ (แห่ง)": formatNumber(calculateTotal("onlinePollutionClinicTotal")),
                  }}
                />
                <DataTable
                  titlespan="จำนวนผู้รับบริการ คลินิกมลพิษฯ"
                  title="จำนวนผู้รับบริการ คลินิกมลพิษฯ"
                  headers={[
                    "จังหวัด",
                    "คลินิกมลพิษ (ครั้ง)",
                    "คลินิกมลพิษออนไลน์ (ครั้ง)",
                  ]}
                  data={(filteredData ?? []).map((item) => ({
                    "จังหวัด": item.province,
                    "คลินิกมลพิษ (ครั้ง)": formatNumber(Number(item.pollutionCliniService)),
                    "คลินิกมลพิษออนไลน์ (ครั้ง)": formatNumber(Number(item.onlinePollutionCliniService)),
                  }))}
                  footer={{
                    "จังหวัด": "เขตสุขภาพที่ 1",
                    "คลินิกมลพิษ (ครั้ง)": formatNumber(calculateTotal("pollutionCliniService")),
                    "คลินิกมลพิษออนไลน์ (ครั้ง)": formatNumber(calculateTotal("onlinePollutionCliniService")),
                  }}
                />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl mb-6 text-gray-800">
                การสนับสนุนมุ้งสู้ฝุ่น (สะสม)
              </h2>
              <DataTable
                titlespan="จำนวนมุ้งสู้ฝุ่น และการสนับสนุนมุ้งสู้ฝุ่น"
                title="จำนวนผู้รับบริการ คลินิกมลพิษฯ"
                headers={[
                  "จังหวัด",
                  "จำนวนคลังสะสม (หลัง)",
                  "สนับสนุน/แจกจ่าย (หลัง)",
                ]}
                data={(filteredData ?? []).map((item) => ({
                  "จังหวัด": item.province,
                  "จำนวนคลังสะสม (หลัง)": formatNumber(Number(item.mosquitoNetTotal)),
                  "สนับสนุน/แจกจ่าย (หลัง)": formatNumber(Number(item.mosquitoNetService)),
                }))}
                footer={{
                  "จังหวัด": "เขตสุขภาพที่ 1",
                  "จำนวนคลังสะสม (หลัง)": formatNumber(calculateTotal("mosquitoNetTotal")),
                  "สนับสนุน/แจกจ่าย (หลัง)": formatNumber(calculateTotal("mosquitoNetService")),
                }}
              />
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl mb-6 text-gray-800">จัดเตรียมห้องปลอดฝุ่น</h2>
              <DataTable
                titlespan="จำนวนห้องปลอดฝุ่นสะสม"
                title="รายละเอียดห้องปลอดฝุ่น (ห้อง)"
                headers={[
                  "จังหวัด",
                  "ศูนย์พัฒนาเด็ก (ห้อง)",
                  "สถานบริการสาธารณสุข (ห้อง)",
                  "อาคารสำนักงาน (ห้อง)",
                  "ร้านอาหาร/กาแฟ/โรงแรม (ห้อง)",
                  "อื่น ๆ (ห้อง)",
                ]}
                data={(filteredData ?? []).map((item) => ({
                  "จังหวัด": item.province,
                  "ศูนย์พัฒนาเด็ก (ห้อง)": formatNumber(Number(item.nurseryDustFreeTotal)),
                  "สถานบริการสาธารณสุข (ห้อง)": formatNumber(Number(item.publicHealthDustFreeTotal)),
                  "อาคารสำนักงาน (ห้อง)": formatNumber(Number(item.officeDustFreeTotal)),
                  "ร้านอาหาร/กาแฟ/โรงแรม (ห้อง)": formatNumber(Number(item.buildingDustFreeTotal)),
                  "อื่น ๆ (ห้อง)": formatNumber(Number(item.otherDustFreeTotal)),
                }))}
                footer={{
                  "จังหวัด": "เขตสุขภาพที่ 1",
                  "ศูนย์พัฒนาเด็ก (ห้อง)": formatNumber(calculateTotal("nurseryDustFreeTotal")),
                  "สถานบริการสาธารณสุข (ห้อง)": formatNumber(calculateTotal("publicHealthDustFreeTotal")),
                  "อาคารสำนักงาน (ห้อง)": formatNumber(calculateTotal("officeDustFreeTotal")),
                  "ร้านอาหาร/กาแฟ/โรงแรม (ห้อง)": formatNumber(calculateTotal("buildingDustFreeTotal")),
                  "อื่น ๆ (ห้อง)": formatNumber(calculateTotal("otherDustFreeTotal")),
                }}
              />
              <DataTable
                titlespan="ให้บริการห้องปลอดฝุ่น"
                title="รายละเอียดบริการห้องปลอดฝุ่น"
                headers={[
                  "จังหวัด",
                  "ศูนย์พัฒนาเด็ก (ครั้ง)",
                  "สถานบริการสาธารณสุข (ครั้ง)",
                  "อาคารสำนักงาน (ครั้ง)",
                  "ร้านอาหาร/กาแฟ/โรงแรม (ครั้ง)",
                  "อื่น ๆ (ครั้ง)",
                ]}
                data={(filteredData ?? []).map((item) => ({
                  "จังหวัด": item.province,
                  "ศูนย์พัฒนาเด็ก (ครั้ง)": formatNumber(Number(item.nurseryDustFreeService)),
                  "สถานบริการสาธารณสุข (ครั้ง)": formatNumber(Number(item.publicHealthDustFreeService)),
                  "อาคารสำนักงาน (ครั้ง)": formatNumber(Number(item.officeDustFreeService)),
                  "ร้านอาหาร/กาแฟ/โรงแรม (ครั้ง)": formatNumber(Number(item.buildingDustFreeService)),
                  "อื่น ๆ (ครั้ง)": formatNumber(Number(item.otherDustFreeService)),
                }))}
                footer={{
                  "จังหวัด": "เขตสุขภาพที่ 1",
                  "ศูนย์พัฒนาเด็ก (ครั้ง)": formatNumber(calculateTotal("nurseryDustFreeService")),
                  "สถานบริการสาธารณสุข (ครั้ง)": formatNumber(calculateTotal("publicHealthDustFreeService")),
                  "อาคารสำนักงาน (ครั้ง)": formatNumber(calculateTotal("officeDustFreeService")),
                  "ร้านอาหาร/กาแฟ/โรงแรม (ครั้ง)": formatNumber(calculateTotal("buildingDustFreeService")),
                  "อื่น ๆ (ครั้ง)": formatNumber(calculateTotal("otherDustFreeService")),
                }}
              />
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl mb-6 text-gray-800">
                ทีมปฏิบัติการด้านการแพทย์และสาธารณสุข
              </h2>
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
                data={(filteredData ?? []).map((item) => ({
                  "จังหวัด": item.province,
                  "ทีม 3 หมอ": formatNumber(Number(item.team3DoctorTotal)),
                  "ทีมหน่วยแพทย์เคลื่อนที่": formatNumber(Number(item.mobileDoctorTotal)),
                  "ทีมดูแลประชาชน": formatNumber(Number(item.civilTakeCareTotal)),
                  "ทีม SHERT จังหวัด": formatNumber(Number(item.shertTeamProvTotal)),
                  "ทีม SHERT อำเภอ": formatNumber(Number(item.shertTeamDistTotal)),
                  "ทีม EnvOcc CU": formatNumber(Number(item.envoCccuTotal)),
                }))}
                footer={{
                  "จังหวัด": "เขตสุขภาพที่ 1",
                  "ทีม 3 หมอ": formatNumber(aggregateMemo?.team3DoctorTotal || 0),
                  "ทีมหน่วยแพทย์เคลื่อนที่": formatNumber(aggregateMemo?.mobileDoctorTotal || 0),
                  "ทีมดูแลประชาชน": formatNumber(aggregateMemo?.civilTakeCareTotal || 0),
                  "ทีม SHERT จังหวัด": formatNumber(aggregateMemo?.shertTeamProvTotal || 0),
                  "ทีม SHERT อำเภอ": formatNumber(aggregateMemo?.shertTeamDistTotal || 0),
                  "ทีม EnvOcc CU": formatNumber(aggregateMemo?.envoCccuTotal || 0),
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
                data={(filteredData ?? []).map((item) => ({
                  "จังหวัด": item.province,
                  "ทีม 3 หมอ": formatNumber(Number(item.team3DoctorService)),
                  "ทีมหน่วยแพทย์เคลื่อนที่": formatNumber(Number(item.mobileDoctorService)),
                  "ทีมดูแลประชาชน": formatNumber(Number(item.civilTakeCareService)),
                  "ทีม SHERT จังหวัด": formatNumber(Number(item.shertTeamProvService)),
                  "ทีม SHERT อำเภอ": formatNumber(Number(item.shertTeamDistService)),
                  "ทีม EnvOcc CU": formatNumber(Number(item.envoCccuService)),
                }))}
                footer={{
                  "จังหวัด": "เขตสุขภาพที่ 1",
                  "ทีม 3 หมอ": formatNumber(aggregateMemo?.team3DoctorService || 0),
                  "ทีมหน่วยแพทย์เคลื่อนที่": formatNumber(aggregateMemo?.mobileDoctorService || 0),
                  "ทีมดูแลประชาชน": formatNumber(aggregateMemo?.civilTakeCareService || 0),
                  "ทีม SHERT จังหวัด": formatNumber(aggregateMemo?.shertTeamProvService || 0),
                  "ทีม SHERT อำเภอ": formatNumber(aggregateMemo?.shertTeamDistService || 0),
                  "ทีม EnvOcc CU": formatNumber(aggregateMemo?.envoCccuService || 0),
                }}
              />
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <DataTable
                titlespan="ระบบรักษาส่งต่อผู้ป่วย"
                title="รายละเอียดระบบรักษาส่งต่อผู้ป่วย"
                headers={["จังหวัด", "SKY doctor", "ทีมกู้ชีพ ALS"]}
                data={(filteredData ?? []).map((item) => ({
                  "จังหวัด": item.province,
                  "SKY doctor": formatNumber(Number(item.skyDoctor)),
                  "ทีมกู้ชีพ ALS": formatNumber(Number(item.ambulance)),
                }))}
                footer={{
                  "จังหวัด": "เขตสุขภาพที่ 1",
                  "SKY doctor": formatNumber(aggregateMemo?.skyDoctor || 0),
                  "ทีมกู้ชีพ ALS": formatNumber(aggregateMemo?.ambulance || 0),
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReportMeasure3;
