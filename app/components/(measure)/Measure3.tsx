// components/Measure3.tsx
"use client";
import React from 'react';
import { FormData } from '../../interfaces/measure';

interface Props {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Measure3: React.FC<Props> = ({ formData, handleChange }) => (
  <div className="mt-6 space-y-8">
    {/* 3.1 คลินิกมลพิษ */}
    <fieldset className="border border-gray-300 p-6 rounded-lg">
      <legend className="text-lg font-semibold text-gray-800">3.1 คลินิกมลพิษ</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
        <div>
          <label htmlFor="pollution_clinic_open" className="block text-gray-700 font-medium mb-2">
            เปิดบริการสะสม (แห่ง):
          </label>
          <input
            type="number"
            id="pollution_clinic_open"
            name="pollution_clinic_open"
            value={formData.pollution_clinic_open || 0}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="pollution_clinic_service" className="block text-gray-700 font-medium mb-2">
            ผู้รับบริการสะสม (ราย):
          </label>
          <input
            type="number"
            id="pollution_clinic_service"
            name="pollution_clinic_service"
            value={formData.pollution_clinic_service || 0}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </fieldset>

    {/* 3.2 คลินิกมลพิษออนไลน์ */}
    <fieldset className="border border-gray-300 p-6 rounded-lg">
      <legend className="text-lg font-semibold text-gray-800">3.2 คลินิกมลพิษออนไลน์</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
        <div>
          <label htmlFor="online_clinic_open" className="block text-gray-700 font-medium mb-2">
            เปิดบริการสะสม (แห่ง):
          </label>
          <input
            type="number"
            id="online_clinic_open"
            name="online_clinic_open"
            value={formData.online_clinic_open || 0}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="online_clinic_service" className="block text-gray-700 font-medium mb-2">
            ผู้รับบริการสะสม (ราย):
          </label>
          <input
            type="number"
            id="online_clinic_service"
            name="online_clinic_service"
            value={formData.online_clinic_service || 0}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </fieldset>

    {/* 3.3 จัดเตรียมห้องปลอดฝุ่น */}
    <fieldset className="border border-gray-300 p-6 rounded-lg">
      <legend className="text-lg font-semibold text-gray-800">3.3 จัดเตรียมห้องปลอดฝุ่น</legend>

      {/* 3.3.1 ศูนย์เด็กเล็ก */}
      <div className="mt-4">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.3.1 ศูนย์เด็กเล็ก</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="nursery_dust_free_open" className="block text-gray-700 font-medium mb-2">
              เปิดบริการสะสม (แห่ง):
            </label>
            <input
              type="number"
              id="nursery_dust_free_open"
              name="nursery_dust_free_open"
              value={formData.nursery_dust_free_open || 0}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="nursery_dust_free_service" className="block text-gray-700 font-medium mb-2">
              ผู้รับบริการสะสม (ราย):
            </label>
            <input
              type="number"
              id="nursery_dust_free_service"
              name="nursery_dust_free_service"
              value={formData.nursery_dust_free_service || 0}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* 3.3.2 หน่วยงานราชการ */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.3.2 หน่วยงานราชการ</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="gov_dust_free_open" className="block text-gray-700 font-medium mb-2">
              เปิดบริการสะสม (แห่ง):
            </label>
            <input
              type="number"
              id="gov_dust_free_open"
              name="gov_dust_free_open"
              value={formData.gov_dust_free_open || 0}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="gov_dust_free_service" className="block text-gray-700 font-medium mb-2">
              ผู้รับบริการสะสม (ราย):
            </label>
            <input
              type="number"
              id="gov_dust_free_service"
              name="gov_dust_free_service"
              value={formData.gov_dust_free_service || 0}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </fieldset>

    {/* 3.4 จัดระบบบริการเชิงรุก เพื่อดูแลประชาชน */}
    <fieldset className="border border-gray-300 p-6 rounded-lg">
      <legend className="text-lg font-semibold text-gray-800">3.4 จัดระบบบริการเชิงรุก เพื่อดูแลประชาชน</legend>

      {/* 3.4.1 ทีม 3 หมอ */}
      <div className="mt-4">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.4.1 ทีม 3 หมอ</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="active_teams_3_doctors_total" className="block text-gray-700 font-medium mb-2">
              ทีมสะสม (ทีม):
            </label>
            <input
              type="number"
              id="active_teams_3_doctors_total"
              name="active_teams_3_doctors_total"
              value={formData.active_teams_3_doctors_total || 0}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="active_teams_3_doctors_add" className="block text-gray-700 font-medium mb-2">
              ทีมจัดตั้งเพิ่ม (ทีม):
            </label>
            <input
              type="number"
              id="active_teams_3_doctors_add"
              name="active_teams_3_doctors_add"
              value={formData.active_teams_3_doctors_add || 0}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* 3.4.2 ทีมหน่วยแพทย์เคลื่อนที่ */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.4.2 ทีมหน่วยแพทย์เคลื่อนที่</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="active_teams_mobile_total" className="block text-gray-700 font-medium mb-2">
              ทีมสะสม (ทีม):
            </label>
            <input
              type="number"
              id="active_teams_mobile_total"
              name="active_teams_mobile_total"
              value={formData.active_teams_mobile_total || 0}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="active_teams_mobile_add" className="block text-gray-700 font-medium mb-2">
              ทีมจัดตั้งเพิ่ม (ทีม):
            </label>
            <input
              type="number"
              id="active_teams_mobile_add"
              name="active_teams_mobile_add"
              value={formData.active_teams_mobile_add || 0}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* 3.4.3 ทีม หน่วยดูแลประชาชน */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.4.3 ทีม หน่วยดูแลประชาชน</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="active_teams_citizens_total" className="block text-gray-700 font-medium mb-2">
              ทีมสะสม (ทีม):
            </label>
            <input
              type="number"
              id="active_teams_citizens_total"
              name="active_teams_citizens_total"
              value={formData.active_teams_citizens_total || 0}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="active_teams_citizens_add" className="block text-gray-700 font-medium mb-2">
              ทีมจัดตั้งเพิ่ม (ทีม):
            </label>
            <input
              type="number"
              id="active_teams_citizens_add"
              name="active_teams_citizens_add"
              value={formData.active_teams_citizens_add || 0}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </fieldset>

    {/* 3.5 สนับสนุนอุปกรณ์ป้องกันส่วนบุคคลแก่กลุ่มเสี่ยง */}
    <fieldset className="border border-gray-300 p-6 rounded-lg">
      <legend className="text-lg font-semibold text-gray-800">3.5 สนับสนุนอุปกรณ์ป้องกันส่วนบุคคลแก่กลุ่มเสี่ยง</legend>

      {/* ประชาชน (สะสม) */}
      <div className="mt-4">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.5.1 ประชาชน (สะสม)</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="pop_N95_mask" className="block text-gray-700 font-medium mb-2">
              N95 Mask (ชิ้น):
            </label>
            <input
              type="number"
              id="pop_N95_mask"
              name="pop_N95_mask"
              value={formData.pop_N95_mask || 0}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="pop_surgical_mask" className="block text-gray-700 font-medium mb-2">
              Surgical Mask (ชิ้น):
            </label>
            <input
              type="number"
              id="pop_surgical_mask"
              name="pop_surgical_mask"
              value={formData.pop_surgical_mask || 0}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* เด็กเล็ก (สะสม) */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.5.2 เด็กเล็ก (สะสม)</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="children_N95_mask" className="block text-gray-700 font-medium mb-2">
              N95 Mask (ชิ้น):
            </label>
            <input
              type="number"
              id="children_N95_mask"
              name="children_N95_mask"
              value={formData.children_N95_mask || 0}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="children_surgical_mask" className="block text-gray-700 font-medium mb-2">
              Surgical Mask (ชิ้น):
            </label>
            <input
              type="number"
              id="children_surgical_mask"
              name="children_surgical_mask"
              value={formData.children_surgical_mask || 0}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* ผู้สูงอายุ (สะสม) */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.5.3 ผู้สูงอายุ (สะสม)</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="elderly_N95_mask" className="block text-gray-700 font-medium mb-2">
              N95 Mask (ชิ้น):
            </label>
            <input
              type="number"
              id="elderly_N95_mask"
              name="elderly_N95_mask"
              value={formData.elderly_N95_mask || 0}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="elderly_surgical_mask" className="block text-gray-700 font-medium mb-2">
              Surgical Mask (ชิ้น):
            </label>
            <input
              type="number"
              id="elderly_surgical_mask"
              name="elderly_surgical_mask"
              value={formData.elderly_surgical_mask || 0}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* หญิงตั้งครรภ์ (สะสม) */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.5.4 หญิงตั้งครรภ์ (สะสม)</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="pregnant_N95_mask" className="block text-gray-700 font-medium mb-2">
              N95 Mask (ชิ้น):
            </label>
            <input
              type="number"
              id="pregnant_N95_mask"
              name="pregnant_N95_mask"
              value={formData.pregnant_N95_mask || 0}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="pregnant_surgical_mask" className="block text-gray-700 font-medium mb-2">
              Surgical Mask (ชิ้น):
            </label>
            <input
              type="number"
              id="pregnant_surgical_mask"
              name="pregnant_surgical_mask"
              value={formData.pregnant_surgical_mask || 0}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* ผู้ป่วยติดเตียง (สะสม) */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.5.5 ผู้ป่วยติดเตียง (สะสม)</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="bedridden_N95_mask" className="block text-gray-700 font-medium mb-2">
              N95 Mask (ชิ้น):
            </label>
            <input
              type="number"
              id="bedridden_N95_mask"
              name="bedridden_N95_mask"
              value={formData.bedridden_N95_mask || 0}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="bedridden_surgical_mask" className="block text-gray-700 font-medium mb-2">
              Surgical Mask (ชิ้น):
            </label>
            <input
              type="number"
              id="bedridden_surgical_mask"
              name="bedridden_surgical_mask"
              value={formData.bedridden_surgical_mask || 0}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* ผู้มีโรคประจำตัว (สะสม) */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">3.5.6 ผู้มีโรคประจำตัว (สะสม)</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="disease_N95_mask" className="block text-gray-700 font-medium mb-2">
              N95 Mask (ชิ้น):
            </label>
            <input
              type="number"
              id="disease_N95_mask"
              name="disease_N95_mask"
              value={formData.disease_N95_mask || 0}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="disease_surgical_mask" className="block text-gray-700 font-medium mb-2">
              Surgical Mask (ชิ้น):
            </label>
            <input
              type="number"
              id="disease_surgical_mask"
              name="disease_surgical_mask"
              value={formData.disease_surgical_mask || 0}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </fieldset>

    {/* 3.6 ระบบรักษาส่งต่อผู้ป่วย */}
    <fieldset className="border border-gray-300 p-6 rounded-lg">
      <legend className="text-lg font-semibold text-gray-800">3.6 ระบบรักษาส่งต่อผู้ป่วย</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
        <div>
          <label htmlFor="sky_doctor" className="block text-gray-700 font-medium mb-2">
            SKY doctor (ทีม):
          </label>
          <input
            type="number"
            id="sky_doctor"
            name="sky_doctor"
            value={formData.sky_doctor || 0}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="ambulance" className="block text-gray-700 font-medium mb-2">
            ทีมกู้ชีพ ALS (ทีม):
          </label>
          <input
            type="number"
            id="ambulance"
            name="ambulance"
            value={formData.ambulance || 0}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </fieldset>
  </div>
);

export default Measure3;
