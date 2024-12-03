// app/components/AddSupplyModal.tsx
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

interface AddSupplyModalProps {
  onClose: () => void;
}

const AddSupplyModal: React.FC<AddSupplyModalProps> = ({ onClose }) => {
  const [supplyList, setSupplyList] = useState<Supply[]>([]);
  const [selectedSupplyId, setSelectedSupplyId] = useState<number | "">("");
  const [name, setName] = useState<string>("");
  // const [description, setDescription] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [unit, setUnit] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    const fetchSupplyList = async () => {
      try {
        const response = await fetch("/api/supplylist");
        if (response.ok) {
          const data = await response.json();
          setSupplyList(data);
        } else {
          console.error("Failed to fetch supply list");
        }
      } catch (error) {
        console.error("Error fetching supply list:", error);
      }
    };

    fetchSupplyList();
  }, []);

  const handleSupplyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value ? parseInt(event.target.value, 10) : "";
    setSelectedSupplyId(selectedId);
    if (selectedId !== "") {
      const selectedSupply = supplyList.find((supply) => supply.id === selectedId);
      if (selectedSupply) {
        setName(selectedSupply.supplyname);
        setUnit(selectedSupply.unit);
        setCategory(selectedSupply.category);
      }
    } else {
      setName("");
      setUnit("");
      setCategory("");
    }
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(event.target.value, 10));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!name) {
      alert("กรุณาเลือกชื่อวัสดุ");
      return;
    }
    if (quantity <= 0) {
      alert("กรุณาใส่จำนวนที่ถูกต้อง");
      return;
    }

    try {
      const res = await fetch("/api/supplies", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name, // เปลี่ยนจาก 'name' เป็น 'supplyname' หาก Backend ต้องการ
          // description,
          quantity,
          unit,
          category
        }),
      });

      if (res.ok) {
        console.log("Supply added successfully");
        onClose();
      } else {
        const errorData = await res.json();
        console.error("Failed to add supply:", errorData.message);
        alert("เกิดข้อผิดพลาดในการเพิ่มวัสดุ: " + errorData.message);
      }
    } catch (error) {
      console.error("Error adding supply:", error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">เพิ่มวัสดุใหม่</h2>
        <form onSubmit={handleSubmit}>
          {/* ฟิลด์ชื่อเป็น dropdown */}
          <div className="mb-4">
            <label htmlFor="supply" className="block text-gray-700 mb-2">
              ชื่อวัสดุ:
            </label>
            <select
              id="supply"
              value={selectedSupplyId}
              onChange={handleSupplyChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">-- เลือกวัสดุ --</option>
              {supplyList.map((supply) => (
                <option key={supply.id} value={supply.id}>
                  {supply.supplyname}
                </option>
              ))}
            </select>
          </div>

          {/* ฟิลด์จำนวน */}
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700 mb-2">
              จำนวน:
            </label>
            <input
              type="number"
              id="quantity"
              className="w-full border rounded px-3 py-2"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              required
            />
          </div>

          {/* ปุ่มยกเลิกและบันทึก */}
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

export default AddSupplyModal;
