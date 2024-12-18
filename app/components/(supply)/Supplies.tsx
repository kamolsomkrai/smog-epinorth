"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalState, setModalState] = useState<{
    type: "add" | "edit" | "delete" | null;
    supply: Supply | null;
  }>({ type: null, supply: null });

  const router = useRouter();

  const fetchSupplies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/supplies", {
        method: "GET",
        credentials: "include",
      });
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      if (!res.ok) throw new Error(res.statusText);

      const data = await res.json();
      setSupplies(data?.supplies || data.data?.data || []);
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการดึงข้อมูลวัสดุ");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchSupplies();
  }, []);

  const handleModalClose = (success = false) => {
    setModalState({ type: null, supply: null });
    if (success) fetchSupplies();
  };

  const renderTableRows = () =>
    supplies.map((supply) => (
      <tr key={supply.id} className="hover:bg-gray-100">
        <td className="py-4 px-6 text-gray-800">{supply.name}</td>
        <td className="py-4 px-6 text-right text-gray-800">{supply.quantity}</td>
        <td className="py-4 px-6 text-gray-800">{supply.unit}</td>
        <td className="py-4 px-6 text-gray-800">{supply.category}</td>
        <td className="py-4 px-6 text-gray-800">{supply.provname}</td>
        <td className="py-4 px-6">
          <div className="flex items-center space-x-2">
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => setModalState({ type: "edit", supply })}
            >
              <EditIcon />
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => setModalState({ type: "delete", supply })}
            >
              <DeleteIcon />
            </button>
          </div>
        </td>
      </tr>
    ));

  return (
    <div className="relative p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative w-16 h-16">
              <div className="absolute border-4 border-blue-500 rounded-full w-full h-full animate-ping"></div>
              <div className="absolute border-4 border-blue-300 rounded-full w-full h-full"></div>
            </div>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center mt-10">{error}</p>
        ) : supplies.length > 0 ? (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">รายการเวชภัณฑ์</h1>
            <div className="overflow-x-auto rounded-lg shadow-md">
              <table className="w-full table-auto">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="py-3 px-6 text-left">ชื่อ</th>
                    <th className="py-3 px-6 text-right">จำนวน</th>
                    <th className="py-3 px-6 text-left">หน่วย</th>
                    <th className="py-3 px-6 text-left">หมวดหมู่</th>
                    <th className="py-3 px-6 text-left">จังหวัด</th>
                    <th className="py-3 px-6 text-left"></th>
                  </tr>
                </thead>
                <tbody>{renderTableRows()}</tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">ไม่พบข้อมูล</p>
        )}

        <button
          className="fixed bottom-8 right-6 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
          onClick={() => setModalState({ type: "add", supply: null })}
        >
          <AddCircleIcon style={{ fontSize: 36 }} />
          <span className="ml-2 text-lg font-semibold hidden md:inline-block">
            เพิ่ม
          </span>
        </button>

        {/* Modal */}
        {modalState.type === "add" && <AddSupplyModal onClose={() => handleModalClose(true)} />}
        {modalState.type === "edit" && modalState.supply && (
          <EditSupplyModal supply={modalState.supply} onClose={() => handleModalClose(true)} />
        )}
        {modalState.type === "delete" && modalState.supply && (
          <DeleteSupplyModal supply={modalState.supply} onClose={() => handleModalClose(true)} />
        )}
      </div>
    </div>
  );
};

export default Supplies;
