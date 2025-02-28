// fields/measure3Fields.ts
import { ActivityFormData } from "../interfaces/newmeasure";

export interface Field {
  title?: string;
  id: string;
  name: string;
  label: string;
  type: string;
  value?: number;
}

// 3.1 คลินิกมลพิษ
export const getSection31Fields = (
  activityFormData: ActivityFormData
): Field[] => [
  {
    id: "pollutionClinicTotal",
    name: "pollutionClinicTotal",
    label: "เปิดบริการสะสม (แห่ง):",
    type: "number",
    value: activityFormData.pollutionClinicTotal || 0,
  },
  {
    id: "pollutionCliniService",
    name: "pollutionCliniService",
    label: "ผู้รับบริการสะสม (ราย):",
    type: "number",
    value: activityFormData.pollutionCliniService || 0,
  },
];

// 3.2 คลินิกมลพิษออนไลน์
export const getSection32Fields = (
  activityFormData: ActivityFormData
): Field[] => [
  {
    id: "onlinePollutionClinicTotal",
    name: "onlinePollutionClinicTotal",
    label: "เปิดบริการสะสม (แห่ง):",
    type: "number",
    value: activityFormData.onlinePollutionClinicTotal || 0,
  },
  {
    id: "onlinePollutionCliniService",
    name: "onlinePollutionCliniService",
    label: "ผู้รับบริการสะสม (ราย):",
    type: "number",
    value: activityFormData.onlinePollutionCliniService || 0,
  },
];

export const getSection321Fields = (
  activityFormData: ActivityFormData
): Field[] => [
  {
    id: "mosquitoNetTotal",
    name: "mosquitoNetTotal",
    label: "คงคลัง (หลัง):",
    type: "number",
    value: activityFormData.mosquitoNetTotal || 0,
  },
  {
    id: "mosquitoNetService",
    name: "mosquitoNetService",
    label: "สนับสนุน/แจก กลุ่มเสี่ยง (หลัง):",
    type: "number",
    value: activityFormData.mosquitoNetService || 0,
  },
];

// 3.3 จัดเตรียมห้องปลอดฝุ่น
// 3.3.1 ห้องปลอดฝุ่นในศูนย์เด็กเล็ก
export const getSection331Fields = (
  activityFormData: ActivityFormData
): Field[] => [
  {
    id: "nurseryDustFreeTotal",
    name: "nurseryDustFreeTotal",
    label: "เปิดบริการสะสม (ห้อง):",
    type: "number",
    value: activityFormData.nurseryDustFreeTotal || 0,
  },
  {
    id: "nurseryDustFreeService",
    name: "nurseryDustFreeService",
    label: "มีผู้รับบริการสะสม (ราย):",
    type: "number",
    value: activityFormData.nurseryDustFreeService || 0,
  },
];

// 3.3.2 ห้องปลอดฝุ่นในหน่วยงานราชการ
export const getSection332Fields = (
  activityFormData: ActivityFormData
): Field[] => [
  {
    id: "publicHealthDustFreeTotal",
    name: "publicHealthDustFreeTotal",
    label: "เปิดบริการสะสม (ห้อง):",
    type: "number",
    value: activityFormData.publicHealthDustFreeTotal || 0,
  },
  {
    id: "publicHealthDustFreeService",
    name: "publicHealthDustFreeService",
    label: "มีผู้รับบริการสะสม (ราย):",
    type: "number",
    value: activityFormData.publicHealthDustFreeService || 0,
  },
];

// 3.3.3 ห้องปลอดฝุ่นในอาคารสำนักงาน
export const getSection333Fields = (
  activityFormData: ActivityFormData
): Field[] => [
  {
    id: "officeDustFreeTotal",
    name: "officeDustFreeTotal",
    label: "เปิดบริการสะสม (ห้อง):",
    type: "number",
    value: activityFormData.officeDustFreeTotal || 0,
  },
  {
    id: "officeDustFreeService",
    name: "officeDustFreeService",
    label: "มีผู้รับบริการสะสม (ราย):",
    type: "number",
    value: activityFormData.officeDustFreeService || 0,
  },
];

// 3.3.4 ห้องปลอดฝุ่นในร้านอาหาร/กาแฟ/โรงแรม
export const getSection334Fields = (
  activityFormData: ActivityFormData
): Field[] => [
  {
    id: "buildingDustFreeTotal",
    name: "buildingDustFreeTotal",
    label: "เปิดบริการสะสม (ห้อง):",
    type: "number",
    value: activityFormData.buildingDustFreeTotal || 0,
  },
  {
    id: "buildingDustFreeService",
    name: "buildingDustFreeService",
    label: "มีผู้รับบริการสะสม (ราย):",
    type: "number",
    value: activityFormData.buildingDustFreeService || 0,
  },
];

