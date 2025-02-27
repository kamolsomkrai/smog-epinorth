// components/Measure3.tsx
"use client";
import React from "react";
import { FormData } from "../../interfaces/newmeasure";
import InputRow from "../(global)/InputRow";
import {
  getSection31Fields,
  getSection32Fields,
  getSection331Fields,
  getSection332Fields,
  getSection333Fields,
  getSection334Fields,
  getSection335Fields,
  getSection341Fields,
  getSection342Fields,
  getSection343Fields,
  getSection344Fields,
  getSection345Fields,
  getEnvoCccuFields,
  getSection351Fields,
  getSection352Fields,
  getSection353Fields,
  getSection354Fields,
  getSection355Fields,
  getSection356Fields,
  getSection357Fields,
  getSection358Fields,
  getSection36Fields,
} from "../../fields/measure3Fields";

interface Props {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Measure3: React.FC<Props> = ({ formData, handleChange }) => (
  <div className="mt-6 space-y-8">
    {/* 3.1 คลินิกมลพิษ */}
    <fieldset className="border border-gray-300 p-6 rounded-lg">
      <legend className="text-lg font-semibold text-gray-800">3.1 คลินิกมลพิษ</legend>
      <InputRow fields={getSection31Fields(formData)} handleChange={handleChange} />
    </fieldset>

    {/* 3.2 คลินิกมลพิษออนไลน์ */}
    <fieldset className="border border-gray-300 p-6 rounded-lg">
      <legend className="text-lg font-semibold text-gray-800">3.2 คลินิกมลพิษออนไลน์</legend>
      <InputRow fields={getSection32Fields(formData)} handleChange={handleChange} />
    </fieldset>

    {/* 3.3 จัดเตรียมห้องปลอดฝุ่น */}
    <fieldset className="border border-gray-300 p-6 rounded-lg">
      <legend className="text-lg font-semibold text-gray-800">3.3 จัดเตรียมห้องปลอดฝุ่น</legend>
      {/* 3.3.1 ห้องปลอดฝุ่นในศูนย์เด็กเล็ก */}
      <div className="mt-4">
        <h4 className="text-md font-semibold text-gray-700 mb-2">
          3.3.1 ห้องปลอดฝุ่นในศูนย์เด็กเล็ก (สะสม)
        </h4>
        <InputRow fields={getSection331Fields(formData)} handleChange={handleChange} />
      </div>
      {/* 3.3.2 ห้องปลอดฝุ่นในหน่วยงานราชการ */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">
          3.3.2 ห้องปลอดฝุ่นในหน่วยงานราชการ (สะสม)
        </h4>
        <InputRow fields={getSection332Fields(formData)} handleChange={handleChange} />
      </div>
      {/* 3.3.3 ห้องปลอดฝุ่นในอาคารสำนักงาน */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">
          3.3.3 ห้องปลอดฝุ่นในอาคารสำนักงาน (สะสม)
        </h4>
        <InputRow fields={getSection333Fields(formData)} handleChange={handleChange} />
      </div>
      {/* 3.3.4 ห้องปลอดฝุ่นในร้านอาหาร/กาแฟ/โรงแรม */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">
          3.3.4 ห้องปลอดฝุ่นในร้านอาหาร/กาแฟ/โรงแรม (สะสม)
        </h4>
        <InputRow fields={getSection334Fields(formData)} handleChange={handleChange} />
      </div>
      {/* 3.3.5 ห้องปลอดฝุ่นในสถานที่อื่นๆ */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">
          3.3.5 ห้องปลอดฝุ่นในสถานที่อื่นๆ (สะสม)
        </h4>
        <InputRow fields={getSection335Fields(formData)} handleChange={handleChange} />
      </div>
    </fieldset>

    {/* 3.4 จัดระบบบริการเชิงรุก เพื่อดูแลประชาชน */}
    <fieldset className="border border-gray-300 p-6 rounded-lg">
      <legend className="text-lg font-semibold text-gray-800">
        3.4 จัดระบบบริการเชิงรุก เพื่อดูแลประชาชน
      </legend>
      {/* 3.4.1 ทีม 3 หมอ */}
      <div className="mt-4">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.4.1 ทีม 3 หมอ</h4>
        <InputRow fields={getSection341Fields(formData)} handleChange={handleChange} />
      </div>
      {/* 3.4.2 ทีมหน่วยแพทย์เคลื่อนที่ */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.4.2 ทีมหน่วยแพทย์เคลื่อนที่</h4>
        <InputRow fields={getSection342Fields(formData)} handleChange={handleChange} />
      </div>
      {/* 3.4.3 ทีมดูแลประชาชน */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.4.3 ทีมดูแลประชาชน</h4>
        <InputRow fields={getSection343Fields(formData)} handleChange={handleChange} />
      </div>
      {/* 3.4.4 ทีม SHERT จังหวัด */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.4.4 ทีม SHERT จังหวัด</h4>
        <InputRow fields={getSection344Fields(formData)} handleChange={handleChange} />
      </div>
      {/* 3.4.5 ทีม SHERT อำเภอ */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.4.5 ทีม SHERT อำเภอ</h4>
        <InputRow fields={getSection345Fields(formData)} handleChange={handleChange} />
      </div>
      {/* 3.4.6 ทีม EnvOcc CU */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.4.6 ทีม EnvOcc CU</h4>
        <InputRow fields={getEnvoCccuFields(formData)} handleChange={handleChange} />
      </div>
    </fieldset>

    {/* 3.5 สนับสนุนอุปกรณ์ป้องกันส่วนบุคคลแก่กลุ่มเสี่ยง */}
    <fieldset className="border border-gray-300 p-6 rounded-lg">
      <legend className="text-lg font-semibold text-gray-800">
        3.5 สนับสนุนอุปกรณ์ป้องกันส่วนบุคคลแก่กลุ่มเสี่ยง
      </legend>
      {/* 3.5.1 ประชาชน */}
      <div className="mt-4">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.5.1 ประชาชน (สะสม)</h4>
        <InputRow fields={getSection351Fields(formData)} handleChange={handleChange} />
      </div>
      {/* 3.5.2 เด็กเล็ก */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.5.2 เด็กเล็ก (สะสม)</h4>
        <InputRow fields={getSection352Fields(formData)} handleChange={handleChange} />
      </div>
      {/* 3.5.3 ผู้สูงอายุ */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.5.3 ผู้สูงอายุ (สะสม)</h4>
        <InputRow fields={getSection353Fields(formData)} handleChange={handleChange} />
      </div>
      {/* 3.5.4 หญิงตั้งครรภ์ */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.5.4 หญิงตั้งครรภ์ (สะสม)</h4>
        <InputRow fields={getSection354Fields(formData)} handleChange={handleChange} />
      </div>
      {/* 3.5.5 ผู้ป่วยติดเตียง */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.5.5 ผู้ป่วยติดเตียง (สะสม)</h4>
        <InputRow fields={getSection355Fields(formData)} handleChange={handleChange} />
      </div>
      {/* 3.5.6 ผู้มีโรคประจำตัว */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.5.6 ผู้มีโรคประจำตัว (สะสม)</h4>
        <InputRow fields={getSection356Fields(formData)} handleChange={handleChange} />
      </div>
      {/* 3.5.7 ผู้ที่มีโรคหัวใจ */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.5.7 ผู้ที่มีโรคหัวใจ (สะสม)</h4>
        <InputRow fields={getSection357Fields(formData)} handleChange={handleChange} />
      </div>
      {/* 3.5.8 ผู้ที่มีโรคระบบทางเดินหายใจ */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.5.8 ผู้ที่มีโรคระบบทางเดินหายใจ (สะสม)</h4>
        <InputRow fields={getSection358Fields(formData)} handleChange={handleChange} />
      </div>
    </fieldset>

    {/* 3.6 ระบบรักษาส่งต่อผู้ป่วย */}
    <fieldset className="border border-gray-300 p-6 rounded-lg">
      <legend className="text-lg font-semibold text-gray-800">3.6 ระบบรักษาส่งต่อผู้ป่วย</legend>
      <InputRow fields={getSection36Fields(formData)} handleChange={handleChange} />
    </fieldset>
  </div>
);

export default Measure3;
