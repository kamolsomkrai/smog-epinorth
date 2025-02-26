"use client";
import React from 'react';
import { FormData } from '../../interfaces/measure';

interface Props {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Measure4: React.FC<Props> = ({ formData, handleChange }) => (
  <div className="mt-6">
    <fieldset className="border border-gray-300 p-6 rounded-lg">
      <legend className="text-lg font-semibold text-gray-800">EOC</legend>
      <div className="mb-4">
        <label htmlFor="eoc_open_date" className="block text-gray-700 font-medium mb-2">
          4.1 วันเดือนปี ที่เปิด EOC:
        </label>
        <input
          type="date"
          id="eoc_open_date"
          name="eoc_open_date"
          value={formData.eoc_open_date || ''}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="eoc_close_date" className="block text-gray-700 font-medium mb-2">
          4.2 วันเดือนปี ที่ปิด EOC:
        </label>
        <input
          type="date"
          id="eoc_close_date"
          name="eoc_close_date"
          value={formData.eoc_close_date || ''}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </fieldset>
    <fieldset className="border border-gray-300 p-6 rounded-lg">
      <legend className="text-lg font-semibold text-gray-800">มาตรการห้ามเผา</legend>
      <div className="mb-4">
        <label htmlFor="eoc_open_date" className="block text-gray-700 font-medium mb-2">
          4.3 วันเดือนปี ที่เริ่ม มาตรการห้ามเผา:
        </label>
        <input
          type="date"
          id="eoc_open_date"
          name="eoc_open_date"
          value={formData.eoc_open_date || ''}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="eoc_close_date" className="block text-gray-700 font-medium mb-2">
          4.4 วันเดือนปี ที่สิ้นสุด มาตรการห้ามเผา:
        </label>
        <input
          type="date"
          id="eoc_close_date"
          name="eoc_close_date"
          value={formData.eoc_close_date || ''}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </fieldset>




    <fieldset className="border border-gray-300 p-6 rounded-lg">
      <legend className="text-lg font-semibold text-gray-800">จับปรับ</legend>
      <div>
        <label htmlFor="law_enforcement_fine" className="block text-gray-700 font-medium mb-2">
          4.5 จับ - ปรับ การเผา (ครั้ง):
        </label>
        <input
          type="number"
          id="law_enforcement_fine"
          name="law_enforcement_fine"
          value={formData.law_enforcement_fine || 0}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </fieldset>

  </div>
);

export default Measure4;