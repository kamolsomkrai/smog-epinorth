// app/page.tsx
import { Box, Container, Typography } from "@mui/material";
import CardMenu from "./components/CardMenu";
import {
  Inventory2 as InventoryIcon,
  Summarize as SummaryIcon,
  Build as BuildIcon,
  Assessment as AssessmentIcon
} from "@mui/icons-material";


const menuItems1 = [
  {
    href: "/supplies",
    title: "บันทึกข้อมูล เวชภัณฑ์",
    icon: <InventoryIcon fontSize="large" color="secondary" />
  },
  {
    href: "/summary",
    title: "Dashboard ข้อมูลเวชภัณฑ์",
    icon: <SummaryIcon fontSize="large" color="success" />
  }
];

const menuItems2 = [
  {
    href: "/activity_smog",
    title: "บันทึกข้อมูล มาตรการ",
    icon: <BuildIcon fontSize="large" color="warning" />
  },
  {
    href: "/summaryreportsmog",
    title: "Dashboard ข้อมูลภาพรวมมาตรการ",
    icon: <AssessmentIcon fontSize="large" color="error" />
  }
];

export default function Home() {
  return (
    <Container>
      <div>
        <Typography variant="h5" component="div" sx={{ mt: 2, textAlign: 'center' }}>
          <span className="text-blue-800">ข้อมูลเวชภัณฑ์ เขตสุขภาพที่ 1</span>
        </Typography>
        <Box><CardMenu menuItems={menuItems1} /></Box>

      </div>
      <div>
        <Typography variant="h5" component="div" sx={{ mt: 2, textAlign: 'center' }}>
          <span className="text-blue-800">ข้อมูลมาตรการ เขตสุขภาพที่ 1</span>
        </Typography>
        <Box><CardMenu menuItems={menuItems2} /></Box>

      </div>
    </Container>
  );
}
