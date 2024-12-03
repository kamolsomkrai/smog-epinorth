// app/components/DeleteSupplyModal.tsx
"use client";

import React from "react";

interface Supply {
  id: number;
  name: string;
}

interface DeleteSupplyModalProps {
  supply: Supply;
  onClose: () => void;
}

const DeleteSupplyModal: React.FC<DeleteSupplyModalProps> = ({ supply, onClose }) => {
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/supplies/${supply.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        onClose();
      } else {
        alert("เกิดข้อผิดพลาดในการลบข้อมูล");
      }
    } catch (error) {
      console.error("Error deleting supply:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">ลบวัสดุ</h2>
        <p className="mb-4">
          คุณแน่ใจหรือว่าต้องการลบวัสดุ {supply.name} ?
        </p>
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            ยกเลิก
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleDelete}
          >
            ลบ
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSupplyModal;
