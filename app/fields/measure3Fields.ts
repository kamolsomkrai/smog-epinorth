// fields/measure3Fields.ts
import { FormData } from "../interfaces/newmeasure";

export interface Field {
  title?: string;
  id: string;
  name: string;
  label: string;
  type: string;
  value?: number;
}

// 3.1 คลินิกมลพิษ
export const getSection31Fields = (formData: FormData): Field[] => [
  {
    id: "pollutionClinicTotal",
    name: "pollutionClinicTotal",
    label: "เปิดบริการสะสม (แห่ง):",
    type: "number",
    value: formData.pollutionClinicTotal || 0,
  },
  {
    id: "pollutionCliniService",
    name: "pollutionCliniService",
    label: "ผู้รับบริการสะสม (ราย):",
    type: "number",
    value: formData.pollutionCliniService || 0,
  },
];

// 3.2 คลินิกมลพิษออนไลน์
export const getSection32Fields = (formData: FormData): Field[] => [
  {
    id: "onlinePollutionClinicTotal",
    name: "onlinePollutionClinicTotal",
    label: "เปิดบริการสะสม (แห่ง):",
    type: "number",
    value: formData.onlinePollutionClinicTotal || 0,
  },
  {
    id: "onlinePollutionCliniService",
    name: "onlinePollutionCliniService",
    label: "ผู้รับบริการสะสม (ราย):",
    type: "number",
    value: formData.onlinePollutionCliniService || 0,
  },
];

export const getSection321Fields = (formData: FormData): Field[] => [
  {
    id: "mosquitoNetTotal",
    name: "mosquitoNetTotal",
    label: "คงคลัง (หลัง):",
    type: "number",
    value: formData.mosquitoNetTotal || 0,
  },
  {
    id: "mosquitoNetService",
    name: "mosquitoNetService",
    label: "สนับสนุน/แจก กลุ่มเสี่ยง (หลัง):",
    type: "number",
    value: formData.mosquitoNetService || 0,
  },
];

// 3.3 จัดเตรียมห้องปลอดฝุ่น
// 3.3.1 ห้องปลอดฝุ่นในศูนย์เด็กเล็ก
export const getSection331Fields = (formData: FormData): Field[] => [
  {
    id: "nurseryDustFreeTotal",
    name: "nurseryDustFreeTotal",
    label: "เปิดบริการสะสม (ห้อง):",
    type: "number",
    value: formData.nurseryDustFreeTotal || 0,
  },
  {
    id: "nurseryDustFreeService",
    name: "nurseryDustFreeService",
    label: "มีผู้รับบริการสะสม (ราย):",
    type: "number",
    value: formData.nurseryDustFreeService || 0,
  },
];

// 3.3.2 ห้องปลอดฝุ่นในหน่วยงานราชการ
export const getSection332Fields = (formData: FormData): Field[] => [
  {
    id: "publicHealthDustFreeTotal",
    name: "publicHealthDustFreeTotal",
    label: "เปิดบริการสะสม (ห้อง):",
    type: "number",
    value: formData.publicHealthDustFreeTotal || 0,
  },
  {
    id: "publicHealthDustFreeService",
    name: "publicHealthDustFreeService",
    label: "มีผู้รับบริการสะสม (ราย):",
    type: "number",
    value: formData.publicHealthDustFreeService || 0,
  },
];

// 3.3.3 ห้องปลอดฝุ่นในอาคารสำนักงาน
export const getSection333Fields = (formData: FormData): Field[] => [
  {
    id: "officeDustFreeTotal",
    name: "officeDustFreeTotal",
    label: "เปิดบริการสะสม (ห้อง):",
    type: "number",
    value: formData.officeDustFreeTotal || 0,
  },
  {
    id: "officeDustFreeService",
    name: "officeDustFreeService",
    label: "มีผู้รับบริการสะสม (ราย):",
    type: "number",
    value: formData.officeDustFreeService || 0,
  },
];

// 3.3.4 ห้องปลอดฝุ่นในร้านอาหาร/กาแฟ/โรงแรม
export const getSection334Fields = (formData: FormData): Field[] => [
  {
    id: "buildingDustFreeTotal",
    name: "buildingDustFreeTotal",
    label: "เปิดบริการสะสม (ห้อง):",
    type: "number",
    value: formData.buildingDustFreeTotal || 0,
  },
  {
    id: "buildingDustFreeService",
    name: "buildingDustFreeService",
    label: "มีผู้รับบริการสะสม (ราย):",
    type: "number",
    value: formData.buildingDustFreeService || 0,
  },
];

