"use client";
import React from 'react';
import { FormData } from '../../interfaces/measure';
import InputRow from '../(global)/InputRow';

interface Props {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Measure3: React.FC<Props> = ({ formData, handleChange }) => (
  <div className="mt-6 space-y-8">
    {/* 3.1 คลินิกมลพิษ */}
    <fieldset className="border border-gray-300 p-6 rounded-lg">
      <legend className="text-lg font-semibold text-gray-800">3.1 คลินิกมลพิษ</legend>
      <InputRow
        fields={[
          { id: "pollution_clinic_open", name: "pollution_clinic_open", label: "เปิดบริการสะสม (แห่ง):", value: formData.pollution_clinic_open },
          { id: "pollution_clinic_service", name: "pollution_clinic_service", label: "ผู้รับบริการสะสม (ราย):", value: formData.pollution_clinic_service },
        ]}
        handleChange={handleChange}
      />
    </fieldset>

    {/* 3.2 คลินิกมลพิษออนไลน์ */}
    <fieldset className="border border-gray-300 p-6 rounded-lg">
      <legend className="text-lg font-semibold text-gray-800">3.2 คลินิกมลพิษออนไลน์</legend>
      <InputRow
        fields={[
          { id: "online_clinic_open", name: "online_clinic_open", label: "เปิดบริการสะสม (แห่ง):", value: formData.online_clinic_open },
          { id: "online_clinic_service", name: "online_clinic_service", label: "ผู้รับบริการสะสม (ราย):", value: formData.online_clinic_service },
        ]}
        handleChange={handleChange}
      />
    </fieldset>

    {/* 3.3 จัดเตรียมห้องปลอดฝุ่น */}
    <fieldset className="border border-gray-300 p-6 rounded-lg">
      <legend className="text-lg font-semibold text-gray-800">3.3 จัดเตรียมห้องปลอดฝุ่น</legend>

      {/* 3.3.1 ห้องปลอดฝุ่นในศูนย์เด็กเล็ก */}
      <div className="mt-4">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.3.1 ห้องปลอดฝุ่นในศูนย์เด็กเล็ก (สะสม)</h4>
        <InputRow
          fields={[
            { id: "nursery_dust_free_open", name: "nursery_dust_free_open", label: "เปิดบริการสะสม (ห้อง):", value: formData.nursery_dust_free_open },
            { id: "nursery_dust_free_service", name: "nursery_dust_free_service", label: "มีผู้รับบริการสะสม (ราย):", value: formData.nursery_dust_free_service },
          ]}
          handleChange={handleChange}
        />
      </div>

      {/* 3.3.2 ห้องปลอดฝุ่นในหน่วยงานราชการ */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.3.3 ห้องปลอดฝุ่นในสถานบริการสาธารณสุข (สะสม)</h4>
        <InputRow
          fields={[
            { id: "gov_dust_free_open", name: "gov_dust_free_open", label: "เปิดบริการสะสม (ห้อง):", value: formData.gov_dust_free_open },
            { id: "gov_dust_free_service", name: "gov_dust_free_service", label: "มีผู้รับบริการสะสม (ราย):", value: formData.gov_dust_free_service },
          ]}
          handleChange={handleChange}
        />
      </div>

      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.3.4 ห้องปลอดฝุ่นในอาคารสำนักงาน (สะสม)</h4>
        <InputRow
          fields={[
            { id: "gov_dust_free_open", name: "gov_dust_free_open", label: "เปิดบริการสะสม (ห้อง):", value: formData.gov_dust_free_open },
            { id: "gov_dust_free_service", name: "gov_dust_free_service", label: "มีผู้รับบริการสะสม (ราย):", value: formData.gov_dust_free_service },
          ]}
          handleChange={handleChange}
        />
      </div>

      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.3.5 ห้องปลอดฝุ่นในร้านอาหาร/กาแฟ/โรงแรม (สะสม) ณ ปัจจุบัน</h4>
        <InputRow
          fields={[
            { id: "gov_dust_free_open", name: "gov_dust_free_open", label: "เปิดบริการสะสม (ห้อง):", value: formData.gov_dust_free_open },
            { id: "gov_dust_free_service", name: "gov_dust_free_service", label: "มีผู้รับบริการสะสม (ราย):", value: formData.gov_dust_free_service },
          ]}
          handleChange={handleChange}
        />
      </div>

      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.3.6 ห้องปลอดฝุ่นในสถานที่อื่นๆ เช่นศูนย์ประชุม ศาสนสถาน เป็นต้น (สะสม)</h4>
        <InputRow
          fields={[
            { id: "gov_dust_free_open", name: "gov_dust_free_open", label: "เปิดบริการสะสม (ห้อง):", value: formData.gov_dust_free_open },
            { id: "gov_dust_free_service", name: "gov_dust_free_service", label: "มีผู้รับบริการสะสม (ราย):", value: formData.gov_dust_free_service },
          ]}
          handleChange={handleChange}
        />
      </div>
    </fieldset>

    {/* 3.4 จัดระบบบริการเชิงรุก เพื่อดูแลประชาชน */}
    <fieldset className="border border-gray-300 p-6 rounded-lg">
      <legend className="text-lg font-semibold text-gray-800">3.4 จัดระบบบริการเชิงรุก เพื่อดูแลประชาชน</legend>

      {/* 3.4.1 ทีม 3 หมอ */}
      <div className="mt-4">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.4.1 ทีม 3 หมอ</h4>
        <InputRow
          fields={[
            { id: "active_teams_3_doctors_total", name: "active_teams_3_doctors_total", label: "ทีมสะสม (ทีม):", value: formData.active_teams_3_doctors_total },
            { id: "active_teams_3_doctors_add", name: "active_teams_3_doctors_add", label: "ลงพื้นที่ (ทีม):", value: formData.active_teams_3_doctors_add },
          ]}
          handleChange={handleChange}
        />
      </div>

      {/* 3.4.2 ทีมหน่วยแพทย์เคลื่อนที่ */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.4.2 ทีมหน่วยแพทย์เคลื่อนที่</h4>
        <InputRow
          fields={[
            { id: "active_teams_mobile_total", name: "active_teams_mobile_total", label: "ทีมสะสม (ทีม):", value: formData.active_teams_mobile_total },
            { id: "active_teams_mobile_add", name: "active_teams_mobile_add", label: "ลงพื้นที่ (ทีม):", value: formData.active_teams_mobile_add },
          ]}
          handleChange={handleChange}
        />
      </div>

      {/* 3.4.3 ทีม หน่วยดูแลประชาชน */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.4.3 ทีม หน่วยดูแลประชาชน</h4>
        <InputRow
          fields={[
            { id: "active_teams_citizens_total", name: "active_teams_citizens_total", label: "ทีมสะสม (ทีม):", value: formData.active_teams_citizens_total },
            { id: "active_teams_citizens_add", name: "active_teams_citizens_add", label: "ลงพื้นที่ (ทีม):", value: formData.active_teams_citizens_add },
          ]}
          handleChange={handleChange}
        />
      </div>

      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.4.3 ทีม SHERT จังหวัด</h4>
        <InputRow
          fields={[
            { id: "active_teams_citizens_total", name: "active_teams_citizens_total", label: "ทีมสะสม (ทีม):", value: formData.active_teams_citizens_total },
            { id: "active_teams_citizens_add", name: "active_teams_citizens_add", label: "ลงพื้นที่ (ทีม):", value: formData.active_teams_citizens_add },
          ]}
          handleChange={handleChange}
        />
      </div>

      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.4.3 ทีม ทีม SHERT อำเภอ</h4>
        <InputRow
          fields={[
            { id: "active_teams_citizens_total", name: "active_teams_citizens_total", label: "ทีมสะสม (ทีม):", value: formData.active_teams_citizens_total },
            { id: "active_teams_citizens_add", name: "active_teams_citizens_add", label: "ลงพื้นที่ (ทีม):", value: formData.active_teams_citizens_add },
          ]}
          handleChange={handleChange}
        />
      </div>

      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.4.3 ทีม EnvOcc CU</h4>
        <InputRow
          fields={[
            { id: "active_teams_citizens_total", name: "active_teams_citizens_total", label: "ทีมสะสม (ทีม):", value: formData.active_teams_citizens_total },
            { id: "active_teams_citizens_add", name: "active_teams_citizens_add", label: "ลงพื้นที่ (ทีม):", value: formData.active_teams_citizens_add },
          ]}
          handleChange={handleChange}
        />
      </div>
    </fieldset>

    {/* 3.5 สนับสนุนอุปกรณ์ป้องกันส่วนบุคคลแก่กลุ่มเสี่ยง */}
    <fieldset className="border border-gray-300 p-6 rounded-lg">
      <legend className="text-lg font-semibold text-gray-800">3.5 สนับสนุนอุปกรณ์ป้องกันส่วนบุคคลแก่กลุ่มเสี่ยง</legend>

      {/* 3.5.1 ประชาชน (สะสม) */}
      <div className="mt-4">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.5.1 ประชาชน (สะสม)</h4>
        <InputRow
          fields={[
            { id: "pop_N95_mask", name: "pop_N95_mask", label: "N95 Mask (ชิ้น):", value: formData.pop_N95_mask },
            { id: "pop_surgical_mask", name: "pop_surgical_mask", label: "Surgical Mask (ชิ้น):", value: formData.pop_surgical_mask },
          ]}
          handleChange={handleChange}
        />
      </div>

      {/* 3.5.2 เด็กเล็ก (สะสม) */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.5.2 เด็กเล็ก (สะสม)</h4>
        <InputRow
          fields={[
            { id: "children_N95_mask", name: "children_N95_mask", label: "N95 Mask (ชิ้น):", value: formData.children_N95_mask },
            { id: "children_surgical_mask", name: "children_surgical_mask", label: "Surgical Mask (ชิ้น):", value: formData.children_surgical_mask },
          ]}
          handleChange={handleChange}
        />
      </div>

      {/* 3.5.3 ผู้สูงอายุ (สะสม) */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.5.3 ผู้สูงอายุ (สะสม)</h4>
        <InputRow
          fields={[
            { id: "elderly_N95_mask", name: "elderly_N95_mask", label: "N95 Mask (ชิ้น):", value: formData.elderly_N95_mask },
            { id: "elderly_surgical_mask", name: "elderly_surgical_mask", label: "Surgical Mask (ชิ้น):", value: formData.elderly_surgical_mask },
          ]}
          handleChange={handleChange}
        />
      </div>

      {/* 3.5.4 หญิงตั้งครรภ์ (สะสม) */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.5.4 หญิงตั้งครรภ์ (สะสม)</h4>
        <InputRow
          fields={[
            { id: "pregnant_N95_mask", name: "pregnant_N95_mask", label: "N95 Mask (ชิ้น):", value: formData.pregnant_N95_mask },
            { id: "pregnant_surgical_mask", name: "pregnant_surgical_mask", label: "Surgical Mask (ชิ้น):", value: formData.pregnant_surgical_mask },
          ]}
          handleChange={handleChange}
        />
      </div>

      {/* 3.5.5 ผู้ป่วยติดเตียง (สะสม) */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.5.5 ผู้ป่วยติดเตียง (สะสม)</h4>
        <InputRow
          fields={[
            { id: "bedridden_N95_mask", name: "bedridden_N95_mask", label: "N95 Mask (ชิ้น):", value: formData.bedridden_N95_mask },
            { id: "bedridden_surgical_mask", name: "bedridden_surgical_mask", label: "Surgical Mask (ชิ้น):", value: formData.bedridden_surgical_mask },
          ]}
          handleChange={handleChange}
        />
      </div>

      {/* 3.5.6 ผู้มีโรคประจำตัว (สะสม) */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.5.6 ผู้มีโรคประจำตัว (สะสม)</h4>
        <InputRow
          fields={[
            { id: "disease_N95_mask", name: "disease_N95_mask", label: "N95 Mask (ชิ้น):", value: formData.disease_N95_mask },
            { id: "disease_surgical_mask", name: "disease_surgical_mask", label: "Surgical Mask (ชิ้น):", value: formData.disease_surgical_mask },
          ]}
          handleChange={handleChange}
        />
      </div>

      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.5.7 ผู้ที่มีโรคหัวใจ (สะสม)</h4>
        <InputRow
          fields={[
            { id: "disease_N95_mask", name: "disease_N95_mask", label: "N95 Mask (ชิ้น):", value: formData.disease_N95_mask },
            { id: "disease_surgical_mask", name: "disease_surgical_mask", label: "Surgical Mask (ชิ้น):", value: formData.disease_surgical_mask },
          ]}
          handleChange={handleChange}
        />
      </div>

      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.5.8 ผู้ที่มีโรคระบบทางเดินหายใจ (สะสม)</h4>
        <InputRow
          fields={[
            { id: "disease_N95_mask", name: "disease_N95_mask", label: "N95 Mask (ชิ้น):", value: formData.disease_N95_mask },
            { id: "disease_surgical_mask", name: "disease_surgical_mask", label: "Surgical Mask (ชิ้น):", value: formData.disease_surgical_mask },
          ]}
          handleChange={handleChange}
        />
      </div>
    </fieldset>

    {/* 3.6 ระบบรักษาส่งต่อผู้ป่วย */}
    <fieldset className="border border-gray-300 p-6 rounded-lg">
      <legend className="text-lg font-semibold text-gray-800">3.6 ระบบรักษาส่งต่อผู้ป่วย</legend>
      <InputRow
        fields={[
          { id: "sky_doctor", name: "sky_doctor", label: "SKY doctor (ทีม):", value: formData.sky_doctor },
          { id: "ambulance", name: "ambulance", label: "ทีมกู้ชีพ ALS (ทีม):", value: formData.ambulance },
        ]}
        handleChange={handleChange}
      />
    </fieldset>
  </div>
);

export default Measure3;
