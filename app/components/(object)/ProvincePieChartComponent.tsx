// app/summary/components/ProvincePieChartComponent.tsx
import React, { memo } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

interface ProvincePieChartComponentProps {
  province: string;
  data: { name: string; value: number }[];
  colors: string[];
}

const ProvincePieChartComponent: React.FC<ProvincePieChartComponentProps> = ({ province, data, colors }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-xl font-semibold mb-2 text-gray-600">{province}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#82ca9d"
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          >
            {data.map((entry, idx) => (
              <Cell key={`cell-${province}-${idx}`} fill={colors[idx % colors.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => new Intl.NumberFormat().format(value)} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default memo(ProvincePieChartComponent);
