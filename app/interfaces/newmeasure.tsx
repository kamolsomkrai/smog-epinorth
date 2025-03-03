export interface Measure1Data {
  activityCatalog: number;
  activityDetail: string;
  activityDate: string;
}

export interface Measure2Data {
  riskHealthInfo: number;
  riskHealthSocial: number;
  riskChildTotal: number;
  riskChildTakeCare: number;
  riskOlderTotal: number;
  riskOlderTakeCare: number;
  riskPregnantTotal: number;
  riskPregnantTakeCare: number;
  riskBedriddenTotal: number;
  riskBedriddenTakeCare: number;
  riskHeartTotal: number;
  riskHeartTakeCare: number;
  riskCopdTotal: number;
  riskCopdTakeCare: number;
  healthcareOfficer: number;
}

export interface Measure3Data {
  pollutionClinicTotal: number;
  pollutionCliniService: number;
  onlinePollutionClinicTotal: number;
  onlinePollutionCliniService: number;
  mosquitoNetTotal: number;
  mosquitoNetService: number;
  nurseryDustFreeTotal: number;
  nurseryDustFreeService: number;
  publicHealthDustFreeTotal: number;
  publicHealthDustFreeService: number;
  officeDustFreeTotal: number;
  officeDustFreeService: number;
  buildingDustFreeTotal: number;
  buildingDustFreeService: number;
  otherDustFreeTotal: number;
  otherDustFreeService: number;
  team3DoctorTotal: number;
  team3DoctorService: number;
  mobileDoctorTotal: number;
  mobileDoctorService: number;
  civilTakeCareTotal: number;
  civilTakeCareService: number;
  shertTeamProvTotal: number;
  shertTeamProvService: number;
  shertTeamDistTotal: number;
  shertTeamDistService: number;
  envoCccuTotal: number;
  envoCccuService: number;
  n95MaskGiveCivil: number;
  surgicalMaskGiveCivil: number;
  n95MaskGiveChild: number;
  surgicalMaskGiveChild: number;
  n95MaskGiveOlder: number;
  surgicalMaskGiveOlder: number;
  n95MaskGivePregnant: number;
  surgicalMaskGivePregnant: number;
  n95MaskGiveBedridden: number;
  surgicalMaskGiveBedridden: number;
  n95MaskGiveSick: number;
  surgicalMaskGiveSick: number;
  n95MaskGiveHeart: number;
  surgicalMaskGiveHeart: number;
  n95MaskGiveCopd: number;
  surgicalMaskGiveCopd: number;
  skyDoctor: number;
  ambulance: number;
}

export interface Measure4Data {
  openPheocDate: string;
  closePheocDate: string;
  openDontBurnDate: string;
  closeDontBurnDate: string;
  lawEnforcement: number;
}

export interface ActivityData {
  activityId: number;
  activityType: number;
  hospCode: string;
  provCode: string;
  distCode: string;
}

export interface Measure1UploadData {
  filePath: string;
  fileName: string;
  fileType: string;
  extension: string;
  fileSize: string;
  rawFile?: File; // เพิ่ม property สำหรับเก็บ File object จริง (ใช้ในการอัปโหลด)
}

export interface ActivityFormData extends ActivityData,
  Partial<Measure1Data>,
  Partial<Measure2Data>,
  Partial<Measure3Data>,
  Partial<Measure4Data>,
  Partial<Measure1UploadData> { }