// 3.3.5 ห้องปลอดฝุ่นในสถานที่อื่นๆ
export const getSection335Fields = (formData: FormData): Field[] => [
  {
    id: "otherDustFreeTotal",
    name: "otherDustFreeTotal",
    label: "เปิดบริการสะสม (ห้อง):",
    type: "number",
    value: formData.otherDustFreeTotal || 0,
  },
  {
    id: "otherDustFreeService",
    name: "otherDustFreeService",
    label: "มีผู้รับบริการสะสม (ราย):",
    type: "number",
    value: formData.otherDustFreeService || 0,
  },
];

// 3.4 จัดระบบบริการเชิงรุก เพื่อดูแลประชาชน
// 3.4.1 ทีม 3 หมอ
export const getSection341Fields = (formData: FormData): Field[] => [
  {
    id: "team3DoctorTotal",
    name: "team3DoctorTotal",
    label: "ทีมสะสม (ทีม):",
    type: "number",
    value: formData.team3DoctorTotal || 0,
  },
  {
    id: "team3DoctorService",
    name: "team3DoctorService",
    label: "ลงพื้นที่ (ทีม):",
    type: "number",
    value: formData.team3DoctorService || 0,
  },
];

// 3.4.2 ทีมหน่วยแพทย์เคลื่อนที่
export const getSection342Fields = (formData: FormData): Field[] => [
  {
    id: "mobileDoctorTotal",
    name: "mobileDoctorTotal",
    label: "ทีมสะสม (ทีม):",
    type: "number",
    value: formData.mobileDoctorTotal || 0,
  },
  {
    id: "mobileDoctorService",
    name: "mobileDoctorService",
    label: "ลงพื้นที่ (ทีม):",
    type: "number",
    value: formData.mobileDoctorService || 0,
  },
];

// 3.4.3 ทีมดูแลประชาชน
export const getSection343Fields = (formData: FormData): Field[] => [
  {
    id: "civilTakeCareTotal",
    name: "civilTakeCareTotal",
    label: "ทีมสะสม (ทีม):",
    type: "number",
    value: formData.civilTakeCareTotal || 0,
  },
  {
    id: "civilTakeCareService",
    name: "civilTakeCareService",
    label: "ลงพื้นที่ (ทีม):",
    type: "number",
    value: formData.civilTakeCareService || 0,
  },
];

// 3.4.4 ทีม SHERT จังหวัด
export const getSection344Fields = (formData: FormData): Field[] => [
  {
    id: "shertTeamProvTotal",
    name: "shertTeamProvTotal",
    label: "ทีมสะสม (ทีม):",
    type: "number",
    value: formData.shertTeamProvTotal || 0,
  },
  {
    id: "shertTeamProvService",
    name: "shertTeamProvService",
    label: "ลงพื้นที่ (ทีม):",
    type: "number",
    value: formData.shertTeamProvService || 0,
  },
];

// 3.4.5 ทีม SHERT อำเภอ
export const getSection345Fields = (formData: FormData): Field[] => [
  {
    id: "shertTeamDistTotal",
    name: "shertTeamDistTotal",
    label: "ทีมสะสม (ทีม):",
    type: "number",
    value: formData.shertTeamDistTotal || 0,
  },
  {
    id: "shertTeamDistService",
    name: "shertTeamDistService",
    label: "ลงพื้นที่ (ทีม):",
    type: "number",
    value: formData.shertTeamDistService || 0,
  },
];

// 3.4.6 ทีม EnvOcc CU
export const getEnvoCccuFields = (formData: FormData): Field[] => [
  {
    id: "envoCccuTotal",
    name: "envoCccuTotal",
    label: "ทีมสะสม (ทีม):",
    type: "number",
    value: formData.envoCccuTotal || 0,
  },
  {
    id: "envoCccuService",
    name: "envoCccuService",
    label: "ลงพื้นที่ (ทีม):",
    type: "number",
    value: formData.envoCccuService || 0,
  },
];

// 3.5 สนับสนุนอุปกรณ์ป้องกันส่วนบุคคลแก่กลุ่มเสี่ยง
// 3.5.1 ประชาชน
export const getSection351Fields = (formData: FormData): Field[] => [
  {
    id: "n95MaskGiveCivil",
    name: "n95MaskGiveCivil",
    label: "N95 Mask (ชิ้น):",
    type: "number",
    value: formData.n95MaskGiveCivil || 0,
  },
  {
    id: "surgicalMaskGiveCivil",
    name: "surgicalMaskGiveCivil",
    label: "Surgical Mask (ชิ้น):",
    type: "number",
    value: formData.surgicalMaskGiveCivil || 0,
  },
];

