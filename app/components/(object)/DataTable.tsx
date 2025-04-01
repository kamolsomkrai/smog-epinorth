import React from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Button } from "@mui/material";
import { Download as DownloadIcon } from '@mui/icons-material';

interface ColumnStyle {
  headerClassName?: string;
  headerAlign?: 'left' | 'center' | 'right';
  bodyClassName?: string;
  bodyAlign?: 'left' | 'center' | 'right';
  wrapText?: boolean;
}

interface DataTableProps {
  titlespan?: string;
  title: string;
  headers: string[] | Array<string | { main: string; sub: string }>;
  data: { [key: string]: any }[];
  footer?: { [key: string]: any };
  classname?: string;
  columnStyles?: { [key: string]: ColumnStyle };
}

const DataTable: React.FC<DataTableProps> = ({
  titlespan,
  title,
  headers,
  data,
  footer,
  classname,
  columnStyles = {}
}) => {
  const hasComplexHeaders = headers.some(header => typeof header !== 'string');
  const mainHeaders = headers.map(header =>
    typeof header === 'string' ? header : header.main
  );

  const exportToExcel = () => {
    const worksheetData = [
      mainHeaders,
      ...data.map(row => mainHeaders.map(header => row[header] ?? ''))
    ];

    if (footer) {
      const footerRow = mainHeaders.map(header => footer[header] ?? '');
      worksheetData.push(footerRow);
    }

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    const sheetName = title.length > 31 ? `${title.slice(0, 28)}...` : title;
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, `${title.replace(/\s+/g, '_')}.xlsx`);
  };

  const getHeaderStyle = (header: string) => {
    const style = columnStyles[header] || {};
    return [
      'py-3 px-6 font-medium uppercase tracking-wider',
      style.headerClassName || '',
      `text-${style.headerAlign || 'center'}`,
    ].join(' ');
  };

  const getBodyStyle = (header: string) => {
    const style = columnStyles[header] || {};
    return [
      'py-4 px-6',
      style.bodyClassName || '',
      style.wrapText ? 'whitespace-normal' : 'whitespace-nowrap',
      `text-${style.bodyAlign || 'center'}`,
    ].join(' ');
  };

  const formatNumber = (value: any) => {
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return value;
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${classname || ''}`}>
      <div className={`flex ${titlespan ? 'justify-between' : 'justify-end'} items-center mb-4`}>
        {titlespan && <p className="text-center text-xl">{titlespan}</p>}
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
        <table className="min-w-full bg-white border">
          <thead className="bg-green-600 text-white">
            {hasComplexHeaders ? (
              <>
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={`main-${index}`}
                      className={getHeaderStyle(typeof header === 'string' ? header : header.main)}
                      colSpan={1}
                      rowSpan={typeof header === 'string' ? 2 : 1}
                    >
                      {typeof header === 'string' ? header : header.main}
                    </th>
                  ))}
                </tr>
                <tr>
                  {headers.map((header, index) => (
                    typeof header !== 'string' && (
                      <th
                        key={`sub-${index}`}
                        className="py-1 px-6 font-normal text-sm"
                      >
                        {header.sub}
                      </th>
                    )
                  ))}
                </tr>
              </>
            ) : (
              <tr>
                {headers.map((header, index) => (
                  <th key={index} className={getHeaderStyle(header as string)}>
                    {typeof header === 'string' ? header : header.main}
                  </th>
                ))}
              </tr>
            )}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-100">
                  {mainHeaders.map((header, colIndex) => (
                    <td
                      key={colIndex}
                      className={getBodyStyle(header)}
                    >
                      {formatNumber(row[header] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={mainHeaders.length} className="py-4 text-center text-gray-500">
                  ไม่มีข้อมูล
                </td>
              </tr>
            )}
            {footer && (
              <tr className="font-bold">
                {mainHeaders.map((header, index) => (
                  <td
                    key={index}
                    className={getBodyStyle(header)}
                  >
                    {footer[header] ?? ''}
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