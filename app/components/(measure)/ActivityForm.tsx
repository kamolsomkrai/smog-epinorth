// components/ActivityForm.tsx
"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import MeasureSelect from "../(global)/MeasureSelect";
import Measure1 from "./Measure1";
import Measure2 from "./Measure2";
import Measure3 from "./Measure3";
import Measure4 from "./Measure4";
import { ActivityFormData, Measure1UploadData } from "../../interfaces/newmeasure";

// Map API endpoint สำหรับแต่ละมาตรการ
const measureApiMap: Record<number, string> = {
  1: "/api/measure1",
  2: "/api/measure2",
  3: "/api/measure3",
  4: "/api/measure4",
};

const ActivityForm: React.FC = () => {
  // เปลี่ยน state files ให้เป็น Measure1UploadData[] ซึ่งในแต่ละตัวเราจะเก็บ property rawFile (File object จริง) สำหรับอัปโหลด
  const [files, setFiles] = useState<Measure1UploadData[]>([]);
  const [activityType, setActivityType] = useState<number>(0);
  const [activityFormData, setActivityFormData] = useState<ActivityFormData>({
    activityId: 0,
    activityType: 0,
    hospCode: "",
    provCode: "",
    distCode: "",
    activityDetail: "",
    activityDate: "",
    // ค่า default สำหรับมาตรการที่ 2, 3, 4
    riskHealthInfo: 0,
    riskHealthSocial: 0,
    riskChildTotal: 0,
    riskChildTakeCare: 0,
    riskOlderTotal: 0,
    riskOlderTakeCare: 0,
    riskPregnantTotal: 0,
    riskPregnantTakeCare: 0,
    riskBedriddenTotal: 0,
    riskBedriddenTakeCare: 0,
    riskHeartTotal: 0,
    riskHeartTakeCare: 0,
    riskCopdTotal: 0,
    riskCopdTakeCare: 0,
    healthcareOfficer: 0,
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
    openPheocDate: "",
    closePheocDate: "",
    openDontBurnDate: "",
    closeDontBurnDate: "",
    lawEnforcement: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? Number(value) : value;
    setActivityFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  // ปรับ type parameter ให้ตรงกับ Measure1UploadData[]
  const handleFilesChange = (uploadedFiles: Measure1UploadData[]) => {
    setFiles(uploadedFiles);
  };

  const handleMeasureSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = Number(e.target.value);
    setActivityType(selectedValue);
    setActivityFormData((prev) => ({ ...prev, activityType: selectedValue }));
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];
    if (activityFormData.activityType === 0) {
      errors.push("กรุณาเลือกประเภทกิจกรรม.");
    }
    if (activityType === 1) {
      if (!activityFormData.activityDetail && !activityFormData.activityDate) {
        errors.push("กรุณากรอกข้อมูลอย่างน้อยหนึ่งรายการในมาตรการที่ 1.");
      }
    }
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return false;
    }
    return true;
  };

  // ฟังก์ชันสำหรับอัปโหลดไฟล์จริง โดยใช้ property rawFile ที่เก็บ File object ใน Measure1UploadData
  const handleFileUpload = async (): Promise<any[]> => {
    if (files.length === 0) return [];
    // ใช้ FormData ของ browser แทนการใช้ ActivityFormData (ซึ่งเป็น type เท่านั้น)
    const formDataUpload = new FormData();
    files.forEach((fileData) => {
      if (fileData.rawFile) {
        formDataUpload.append("files", fileData.rawFile);
      }
    });

    const res = await fetch("/api/uploadactivity", {
      method: "POST",
      body: formDataUpload,
    });

    if (!res.ok) {
      toast.error("การอัปโหลดไฟล์ล้มเหลว");
      return [];
    } else {
      const data = await res.json();
      console.log("อัปโหลดไฟล์สำเร็จ", data);
      return data.files || [];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const year = now.getFullYear().toString();

    if (!validateForm()) return;
    try {
      toast.info("กำลังบันทึกข้อมูล...", { autoClose: 2000 });
      // ส่งข้อมูลกิจกรรมก่อน
      const activityResponse = await fetch("/api/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activityType: activityFormData.activityType,
          year: year,
        }),
      });

      if (!activityResponse.ok) {
        const errorData = await activityResponse.json();
        console.error("Failed to submit activity:", errorData);
        toast.error("การบันทึกกิจกรรมล้มเหลว");
        return;
      }

      const activityData = await activityResponse.json();
      const activityId = activityData.id;
      setActivityFormData((prev) => ({ ...prev, activityId }));
      toast.success("กิจกรรมถูกบันทึกสำเร็จ!");

      // เตรียม payload สำหรับมาตรการแต่ละประเภท
      const measurePayload: Record<string, any> = { activityId, year };

      if (activityType === 1) {
        // อัปโหลดไฟล์แล้วรวมข้อมูลไฟล์ที่อัปโหลดลงใน payload
        const uploadedFiles = await handleFileUpload();
        measurePayload.files = uploadedFiles;
        measurePayload.activityDetail = activityFormData.activityDetail;
        measurePayload.activityDate = activityFormData.activityDate;
      } else if (activityType === 2) {
        measurePayload.riskHealthInfo = activityFormData.riskHealthInfo;
        measurePayload.riskHealthSocial = activityFormData.riskHealthSocial;
        measurePayload.riskChildTotal = activityFormData.riskChildTotal;
        measurePayload.riskChildTakeCare = activityFormData.riskChildTakeCare;
        measurePayload.riskOlderTotal = activityFormData.riskOlderTotal;
        measurePayload.riskOlderTakeCare = activityFormData.riskOlderTakeCare;
        measurePayload.riskPregnantTotal = activityFormData.riskPregnantTotal;
        measurePayload.riskPregnantTakeCare = activityFormData.riskPregnantTakeCare;
        measurePayload.riskBedriddenTotal = activityFormData.riskBedriddenTotal;
        measurePayload.riskBedriddenTakeCare = activityFormData.riskBedriddenTakeCare;
        measurePayload.riskHeartTotal = activityFormData.riskHeartTotal;
        measurePayload.riskHeartTakeCare = activityFormData.riskHeartTakeCare;
        measurePayload.riskCopdTotal = activityFormData.riskCopdTotal;
        measurePayload.riskCopdTakeCare = activityFormData.riskCopdTakeCare;
        measurePayload.healthcareOfficer = activityFormData.healthcareOfficer;
      } else if (activityType === 3) {
        measurePayload.pollutionClinicTotal = activityFormData.pollutionClinicTotal;
        measurePayload.pollutionCliniService = activityFormData.pollutionCliniService;
        measurePayload.onlinePollutionClinicTotal = activityFormData.onlinePollutionClinicTotal;
        measurePayload.onlinePollutionCliniService = activityFormData.onlinePollutionCliniService;
        measurePayload.mosquitoNetTotal = activityFormData.mosquitoNetTotal;
        measurePayload.mosquitoNetService = activityFormData.mosquitoNetService;
        measurePayload.nurseryDustFreeTotal = activityFormData.nurseryDustFreeTotal;
        measurePayload.nurseryDustFreeService = activityFormData.nurseryDustFreeService;
        measurePayload.publicHealthDustFreeTotal = activityFormData.publicHealthDustFreeTotal;
        measurePayload.publicHealthDustFreeService = activityFormData.publicHealthDustFreeService;
        measurePayload.officeDustFreeTotal = activityFormData.officeDustFreeTotal;
        measurePayload.officeDustFreeService = activityFormData.officeDustFreeService;
        measurePayload.buildingDustFreeTotal = activityFormData.buildingDustFreeTotal;
        measurePayload.buildingDustFreeService = activityFormData.buildingDustFreeService;
        measurePayload.otherDustFreeTotal = activityFormData.otherDustFreeTotal;
        measurePayload.otherDustFreeService = activityFormData.otherDustFreeService;
        measurePayload.team3DoctorTotal = activityFormData.team3DoctorTotal;
        measurePayload.team3DoctorService = activityFormData.team3DoctorService;
        measurePayload.mobileDoctorTotal = activityFormData.mobileDoctorTotal;
        measurePayload.mobileDoctorService = activityFormData.mobileDoctorService;
        measurePayload.civilTakeCareTotal = activityFormData.civilTakeCareTotal;
        measurePayload.civilTakeCareService = activityFormData.civilTakeCareService;
        measurePayload.shertTeamProvTotal = activityFormData.shertTeamProvTotal;
        measurePayload.shertTeamProvService = activityFormData.shertTeamProvService;
        measurePayload.shertTeamDistTotal = activityFormData.shertTeamDistTotal;
        measurePayload.shertTeamDistService = activityFormData.shertTeamDistService;
        measurePayload.envoCccuTotal = activityFormData.envoCccuTotal;
        measurePayload.envoCccuService = activityFormData.envoCccuService;
        measurePayload.n95MaskGiveCivil = activityFormData.n95MaskGiveCivil;
        measurePayload.surgicalMaskGiveCivil = activityFormData.surgicalMaskGiveCivil;
        measurePayload.n95MaskGiveChild = activityFormData.n95MaskGiveChild;
        measurePayload.surgicalMaskGiveChild = activityFormData.surgicalMaskGiveChild;
        measurePayload.n95MaskGiveOlder = activityFormData.n95MaskGiveOlder;
        measurePayload.surgicalMaskGiveOlder = activityFormData.surgicalMaskGiveOlder;
        measurePayload.n95MaskGivePregnant = activityFormData.n95MaskGivePregnant;
        measurePayload.surgicalMaskGivePregnant = activityFormData.surgicalMaskGivePregnant;
        measurePayload.n95MaskGiveBedridden = activityFormData.n95MaskGiveBedridden;
        measurePayload.surgicalMaskGiveBedridden = activityFormData.surgicalMaskGiveBedridden;
        measurePayload.n95MaskGiveSick = activityFormData.n95MaskGiveSick;
        measurePayload.surgicalMaskGiveSick = activityFormData.surgicalMaskGiveSick;
        measurePayload.n95MaskGiveHeart = activityFormData.n95MaskGiveHeart;
        measurePayload.surgicalMaskGiveHeart = activityFormData.surgicalMaskGiveHeart;
        measurePayload.n95MaskGiveCopd = activityFormData.n95MaskGiveCopd;
        measurePayload.surgicalMaskGiveCopd = activityFormData.n95MaskGiveCopd;
        measurePayload.skyDoctor = activityFormData.skyDoctor;
        measurePayload.ambulance = activityFormData.ambulance;
      } else if (activityType === 4) {
        measurePayload.openPheocDate = activityFormData.openPheocDate;
        measurePayload.closePheocDate = activityFormData.closePheocDate;
        measurePayload.openDontBurnDate = activityFormData.openDontBurnDate;
        measurePayload.closeDontBurnDate = activityFormData.closeDontBurnDate;
        measurePayload.lawEnforcement = activityFormData.lawEnforcement;
      }
      const excludeKeys = [
        "openPheocDate",
        "closePheocDate",
        "openDontBurnDate",
        "closeDontBurnDate",
      ];

      for (const key in measurePayload) {
        if (!excludeKeys.includes(key)) {
          if (typeof measurePayload[key] === "string" && !isNaN(parseInt(measurePayload[key]))) {
            measurePayload[key] = parseInt(measurePayload[key]);
          }
        }
      }

      const measureResponse = await fetch(measureApiMap[activityType], {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(measurePayload),
      });

      if (!measureResponse.ok) {
        const measureErrorData = await measureResponse.json();
        console.error(`Failed to submit Measure${activityType}:`, measureErrorData);
        toast.error(`การบันทึกมาตรการที่ ${activityType} ล้มเหลว`);
        return;
      }

      toast.success(`มาตรการที่ ${activityType} ถูกบันทึกสำเร็จ!`);

      // รีเซ็ตฟอร์มหลังบันทึกสำเร็จ
      setActivityType(0);
      setFiles([]);
      setActivityFormData({
        activityId: 0,
        activityType: 0,
        hospCode: "",
        provCode: "",
        distCode: "",
        activityDetail: "",
        activityDate: "",
        riskHealthInfo: 0,
        riskHealthSocial: 0,
        riskChildTotal: 0,
        riskChildTakeCare: 0,
        riskOlderTotal: 0,
        riskOlderTakeCare: 0,
        riskPregnantTotal: 0,
        riskPregnantTakeCare: 0,
        riskBedriddenTotal: 0,
        riskBedriddenTakeCare: 0,
        riskHeartTotal: 0,
        riskHeartTakeCare: 0,
        riskCopdTotal: 0,
        riskCopdTakeCare: 0,
        healthcareOfficer: 0,
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
        openPheocDate: "",
        closePheocDate: "",
        openDontBurnDate: "",
        closeDontBurnDate: "",
        lawEnforcement: 0,
      });
    } catch (error) {
      console.error("Error submitting activity:", error);
      toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          ข้อมูลการดำเนินงานด้านการแพทย์และสาธารณสุข
        </h1>
        <h2 className="text-xl font-semibold mb-6 text-gray-700 text-center">
          กรณีหมอกควันและฝุ่นละอองขนาดเล็ก เขตสุขภาพที่ 1
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <MeasureSelect
            activityType={activityType}
            onChange={handleMeasureSelectChange}
          />
          {activityType === 1 && (
            <Measure1
              activityFormData={activityFormData}
              handleChange={handleChange}
              onFilesChange={handleFilesChange}
            />
          )}
          {activityType === 2 && (
            <Measure2 activityFormData={activityFormData} handleChange={handleChange} />
          )}
          {activityType === 3 && (
            <Measure3 activityFormData={activityFormData} handleChange={handleChange} />
          )}
          {activityType === 4 && (
            <Measure4 activityFormData={activityFormData} handleChange={handleChange} />
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md px-4 py-2 transition-colors duration-200"
          >
            บันทึก
          </button>
        </form>
      </div>
    </div>
  );
};

export default ActivityForm;
