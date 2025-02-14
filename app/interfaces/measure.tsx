/**
 * Interface representing the structure of form data
 * with various measurement fields across different categories
 */
// export interface FormData {
//   // Identification and Date
//   hospcode: string;
//   activityDate: string;

//   // Measurement 1 (Optional text-based measurements)
//   measure1_1?: string;
//   measure1_2?: string;

//   // Measurement 2 - Population Segments
//   measure2_1_1?: number;
//   measure2_1_2?: number;
//   measure2_child?: number;
//   measure2_elderly?: number;
//   measure2_pregnant?: number;
//   measure2_bedridden?: number;
//   measure2_asthma?: number;
//   measure2_copd?: number;
//   measure2_asthma_copd?: number;
//   measure2_health_check_staff?: number;
//   measure2_health_check_volunteer?: number;

//   // Measurement 3 - Clinics and Services
//   measure3_pollution_clinic_open?: number;
//   measure3_pollution_clinic_service?: number;
//   measure3_online_clinic_open?: number;
//   measure3_online_clinic_service?: number;
//   measure3_nursery_dust_free_open?: number;
//   measure3_nursery_dust_free_service?: number;
//   measure3_gov_dust_free_open?: number;
//   measure3_gov_dust_free_service?: number;

//   // Measurement 3 - Active Teams
//   measure3_active_teams_3_doctors_total?: number;
//   measure3_active_teams_3_doctors_add?: number;
//   measure3_active_teams_mobile_total?: number;
//   measure3_active_teams_mobile_add?: number;
//   measure3_active_teams_citizens_total?: number;
//   measure3_active_teams_citizens_add?: number;

//   // Measurement 3 - Personal Protective Gear
//   measure3_personal_protective_gear?: number;

//   // Elderly Masks
//   measure3_elderly_N95_mask?: number;
//   measure3_elderly_surgical_mask?: number;

//   // Children Masks
//   measure3_children_N95_mask?: number;
//   measure3_children_surgical_mask?: number;

//   // Pregnant Masks
//   measure3_pregnant_N95_mask?: number;
//   measure3_pregnant_surgical_mask?: number;

//   // Bedridden Masks
//   measure3_bedridden_N95_mask?: number;
//   measure3_bedridden_surgical_mask?: number;

//   // Disease-specific Masks
//   measure3_disease_N95_mask?: number;
//   measure3_disease_surgical_mask?: number;

//   // Additional Medical Resources
//   measure3_sky_doctor?: number;
//   measure3_ambulance?: number;

//   // Measurement 4 - EOC (Emergency Operations Center)
//   measure4_eoc_open_date?: string;
//   measure4_eoc_close_date?: string;
//   measure4_law_enforcement_fine?: number;
// }

// // Optional: Export as a module if needed in Node.js environment
// export default FormData;

export interface Measure1Data {
  province: string;
  measure1_1: string; // ข้อความจากการสื่อสารสร้างความรอบรู้/สร้างความเข้มแข็งของชุมชนและประชาชน
  measure1_2: string; // ข้อความจากการส่งเสริมองค์กรลดมลพิษ Green Energy
}

// interfaces/measure.ts
export interface Measure2Data {
  province: string;
  risk_health_monitoring_1_1: number; // จัดทาสื่อ Info ประชาสัมพันธ์
  risk_health_monitoring_1_2: number; // แจ้งเตือนความเสี่ยงผ่านช่องทางต่าง ๆ
  child: number; // เด็กเล็ก
  elderly: number; // ผู้สูงอายุ
  pregnant: number; // หญิงตั้งครรภ์
  bedridden: number; // ติดเตียง
  asthma: number; // ผู้มีโรค Asthma
  copd: number; // ผู้มีโรค COPD
  asthma_copd: number; // ผู้มีโรค Asthma + COPD
  health_check_staff: number; // ตรวจสุขภาพโดยเจ้าหน้าที่
  health_check_volunteer: number; // ตรวจสุขภาพโดยอาสาสมัคร
}


