"use client";

import React from 'react';
import { FormData } from '../../interfaces/measure';

interface Props {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Measure2: React.FC<Props> = ({ formData, handleChange }) => (
  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
    {/* 2.1 - เฝ้าระวังและแจ้งเตือนความเสี่ยงต่อสุขภาพ */}
    <div className="col-span-1 sm:col-span-2">
      <h3 className="text-lg font-semibold text-gray-800">2.1 เฝ้าระวังและแจ้งเตือนความเสี่ยงต่อสุขภาพ</h3>
    </div>

    <div className="col-span-1">
      <label htmlFor="risk_health_monitoring_1_1" className="block text-gray-700 font-medium mb-2">
        จัดทาสื่อ Info ประชาสัมพันธ์:
      </label>
      <input
        type="number"
        id="risk_health_monitoring_1_1"
        name="risk_health_monitoring_1_1"
        value={formData.risk_health_monitoring_1_1 || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div className="col-span-1">
      <label htmlFor="risk_health_monitoring_1_2" className="block text-gray-700 font-medium mb-2">
        แจ้งเตือนความเสี่ยงผ่านช่องทางต่าง ๆ:
      </label>
      <input
        type="number"
        id="risk_health_monitoring_1_2"
        name="risk_health_monitoring_1_2"
        value={formData.risk_health_monitoring_1_2 || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    {/* 2.2 - เฝ้าระวังผลกระทบต่อสุขภาพและพฤติกรรมสุขภาพ */}
    <div className="col-span-1 sm:col-span-2 mt-6">
      <h3 className="text-lg font-semibold text-gray-800">2.2 เฝ้าระวังผลกระทบต่อสุขภาพและพฤติกรรมสุขภาพ</h3>
    </div>

    <div className="col-span-1">
      <label htmlFor="child" className="block text-gray-700 font-medium mb-2">
        เด็กเล็ก:
      </label>
      <input
        type="number"
        id="child"
        name="child"
        value={formData.child || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div className="col-span-1">
      <label htmlFor="elderly" className="block text-gray-700 font-medium mb-2">
        ผู้สูงอายุ:
      </label>
      <input
        type="number"
        id="elderly"
        name="elderly"
        value={formData.elderly || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div className="col-span-1">
      <label htmlFor="pregnant" className="block text-gray-700 font-medium mb-2">
        หญิงตั้งครรภ์:
      </label>
      <input
        type="number"
        id="pregnant"
        name="pregnant"
        value={formData.pregnant || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div className="col-span-1">
      <label htmlFor="bedridden" className="block text-gray-700 font-medium mb-2">
        ติดเตียง:
      </label>
      <input
        type="number"
        id="bedridden"
        name="bedridden"
        value={formData.bedridden || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div className="col-span-1">
      <label htmlFor="asthma" className="block text-gray-700 font-medium mb-2">
        Asthma:
      </label>
      <input
        type="number"
        id="asthma"
        name="asthma"
        value={formData.asthma || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div className="col-span-1">
      <label htmlFor="copd" className="block text-gray-700 font-medium mb-2">
        COPD:
      </label>
      <input
        type="number"
        id="copd"
        name="copd"
        value={formData.copd || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div className="col-span-1">
      <label htmlFor="asthma_copd" className="block text-gray-700 font-medium mb-2">
        Asthma + COPD:
      </label>
      <input
        type="number"
        id="asthma_copd"
        name="asthma_copd"
        value={formData.asthma_copd || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    {/* 2.3 - การตรวจสุขภาพเจ้าหน้าที่/อาสาสมัคร */}
    <div className="col-span-1 sm:col-span-2 mt-6">
      <h3 className="text-lg font-semibold text-gray-800">2.3 การตรวจสุขภาพเจ้าหน้าที่/อาสาสมัคร</h3>
    </div>

    <div className="col-span-1">
      <label htmlFor="health_check_staff" className="block text-gray-700 font-medium mb-2">
        ตรวจสุขภาพเจ้าหน้าที่:
      </label>
      <input
        type="number"
        id="health_check_staff"
        name="health_check_staff"
        value={formData.health_check_staff || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div className="col-span-1">
      <label htmlFor="health_check_volunteer" className="block text-gray-700 font-medium mb-2">
        ตรวจสุขภาพอาสาสมัคร:
      </label>
      <input
        type="number"
        id="health_check_volunteer"
        name="health_check_volunteer"
        value={formData.health_check_volunteer || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  </div>
);

export default Measure2;
