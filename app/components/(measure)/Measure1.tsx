import React from 'react';
import { FormData } from '../../interfaces/measure';

interface Props {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Measure1: React.FC<Props> = ({ formData, handleChange }) => (
  <div className="mt-6">
    <div className="mb-4">
      <label htmlFor="measure1_1" className="block text-gray-700 font-medium mb-2">
        1.1 สื่อสารสร้างความรอบรู้/สร้างความเข้มแข็งของชุมชนและประชาชน:
      </label>
      <textarea
        id="measure1_1"
        name="measure1_1"
        value={formData.measure1_1 || ''}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure1_2" className="block text-gray-700 font-medium mb-2">
        1.2 ส่งเสริมองค์กรลดมลพิษ Green Energy:
      </label>
      <textarea
        id="measure1_2"
        name="measure1_2"
        value={formData.measure1_2 || ''}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  </div>
);

export default Measure1;