// components/Measure1.tsx
"use client";
import React from 'react';
import { FormData } from '../../interfaces/measure';
import Previews from '../(global)/Previews';

interface Measure1Props {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onFilesChange: (files: File[]) => void;
}

const Measure1: React.FC<Measure1Props> = ({ formData, handleChange, onFilesChange }) => {
  return (
    <div className="mt-6">
      {/* กรอกข้อมูลกิจกรรม */}
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
        <label htmlFor="measure1_1" className="block text-gray-700 font-medium mb-2">
          รายละเอียด:
        </label>
        <textarea
          id="measure1_1"
          name="measure1_1"
          value={formData.measure1_1 || ''}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      {/* ส่วนอัปโหลดไฟล์ */}
      <div className="mb-4">
        <Previews onFilesChange={onFilesChange} />
      </div>
    </div>
  );
};

export default Measure1;
