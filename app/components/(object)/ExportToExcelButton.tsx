// app/summary/components/ExportToExcelButton.tsx
import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Button } from "@mui/material";
import { Download as DownloadIcon } from '@mui/icons-material'; // นำเข้าไอคอน Download

interface SupplySummary {
  supplyname: string;
  category: string;
  [key: string]: string | number;
}

interface ExportToExcelButtonProps {
  supplies: SupplySummary[];
  provinces: string[];
}

const ExportToExcelButton: React.FC<ExportToExcelButtonProps> = ({ supplies, provinces }) => {
  const handleExport = () => {
    const data = supplies.map(supply => {
      const row: { [key: string]: any } = {
        เวชภัณฑ์: supply.supplyname,
        หมวดหมู่: supply.category,
      };
      provinces.forEach(province => {
        row[province] = supply[province];
      });
      row['Total'] = provinces.reduce((acc, province) => {
        const value = typeof supply[province] === 'number' ? supply[province] : parseFloat(supply[province] as string) || 0;
        return acc + value;
      }, 0);
      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Summary');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(file, 'Summary.xlsx');
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleExport}
      startIcon={<DownloadIcon />} // เพิ่มไอคอน Download
    >
      Export
    </Button>
    // <button
    //   onClick={handleExport}
    //   className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    // >
    //   Export to Excel
    // </button>
  );
};

export default ExportToExcelButton;
