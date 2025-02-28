"use client";

import React from 'react';
import { ActivityFormData } from '../../interfaces/newmeasure';
import InputRow from '../(global)/InputRow';

interface Props {
  activityFormData: ActivityFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Measure2: React.FC<Props> = ({ activityFormData, handleChange }) => {
  const section1Fields = [
    {
      id: "riskHealthInfo",
      name: "riskHealthInfo",
      label: "จัดทาสื่อ Info ประชาสัมพันธ์:",
      type: "number",
      value: activityFormData.riskHealthInfo || 0,
    },
    {
      id: "riskHealthSocial",
      name: "riskHealthSocial",
      label: "แจ้งเตือนความเสี่ยงผ่านช่องทางต่าง ๆ:",
      type: "number",
      value: activityFormData.riskHealthSocial || 0,
    },
  ];

  const section2Fields = [
    {
      id: "riskChildTotal",
      name: "riskChildTotal",
      label: "เด็กเล็ก (คน):",
      type: "number",
      value: activityFormData.riskChildTotal || 0,
    },
    {
      id: "riskChildTakeCare",
      name: "riskChildTakeCare",
      label: "เด็กเล็กได้รับการดูแล (คน):",
      type: "number",
      value: activityFormData.riskChildTakeCare || 0,
    },
    {
      id: "riskOlderTotal",
      name: "riskOlderTotal",
      label: "ผู้สูงอายุ (คน):",
      type: "number",
      value: activityFormData.riskOlderTotal || 0,
    },
    {
      id: "riskOlderTakeCare",
      name: "riskOlderTakeCare",
      label: "ผู้สูงอายุได้รับการดูแล (คน):",
      type: "number",
      value: activityFormData.riskOlderTakeCare || 0,
    },
    {
      id: "riskPregnantTotal",
      name: "riskPregnantTotal",
      label: "หญิงตั้งครรภ์ (คน):",
      type: "number",
      value: activityFormData.riskPregnantTotal || 0,
    },
    {
      id: "riskPregnantTakeCare",
      name: "riskPregnantTakeCare",
      label: "หญิงตั้งครรภ์ได้รับการดูแล (คน):",
      type: "number",
      value: activityFormData.riskPregnantTakeCare || 0,
    },
    {
      id: "riskBedriddenTotal",
      name: "riskBedriddenTotal",
      label: "ผู้ป่วยติดเตียง (คน):",
      type: "number",
      value: activityFormData.riskBedriddenTotal || 0,
    },
    {
      id: "riskBedriddenTakeCare",
      name: "riskBedriddenTakeCare",
      label: "ผู้ป่วยติดเตียงได้รับการดูแล (คน):",
      type: "number",
      value: activityFormData.riskBedriddenTakeCare || 0,
    },
    {
      id: "riskHeartTotal",
      name: "riskHeartTotal",
      label: "ผู้ที่มีโรคหัวใจ (คน):",
      type: "number",
      value: activityFormData.riskHeartTotal || 0,
    },
    {
      id: "riskHeartTakeCare",
      name: "riskHeartTakeCare",
      label: "ผู้ที่มีโรคหัวใจได้รับการดูแล (คน):",
      type: "number",
      value: activityFormData.riskHeartTakeCare || 0,
    },
    {
      id: "riskCopdTotal",
      name: "riskCopdTotal",
      label: "ผู้ที่มีโรคระบบทางเดินหายใจ (คน):",
      type: "number",
      value: activityFormData.riskCopdTotal || 0,
    },
    {
      id: "riskCopdTakeCare",
      name: "riskCopdTakeCare",
      label: "ผู้ที่มีโรคระบบทางเดินหายใจได้รับการดูแล (คน):",
      type: "number",
      value: activityFormData.riskCopdTakeCare || 0,
    },
  ];

  const section3Fields = [
    {
      id: "healthcareOfficer",
      name: "healthcareOfficer",
      label: "ตรวจสุขภาพเจ้าหน้าที่/อาสาสมัคร ดับไฟป่า (คน):",
      type: "number",
      value: activityFormData.healthcareOfficer || 0,
    },
  ];

  return (

    <div className="mt-6 space-y-8">
      <fieldset className="border border-gray-300 p-6 rounded-lg">
        <legend className="text-lg font-semibold text-gray-800">2.1 เฝ้าระวังและแจ้งเตือนความเสี่ยงต่อสุขภาพ</legend>
        <div className="mb-4">
          <InputRow fields={section1Fields} handleChange={handleChange} />
        </div>

      </fieldset>
      <fieldset className="border border-gray-300 p-6 rounded-lg">
        <legend className="text-lg font-semibold text-gray-800"> 2.2 เฝ้าระวังผลกระทบต่อสุขภาพและพฤติกรรมสุขภาพ</legend>
        <div className="mb-4">
          <InputRow fields={section2Fields} handleChange={handleChange} />
        </div>
      </fieldset>
      <fieldset className="border border-gray-300 p-6 rounded-lg">
        <legend className="text-lg font-semibold text-gray-800">2.3 การตรวจสุขภาพเจ้าหน้าที่/อาสาสมัคร</legend>
        <div className="mb-4">
          <InputRow
            fields={section3Fields}
            handleChange={handleChange}
            containerClassName="grid grid-cols-1 mt-4"
          />
        </div>
      </fieldset>
    </div>
  );
};

export default Measure2;
