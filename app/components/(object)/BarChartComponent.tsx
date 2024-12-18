import React, { memo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

interface BarChartComponentProps {
  data: Array<{ [key: string]: string | number }>; // แก้ type ของ data
  provinces: string[];
  colors: string[];
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data, provinces, colors }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">ปริมาณเวชภัณฑ์แต่ละประเภทในแต่ละจังหวัด</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data} // ต้องเป็น array ของ objects
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="supplyname" tick={{ fill: '#4B5563' }} />
          <YAxis tick={{ fill: '#4B5563' }} />
          <Tooltip formatter={(value: number) => new Intl.NumberFormat().format(value)} />
          <Legend verticalAlign="top" height={36} />
          {provinces.map((province, index) => (
            <Bar key={province} dataKey={province} fill={colors[index % colors.length]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default memo(BarChartComponent);
