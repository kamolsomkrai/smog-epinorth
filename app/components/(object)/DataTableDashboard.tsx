"use client";

import React from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Button } from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";

interface DataTableProps {
  titlespan?: string;
  title: string;
  headers: string[];
  data: { [key: string]: any }[];
  footer?: { [key: string]: any };
}

const DataTable: React.FC<DataTableProps> = ({
  titlespan,
  title,
  headers,
  data,
  footer,
}) => {
  const exportToExcel = () => {
    const worksheetData = [
      headers,
      ...data.map((row) => headers.map((header) => row[header] ?? "")),
    ];

    if (footer) {
      const footerRow = headers.map((header) => footer[header] ?? "");
      worksheetData.push(footerRow);
    }

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();

    let sheetName = title;
    if (sheetName.length > 31) {
      sheetName = `${sheetName.slice(0, 28)}...`;
    }
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, `data.xlsx`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div
        className={`flex ${titlespan ? "justify-between" : "justify-end"
          } items-center mb-4`}
      >
        {titlespan && (
          <p className="text-center text-xl font-semibold">{titlespan}</p>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={exportToExcel}
          startIcon={<DownloadIcon />}
        >
          Export
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-green-600 text-white">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="py-3 px-6 text-center font-medium uppercase tracking-wider border-b border-gray-300"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-100">
                  {headers.map((header, colIndex) => (
                    <td
                      key={colIndex}
                      className={`py-4 px-6 text-gray-800 border-b border-gray-200 text-center ${header === "supplyname"
                        ? "max-w-xs overflow-hidden text-ellipsis whitespace-nowrap"
                        : ""
                        }`}
                      title={header === "supplyname" ? row[header] : ""}
                    >
                      {row[header] ?? 0}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length}
                  className="py-4 text-center text-gray-500"
                >
                  ไม่มีข้อมูล
                </td>
              </tr>
            )}
            {footer && (
              <tr className="font-bold text-center">
                {headers.map((header, index) => (
                  <td
                    key={index}
                    className="py-2 px-4 border-t border-gray-300"
                  >
                    {footer[header] ?? ""}
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(DataTable);
