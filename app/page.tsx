// app/page.tsx
"use client"; // ทำให้คอมโพเนนต์เป็น Client Component

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Container, Typography } from "@mui/material";
import CardMenu from "./components/CardMenu";
import {
  Inventory2 as InventoryIcon,
  Summarize as SummarizeIcon,
  Build as BuildIcon,
  Assessment as AssessmentIcon
} from "@mui/icons-material";
import PM25Table from "./components/(homepage)/Pm25Table";

const menuItems1 = [
  {
    href: "/supplies",
    title: "บันทึกข้อมูลเวชภัณฑ์",
    icon: <InventoryIcon fontSize="large" color="secondary" />
  },
  {
    href: "/summary",
    title: "Dashboard เวชภัณฑ์",
    icon: <SummarizeIcon fontSize="large" color="success" />
  }
];

const menuItems2 = [
  {
    href: "/activity_smog",
    title: "บันทึกข้อมูลมาตรการ",
    icon: <BuildIcon fontSize="large" color="warning" />
  },
  {
    href: "/summaryreportsmog",
    title: "Dashboard ภาพรวมมาตรการ",
    icon: <AssessmentIcon fontSize="large" color="error" />
  }
];

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // ตรวจสอบว่าเพจนี้เคยรีเฟรชแล้วหรือยัง
    const hasRefreshed = sessionStorage.getItem("homePageRefreshed");

    if (!hasRefreshed) {
      // ตั้งค่า flag เพื่อป้องกันการรีเฟรชซ้ำ
      sessionStorage.setItem("homePageRefreshed", "true");

      // รีเฟรชข้อมูลของเส้นทางปัจจุบัน
      router.refresh();
    } else {
      // ลบ flag เพื่อให้สามารถรีเฟรชได้ในการนำทางครั้งถัดไป
      sessionStorage.removeItem("homePageRefreshed");
    }
  }, [router]);

  return (
    <Container>
      {/* เรียกใช้ PM25Table เพื่อแสดงข้อมูล API ก่อน */}
      {/* <PM25Table /> */}
      <div>
        <Typography variant="h5" component="div" sx={{ mt: 2, textAlign: "center" }}>
          <span className="text-blue-800">ข้อมูลเวชภัณฑ์</span>
        </Typography>
        <Box>
          <CardMenu menuItems={menuItems1} />
        </Box>
      </div>
      <div>
        <Typography variant="h5" component="div" sx={{ mt: 2, textAlign: "center" }}>
          <span className="text-blue-800">ข้อมูลมาตรการ</span>
        </Typography>
        <Box>
          <CardMenu menuItems={menuItems2} />
        </Box>
      </div>
    </Container>
  );
}
