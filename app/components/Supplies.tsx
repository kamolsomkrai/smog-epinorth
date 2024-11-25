// app/components/Supplies.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddSupplyModal from "./AddSupplyModal";
import EditSupplyModal from "./EditSupplyModal";
import DeleteSupplyModal from "./DeleteSupplyModal";

interface Supply {
  id: number;
  name: string;
  description: string;
  quantity: number;
  unit: string;
}

const Supplies: React.FC = () => {
  const [supplies, setSupplies] = useState<Supply[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedSupply, setSelectedSupply] = useState<Supply | null>(null);

  const router = useRouter();

  useEffect(() => {
    fetchSupplies();
  }, []);

  const fetchSupplies = async () => {
    try {
      const res = await fetch("/api/supplies", {
        method: "GET",
        credentials: "include",
      });
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      if (!res.ok) {
        console.error('Error fetching supplies:', res.statusText);
        return;
      }
      const data = await res.json();
      setSupplies(data.supplies);
    } catch (error) {
      console.error("Error fetching supplies:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleAddSupply = () => {
    setShowAddModal(true);
  };

  const handleEditSupply = (supply: Supply) => {
    setSelectedSupply(supply);
    setShowEditModal(true);
  };

  const handleDeleteSupply = (supply: Supply) => {
    setSelectedSupply(supply);
    setShowDeleteModal(true);
  };

  return (
    <div className="relative p-4">
      <h1 className="text-2xl font-bold mb-4">รายการวัสดุ</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead>
              <tr>
                <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600">
                  ชื่อ
                </th>
                <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600">
                  รายละเอียด
                </th>
                <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600">
                  จำนวน
                </th>
                <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600">
                  หน่วย
                </th>
                <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600">
                  การดำเนินการ
                </th>
              </tr>
            </thead>
            <tbody>
              {supplies.map((supply, index) => (
                <tr
                  key={supply.id}
                  className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                >
                  <td className="py-3 px-6 text-gray-700">{supply.name}</td>
                  <td className="py-3 px-6 text-gray-700">
                    {supply.description}
                  </td>
                  <td className="py-3 px-6 text-gray-700">{supply.quantity}</td>
                  <td className="py-3 px-6 text-gray-700">{supply.unit}</td>
                  <td className="py-3 px-6 text-gray-700">
                    <button
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      onClick={() => handleEditSupply(supply)}
                    >
                      แก้ไข
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteSupply(supply)}
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ปุ่มเพิ่มข้อมูล */}
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600"
        onClick={handleAddSupply}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>

      {/* โมดอลสำหรับเพิ่มข้อมูล */}
      {showAddModal && (
        <AddSupplyModal
          onClose={() => {
            setShowAddModal(false);
            fetchSupplies();
          }}
        />
      )}

      {/* โมดอลสำหรับแก้ไขข้อมูล */}
      {showEditModal && selectedSupply && (
        <EditSupplyModal
          supply={selectedSupply}
          onClose={() => {
            setShowEditModal(false);
            setSelectedSupply(null);
            fetchSupplies();
          }}
        />
      )}

      {/* โมดอลสำหรับลบข้อมูล */}
      {showDeleteModal && selectedSupply && (
        <DeleteSupplyModal
          supply={selectedSupply}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedSupply(null);
            fetchSupplies();
          }}
        />
      )}
    </div>
  );
};

export default Supplies;