// interfaces/measure.ts
export interface Measure3Data {
  province: string;
  pollution_clinic_open: number; // 3.1 เปิดคลินิกมลพิษ
  pollution_clinic_service: number; // 3.2 ผู้รับบริการคลินิกมลพิษ
  online_clinic_open: number; // 3.3 เปิดบริการคลินิกมลพิษออนไลน์
  online_clinic_service: number; // 3.4 ผู้รับบริการคลินิกมลพิษออนไลน์
  nursery_dust_free_open: number; // 3.5 เปิดบริการห้องปลอดฝุ่น Nursery
  nursery_dust_free_service: number; // 3.6 ผู้รับบริการห้องปลอดฝุ่น Nursery
  gov_dust_free_open: number; // 3.7 เปิดบริการห้องปลอดฝุ่น รัฐ
  gov_dust_free_service: number; // 3.8 ผู้รับบริการห้องปลอดฝุ่น รัฐ
  active_teams_3_doctors_total: number; // 3.9 ทีม 3 หมอ (รวม)
  active_teams_3_doctors_add: number; // 3.10 ทีม 3 หมอ (เพิ่ม)
  active_teams_mobile_total: number; // 3.11 ทีมหน่วยแพทย์เคลื่อนที่ (รวม)
  active_teams_mobile_add: number; // 3.12 ทีมหน่วยแพทย์เคลื่อนที่ (เพิ่ม)
  active_teams_citizens_total: number; // 3.13 ทีมหน่วยดูแลประชาชน (รวม)
  active_teams_citizens_add: number; // 3.14 ทีมหน่วยดูแลประชาชน (เพิ่ม)
  // personal_protective_gear: number; // 3.15 อุปกรณ์ป้องกันส่วนบุคคล
  pop_N95_mask: number; // 3.16 หน้ากาก N95 สำหรับผู้สูงอายุ
  pop_surgical_mask: number; // 3.17 หน้ากากอนามัยสำหรับผู้สูงอายุ
  elderly_N95_mask: number; // 3.16 หน้ากาก N95 สำหรับผู้สูงอายุ
  elderly_surgical_mask: number; // 3.17 หน้ากากอนามัยสำหรับผู้สูงอายุ
  children_N95_mask: number; // 3.18 หน้ากาก N95 สำหรับเด็กเล็ก
  children_surgical_mask: number; // 3.19 หน้ากากอนามัยสำหรับเด็กเล็ก
  pregnant_N95_mask: number; // 3.20 หน้ากาก N95 สำหรับหญิงตั้งครรภ์
  pregnant_surgical_mask: number; // 3.21 หน้ากากอนามัยสำหรับหญิงตั้งครรภ์
  bedridden_N95_mask: number; // 3.22 หน้ากาก N95 สำหรับติดเตียง
  bedridden_surgical_mask: number; // 3.23 หน้ากากอนามัยสำหรับติดเตียง
  disease_N95_mask: number; // 3.24 หน้ากาก N95 สำหรับผู้มีโรคประจำตัว
  disease_surgical_mask: number; // 3.25 หน้ากากอนามัยสำหรับผู้มีโรคประจำตัว
  sky_doctor: number; // 3.26 SKY doctor
  ambulance: number; // 3.27 รถกู้ชีพ ALS
  // health_check_staff: number;
  // health_check_volunteer: number;
}

// interfaces/measure.ts
export interface Measure4Data {
  province: string;
  eoc_open_date: string; // รูปแบบ YYYY-MM-DD
  eoc_close_date: string; // รูปแบบ YYYY-MM-DD
  law_enforcement_fine: number; // จับปรับ (บาท)
}

export interface ActivityData {
  // hospcode: string;
  activityDate: string;
  activity_id: number;
  // provcode: string;
  measureType: number; // '1', '2', '3', '4'
}

export interface FormData extends ActivityData, Partial<Measure1Data>, Partial<Measure2Data>, Partial<Measure3Data>, Partial<Measure4Data> { }