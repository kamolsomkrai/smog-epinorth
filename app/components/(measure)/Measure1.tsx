// components/Measure1.tsx
"use client";
import React from 'react';
import { ActivityFormData, Measure1UploadData } from '../../interfaces/newmeasure';
import Previews from '../(global)/Previews';

interface Measure1Props {
  activityFormData: ActivityFormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onFilesChange: (files: Measure1UploadData[]) => void;
}

const Measure1: React.FC<Measure1Props> = ({ activityFormData, handleChange, onFilesChange }) => {
  return (
    <div className="mt-6">
      <fieldset className="border border-gray-300 p-6 rounded-lg">
        <legend className="text-lg font-semibold text-gray-800">บันทึกกิจกรรม</legend>
        <div className="mb-4">
          <label htmlFor="activityDate" className="block text-gray-700 font-medium mb-2">
            วันที่ดำเนินกิจกรรม:
          </label>
          <input
            type="date"
            id="activityDate"
            name="activityDate"
            value={activityFormData.activityDate}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="activityCatalog" className="block text-gray-700 font-medium mb-2">
            ประเภทกิจกรรม:
          </label>
          <select
            id="activityCatalog"
            name="activityCatalog"
            value={activityFormData.activityCatalog || 0}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="0">เลือกประเภทกิจกรรม</option>
            <option value="1">การเฝ้าระวังและติดตามสถานการณ์หรือการรายงานข้อมูล</option>
            <option value="2">การสื่อสารความเสี่ยง/การรณรงค์</option>
            <option value="3">การปรับปรุงสภาพแวดล้อม</option>
            <option value="4">การส่งเสริมการใช้หน้ากากอนามัย</option>
            <option value="5">การเตรียมการรองรับผู้ป่วยและกลุ่มเสี่ยง</option>
            <option value="6">กิจกรรมอื่นๆ</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="activityDetail" className="block text-gray-700 font-medium mb-2">
            รายละเอียดกิจกรรม:
          </label>
          <textarea
            id="activityDetail"
            name="activityDetail"
            value={activityFormData.activityDetail || ''}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* ส่วนอัปโหลดไฟล์ */}
        <div className="mb-4">
          <Previews onFilesChange={onFilesChange} />
        </div>
      </fieldset>
      {/* กรอกข้อมูลกิจกรรม */}

    </div>
  );
};

export default Measure1;
