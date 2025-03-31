// VulnerableRateChart.tsx
"use client";
import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

interface VulnerableRateChartProps {
  calculateTotal: (field: keyof Measure2Data) => number;
  formatNumber: (num: number) => string;
}

import { Measure2Data } from "../../interfaces/newmeasure";

const VulnerableRateChart: React.FC<VulnerableRateChartProps> = ({ calculateTotal, formatNumber }) => {
  // สร้างข้อมูลสำหรับ Chart โดยคำนวณจำนวนทั้งหมด จำนวนที่ได้รับการดูแล และอัตราการได้รับการดูแล
  const chartData = useMemo(() => [
    {
      name: "เด็กเล็ก",
      total: calculateTotal("riskChildTotal"),
      care: calculateTotal("riskChildTakeCare"),
      rate:
        calculateTotal("riskChildTotal") > 0
          ? ((calculateTotal("riskChildTakeCare") / calculateTotal("riskChildTotal")) * 100).toFixed(1) + "%"
          : "0%",
    },
    {
      name: "ผู้สูงอายุ",
      total: calculateTotal("riskOlderTotal"),
      care: calculateTotal("riskOlderTakeCare"),
      rate:
        calculateTotal("riskOlderTotal") > 0
          ? ((calculateTotal("riskOlderTakeCare") / calculateTotal("riskOlderTotal")) * 100).toFixed(1) + "%"
          : "0%",
    },
    {
      name: "หญิงตั้งครรภ์",
      total: calculateTotal("riskPregnantTotal"),
      care: calculateTotal("riskPregnantTakeCare"),
      rate:
        calculateTotal("riskPregnantTotal") > 0
          ? ((calculateTotal("riskPregnantTakeCare") / calculateTotal("riskPregnantTotal")) * 100).toFixed(1) + "%"
          : "0%",
    },
    {
      name: "ติดเตียง",
      total: calculateTotal("riskBedriddenTotal"),
      care: calculateTotal("riskBedriddenTakeCare"),
      rate:
        calculateTotal("riskBedriddenTotal") > 0
          ? ((calculateTotal("riskBedriddenTakeCare") / calculateTotal("riskBedriddenTotal")) * 100).toFixed(1) + "%"
          : "0%",
    },
    {
      name: "โรคหัวใจ",
      total: calculateTotal("riskHeartTotal"),
      care: calculateTotal("riskHeartTakeCare"),
      rate:
        calculateTotal("riskHeartTotal") > 0
          ? ((calculateTotal("riskHeartTakeCare") / calculateTotal("riskHeartTotal")) * 100).toFixed(1) + "%"
          : "0%",
    },
    {
      name: "โรคระบบทางเดินหายใจ",
      total: calculateTotal("riskCopdTotal"),
      care: calculateTotal("riskCopdTakeCare"),
      rate:
        calculateTotal("riskCopdTotal") > 0
          ? ((calculateTotal("riskCopdTakeCare") / calculateTotal("riskCopdTotal")) * 100).toFixed(1) + "%"
          : "0%",
    },
  ], [calculateTotal]);

  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => formatNumber(value)} />
          <Tooltip formatter={(value: number) => formatNumber(value)} />
          <Legend />
          {/* แสดงจำนวนทั้งหมด */}
          <Bar dataKey="total" fill="#8884d8" name="ทั้งหมด" />
          {/* แสดงจำนวนที่ได้รับการดูแล พร้อมแสดงอัตรา (%) เป็น Label */}
          <Bar dataKey="care" fill="#82ca9d" name="ได้รับการดูแล">
            <LabelList dataKey="rate" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VulnerableRateChart;