// 3.5.2 เด็กเล็ก
export const getSection352Fields = (formData: FormData): Field[] => [
  {
    id: "n95MaskGiveChild",
    name: "n95MaskGiveChild",
    label: "N95 Mask (ชิ้น):",
    type: "number",
    value: formData.n95MaskGiveChild || 0,
  },
  {
    id: "surgicalMaskGiveChild",
    name: "surgicalMaskGiveChild",
    label: "Surgical Mask (ชิ้น):",
    type: "number",
    value: formData.surgicalMaskGiveChild || 0,
  },
];

// 3.5.3 ผู้สูงอายุ
export const getSection353Fields = (formData: FormData): Field[] => [
  {
    id: "n95MaskGiveOlder",
    name: "n95MaskGiveOlder",
    label: "N95 Mask (ชิ้น):",
    type: "number",
    value: formData.n95MaskGiveOlder || 0,
  },
  {
    id: "surgicalMaskGiveOlder",
    name: "surgicalMaskGiveOlder",
    label: "Surgical Mask (ชิ้น):",
    type: "number",
    value: formData.surgicalMaskGiveOlder || 0,
  },
];

// 3.5.4 หญิงตั้งครรภ์
export const getSection354Fields = (formData: FormData): Field[] => [
  {
    id: "n95MaskGivePregnant",
    name: "n95MaskGivePregnant",
    label: "N95 Mask (ชิ้น):",
    type: "number",
    value: formData.n95MaskGivePregnant || 0,
  },
  {
    id: "surgicalMaskGivePregnant",
    name: "surgicalMaskGivePregnant",
    label: "Surgical Mask (ชิ้น):",
    type: "number",
    value: formData.surgicalMaskGivePregnant || 0,
  },
];

// 3.5.5 ผู้ป่วยติดเตียง
export const getSection355Fields = (formData: FormData): Field[] => [
  {
    id: "n95MaskGiveBedridden",
    name: "n95MaskGiveBedridden",
    label: "N95 Mask (ชิ้น):",
    type: "number",
    value: formData.n95MaskGiveBedridden || 0,
  },
  {
    id: "surgicalMaskGiveBedridden",
    name: "surgicalMaskGiveBedridden",
    label: "Surgical Mask (ชิ้น):",
    type: "number",
    value: formData.surgicalMaskGiveBedridden || 0,
  },
];

// 3.5.6 ผู้มีโรคประจำตัว
export const getSection356Fields = (formData: FormData): Field[] => [
  {
    id: "n95MaskGiveSick",
    name: "n95MaskGiveSick",
    label: "N95 Mask (ชิ้น):",
    type: "number",
    value: formData.n95MaskGiveSick || 0,
  },
  {
    id: "surgicalMaskGiveSick",
    name: "surgicalMaskGiveSick",
    label: "Surgical Mask (ชิ้น):",
    type: "number",
    value: formData.surgicalMaskGiveSick || 0,
  },
];

// 3.5.7 ผู้ที่มีโรคหัวใจ
export const getSection357Fields = (formData: FormData): Field[] => [
  {
    id: "n95MaskGiveHeart",
    name: "n95MaskGiveHeart",
    label: "N95 Mask (ชิ้น):",
    type: "number",
    value: formData.n95MaskGiveHeart || 0,
  },
  {
    id: "surgicalMaskGiveHeart",
    name: "surgicalMaskGiveHeart",
    label: "Surgical Mask (ชิ้น):",
    type: "number",
    value: formData.surgicalMaskGiveHeart || 0,
  },
];

// 3.5.8 ผู้ที่มีโรคระบบทางเดินหายใจ
export const getSection358Fields = (formData: FormData): Field[] => [
  {
    id: "n95MaskGiveCopd",
    name: "n95MaskGiveCopd",
    label: "N95 Mask (ชิ้น):",
    type: "number",
    value: formData.n95MaskGiveCopd || 0,
  },
  {
    id: "surgicalMaskGiveCopd",
    name: "surgicalMaskGiveCopd",
    label: "Surgical Mask (ชิ้น):",
    type: "number",
    value: formData.surgicalMaskGiveCopd || 0,
  },
];

// 3.6 ระบบรักษาส่งต่อผู้ป่วย
export const getSection36Fields = (formData: FormData): Field[] => [
  {
    id: "skyDoctor",
    name: "skyDoctor",
    label: "SKY doctor (ทีม):",
    type: "number",
    value: formData.skyDoctor || 0,
  },
  {
    id: "ambulance",
    name: "ambulance",
    label: "ทีมกู้ชีพ ALS (ทีม):",
    type: "number",
    value: formData.ambulance || 0,
  },
];
