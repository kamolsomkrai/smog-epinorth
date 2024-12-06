// app/components/Supplies.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import EditSupplyModal from "./EditSupplyModal";
import DeleteSupplyModal from "./DeleteSupplyModal";
import AddSupplyModal from "./AddSupplyModal";

interface Supply {
  id: number;
  name: string;
  description: string;
  quantity: number;
  unit: string;
  category: string;
  provcode: string;
  provname: string;
}

const Supplies: React.FC = () => {
  const [supplies, setSupplies] = useState<Supply[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedSupply, setSelectedSupply] = useState<Supply | null>(null);

  const router = useRouter();
  const fetchSupplies = useCallback(async () => { // ใช้ useCallback
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
        console.error("Error fetching supplies:", res.statusText);
        alert("เกิดข้อผิดพลาดในการดึงข้อมูลวัสดุ");
        return;
      }
      const data = await res.json();
      console.log("Fetched data:", data);
      // ปรับตามรูปแบบข้อมูลที่ได้รับ
      setSupplies(data.supplies || data.data || []);
    } catch (error) {
      console.error("Error fetching supplies:", error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
    } finally {
      setLoading(false);
    }
  }, [router]);
  useEffect(() => {

    fetchSupplies();
  }, [fetchSupplies]); // Empty dependency array

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

  const handleAddSupplySuccess = () => {
    setShowAddModal(false);
    fetchSupplies(); // Refetch supplies after adding
  };

  const handleEditSupplySuccess = () => {
    setShowEditModal(false);
    setSelectedSupply(null);
    fetchSupplies(); // Refetch supplies after editing
  };

  const handleDeleteSupplySuccess = () => {
    setShowDeleteModal(false);
    setSelectedSupply(null);
    fetchSupplies(); // Refetch supplies after deleting
  };

  return (
    <div className="relative p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">


        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75" />
          </div>
        ) : supplies.length > 0 ? (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
              <svg className="w-6 h-6 text-gray-800 dark:text-green-600 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.013 6.175 7.006 9.369l5.007 3.194-5.007 3.193L2 12.545l5.006-3.193L2 6.175l5.006-3.194 5.007 3.194ZM6.981 17.806l5.006-3.193 5.006 3.193L11.987 21l-5.006-3.194Z" />
                <path d="m12.013 12.545 5.006-3.194-5.006-3.176 4.98-3.194L22 6.175l-5.007 3.194L22 12.562l-5.007 3.194-4.98-3.211Z" />
              </svg>
              รายการเวชภัณฑ์
            </h1>

            <div className="overflow-x-auto rounded-lg shadow-md">
              <table className="w-full table-auto">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="py-3 px-6 text-left font-medium uppercase tracking-wider">
                      ชื่อ
                    </th>
                    <th className="py-3 px-6 text-right font-medium uppercase tracking-wider">
                      จำนวน
                    </th>
                    <th className="py-3 px-6 text-left font-medium uppercase tracking-wider">
                      หน่วย
                    </th>
                    <th className="py-3 px-6 text-left font-medium uppercase tracking-wider">
                      หมวดหมู่
                    </th>
                    <th className="py-3 px-6 text-left font-medium uppercase tracking-wider">
                      จังหวัด
                    </th>
                    <th className="py-3 px-6 text-left font-medium uppercase tracking-wider">
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {supplies.map((supply) => (
                    <tr key={supply.id} className="hover:bg-gray-100">
                      <td className="py-4 px-6 text-gray-800">{supply.name}</td>
                      <td className="py-4 px-6 text-gray-800 text-right">{supply.quantity}</td>
                      <td className="py-4 px-6 text-gray-800">{supply.unit}</td>
                      <td className="py-4 px-6 text-gray-800">{supply.category}</td>
                      <td className="py-4 px-6 text-gray-800">{supply.provname}</td>
                      <td className="py-4 px-6 text-gray-800">
                        <div className="flex items-center space-x-2">
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => handleEditSupply(supply)}
                          >
                            <svg className="w-6 h-6 text-gray-800 dark:text-green-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                              <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd" />
                              <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd" />
                            </svg>

                          </button>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteSupply(supply)}
                          >
                            <svg className="w-6 h-6 text-gray-800 dark:text-red-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                            </svg>

                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">ไม่พบข้อมูล</p>
        )}

        <button
          className="fixed bottom-8 right-6 bg-green-600 hover:bg-green-400 text-white rounded-full p-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-200"
          onClick={handleAddSupply}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>

        </button>

        {/* โมดอลสำหรับเพิ่มข้อมูล */}
        {showAddModal && (
          <AddSupplyModal onClose={handleAddSupplySuccess} />
        )}

        {/* โมดอลสำหรับแก้ไขข้อมูล */}
        {showEditModal && selectedSupply && (
          <EditSupplyModal
            supply={selectedSupply}
            onClose={handleEditSupplySuccess}
          />
        )}

        {/* โมดอลสำหรับลบข้อมูล */}
        {showDeleteModal && selectedSupply && (
          <DeleteSupplyModal
            supply={selectedSupply}
            onClose={handleDeleteSupplySuccess}
          />
        )}
      </div>

    </div>
  );
};

export default Supplies;