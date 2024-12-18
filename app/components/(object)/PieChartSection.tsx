// components/PieChartSection.tsx
import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography, Box } from '@mui/material';

interface PieChartSectionProps {
  title: string;
  data: { name: string; value: number }[];
  colors: string[];
}

const PieChartSection: React.FC<PieChartSectionProps> = ({ title, data, colors }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <Box className="bg-white rounded-lg shadow-md p-6 mb-8">
      <Typography variant="h5" className="mb-4 text-gray-700">
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={activeIndex !== null ? 90 : 80} // ขยาย slice ที่ถูก hover
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            isAnimationActive={true}
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                cursor="pointer"
              />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => new Intl.NumberFormat().format(value)} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default React.memo(PieChartSection);
