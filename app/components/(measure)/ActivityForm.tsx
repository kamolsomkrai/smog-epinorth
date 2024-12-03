// app/activity/page.tsx
"use client";

import React, { useState } from 'react';
import FormData from '../../interfaces/measure'
import Measure1 from './Measure1';
import Measure2 from './Measure2';
import Measure3 from './Measure3';
import Measure4 from './Measure4';



const ActivityForm: React.FC = () => {
  const [measureType, setMeasureType] = useState('');
  const [formData, setFormData] = useState<FormData>({
    hospcode: '',
    activityDate: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ measureType, ...formData }),
      });

      if (response.ok) {
        console.log('Activity submitted successfully!');
        setMeasureType('');
        setFormData({ hospcode: '', activityDate: '' });
      } else {
        console.error('Failed to submit activity:', response.status);
      }
    } catch (error) {
      console.error('Error submitting activity:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Parse to number if the input type is number
    const parsedValue = e.target.type === 'number' ? parseInt(value, 10) : value;
    setFormData({ ...formData, [name]: parsedValue });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">แบบฟอร์มกิจกรรม</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
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
            />
          </div>

          <div>
            <label htmlFor="measureType" className="block text-gray-700 font-medium mb-2">
              มาตรการ:
            </label>
            <select
              id="measureType"
              value={measureType}
              onChange={(e) => setMeasureType(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">เลือกมาตรการ</option>
              <option value="1">มาตรการที่ 1</option>
              <option value="2">มาตรการที่ 2</option>
              <option value="3">มาตรการที่ 3</option>
              <option value="4">มาตรการที่ 4</option>
            </select>
          </div>
          {measureType === '1' && (

            <Measure1 formData={formData} handleChange={handleChange} />

          )}
          {measureType === '2' && (

            <Measure2 formData={formData} handleChange={handleChange} />

          )}
          {measureType === '3' && (

            <Measure3 formData={formData} handleChange={handleChange} />

          )}
          {measureType === '4' && (

            <Measure4 formData={formData} handleChange={handleChange} />

          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md px-4 py-2 transition-colors duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ActivityForm;