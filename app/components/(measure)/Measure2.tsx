import React from 'react';
import FormData from '../../interfaces/measure';

interface Props {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Measure2: React.FC<Props> = ({ formData, handleChange }) => (
  <div className="mt-6 grid grid-cols-2 gap-4">
    <div>
      <label htmlFor="measure2_1_1" className="block text-gray-700 font-medium mb-2">
        2.1.1 จัดทาสื่อ Info ประชาสัมพันธ์:
      </label>
      <input
        type="number"
        id="measure2_1_1"
        name="measure2_1_1"
        value={formData.measure2_1_1 || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure2_1_2" className="block text-gray-700 font-medium mb-2">
        2.1.2 แจ้งเตือนความเสี่ยงผ่านช่องทางต่าง ๆ:
      </label>
      <input
        type="number"
        id="measure2_1_2"
        name="measure2_1_2"
        value={formData.measure2_1_2 || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure2_child" className="block text-gray-700 font-medium mb-2">
        เด็กเล็ก:
      </label>
      <input
        type="number"
        id="measure2_child"
        name="measure2_child"
        value={formData.measure2_child || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure2_elderly" className="block text-gray-700 font-medium mb-2">
        ผู้สูงอายุ:
      </label>
      <input
        type="number"
        id="measure2_elderly"
        name="measure2_elderly"
        value={formData.measure2_elderly || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure2_pregnant" className="block text-gray-700 font-medium mb-2">
        หญิงตั้งครรภ์:
      </label>
      <input
        type="number"
        id="measure2_pregnant"
        name="measure2_pregnant"
        value={formData.measure2_pregnant || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure2_bedridden" className="block text-gray-700 font-medium mb-2">
        ติดเตียง:
      </label>
      <input
        type="number"
        id="measure2_bedridden"
        name="measure2_bedridden"
        value={formData.measure2_bedridden || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure2_asthma" className="block text-gray-700 font-medium mb-2">
        Asthma:
      </label>
      <input
        type="number"
        id="measure2_asthma"
        name="measure2_asthma"
        value={formData.measure2_asthma || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure2_copd" className="block text-gray-700 font-medium mb-2">
        COPD:
      </label>
      <input
        type="number"
        id="measure2_copd"
        name="measure2_copd"
        value={formData.measure2_copd || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure2_asthma_copd" className="block text-gray-700 font-medium mb-2">
        Asthma + COPD:
      </label>
      <input
        type="number"
        id="measure2_asthma_copd"
        name="measure2_asthma_copd"
        value={formData.measure2_asthma_copd || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure2_health_check_staff" className="block text-gray-700 font-medium mb-2">
        ตรวจสุขภาพเจ้าหน้าที่:
      </label>
      <input
        type="number"
        id="measure2_health_check_staff"
        name="measure2_health_check_staff"
        value={formData.measure2_health_check_staff || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="measure2_health_check_volunteer" className="block text-gray-700 font-medium mb-2">
        ตรวจสุขภาพอาสาสมัคร:
      </label>
      <input
        type="number"
        id="measure2_health_check_volunteer"
        name="measure2_health_check_volunteer"
        value={formData.measure2_health_check_volunteer || 0}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  </div>
);

export default Measure2;