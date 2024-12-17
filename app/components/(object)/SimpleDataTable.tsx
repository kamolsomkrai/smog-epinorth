// components/SimpleDataTable.tsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material';

interface SimpleDataTableProps {
  headers: string[];
  data: { [key: string]: any }[];
  footer?: { [key: string]: any };
}

const SimpleDataTable: React.FC<SimpleDataTableProps> = ({ headers, data, footer }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index}><Typography variant="subtitle1" fontWeight="bold">{header}</Typography></TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {headers.map((header, cellIndex) => (
                <TableCell key={cellIndex}>{row[header]}</TableCell>
              ))}
            </TableRow>
          ))}
          {footer && (
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index} sx={{ fontWeight: 'bold' }}>
                  {footer[header]}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SimpleDataTable;
