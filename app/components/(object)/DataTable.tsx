// components/DataTable.tsx
import React from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Button } from "@mui/material";
import { Download as DownloadIcon } from '@mui/icons-material'; // นำเข้าไอคอน Download

interface DataTableProps {
  titlespan?: string;
  title: string;
  headers: string[];
  data: { [key: string]: any }[];
  footer?: { [key: string]: any };
}

const DataTable: React.FC<DataTableProps> = ({ titlespan, title, headers, data, footer }) => {

  const exportToExcel = () => {
    // เตรียมข้อมูลในรูปแบบที่ต้องการสำหรับ Excel
    const worksheetData = [
      headers, // แถวหัวตาราง
      ...data.map(row => headers.map(header => row[header] ?? ''))
    ];

    if (footer) {
      const footerRow = headers.map(header => footer[header] ?? '');
      worksheetData.push(footerRow);
    }

    // สร้าง Worksheet จากข้อมูล
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // สร้าง Workbook
    const workbook = XLSX.utils.book_new();

    // จำกัดชื่อ sheet ไม่เกิน 31 ตัวอักษร
    let sheetName = title;
    if (sheetName.length > 31) {
      sheetName = `${sheetName.slice(0, 28)}...`; // ใช้ slice(0, 28) เพื่อให้รวม '...' แล้วไม่เกิน 31
    }

    // เพิ่ม Worksheet เข้าไปใน Workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // แปลง Workbook เป็น binary
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // สร้าง Blob จาก binary
    const blob = new Blob([wbout], { type: 'application/octet-stream' });

    // จำกัดชื่อไฟล์ไม่เกิน 32 ตัวอักษรและแปลงเป็นไฟล์ .xlsx
    saveAs(blob, `data.xlsx`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        {/* เพิ่มปุ่ม Export พร้อมไอคอน */}
        <Button
          variant="contained"
          color="primary"
          onClick={exportToExcel}
          startIcon={<DownloadIcon />} // เพิ่มไอคอน Download
        >
          Export
        </Button>
      </div>
      {titlespan && <p className='text-center'>{titlespan}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-green-600 text-white">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="py-3 px-6 text-center font-medium uppercase tracking-wider border-b">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-100 text-center">
                  {headers.map((header, colIndex) => (
                    <td key={colIndex} className="py-4 px-6 text-gray-800 border-b">
                      {row[header] ?? 0}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="py-4 text-center text-gray-500">
                  ไม่มีข้อมูล
                </td>
              </tr>
            )}
            {footer && (
              <tr className="font-bold text-center">
                {headers.map((header, index) => (
                  <td key={index} className="py-2 px-4 border-t">
                    {footer[header] ?? ''}
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div >
  );
};

export default React.memo(DataTable);
