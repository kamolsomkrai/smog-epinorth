// components/Measure3.tsx

import React from 'react';
import FormData from '../../interfaces/measure';

interface Props {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Measure3: React.FC<Props> = ({ formData, handleChange }) => (
  <div className="mt-6 grid grid-cols-2 gap-4">
    <div>
      <label htmlFor="measure3_pollution_clinic_open" className="block text-gray-700 font-medium mb-2">
        3.1 เปิดคลินิกมลพิษ:
      </label>
      <input
        type="number"
        id="measure3_pollution_clinic_open"
        name="measure3_pollution_clinic_open"
        value={formData.measure3_pollution_clinic_open || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure3_pollution_clinic_service" className="block text-gray-700 font-medium mb-2">
        3.2 ผู้รับบริการคลินิกมลพิษ:
      </label>
      <input
        type="number"
        id="measure3_pollution_clinic_service"
        name="measure3_pollution_clinic_service"
        value={formData.measure3_pollution_clinic_service || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure3_online_clinic_open" className="block text-gray-700 font-medium mb-2">
        3.3 เปิดบริการคลินิกมลพิษออนไลน์:
      </label>
      <input
        type="number"
        id="measure3_online_clinic_open"
        name="measure3_online_clinic_open"
        value={formData.measure3_online_clinic_open || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure3_online_clinic_service" className="block text-gray-700 font-medium mb-2">
        3.4 ผู้รับบริการคลินิกมลพิษออนไลน์:
      </label>
      <input
        type="number"
        id="measure3_online_clinic_service"
        name="measure3_online_clinic_service"
        value={formData.measure3_online_clinic_service || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure3_nursery_dust_free_open" className="block text-gray-700 font-medium mb-2">
        3.5 เปิดบริการห้องปลอดฝุ่น Nursery:
      </label>
      <input
        type="number"
        id="measure3_nursery_dust_free_open"
        name="measure3_nursery_dust_free_open"
        value={formData.measure3_nursery_dust_free_open || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure3_nursery_dust_free_service" className="block text-gray-700 font-medium mb-2">
        3.6 ผู้รับบริการห้องปลอดฝุ่น Nursery:
      </label>
      <input
        type="number"
        id="measure3_nursery_dust_free_service"
        name="measure3_nursery_dust_free_service"
        value={formData.measure3_nursery_dust_free_service || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure3_gov_dust_free_open" className="block text-gray-700 font-medium mb-2">
        3.7 เปิดบริการห้องปลอดฝุ่น รัฐ:
      </label>
      <input
        type="number"
        id="measure3_gov_dust_free_open"
        name="measure3_gov_dust_free_open"
        value={formData.measure3_gov_dust_free_open || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure3_gov_dust_free_service" className="block text-gray-700 font-medium mb-2">
        3.8 ผู้รับบริการห้องปลอดฝุ่น รัฐ:
      </label>
      <input
        type="number"
        id="measure3_gov_dust_free_service"
        name="measure3_gov_dust_free_service"
        value={formData.measure3_gov_dust_free_service || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure3_active_teams_3_doctors_total" className="block text-gray-700 font-medium mb-2">
        3.9 ทีม 3 หมอ (รวม):
      </label>
      <input
        type="number"
        id="measure3_active_teams_3_doctors_total"
        name="measure3_active_teams_3_doctors_total"
        value={formData.measure3_active_teams_3_doctors_total || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure3_active_teams_3_doctors_add" className="block text-gray-700 font-medium mb-2">
        3.10 ทีม 3 หมอ (เพิ่ม):
      </label>
      <input
        type="number"
        id="measure3_active_teams_3_doctors_add"
        name="measure3_active_teams_3_doctors_add"
        value={formData.measure3_active_teams_3_doctors_add || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure3_active_teams_mobile_total" className="block text-gray-700 font-medium mb-2">
        3.11 ทีมหน่วยแพทย์เคลื่อนที่ (รวม):
      </label>
      <input
        type="number"
        id="measure3_active_teams_mobile_total"
        name="measure3_active_teams_mobile_total"
        value={formData.measure3_active_teams_mobile_total || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure3_active_teams_mobile_add" className="block text-gray-700 font-medium mb-2">
        3.12 ทีมหน่วยแพทย์เคลื่อนที่ (เพิ่ม):
      </label>
      <input
        type="number"
        id="measure3_active_teams_mobile_add"
        name="measure3_active_teams_mobile_add"
        value={formData.measure3_active_teams_mobile_add || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure3_active_teams_citizens_total" className="block text-gray-700 font-medium mb-2">
        3.13 ทีมหน่วยดูแลประชาชน (รวม):
      </label>
      <input
        type="number"
        id="measure3_active_teams_citizens_total"
        name="measure3_active_teams_citizens_total"
        value={formData.measure3_active_teams_citizens_total || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure3_active_teams_citizens_add" className="block text-gray-700 font-medium mb-2">
        3.14 ทีมหน่วยดูแลประชาชน (เพิ่ม):
      </label>
      <input
        type="number"
        id="measure3_active_teams_citizens_add"
        name="measure3_active_teams_citizens_add"
        value={formData.measure3_active_teams_citizens_add || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure3_personal_protective_gear" className="block text-gray-700 font-medium mb-2">
        3.15 อุปกรณ์ป้องกันส่วนบุคคล:
      </label>
      <input
        type="number"
        id="measure3_personal_protective_gear"
        name="measure3_personal_protective_gear"
        value={formData.measure3_personal_protective_gear || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure3_elderly_N95_mask" className="block text-gray-700 font-medium mb-2">
        3.16 หน้ากาก N95 สำหรับผู้สูงอายุ:
      </label>
      <input
        type="number"
        id="measure3_elderly_N95_mask"
        name="measure3_elderly_N95_mask"
        value={formData.measure3_elderly_N95_mask || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure3_elderly_surgical_mask" className="block text-gray-700 font-medium mb-2">3.17 หน้ากากอนามัยสำหรับผู้สูงอายุ:</label>
      <input
        type="number"
        id="measure3_elderly_surgical_mask"
        name="measure3_elderly_surgical_mask"
        value={formData.measure3_elderly_surgical_mask || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure3_children_N95_mask" className="block text-gray-700 font-medium mb-2">3.18 หน้ากาก N95 สำหรับเด็กเล็ก:</label>
      <input
        type="number"
        id="measure3_children_N95_mask"
        name="measure3_children_N95_mask"
        value={formData.measure3_children_N95_mask || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure3_children_surgical_mask" className="block text-gray-700 font-medium mb-2">3.19 หน้ากากอนามัยสำหรับเด็กเล็ก:</label>
      <input
        type="number"
        id="measure3_children_surgical_mask"
        name="measure3_children_surgical_mask"
        value={formData.measure3_children_surgical_mask || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure3_pregnant_N95_mask" className="block text-gray-700 font-medium mb-2">3.20 หน้ากาก N95 สำหรับหญิงตั้งครรภ์:</label>
      <input
        type="number"
        id="measure3_pregnant_N95_mask"
        name="measure3_pregnant_N95_mask"
        value={formData.measure3_pregnant_N95_mask || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div>
      <label htmlFor="measure3_pregnant_surgical_mask" className="block text-gray-700 font-medium mb-2">3.21 หน้ากากอนามัยสำหรับหญิงตั้งครรภ์:</label>
      <input
        type="number"
        id="measure3_pregnant_surgical_mask"
        name="measure3_pregnant_surgical_mask"
        value={formData.measure3_pregnant_surgical_mask || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div>
      <label htmlFor="measure3_bedridden_N95_mask" className="block text-gray-700 font-medium mb-2">3.22 หน้ากาก N95 สำหรับติดเตียง:</label>
      <input
        type="number"
        id="measure3_bedridden_N95_mask"
        name="measure3_bedridden_N95_mask"
        value={formData.measure3_bedridden_N95_mask || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure3_bedridden_surgical_mask" className="block text-gray-700 font-medium mb-2">3.23 หน้ากากอนามัยสำหรับติดเตียง:</label>
      <input
        type="number"
        id="measure3_bedridden_surgical_mask"
        name="measure3_bedridden_surgical_mask"
        value={formData.measure3_bedridden_surgical_mask || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure3_disease_N95_mask" className="block text-gray-700 font-medium mb-2">3.24 หน้ากาก N95 สำหรับผู้มีโรคประจำตัว:</label>
      <input
        type="number"
        id="measure3_disease_N95_mask"
        name="measure3_disease_N95_mask"
        value={formData.measure3_disease_N95_mask || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure3_disease_surgical_mask" className="block text-gray-700 font-medium mb-2">3.25 หน้ากากอนามัยสำหรับผู้มีโรคประจำตัว:</label>
      <input
        type="number"
        id="measure3_disease_surgical_mask"
        name="measure3_disease_surgical_mask"
        value={formData.measure3_disease_surgical_mask || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure3_sky_doctor" className="block text-gray-700 font-medium mb-2">3.26 SKY doctor:</label>
      <input
        type="number"
        id="measure3_sky_doctor"
        name="measure3_sky_doctor"
        value={formData.measure3_sky_doctor || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure3_ambulance" className="block text-gray-700 font-medium mb-2">3.27 รถกู้ชีพ ALS:</label>
      <input
        type="number"
        id="measure3_ambulance"
        name="measure3_ambulance"
        value={formData.measure3_ambulance || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  </div>
);

export default Measure3;