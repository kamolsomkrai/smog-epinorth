// components/MeasureSelect.tsx
"use client";
import React from 'react';

interface MeasureSelectProps {
  activityType: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const MeasureSelect: React.FC<MeasureSelectProps> = ({ activityType, onChange }) => (
  <div className="mb-4">
    <label htmlFor="activityType" className="block text-gray-700 font-medium mb-2">
      มาตรการ:
    </label>
    <select
      id="activityType"
      name="activityType"
      value={activityType}
      onChange={onChange}
      className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      required
    >
      <option value={0}>เลือกมาตรการ</option>
      <option value={1}>มาตรการที่ 1 ส่งเสริมการลดมลพิษ/สื่อสารสร้างความรอบรู้</option>
      <option value={2}>มาตรการที่ 2 ลดและป้องกันผลกระทบต่อสุขภาพ</option>
      <option value={3}>มาตรการที่ 3 จัดบริการด้านการแพทย์และสาธารณสุข</option>
      <option value={4}>มาตรการที่ 4 เพิ่มประสิทธิภาพการบริหารจัดการ</option>
    </select>
  </div>
);

export default MeasureSelect;
