// app/components/EditSupplyModal.tsx
"use client";

import React, { useState } from "react";

interface Supply {
  id: number;
  name: string;
  description: string;
  quantity: number;
  unit: string;
  category: string;
}

interface EditSupplyModalProps {
  supply: Supply;
  onClose: () => void;
}

const EditSupplyModal: React.FC<EditSupplyModalProps> = ({ supply, onClose }) => {
  const [name, setName] = useState(supply.name);
  // const [description, setDescription] = useState(supply.description);
  const [quantity, setQuantity] = useState<number>(supply.quantity);
  const [unit, setUnit] = useState(supply.unit);
  // const [category, setCategory] = useState(supply.category);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const id = supply.id
      const res = await fetch(`/api/supplies/${supply.id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name, quantity, unit }),
      });

      if (res.ok) {
        onClose();
      } else {
        alert("เกิดข้อผิดพลาดในการแก้ไขข้อมูล");
      }
    } catch (error) {
      console.error("Error editing supply:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">แก้ไขวัสดุ</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">ชื่อ</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700">จำนวน</label>
              <input
                type="number"
                className="w-full border rounded px-3 py-2"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700">หน่วย</label>
              <input
                type="text" disabled
                className="w-full border rounded px-3 py-2"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              บันทึก
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSupplyModal;
