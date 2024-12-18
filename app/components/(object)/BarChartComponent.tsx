// app/summary/components/BarChartComponent.tsx
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

interface BarChartComponentProps {
  data: any[];
  provinces: string[];
  colors: string[];
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data, provinces, colors }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">ปริมาณเวชภัณฑ์แต่ละประเภทในแต่ละจังหวัด</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="supplyname" />
          <YAxis />
          <Tooltip />
          <Legend />
          {provinces.map((province, index) => (
            <Bar key={province} dataKey={province} fill={colors[index % colors.length]} />
          ))}
          <Bar dataKey="total" fill="#d0ed57" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
