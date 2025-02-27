// components/ActivityForm.tsx
"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import MeasureSelect from "../(global)/MeasureSelect";
import Measure1 from "./Measure1";
import Measure2 from "./Measure2";
import Measure3 from "./Measure3";
import Measure4 from "./Measure4";
import { FormData, Measure1UploadData } from "../../interfaces/newmeasure";

// Map API endpoint สำหรับแต่ละมาตรการ
const measureApiMap: Record<number, string> = {
  1: "/api/measure1",
  2: "/api/measure2",
  3: "/api/measure3",
  4: "/api/measure4",
};

const ActivityForm: React.FC = () => {
  // เปลี่ยน state files เป็น Measure1UploadData[]
  const [files, setFiles] = useState<Measure1UploadData[]>([]);
  // ใช้ state สำหรับ measureType แยกออกจาก formData
  const [measureType, setMeasureType] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    // ActivityData
    activityId: 0,
    activityType: 0,
    hospCode: "",
    provCode: "",
    distCode: "",
    // เพิ่ม measureType ลงใน formData (ถ้าต้องการเก็บไว้ใน formData ด้วย)
    // Measure1Data
    activityName: "",
    activityDetail: "",
    activityDate: "",
    // Measure2Data
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
    // Measure3Data
    pollutionClinicTotal: 0,
    pollutionCliniService: 0,
    onlinePollutionClinicTotal: 0,
    onlinePollutionCliniService: 0,
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
    // Measure4Data
    openPheocDate: "",
    closePheocDate: "",
    openDontBurnDate: "",
    closeDontBurnDate: "",
    lawEnforcement: 0,
    // Measure1UploadData
    filePath: "",
    fileName: "",
    fileType: "",
    extension: "",
    fileSize: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  // รับ parameter เป็น Measure1UploadData[] แล้ว set state files
  const handleFilesChange = (uploadedFiles: Measure1UploadData[]) => {
    setFiles(uploadedFiles);
    console.log(files);
  };

  const handleMeasureSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Number(e.target.value);
    setMeasureType(selectedValue);
    setFormData((prev) => ({ ...prev, measureType: selectedValue }));
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];
    if (!formData.activityDate) {
      errors.push("กรุณาเลือกวันที่ดำเนินกิจกรรม.");
    }
    if (formData.activityType === 0) {
      errors.push("กรุณาเลือกประเภทกิจกรรม.");
    }
    if (measureType === 1) {
      if (!formData.activityName && !formData.activityDetail) {
        errors.push("กรุณากรอกอย่างน้อยหนึ่งข้อมูลในมาตรการที่ 1.");
      }
    }
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      toast.info("กำลังบันทึกข้อมูล...", { autoClose: 2000 });
      // ส่งข้อมูลกิจกรรมก่อน
      const activityResponse = await fetch("/api/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activityType: formData.activityType,
          activityDate: formData.activityDate,
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
      setFormData((prev) => ({ ...prev, activityId }));
      toast.success("กิจกรรมถูกบันทึกสำเร็จ!");

      // เตรียม payload สำหรับมาตรการแต่ละประเภท
      const measurePayload: Record<string, any> = { activityId };

      switch (measureType) {
        case 1:
          measurePayload.activityName = formData.activityName;
          measurePayload.activityDetail = formData.activityDetail;
          measurePayload.activityDate = formData.activityDate;
          break;
        case 2:
          measurePayload.riskHealthInfo = formData.riskHealthInfo;
          measurePayload.riskHealthSocial = formData.riskHealthSocial;
          measurePayload.riskChildTotal = formData.riskChildTotal;
          measurePayload.riskChildTakeCare = formData.riskChildTakeCare;
          measurePayload.riskOlderTotal = formData.riskOlderTotal;
          measurePayload.riskOlderTakeCare = formData.riskOlderTakeCare;
          measurePayload.riskPregnantTotal = formData.riskPregnantTotal;
          measurePayload.riskPregnantTakeCare = formData.riskPregnantTakeCare;
          measurePayload.riskBedriddenTotal = formData.riskBedriddenTotal;
          measurePayload.riskBedriddenTakeCare = formData.riskBedriddenTakeCare;
          measurePayload.riskHeartTotal = formData.riskHeartTotal;
          measurePayload.riskHeartTakeCare = formData.riskHeartTakeCare;
          measurePayload.riskCopdTotal = formData.riskCopdTotal;
          measurePayload.riskCopdTakeCare = formData.riskCopdTakeCare;
          measurePayload.healthcareOfficer = formData.healthcareOfficer;
          break;
        case 3:
          measurePayload.pollutionClinicTotal = formData.pollutionClinicTotal;
          measurePayload.pollutionCliniService = formData.pollutionCliniService;
          measurePayload.onlinePollutionClinicTotal = formData.onlinePollutionClinicTotal;
          measurePayload.onlinePollutionCliniService = formData.onlinePollutionCliniService;
          measurePayload.nurseryDustFreeTotal = formData.nurseryDustFreeTotal;
          measurePayload.nurseryDustFreeService = formData.nurseryDustFreeService;
          measurePayload.publicHealthDustFreeTotal = formData.publicHealthDustFreeTotal;
          measurePayload.publicHealthDustFreeService = formData.publicHealthDustFreeService;
          measurePayload.officeDustFreeTotal = formData.officeDustFreeTotal;
          measurePayload.officeDustFreeService = formData.officeDustFreeService;
          measurePayload.buildingDustFreeTotal = formData.buildingDustFreeTotal;
          measurePayload.buildingDustFreeService = formData.buildingDustFreeService;
          measurePayload.otherDustFreeTotal = formData.otherDustFreeTotal;
          measurePayload.otherDustFreeService = formData.otherDustFreeService;
          measurePayload.team3DoctorTotal = formData.team3DoctorTotal;
          measurePayload.team3DoctorService = formData.team3DoctorService;
          measurePayload.mobileDoctorTotal = formData.mobileDoctorTotal;
          measurePayload.mobileDoctorService = formData.mobileDoctorService;
          measurePayload.civilTakeCareTotal = formData.civilTakeCareTotal;
          measurePayload.civilTakeCareService = formData.civilTakeCareService;
          measurePayload.shertTeamProvTotal = formData.shertTeamProvTotal;
          measurePayload.shertTeamProvService = formData.shertTeamProvService;
          measurePayload.shertTeamDistTotal = formData.shertTeamDistTotal;
          measurePayload.shertTeamDistService = formData.shertTeamDistService;
          measurePayload.envoCccuTotal = formData.envoCccuTotal;
          measurePayload.envoCccuService = formData.envoCccuService;
          measurePayload.n95MaskGiveCivil = formData.n95MaskGiveCivil;
          measurePayload.surgicalMaskGiveCivil = formData.surgicalMaskGiveCivil;
          measurePayload.n95MaskGiveChild = formData.n95MaskGiveChild;
          measurePayload.surgicalMaskGiveChild = formData.surgicalMaskGiveChild;
          measurePayload.n95MaskGiveOlder = formData.n95MaskGiveOlder;
          measurePayload.surgicalMaskGiveOlder = formData.surgicalMaskGiveOlder;
          measurePayload.n95MaskGivePregnant = formData.n95MaskGivePregnant;
          measurePayload.surgicalMaskGivePregnant = formData.surgicalMaskGivePregnant;
          measurePayload.n95MaskGiveBedridden = formData.n95MaskGiveBedridden;
          measurePayload.surgicalMaskGiveBedridden = formData.surgicalMaskGiveBedridden;
          measurePayload.n95MaskGiveSick = formData.n95MaskGiveSick;
          measurePayload.surgicalMaskGiveSick = formData.surgicalMaskGiveSick;
          measurePayload.n95MaskGiveHeart = formData.n95MaskGiveHeart;
          measurePayload.surgicalMaskGiveHeart = formData.surgicalMaskGiveHeart;
          measurePayload.n95MaskGiveCopd = formData.n95MaskGiveCopd;
          measurePayload.surgicalMaskGiveCopd = formData.surgicalMaskGiveCopd;
          measurePayload.skyDoctor = formData.skyDoctor;
          measurePayload.ambulance = formData.ambulance;
          break;
        case 4:
          measurePayload.openPheocDate = formData.openPheocDate;
          measurePayload.closePheocDate = formData.closePheocDate;
          measurePayload.openDontBurnDate = formData.openDontBurnDate;
          measurePayload.closeDontBurnDate = formData.closeDontBurnDate;
          measurePayload.lawEnforcement = formData.lawEnforcement;
          break;
        default:
          console.warn("Unknown measure type");
          return;
      }

      const measureResponse = await fetch(measureApiMap[measureType], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(measurePayload),
      });

      if (!measureResponse.ok) {
        const measureErrorData = await measureResponse.json();
        console.error(`Failed to submit Measure${measureType}:`, measureErrorData);
        toast.error(`การบันทึกมาตรการที่ ${measureType} ล้มเหลว`);
        return;
      }

      toast.success(`มาตรการที่ ${measureType} ถูกบันทึกสำเร็จ!`);

      // รีเซ็ตข้อมูลแบบฟอร์ม, ประเภทมาตรการ และไฟล์
      setMeasureType(0);
      setFiles([]);
      setFormData({
        activityId: 0,
        activityType: 0,
        hospCode: "",
        provCode: "",
        distCode: "",
        activityName: "",
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
        filePath: "",
        fileName: "",
        fileType: "",
        extension: "",
        fileSize: "",
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
            measureType={measureType}
            onChange={handleMeasureSelectChange}
          />
          {measureType === 1 && (
            <Measure1
              formData={formData}
              handleChange={handleChange}
              onFilesChange={handleFilesChange}
            />
          )}
          {measureType === 2 && (
            <Measure2 formData={formData} handleChange={handleChange} />
          )}
          {measureType === 3 && (
            <Measure3 formData={formData} handleChange={handleChange} />
          )}
          {measureType === 4 && (
            <Measure4 formData={formData} handleChange={handleChange} />
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
