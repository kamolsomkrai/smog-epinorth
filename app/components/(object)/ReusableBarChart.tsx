// ReusableBarChart.tsx
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

interface ReusableBarChartProps<T> {
  data: T[];
  title: string;
  xAxisKey: keyof T;
  barKeys: (keyof T)[];
  colors?: string[];
  margin?: { top: number; right: number; left: number; bottom: number };
}

const ReusableBarChart = <T extends Record<string, any>>({
  data,
  title,
  xAxisKey,
  barKeys,
  colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#a4de6c', '#d0ed57', '#ffff45'],
  margin = { top: 20, right: 30, left: 20, bottom: 5 },
}: ReusableBarChartProps<T>) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">{title}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={margin}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={String(xAxisKey)} tick={{ fill: '#4B5563' }} />
          <YAxis tick={{ fill: '#4B5563' }} />
          <Tooltip formatter={(value: number) => new Intl.NumberFormat().format(value)} />
          <Legend verticalAlign="top" height={36} />
          {barKeys.map((barKey, index) => (
            <Bar key={String(barKey)} dataKey={String(barKey)} fill={colors[index % colors.length]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReusableBarChart;
