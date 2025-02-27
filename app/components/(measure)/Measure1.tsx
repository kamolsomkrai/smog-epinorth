// components/Measure1.tsx
"use client";
import React from 'react';
import { FormData, Measure1UploadData } from '../../interfaces/newmeasure';
import Previews from '../(global)/Previews';

interface Measure1Props {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onFilesChange: (files: Measure1UploadData[]) => void;
}

const Measure1: React.FC<Measure1Props> = ({ formData, handleChange, onFilesChange }) => {
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
            value={formData.activityDate}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="activityDetail" className="block text-gray-700 font-medium mb-2">
            รายละเอียด:
          </label>
          <textarea
            id="activityDetail"
            name="activityDetail"
            value={formData.activityDetail || ''}
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
