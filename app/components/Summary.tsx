// app/components/Summary.tsx
"use client";

import React, { useEffect, useState } from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useRouter } from "next/navigation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SummaryData {
  category: string;
  total: number;
}

const Summary: React.FC = () => {
  const [summary, setSummary] = useState<SummaryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch("/api/summary", {
          method: "GET",
          credentials: "include",
        });
        if (res.status === 401) {
          // หากไม่ได้รับอนุญาต ให้ redirect ไปยังหน้า login
          router.push("/login");
          return;
        }
        const data = await res.json();
        setSummary(data.summary);
      } catch (error) {
        console.error("Error fetching summary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [router]);

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-full">
        <CircularProgress />
      </Box>
    );
  }

  const chartData = {
    labels: summary.map((item) => item.category),
    datasets: [
      {
        label: "Total Supplies",
        data: summary.map((item) => item.total),
        backgroundColor: "rgba(74, 144, 226, 0.6)",
      },
    ],
  };

  return (
    <div>
      <Typography variant="h5" className="mb-4">
        Summary
      </Typography>
      <Box className="mb-8">
        <Bar data={chartData} />
      </Box>
      {/* เพิ่มส่วนอื่น ๆ ของการแสดงผลที่เหมาะสม */}
    </div>
  );
};

export default Summary;
