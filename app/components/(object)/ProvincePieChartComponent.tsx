// app/summary/components/ProvincePieChartComponent.tsx
import React from 'react';
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
    <div key={province} className="mb-8">
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
            label
          >
            {data.map((entry, idx) => (
              <Cell key={`cell-${province}-${idx}`} fill={colors[idx % colors.length]} />
            ))}
          </Pie>
        </PieChart>
        <Tooltip />
        <Legend layout="vertical" align="right" verticalAlign="middle" />
      </ResponsiveContainer>
    </div>
  );
};

export default ProvincePieChartComponent;
