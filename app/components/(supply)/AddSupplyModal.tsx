// app/components/AddSupplyModal.tsx
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "react-toastify"; // Import toast
import { XMarkIcon } from "@heroicons/react/24/solid"; // Import from v2
// ถ้าใช้ไอคอนอื่นๆ สามารถนำเข้าได้ตามต้องการ เช่น:
// import { SpinnerIcon } from "@heroicons/react/24/outline";

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
  const [quantity, setQuantity] = useState<string>(""); // เปลี่ยนเป็น string
  const [unit, setUnit] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // สถานะการโหลดสำหรับการส่งฟอร์ม
  const [fetching, setFetching] = useState<boolean>(false); // สถานะการโหลดสำหรับการดึงรายการวัสดุ
  const [errors, setErrors] = useState<{ name?: string; quantity?: string }>({});

  const modalRef = useRef<HTMLDivElement>(null);

  // ดึงรายการวัสดุเมื่อ component mount
  useEffect(() => {
    const fetchSupplyList = async () => {
      setFetching(true);
      try {
        const response = await fetch("/api/supplylist");
        if (response.ok) {
          const data = await response.json();
          setSupplyList(data);
        } else {
          console.error("Failed to fetch supply list");
          toast.error("ไม่สามารถดึงรายการวัสดุได้"); // "Failed to fetch supply list" in Thai
        }
      } catch (error) {
        console.error("Error fetching supply list:", error);
        toast.error("เกิดข้อผิดพลาดในการดึงรายการวัสดุ"); // "Error fetching supply list" in Thai
      } finally {
        setFetching(false);
      }
    };

    fetchSupplyList();
  }, []);

  // จัดการการปิดโมดัลด้วยปุ่ม ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // ตั้งค่าโฟกัสเมื่อโมดัลเปิดขึ้น
  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  const handleSupplyChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedId = event.target.value ? parseInt(event.target.value, 10) : "";
      setSelectedSupplyId(selectedId);
      if (selectedId !== "") {
        const selectedSupply = supplyList.find((supply) => supply.id === selectedId);
        if (selectedSupply) {
          setName(selectedSupply.supplyname);
          setUnit(selectedSupply.unit);
          setCategory(selectedSupply.category);
          setErrors((prev) => ({ ...prev, name: undefined }));
        }
      } else {
        setName("");
        setUnit("");
        setCategory("");
      }
    },
    [supplyList]
  );

  const handleQuantityChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      // อนุญาตเฉพาะตัวเลขโดยใช้ regex
      if (/^\d*$/.test(value)) {
        setQuantity(value);
        if (value && parseInt(value, 10) > 0) {
          setErrors((prev) => ({ ...prev, quantity: undefined }));
        }
      }
    },
    []
  );

  const validateForm = useCallback((): boolean => {
    let valid = true;
    const newErrors: { name?: string; quantity?: string } = {};

    if (!name) {
      newErrors.name = "กรุณาเลือกชื่อวัสดุ"; // "Please select a supply name" in Thai
      valid = false;
    }

    const parsedQuantity = parseInt(quantity, 10);
    if (!quantity || isNaN(parsedQuantity) || parsedQuantity <= 0) {
      newErrors.quantity = "กรุณาใส่จำนวนที่ถูกต้อง"; // "Please enter a valid quantity" in Thai
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }, [name, quantity]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      setLoading(true);

      try {
        const res = await fetch("/api/supplies", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            description: "",
            quantity: parseInt(quantity, 10), // ใช้ parsed quantity
            unit,
            category,
            year: new Date().getFullYear(),
          }),
        });

        if (res.ok) {
          toast.success("เพิ่มวัสดุเรียบร้อยแล้ว"); // "Supply added successfully" in Thai
          onClose();
        } else {
          const errorData = await res.json();
          console.error("Failed to add supply:", errorData.message);
          toast.error("เกิดข้อผิดพลาดในการเพิ่มวัสดุ: " + errorData.message); // "Error adding supply" in Thai
        }
      } catch (error) {
        console.error("Error adding supply:", error);
        toast.error("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์"); // "Error connecting to the server" in Thai
      } finally {
        setLoading(false);
      }
    },
    [name, quantity, unit, category, onClose, validateForm]
  );

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative transform transition-transform"
        ref={modalRef}
        tabIndex={-1}
      >
        {/* ปุ่มปิดโมดัล */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="ปิดโมดัล" // "Close modal" in Thai
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center">เพิ่มวัสดุใหม่</h2>

        <form onSubmit={handleSubmit} noValidate>
          {/* ฟิลด์ชื่อเป็น dropdown */}
          <div className="mb-4">
            <label htmlFor="supply" className="block text-gray-700 mb-2">
              ชื่อวัสดุ:
            </label>
            {fetching ? (
              <div className="w-full border rounded px-3 py-2 bg-gray-100 animate-pulse">
                กำลังโหลด... {/* "Loading..." in Thai */}
              </div>
            ) : (
              <select
                id="supply"
                value={selectedSupplyId}
                onChange={handleSupplyChange}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                required
                aria-invalid={errors.name ? "true" : "false"}
              >
                <option value="">-- เลือกวัสดุ --</option>
                {supplyList.map((supply) => (
                  <option key={supply.id} value={supply.id}>
                    {supply.supplyname}
                  </option>
                ))}
              </select>
            )}
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* ฟิลด์จำนวน */}
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700 mb-2">
              จำนวน:
            </label>
            <input
              type="text" // เปลี่ยนเป็น text
              id="quantity"
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.quantity ? "border-red-500" : "border-gray-300"
                }`}
              value={quantity}
              onChange={handleQuantityChange}
              placeholder="ใส่เฉพาะตัวเลข" // "Enter numbers only" in Thai
              inputMode="numeric"
              pattern="\d*"
              required
              aria-invalid={errors.quantity ? "true" : "false"}
            />
            {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
          </div>

          {/* ปุ่มยกเลิกและบันทึก */}
          <div className="flex justify-end space-x-3">

            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center ${loading ? "cursor-not-allowed opacity-50" : ""
                }`}
              disabled={loading}
            >
              {loading && (
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              )}
              บันทึก
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
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
