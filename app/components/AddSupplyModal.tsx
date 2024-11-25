// app/components/AddSupplyModal.tsx
"use client";

import React, { useState } from "react";

interface AddSupplyModalProps {
  onClose: () => void;
}

const AddSupplyModal: React.FC<AddSupplyModalProps> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [unit, setUnit] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/supplies", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, quantity, unit }),
      });

      if (res.ok) {
        onClose();
      } else {
        alert("เกิดข้อผิดพลาดในการเพิ่มข้อมูล");
      }
    } catch (error) {
      console.error("Error adding supply:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">เพิ่มวัสดุใหม่</h2>
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
          <div className="mb-4">
            <label className="block text-gray-700">รายละเอียด</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
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
                type="text"
                className="w-full border rounded px-3 py-2"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSupplyModal;
