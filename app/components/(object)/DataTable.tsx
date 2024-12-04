// components/DataTable.tsx
import React from 'react';

interface DataTableProps {
  title: string;
  headers: string[];
  data: { [key: string]: any }[];
  footer?: { [key: string]: any };
}

const DataTable: React.FC<DataTableProps> = ({ title, headers, data, footer }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-xl font-medium mb-4 text-gray-700">{title}</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead className="bg-green-600 text-white">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="py-3 px-6 text-center font-medium uppercase tracking-wider border-b">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-100 text-center">
                {headers.map((header, colIndex) => (
                  <td key={colIndex} className="py-4 px-6 text-gray-800 border-b">{row[header] ?? 0}</td>
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
                <td key={index} className="py-2 px-4 border-t">{footer[header] ?? ''}</td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default React.memo(DataTable);
