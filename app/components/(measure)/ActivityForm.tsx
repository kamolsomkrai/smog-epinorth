"use client";

import React, { useState } from 'react';
import { FormData } from '../../interfaces/measure'; // ตรวจสอบเส้นทางให้ถูกต้อง
import Measure1 from './Measure1';
import Measure2 from './Measure2';
import Measure3 from './Measure3';
import Measure4 from './Measure4';

const ActivityForm: React.FC = () => {
  const [measureType, setMeasureType] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    activityDate: '',
    measureType: 0,
    // Measures 1
    measure1_1: '',
    measure1_2: '',
    // Measures 2
    risk_health_monitoring_1_1: 0,
    risk_health_monitoring_1_2: 0,
    child: 0,
    elderly: 0,
    pregnant: 0,
    bedridden: 0,
    asthma: 0,
    copd: 0,
    asthma_copd: 0,
    health_check_staff: 0,
    health_check_volunteer: 0,
    // Measures 3
    pollution_clinic_open: 0,
    pollution_clinic_service: 0,
    online_clinic_open: 0,
    online_clinic_service: 0,
    nursery_dust_free_open: 0,
    nursery_dust_free_service: 0,
    gov_dust_free_open: 0,
    gov_dust_free_service: 0,
    active_teams_3_doctors_total: 0,
    active_teams_3_doctors_add: 0,
    active_teams_mobile_total: 0,
    active_teams_mobile_add: 0,
    active_teams_citizens_total: 0,
    active_teams_citizens_add: 0,
    // personal_protective_gear: 0,
    elderly_N95_mask: 0,
    elderly_surgical_mask: 0,
    children_N95_mask: 0,
    children_surgical_mask: 0,
    pregnant_N95_mask: 0,
    pregnant_surgical_mask: 0,
    bedridden_N95_mask: 0,
    bedridden_surgical_mask: 0,
    disease_N95_mask: 0,
    disease_surgical_mask: 0,
    sky_doctor: 0,
    ambulance: 0,
    // Measures 4
    eoc_open_date: '',
    eoc_close_date: '',
    law_enforcement_fine: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      // 1. ส่งข้อมูล Activities ไปยัง Next.js API Route
      const activityResponse = await fetch('/api/activity', { // แก้ไข route ให้ถูกต้อง
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          measure_type: formData.measureType, // ส่งเป็นตัวเลขโดยตรง
          activity_date: formData.activityDate,
          // provcode: formData.provcode, // ไม่จำเป็นเพราะจะถูกดึงจาก backend
        }),
      });

      if (activityResponse.ok) {
        const activityResult = await activityResponse.json();
        console.log('Activity submitted successfully!', activityResult);
        const activityId = activityResult.id; // สมมติว่า response มี id ของ Activity

        // 2. ส่งข้อมูล Measures ตาม measureType ไปยัง Next.js API Routes
        let measureResponse;
        switch (measureType) {
          case 1:
            measureResponse = await fetch('/api/measure1', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                activity_id: activityId,
                sub_measure_1_1: formData.measure1_1,
                sub_measure_1_2: formData.measure1_2,
              }),
            });
            break;
          case 2:
            measureResponse = await fetch('/api/measure2', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                activity_id: activityId,
                risk_health_monitoring_1_1: formData.risk_health_monitoring_1_1,
                risk_health_monitoring_1_2: formData.risk_health_monitoring_1_2,
                child: formData.child,
                elderly: formData.elderly,
                pregnant: formData.pregnant,
                bedridden: formData.bedridden,
                asthma: formData.asthma,
                copd: formData.copd,
                asthma_copd: formData.asthma_copd,
                health_check_staff: formData.health_check_staff,
                health_check_volunteer: formData.health_check_volunteer,
              }),
            });
            break;
          case 3:
            measureResponse = await fetch('/api/measure3', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                activity_id: activityId,
                pollution_clinic_open: formData.pollution_clinic_open,
                pollution_clinic_service: formData.pollution_clinic_service,
                online_clinic_open: formData.online_clinic_open,
                online_clinic_service: formData.online_clinic_service,
                nursery_dust_free_open: formData.nursery_dust_free_open,
                nursery_dust_free_service: formData.nursery_dust_free_service,
                gov_dust_free_open: formData.gov_dust_free_open,
                gov_dust_free_service: formData.gov_dust_free_service,
                active_teams_3_doctors_total: formData.active_teams_3_doctors_total,
                active_teams_3_doctors_add: formData.active_teams_3_doctors_add,
                active_teams_mobile_total: formData.active_teams_mobile_total,
                active_teams_mobile_add: formData.active_teams_mobile_add,
                active_teams_citizens_total: formData.active_teams_citizens_total,
                active_teams_citizens_add: formData.active_teams_citizens_add,
                // personal_protective_gear: formData.personal_protective_gear,
                elderly_N95_mask: formData.elderly_N95_mask,
                elderly_surgical_mask: formData.elderly_surgical_mask,
                children_N95_mask: formData.children_N95_mask,
                children_surgical_mask: formData.children_surgical_mask,
                pregnant_N95_mask: formData.pregnant_N95_mask,
                pregnant_surgical_mask: formData.pregnant_surgical_mask,
                bedridden_N95_mask: formData.bedridden_N95_mask,
                bedridden_surgical_mask: formData.bedridden_surgical_mask,
                disease_N95_mask: formData.disease_N95_mask,
                disease_surgical_mask: formData.disease_surgical_mask,
                sky_doctor: formData.sky_doctor,
                ambulance: formData.ambulance,
              }),
            });
            break;
          case 4:
            measureResponse = await fetch('/api/measure4', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                activity_id: activityId,
                eoc_open_date: formData.eoc_open_date,
                eoc_close_date: formData.eoc_close_date,
                law_enforcement_fine: formData.law_enforcement_fine,
              }),
            });
            break;
          default:
            break;
        }

        if (measureResponse && measureResponse.ok) {
          console.log(`Measure${measureType} submitted successfully!`);
        } else if (measureResponse) {
          const measureErrorData = await measureResponse.json();
          console.error(`Failed to submit Measure${measureType}:`, measureErrorData);
        }

        // รีเซ็ตฟอร์ม
        setMeasureType(0);
        setFormData({
          activityDate: '',
          measureType: 0,
          measure1_1: '',
          measure1_2: '',
          risk_health_monitoring_1_1: 0,
          risk_health_monitoring_1_2: 0,
          child: 0,
          elderly: 0,
          pregnant: 0,
          bedridden: 0,
          asthma: 0,
          copd: 0,
          asthma_copd: 0,
          health_check_staff: 0,
          health_check_volunteer: 0,
          pollution_clinic_open: 0,
          pollution_clinic_service: 0,
          online_clinic_open: 0,
          online_clinic_service: 0,
          nursery_dust_free_open: 0,
          nursery_dust_free_service: 0,
          gov_dust_free_open: 0,
          gov_dust_free_service: 0,
          active_teams_3_doctors_total: 0,
          active_teams_3_doctors_add: 0,
          active_teams_mobile_total: 0,
          active_teams_mobile_add: 0,
          active_teams_citizens_total: 0,
          active_teams_citizens_add: 0,
          personal_protective_gear: 0,
          elderly_N95_mask: 0,
          elderly_surgical_mask: 0,
          children_N95_mask: 0,
          children_surgical_mask: 0,
          pregnant_N95_mask: 0,
          pregnant_surgical_mask: 0,
          bedridden_N95_mask: 0,
          bedridden_surgical_mask: 0,
          disease_N95_mask: 0,
          disease_surgical_mask: 0,
          sky_doctor: 0,
          ambulance: 0,
          eoc_open_date: '',
          eoc_close_date: '',
          law_enforcement_fine: 0,
        });
      } else {
        const errorData = await activityResponse.json();
        console.error('Failed to submit activity:', errorData);
      }
    } catch (error) {
      console.error('Error submitting activity:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    console.log("Name:", name, "Value:", value, "Type:", type); // ตรวจสอบค่า

    const parsedValue = type === 'number' ? Number(value) : value; // บังคับให้เป็นตัวเลข

    setFormData({ ...formData, [name]: parsedValue });
    console.log("formData.measureType:", formData.measureType); // ตรวจสอบค่าหลังอัพเดต
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">ข้อมูลการดำเนินงานด้านการแพทย์และสาธารณสุข</h1>
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">กรณีหมอกควันและฝุ่นละอองขนาดเล็ก เขตสุขภาพที่ 1</h1>

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
              required
            />
          </div>

          <div>
            <label htmlFor="measureType" className="block text-gray-700 font-medium mb-2">
              มาตรการ:
            </label>
            <select
              id="measureType"
              name="measureType"
              value={formData.measureType}
              onChange={(e) => {
                const selectedValue = Number(e.target.value);
                setMeasureType(selectedValue);
                setFormData({ ...formData, measureType: selectedValue });
              }}
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

          {formData.measureType === 1 && (
            <Measure1 formData={formData} handleChange={handleChange} />
          )}
          {formData.measureType === 2 && (
            <Measure2 formData={formData} handleChange={handleChange} />
          )}
          {formData.measureType === 3 && (
            <Measure3 formData={formData} handleChange={handleChange} />
          )}
          {formData.measureType === 4 && (
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
