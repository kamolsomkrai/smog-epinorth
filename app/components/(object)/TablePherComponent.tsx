"use client";
import React from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Button } from "@mui/material";
import { Download as DownloadIcon } from '@mui/icons-material';

interface ColumnConfig {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  width?: string;
  format?: (value: any) => string | number;
}

interface TablePherComponentProps {
  title: string;
  columns: ColumnConfig[];
  data: Record<string, any>[];
  className?: string;
  enableExport?: boolean;
  loading?: boolean;
}

const TablePherComponent: React.FC<TablePherComponentProps> = ({
  title,
  columns,
  data,
  className = '',
  enableExport = true,
  loading = false
}) => {
  // ฟังก์ชันสำหรับ export ข้อมูลเป็น Excel
  const exportToExcel = () => {
    const worksheetData = [
      columns.map(col => col.label), // Header row
      ...data.map(row =>
        columns.map(col => {
          const value = row[col.key];
          return col.format ? col.format(value) : value;
        })
      )
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, title.substring(0, 31));
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${title.replace(/[^a-z0-9]/gi, '_')}.xlsx`);
  };

  // ฟังก์ชันจัดรูปแบบเซลล์
  const formatCellValue = (value: any, format?: (value: any) => string | number) => {
    if (format) return format(value);
    if (typeof value === 'number') return value.toLocaleString();
    return value || '-';
  };

  // สไตล์สำหรับคอลัมน์
  const getColumnStyle = (align?: 'left' | 'center' | 'right', width?: string) => {
    const alignClass = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right'
    }[align || 'left'];

    return `${alignClass} ${width ? `w-[${width}]` : ''}`;
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {/* Header section with title and export button */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        {enableExport && (
          <Button
            variant="contained"
            size="small"
            onClick={exportToExcel}
            startIcon={<DownloadIcon fontSize="small" />}
            disabled={loading || data.length === 0}
          >
            Export
          </Button>
        )}
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="p-8 flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            {/* Table header */}
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${getColumnStyle(column.align, column.width)} ${column.className || ''}`}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table body */}
            <tbody className="bg-white divide-y divide-gray-200">
              {data.length > 0 ? (
                data.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50">
                    {columns.map((column) => (
                      <td
                        key={`${rowIndex}-${column.key}`}
                        className={`px-4 py-3 text-sm ${getColumnStyle(column.align)} ${column.className || ''}`}
                      >
                        {formatCellValue(row[column.key], column.format)}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-6 text-center text-gray-500">
                    ไม่พบข้อมูล
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default React.memo(TablePherComponent);