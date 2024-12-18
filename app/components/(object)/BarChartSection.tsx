// components/BarChartSection.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { Typography, Box } from '@mui/material';

interface BarChartSectionProps {
  title: string;
  data: any[];
  keys: string[];
  colors: string[];
}

const BarChartSection: React.FC<BarChartSectionProps> = ({ title, data, keys, colors }) => {
  return (
    <Box className="bg-white rounded-lg shadow-md p-6 mb-8">
      <Typography variant="h5" className="mb-4 text-gray-700">
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
          <YAxis />
          <Tooltip formatter={(value: number) => new Intl.NumberFormat().format(value)} />
          <Legend verticalAlign="top" height={36} />
          {keys.map((key, index) => (
            <Bar key={key} dataKey={key} fill={colors[index % colors.length]} name={key}>
              <LabelList dataKey={key} position="top" formatter={(value: number) => new Intl.NumberFormat().format(value)} />
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default React.memo(BarChartSection);
