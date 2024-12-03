import React from 'react';
import FormData from '../../interfaces/measure';

interface Props {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Measure4: React.FC<Props> = ({ formData, handleChange }) => (
  <div className="mt-6">
    <div className="mb-4">
      <label htmlFor="measure4_eoc_open_date" className="block text-gray-700 font-medium mb-2">
        4.1 วันเดือนปี ที่เปิด EOC:
      </label>
      <input
        type="date"
        id="measure4_eoc_open_date"
        name="measure4_eoc_open_date"
        value={formData.measure4_eoc_open_date || ''}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="measure4_eoc_close_date" className="block text-gray-700 font-medium mb-2">
        4.2 วันเดือนปี ที่ปิด EOC:
      </label>
      <input
        type="date"
        id="measure4_eoc_close_date"
        name="measure4_eoc_close_date"
        value={formData.measure4_eoc_close_date || ''}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure4_law_enforcement_fine" className="block text-gray-700 font-medium mb-2">
        4.3 จับปรับ:
      </label>
      <input
        type="number"
        id="measure4_law_enforcement_fine"
        name="measure4_law_enforcement_fine"
        value={formData.measure4_law_enforcement_fine || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  </div>
);

export default Measure4;