// 3.3.5 ห้องปลอดฝุ่นในสถานที่อื่นๆ
export const getSection335Fields = (
  activityFormData: ActivityFormData
): Field[] => [
  {
    id: "otherDustFreeTotal",
    name: "otherDustFreeTotal",
    label: "เปิดบริการสะสม (ห้อง):",
    type: "number",
    value: activityFormData.otherDustFreeTotal || 0,
  },
  {
    id: "otherDustFreeService",
    name: "otherDustFreeService",
    label: "มีผู้รับบริการสะสม (ราย):",
    type: "number",
    value: activityFormData.otherDustFreeService || 0,
  },
];

// 3.4 จัดระบบบริการเชิงรุก เพื่อดูแลประชาชน
// 3.4.1 ทีม 3 หมอ
export const getSection341Fields = (
  activityFormData: ActivityFormData
): Field[] => [
  {
    id: "team3DoctorTotal",
    name: "team3DoctorTotal",
    label: "ทีมสะสม (ทีม):",
    type: "number",
    value: activityFormData.team3DoctorTotal || 0,
  },
  {
    id: "team3DoctorService",
    name: "team3DoctorService",
    label: "ลงพื้นที่ (ทีม):",
    type: "number",
    value: activityFormData.team3DoctorService || 0,
  },
];

// 3.4.2 ทีมหน่วยแพทย์เคลื่อนที่
export const getSection342Fields = (
  activityFormData: ActivityFormData
): Field[] => [
  {
    id: "mobileDoctorTotal",
    name: "mobileDoctorTotal",
    label: "ทีมสะสม (ทีม):",
    type: "number",
    value: activityFormData.mobileDoctorTotal || 0,
  },
  {
    id: "mobileDoctorService",
    name: "mobileDoctorService",
    label: "ลงพื้นที่ (ทีม):",
    type: "number",
    value: activityFormData.mobileDoctorService || 0,
  },
];

// 3.4.3 ทีมดูแลประชาชน
export const getSection343Fields = (
  activityFormData: ActivityFormData
): Field[] => [
  {
    id: "civilTakeCareTotal",
    name: "civilTakeCareTotal",
    label: "ทีมสะสม (ทีม):",
    type: "number",
    value: activityFormData.civilTakeCareTotal || 0,
  },
  {
    id: "civilTakeCareService",
    name: "civilTakeCareService",
    label: "ลงพื้นที่ (ทีม):",
    type: "number",
    value: activityFormData.civilTakeCareService || 0,
  },
];

// 3.4.4 ทีม SHERT จังหวัด
export const getSection344Fields = (
  activityFormData: ActivityFormData
): Field[] => [
  {
    id: "shertTeamProvTotal",
    name: "shertTeamProvTotal",
    label: "ทีมสะสม (ทีม):",
    type: "number",
    value: activityFormData.shertTeamProvTotal || 0,
  },
  {
    id: "shertTeamProvService",
    name: "shertTeamProvService",
    label: "ลงพื้นที่ (ทีม):",
    type: "number",
    value: activityFormData.shertTeamProvService || 0,
  },
];

// 3.4.5 ทีม SHERT อำเภอ
export const getSection345Fields = (
  activityFormData: ActivityFormData
): Field[] => [
  {
    id: "shertTeamDistTotal",
    name: "shertTeamDistTotal",
    label: "ทีมสะสม (ทีม):",
    type: "number",
    value: activityFormData.shertTeamDistTotal || 0,
  },
  {
    id: "shertTeamDistService",
    name: "shertTeamDistService",
    label: "ลงพื้นที่ (ทีม):",
    type: "number",
    value: activityFormData.shertTeamDistService || 0,
  },
];

// 3.4.6 ทีม EnvOcc CU
export const getEnvoCccuFields = (
  activityFormData: ActivityFormData
): Field[] => [
  {
    id: "envoCccuTotal",
    name: "envoCccuTotal",
    label: "ทีมสะสม (ทีม):",
    type: "number",
    value: activityFormData.envoCccuTotal || 0,
  },
  {
    id: "envoCccuService",
    name: "envoCccuService",
    label: "ลงพื้นที่ (ทีม):",
    type: "number",
    value: activityFormData.envoCccuService || 0,
  },
];

// 3.5 สนับสนุนอุปกรณ์ป้องกันส่วนบุคคลแก่กลุ่มเสี่ยง
// 3.5.1 ประชาชน
export const getSection351Fields = (
  activityFormData: ActivityFormData
): Field[] => [
  {
    id: "n95MaskGiveCivil",
    name: "n95MaskGiveCivil",
    label: "N95 Mask (ชิ้น):",
    type: "number",
    value: activityFormData.n95MaskGiveCivil || 0,
  },
  {
    id: "surgicalMaskGiveCivil",
    name: "surgicalMaskGiveCivil",
    label: "Surgical Mask (ชิ้น):",
    type: "number",
    value: activityFormData.surgicalMaskGiveCivil || 0,
  },
];

