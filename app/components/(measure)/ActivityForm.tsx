// app/components/ActivityForm.tsx
"use client";

import React, { useState } from 'react';
import { FormData } from '../../interfaces/measure'; // ตรวจสอบเส้นทางให้ถูกต้อง
import Measure1 from './Measure1';
import Measure2 from './Measure2';
import Measure3 from './Measure3';
import Measure4 from './Measure4';
import { toast } from 'react-toastify'; // นำเข้า toast

const measureApiMap: Record<number, string> = {
  1: '/api/measure1',
  2: '/api/measure2',
  3: '/api/measure3',
  4: '/api/measure4',
};

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
    pop_N95_mask: 0,
    pop_surgical_mask: 0,
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? Number(value) : value;
    setFormData(prev => ({ ...prev, [name]: parsedValue }));
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (!formData.activityDate) {
      newErrors.push('กรุณาเลือกวันที่ดำเนินกิจกรรม.');
    }
    if (formData.measureType === 0) {
      newErrors.push('กรุณาเลือกประเภทมาตรการ.');
    }

    // เพิ่มการตรวจสอบเพิ่มเติมตาม measureType หากจำเป็น
    if (measureType === 1) {
      if (!formData.measure1_1 && !formData.measure1_2) {
        newErrors.push('กรุณากรอกอย่างน้อยหนึ่งข้อมูลในมาตรการที่ 1.');
      }
    }
    // เช่นเดียวกันสำหรับ measureType อื่น ๆ...

    if (newErrors.length > 0) {
      newErrors.forEach(error => toast.error(error)); // แสดงข้อผิดพลาดด้วย toast
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      toast.info('กำลังบันทึกข้อมูล...', { autoClose: 2000 });

      // ส่งข้อมูล Activity
      const activityResponse = await fetch('/api/activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          measure_type: formData.measureType,
          activity_date: formData.activityDate,
        }),
      });

      if (!activityResponse.ok) {
        const errorData = await activityResponse.json();
        console.error('Failed to submit activity:', errorData);
        toast.error('การบันทึกกิจกรรมล้มเหลว');
        return;
      }

      const { id: activityId } = await activityResponse.json();
      console.log('Activity submitted successfully!', activityId);
      toast.success('กิจกรรมถูกบันทึกสำเร็จ!');

      // เตรียมข้อมูล Measures
      const measurePayload: Record<string, any> = { activity_id: activityId };
      switch (measureType) {
        case 1:
          measurePayload.sub_measure_1_1 = formData.measure1_1;
          measurePayload.sub_measure_1_2 = formData.measure1_2;
          break;
        case 2:
          measurePayload.risk_health_monitoring_1_1 = formData.risk_health_monitoring_1_1;
          measurePayload.risk_health_monitoring_1_2 = formData.risk_health_monitoring_1_2;
          measurePayload.child = formData.child;
          measurePayload.elderly = formData.elderly;
          measurePayload.pregnant = formData.pregnant;
          measurePayload.bedridden = formData.bedridden;
          measurePayload.asthma = formData.asthma;
          measurePayload.copd = formData.copd;
          measurePayload.asthma_copd = formData.asthma_copd;
          measurePayload.health_check_staff = formData.health_check_staff;
          measurePayload.health_check_volunteer = formData.health_check_volunteer;
          break;
        case 3:
          measurePayload.pollution_clinic_open = formData.pollution_clinic_open;
          measurePayload.pollution_clinic_service = formData.pollution_clinic_service;
          measurePayload.online_clinic_open = formData.online_clinic_open;
          measurePayload.online_clinic_service = formData.online_clinic_service;
          measurePayload.nursery_dust_free_open = formData.nursery_dust_free_open;
          measurePayload.nursery_dust_free_service = formData.nursery_dust_free_service;
          measurePayload.gov_dust_free_open = formData.gov_dust_free_open;
          measurePayload.gov_dust_free_service = formData.gov_dust_free_service;
          measurePayload.active_teams_3_doctors_total = formData.active_teams_3_doctors_total;
          measurePayload.active_teams_3_doctors_add = formData.active_teams_3_doctors_add;
          measurePayload.active_teams_mobile_total = formData.active_teams_mobile_total;
          measurePayload.active_teams_mobile_add = formData.active_teams_mobile_add;
          measurePayload.active_teams_citizens_total = formData.active_teams_citizens_total;
          measurePayload.active_teams_citizens_add = formData.active_teams_citizens_add;
          measurePayload.pop_N95_mask = formData.pop_N95_mask;
          measurePayload.pop_surgical_mask = formData.pop_surgical_mask;
          measurePayload.elderly_N95_mask = formData.elderly_N95_mask;
          measurePayload.elderly_surgical_mask = formData.elderly_surgical_mask;
          measurePayload.children_N95_mask = formData.children_N95_mask;
          measurePayload.children_surgical_mask = formData.children_surgical_mask;
          measurePayload.pregnant_N95_mask = formData.pregnant_N95_mask;
          measurePayload.pregnant_surgical_mask = formData.pregnant_surgical_mask;
          measurePayload.bedridden_N95_mask = formData.bedridden_N95_mask;
          measurePayload.bedridden_surgical_mask = formData.bedridden_surgical_mask;
          measurePayload.disease_N95_mask = formData.disease_N95_mask;
          measurePayload.disease_surgical_mask = formData.disease_surgical_mask;
          measurePayload.sky_doctor = formData.sky_doctor;
          measurePayload.ambulance = formData.ambulance;
          break;
        case 4:
          measurePayload.eoc_open_date = formData.eoc_open_date;
          measurePayload.eoc_close_date = formData.eoc_close_date;
          measurePayload.law_enforcement_fine = formData.law_enforcement_fine;
          break;
        default:
          console.warn('Unknown measure type');
          return;
      }

      // ส่งข้อมูล Measures
      const measureResponse = await fetch(measureApiMap[measureType], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(measurePayload),
      });

      if (!measureResponse.ok) {
        const measureErrorData = await measureResponse.json();
        console.error(`Failed to submit Measure${measureType}:`, measureErrorData);
        toast.error(`การบันทึก มาตรการที่ ${measureType} ล้มเหลว`);
        return;
      }

      console.log(`Measure${measureType} submitted successfully!`);
      toast.success(`มาตรการที่ ${measureType} ถูกบันทึกสำเร็จ!`);

      // รีเซ็ตฟอร์ม
      setMeasureType(0);
      setFormData({
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
        pop_N95_mask: 0,
        pop_surgical_mask: 0,
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
    } catch (error) {
      console.error('Error submitting activity:', error);
      toast.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          ข้อมูลการดำเนินงานด้านการแพทย์และสาธารณสุข
        </h1>
        <h2 className="text-xl font-semibold mb-6 text-gray-700 text-center">
          กรณีหมอกควันและฝุ่นละอองขนาดเล็ก เขตสุขภาพที่ 1
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Activity Date */}
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

          {/* Measure Type */}
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
                setFormData(prev => ({ ...prev, measureType: selectedValue }));
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

          {/* Conditional Measure Components */}
          {measureType === 1 && (
            <Measure1 formData={formData} handleChange={handleChange} />
          )}
          {measureType === 2 && (
            <Measure2 formData={formData} handleChange={handleChange} />
          )}
          {measureType === 3 && (
            <Measure3 formData={formData} handleChange={handleChange} />
          )}
          {measureType === 4 && (
            <Measure4 formData={formData} handleChange={handleChange} />
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md px-4 py-2 transition-colors duration-200"
          >
            บันทึก
          </button>
        </form>
      </div>
    </div>
  );
};

export default ActivityForm;
