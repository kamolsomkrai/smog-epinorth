"use client";
import React from "react";
import { ActivityFormData } from "../../interfaces/newmeasure";

interface Props {
  activityFormData: ActivityFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Measure4: React.FC<Props> = ({ activityFormData, handleChange }) => (
  <div className="mt-6">
    {/* Fieldset สำหรับ PHEOC */}
    <fieldset className="border border-gray-300 p-6 rounded-lg">
      <legend className="text-lg font-semibold text-gray-800">EOC</legend>
      <div className="mb-4">
        <label htmlFor="openPheocDate" className="block text-gray-700 font-medium mb-2">
          4.1 วันเดือนปี ที่เปิด PHEOC:
        </label>
        <input
          type="date"
          id="openPheocDate"
          name="openPheocDate"
          value={activityFormData.openPheocDate || ""}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="closePheocDate" className="block text-gray-700 font-medium mb-2">
          4.2 วันเดือนปี ที่ปิด PHEOC:
        </label>
        <input
          type="date"
          id="closePheocDate"
          name="closePheocDate"
          value={activityFormData.closePheocDate || ""}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </fieldset>

    {/* Fieldset สำหรับมาตรการห้ามเผา */}
    <fieldset className="border border-gray-300 p-6 rounded-lg mt-6">
      <legend className="text-lg font-semibold text-gray-800">มาตรการห้ามเผา</legend>
      <div className="mb-4">
        <label htmlFor="openDontBurnDate" className="block text-gray-700 font-medium mb-2">
          4.3 วันเดือนปี ที่เริ่ม มาตรการห้ามเผา:
        </label>
        <input
          type="date"
          id="openDontBurnDate"
          name="openDontBurnDate"
          value={activityFormData.openDontBurnDate || ""}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="closeDontBurnDate" className="block text-gray-700 font-medium mb-2">
          4.4 วันเดือนปี ที่สิ้นสุด มาตรการห้ามเผา:
        </label>
        <input
          type="date"
          id="closeDontBurnDate"
          name="closeDontBurnDate"
          value={activityFormData.closeDontBurnDate || ""}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </fieldset>

    {/* Fieldset สำหรับจับปรับ */}
    <fieldset className="border border-gray-300 p-6 rounded-lg mt-6">
      <legend className="text-lg font-semibold text-gray-800">จับปรับ</legend>
      <div>
        <label htmlFor="lawEnforcement" className="block text-gray-700 font-medium mb-2">
          4.5 จับ - ปรับ การเผา (ครั้ง):
        </label>
        <input
          type="number"
          id="lawEnforcement"
          name="lawEnforcement"
          value={activityFormData.lawEnforcement || 0}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </fieldset>
  </div>
);

export default Measure4;
