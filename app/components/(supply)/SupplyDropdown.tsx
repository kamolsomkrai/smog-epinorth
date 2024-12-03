// app/components/SupplyDropdown.tsx
"use client";

import React, { useState, useEffect } from "react";

interface Supply {
  id: number;
  supplyname: string;
  unit: string;
  category: string;
  created_at: string;
  updated_at: string;
}

interface SupplyDropdownProps {
  onSelect: (supplyName: string) => void;
}

const SupplyDropdown: React.FC<SupplyDropdownProps> = ({ onSelect }) => {
  const [supplies, setSupplies] = useState<Supply[]>([]);
  const [selectedSupply, setSelectedSupply] = useState<string>("");

  useEffect(() => {
    const fetchSupplies = async () => {
      try {
        const response = await fetch("/api/supplylist");
        if (response.ok) {
          const data = await response.json();
          setSupplies(data.supplies || data); // ปรับให้ตรงกับโครงสร้างข้อมูลที่ได้รับ
        } else {
          console.error("Failed to fetch supplies");
        }
      } catch (error) {
        console.error("Error fetching supplies:", error);
      }
    };

    fetchSupplies();
  }, []);

  const handleSupplyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSupply(event.target.value);
    onSelect(event.target.value); // ส่งค่าที่เลือกไปยัง parent
  };

  return (
    <div>
      <label htmlFor="supply" className="block text-gray-700 mb-2">
        เลือกวัสดุ:
      </label>
      <select
        id="supply"
        value={selectedSupply}
        onChange={handleSupplyChange}
        className="w-full border rounded px-3 py-2"
      >
        <option value="">-- เลือกวัสดุ --</option>
        {supplies.map((supply) => (
          <option key={supply.id} value={supply.supplyname}>
            {supply.supplyname}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SupplyDropdown;
