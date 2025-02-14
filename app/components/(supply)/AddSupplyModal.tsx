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
  id: number;
  supplyname: string;
}

interface AddSupplyModalProps {
  onClose: () => void;
}

interface ErrorState {
  supply?: string;
  quantityReceived?: string;
  quantityIssued?: string;
}

const AddSupplyModal: React.FC<AddSupplyModalProps> = ({ onClose }) => {
  const [supplyList, setSupplyList] = useState<Supply[]>([]);
  const [selectedSupplyId, setSelectedSupplyId] = useState<number | "">("");
  const [quantityReceived, setQuantityReceived] = useState<string>("");
  const [quantityIssued, setQuantityIssued] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorState>({});

  // ดึงรายการวัสดุ
  useEffect(() => {
    const fetchSupplyList = async () => {
      try {
        const response = await fetch("/api/supplylist");
        if (response.ok) {
          const data = await response.json();
          setSupplyList(data);
        } else {
          toast.error("ไม่สามารถดึงรายการวัสดุได้");
        }
      } catch {
        toast.error("เกิดข้อผิดพลาดในการดึงรายการวัสดุ");
      }
    };

    fetchSupplyList();
  }, []);

  const handleSupplyChange = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      // แปลงค่าเป็น number ก่อนเก็บใน state
      const value = Number(event.target.value);
      setSelectedSupplyId(value);
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
  }, [selectedSupplyId, quantityReceived, quantityIssued]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      setLoading(true);

      const parsedReceived = parseInt(quantityReceived, 10) || 0;
      const parsedIssued = parseInt(quantityIssued, 10) || 0;

      try {
        const res = await fetch("/api/supplies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            supply_id: selectedSupplyId, // เปลี่ยน key จาก supplie_id เป็น supply_id
            quantity_received: parsedReceived,
            quantity_issued: parsedIssued,
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
    [selectedSupplyId, quantityReceived, quantityIssued, onClose, validateForm]
  );

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity"
      aria-labelledby="modal-title"
      role="dialog"
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

        <h2 className="text-2xl font-semibold mb-6 text-center">เพิ่มวัสดุใหม่</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <FormControl fullWidth error={Boolean(errors.supply)}>
              <InputLabel>ชื่อวัสดุ</InputLabel>
              <Select
                value={selectedSupplyId}
                onChange={handleSupplyChange}
                label="ชื่อวัสดุ"
                required
              >
                {supplyList && supplyList.length > 0 ? (
                  supplyList.map((supply) => (
                    <MenuItem key={supply.id} value={supply.id}>
                      {supply.supplyname}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>ไม่พบข้อมูล</MenuItem>
                )}
              </Select>
              {errors.supply && <FormHelperText>{errors.supply}</FormHelperText>}
            </FormControl>
          </div>

          <div className="mb-4">
            <TextField
              label="จำนวนที่รับเข้ามา"
              value={quantityReceived}
              onChange={(e) => handleQuantityChange(e, setQuantityReceived)}
              fullWidth
              error={Boolean(errors.quantityReceived)}
              helperText={errors.quantityReceived}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              required
            />
          </div>

          <div className="mb-4">
            <TextField
              label="จำนวนที่จ่ายออก"
              value={quantityIssued}
              onChange={(e) => handleQuantityChange(e, setQuantityIssued)}
              fullWidth
              error={Boolean(errors.quantityIssued)}
              helperText={errors.quantityIssued}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
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
            <Button type="button" variant="outlined" color="secondary" onClick={onClose}>
              ยกเลิก
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSupplyModal;