// 3.5.2 เด็กเล็ก
export const getSection352Fields = (
  activityFormData: ActivityFormData
): Field[] => [
  {
    id: "n95MaskGiveChild",
    name: "n95MaskGiveChild",
    label: "N95 Mask (ชิ้น):",
    type: "number",
    value: activityFormData.n95MaskGiveChild || 0,
  },
  {
    id: "surgicalMaskGiveChild",
    name: "surgicalMaskGiveChild",
    label: "Surgical Mask (ชิ้น):",
    type: "number",
    value: activityFormData.surgicalMaskGiveChild || 0,
  },
];

// 3.5.3 ผู้สูงอายุ
export const getSection353Fields = (
  activityFormData: ActivityFormData
): Field[] => [
  {
    id: "n95MaskGiveOlder",
    name: "n95MaskGiveOlder",
    label: "N95 Mask (ชิ้น):",
    type: "number",
    value: activityFormData.n95MaskGiveOlder || 0,
  },
  {
    id: "surgicalMaskGiveOlder",
    name: "surgicalMaskGiveOlder",
    label: "Surgical Mask (ชิ้น):",
    type: "number",
    value: activityFormData.surgicalMaskGiveOlder || 0,
  },
];

// 3.5.4 หญิงตั้งครรภ์
export const getSection354Fields = (
  activityFormData: ActivityFormData
): Field[] => [
  {
    id: "n95MaskGivePregnant",
    name: "n95MaskGivePregnant",
    label: "N95 Mask (ชิ้น):",
    type: "number",
    value: activityFormData.n95MaskGivePregnant || 0,
  },
  {
    id: "surgicalMaskGivePregnant",
    name: "surgicalMaskGivePregnant",
    label: "Surgical Mask (ชิ้น):",
    type: "number",
    value: activityFormData.surgicalMaskGivePregnant || 0,
  },
];

// 3.5.5 ผู้ป่วยติดเตียง
export const getSection355Fields = (
  activityFormData: ActivityFormData
): Field[] => [
  {
    id: "n95MaskGiveBedridden",
    name: "n95MaskGiveBedridden",
    label: "N95 Mask (ชิ้น):",
    type: "number",
    value: activityFormData.n95MaskGiveBedridden || 0,
  },
  {
    id: "surgicalMaskGiveBedridden",
    name: "surgicalMaskGiveBedridden",
    label: "Surgical Mask (ชิ้น):",
    type: "number",
    value: activityFormData.surgicalMaskGiveBedridden || 0,
  },
];

// 3.5.6 ผู้มีโรคประจำตัว
export const getSection356Fields = (
  activityFormData: ActivityFormData
): Field[] => [
  {
    id: "n95MaskGiveSick",
    name: "n95MaskGiveSick",
    label: "N95 Mask (ชิ้น):",
    type: "number",
    value: activityFormData.n95MaskGiveSick || 0,
  },
  {
    id: "surgicalMaskGiveSick",
    name: "surgicalMaskGiveSick",
    label: "Surgical Mask (ชิ้น):",
    type: "number",
    value: activityFormData.surgicalMaskGiveSick || 0,
  },
];

// 3.5.7 ผู้ที่มีโรคหัวใจ
export const getSection357Fields = (
  activityFormData: ActivityFormData
): Field[] => [
  {
    id: "n95MaskGiveHeart",
    name: "n95MaskGiveHeart",
    label: "N95 Mask (ชิ้น):",
    type: "number",
    value: activityFormData.n95MaskGiveHeart || 0,
  },
  {
    id: "surgicalMaskGiveHeart",
    name: "surgicalMaskGiveHeart",
    label: "Surgical Mask (ชิ้น):",
    type: "number",
    value: activityFormData.surgicalMaskGiveHeart || 0,
  },
];

// 3.5.8 ผู้ที่มีโรคระบบทางเดินหายใจ
export const getSection358Fields = (
  activityFormData: ActivityFormData
): Field[] => [
  {
    id: "n95MaskGiveCopd",
    name: "n95MaskGiveCopd",
    label: "N95 Mask (ชิ้น):",
    type: "number",
    value: activityFormData.n95MaskGiveCopd || 0,
  },
  {
    id: "surgicalMaskGiveCopd",
    name: "surgicalMaskGiveCopd",
    label: "Surgical Mask (ชิ้น):",
    type: "number",
    value: activityFormData.surgicalMaskGiveCopd || 0,
  },
];

// 3.6 ระบบรักษาส่งต่อผู้ป่วย
export const getSection36Fields = (
  activityFormData: ActivityFormData
): Field[] => [
  {
    id: "skyDoctor",
    name: "skyDoctor",
    label: "SKY doctor (ทีม):",
    type: "number",
    value: activityFormData.skyDoctor || 0,
  },
  {
    id: "ambulance",
    name: "ambulance",
    label: "ทีมกู้ชีพ ALS (ทีม):",
    type: "number",
    value: activityFormData.ambulance || 0,
  },
];
