"use client";

import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import {
  SelectChangeEvent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface Supply {
  supplie_id: number;
  suppliename: string;
  supplietype: string;
}

interface Hospital {
  hospcode: number;
  hospname: string;
}

interface Supplydata {
  id: number;
  hospcode: number;
  provcode: number;
  supply_id: number;
  quantity_stock: number;
  quantity_add: number;
  quantity_minus: number;
  quantity_total: number;
}

interface AddSupplyModalProps {
  onClose: () => void;
}

interface ErrorState {
  supply?: string;
  hospital?: string;
  quantityReceived?: string;
  quantityIssued?: string;
}

const AddSupplyModal: React.FC<AddSupplyModalProps> = ({ onClose }) => {
  const [supplyList, setSupplyList] = useState<Supply[]>([]);
  const [hospitalList, setHospitalList] = useState<Hospital[]>([]);
  const [supplyData, setSupplyData] = useState<Supplydata | null>(null);
  const [selectedSupplyId, setSelectedSupplyId] = useState<number | "">("");
  const [selectedHospitalId, setSelectedHospitalId] = useState<string>("");
  const [selectedUnit, setSelectedUnit] = useState<string>("");
  const [quantityReceived, setQuantityReceived] = useState<string>("");
  const [quantityIssued, setQuantityIssued] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorState>({});

  // ดึงรายการวัสดุและโรงพยาบาล
  useEffect(() => {
    const fetchSupplyList = async () => {
      try {
        const response = await fetch("/api/supplylist");
        if (response.ok) {
          const data = await response.json();
          setSupplyList(data);
          if (data.length > 0) {
            setSelectedSupplyId(data[0].supplie_id);
            setSelectedUnit(data[0].supplietype);
          }
        } else {
          toast.error("ไม่สามารถดึงรายการเวชภัณฑ์ได้");
        }
      } catch {
        toast.error("เกิดข้อผิดพลาดในการดึงรายการเวชภัณฑ์");
      }
    };

    const fetchHospitalList = async () => {
      try {
        const response = await fetch("/api/hospitallist", { method: "POST" });
        if (response.ok) {
          const data = await response.json();
          setHospitalList(data);
          if (data.length > 0) {
            setSelectedHospitalId(data[0].hospcode);
          }
        } else {
          toast.error("ไม่สามารถดึงรายการโรงพยาบาลได้");
        }
      } catch {
        toast.error("เกิดข้อผิดพลาดในการดึงรายการโรงพยาบาล");
      }
    };

    fetchSupplyList();
    fetchHospitalList();
  }, []);

  // เมื่อเลือก hospital และ supply แล้วให้ส่ง request เพื่อดึงข้อมูล supplyData
  useEffect(() => {
    const fetchSupplyData = async () => {
      if (selectedHospitalId === "" || selectedSupplyId === "") return;
      try {
        const response = await fetch("/api/supplydata", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            hospcode: selectedHospitalId,
            supply_id: selectedSupplyId,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          if (!data || data.quantity_stock === undefined) {
            setSupplyData({
              id: 0,
              hospcode: Number(selectedHospitalId),
              provcode: 0,
              supply_id: Number(selectedSupplyId),
              quantity_stock: 0,
              quantity_add: 0,
              quantity_minus: 0,
              quantity_total: 0,
            });
          } else {
            setSupplyData(data);
          }
        } else {
          setSupplyData({
            id: 0,
            hospcode: Number(selectedHospitalId),
            provcode: 0,
            supply_id: Number(selectedSupplyId),
            quantity_stock: 0,
            quantity_add: 0,
            quantity_minus: 0,
            quantity_total: 0,
          });
        }
      } catch {
        setSupplyData({
          id: 0,
          hospcode: Number(selectedHospitalId),
          provcode: 0,
          supply_id: Number(selectedSupplyId),
          quantity_stock: 0,
          quantity_add: 0,
          quantity_minus: 0,
          quantity_total: 0,
        });
      }
    };
    fetchSupplyData();
  }, [selectedHospitalId, selectedSupplyId]);

  const handleSupplyChange = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      const value = Number(event.target.value);
      setSelectedSupplyId(value);
      const selected = supplyList.find(
        (item) => item.supplie_id === value
      );
      setSelectedUnit(selected ? selected.supplietype : "");
    },
    [supplyList]
  );

  const handleHospitalChange = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      const value = String(event.target.value);
      setSelectedHospitalId(value);
    },
    []
  );

  const handleQuantityChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      setter: React.Dispatch<React.SetStateAction<string>>
    ) => {
      const value = event.target.value;
      if (/^\d*$/.test(value)) {
        setter(value);
      }
    },
    []
  );

  const validateForm = useCallback((): boolean => {
    let valid = true;
    const newErrors: ErrorState = {};
    if (selectedSupplyId === "") {
      newErrors.supply = "กรุณาเลือกวัสดุ";
      valid = false;
    }
    if (selectedHospitalId === "") {
      newErrors.hospital = "กรุณาเลือกโรงพยาบาล";
      valid = false;
    }
    if (!quantityReceived || parseInt(quantityReceived, 10) < 0) {
      newErrors.quantityReceived = "กรุณาใส่จำนวนที่รับเข้ามาที่ถูกต้อง";
      valid = false;
    }
    if (!quantityIssued || parseInt(quantityIssued, 10) < 0) {
      newErrors.quantityIssued = "กรุณาใส่จำนวนที่จ่ายออกที่ถูกต้อง";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  }, [selectedSupplyId, selectedHospitalId, quantityReceived, quantityIssued]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateForm()) return;
      setLoading(true);
      const parsedReceived = parseInt(quantityReceived, 10) || 0;
      const parsedIssued = parseInt(quantityIssued, 10) || 0;
      const currentStock = supplyData ? supplyData.quantity_stock : 0;
      const quantityTotal = currentStock + parsedReceived - parsedIssued;
      try {
        const res = await fetch("/api/supplies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            supply_id: selectedSupplyId,
            hospital_id: selectedHospitalId,
            quantity_stock: quantityTotal,
            quantity_add: parsedReceived,
            quantity_minus: parsedIssued,
            quantity_total: quantityTotal,
          }),
        });
        if (res.ok) {
          toast.success("เพิ่มวัสดุเรียบร้อยแล้ว");
          onClose();
        } else {
          const errorData = await res.json();
          toast.error("เกิดข้อผิดพลาดในการเพิ่มวัสดุ: " + errorData.message);
        }
      } catch {
        toast.error("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
      } finally {
        setLoading(false);
      }
    },
    [
      selectedSupplyId,
      selectedHospitalId,
      quantityReceived,
      quantityIssued,
      onClose,
      validateForm,
      supplyData,
    ]
  );

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity"
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative transform transition-transform">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="ปิดโมดัล"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h2 id="modal-title" className="text-2xl font-semibold mb-6 text-center">
          เพิ่มเวชภัณฑ์
        </h2>
        <form onSubmit={handleSubmit} noValidate>
          {/* เลือกวัสดุ */}
          <div className="mb-4">
            <FormControl fullWidth error={Boolean(errors.supply)}>
              <InputLabel id="supply-label">เลือกเวชภัณฑ์</InputLabel>
              <Select
                labelId="supply-label"
                value={selectedSupplyId}
                onChange={handleSupplyChange}
                label="เลือกเวชภัณฑ์"
                required
              >
                {supplyList && supplyList.length > 0 ? (
                  supplyList.map((supply) => (
                    <MenuItem
                      key={supply.supplie_id}
                      value={supply.supplie_id}
                    >
                      {supply.suppliename}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>ไม่พบข้อมูล</MenuItem>
                )}
              </Select>
              {errors.supply && <FormHelperText>{errors.supply}</FormHelperText>}
            </FormControl>
          </div>
          {/* เลือกโรงพยาบาล */}
          <div className="mb-4">
            <FormControl fullWidth error={Boolean(errors.hospital)}>
              <InputLabel id="hospital-label">โรงพยาบาล</InputLabel>
              <Select
                labelId="hospital-label"
                value={selectedHospitalId}
                onChange={handleHospitalChange}
                label="โรงพยาบาล"
                required
              >
                {hospitalList && hospitalList.length > 0 ? (
                  hospitalList.map((hospital) => (
                    <MenuItem
                      key={hospital.hospcode}
                      value={hospital.hospcode}
                    >
                      {hospital.hospname}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>ไม่พบข้อมูล</MenuItem>
                )}
              </Select>
              {errors.hospital && (
                <FormHelperText>{errors.hospital}</FormHelperText>
              )}
            </FormControl>
          </div>
          {/* แสดงจำนวนคงคลัง */}
          <div className="mb-4 p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
            <p className="text-gray-500">จำนวนคงคลัง</p>
            <div className="mt-1 flex items-center">
              <span className="text-xl font-semibold text-blue-600">
                {supplyData
                  ? supplyData.quantity_stock +
                  (parseInt(quantityReceived, 10) || 0) -
                  (parseInt(quantityIssued, 10) || 0)
                  : 0}
              </span>
              <span className="ml-2 text-xl text-gray-700">{selectedUnit}</span>
            </div>
          </div>
          {/* จำนวนที่รับเข้ามา */}
          <div className="mb-4">
            <TextField
              label="จำนวนที่รับเข้ามา"
              value={quantityReceived}
              onChange={(e) => handleQuantityChange(e, setQuantityReceived)}
              fullWidth
              error={Boolean(errors.quantityReceived)}
              helperText={errors.quantityReceived}
              slotProps={{
                htmlInput: { inputMode: "numeric", pattern: "[0-9]*" },
              }}
              required
            />
          </div>
          {/* จำนวนที่จ่ายออก */}
          <div className="mb-4">
            <TextField
              label="จำนวนที่จ่ายออก"
              value={quantityIssued}
              onChange={(e) => handleQuantityChange(e, setQuantityIssued)}
              fullWidth
              error={Boolean(errors.quantityIssued)}
              helperText={errors.quantityIssued}
              slotProps={{
                htmlInput: { inputMode: "numeric", pattern: "[0-9]*" },
              }}
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={24} /> : undefined}
            >
              บันทึก
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={onClose}
            >
              ยกเลิก
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSupplyModal;
