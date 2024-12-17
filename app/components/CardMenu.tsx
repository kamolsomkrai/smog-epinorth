// app/components/CardMenu.tsx
"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
  Box
} from "@mui/material";
import {
  Inventory2 as InventoryIcon,
  Summarize as SummaryIcon,
  Build as BuildIcon,
  Assessment as AssessmentIcon
} from "@mui/icons-material";

interface MenuItem {
  href: string;
  title: string;
  icon: React.ReactElement;
}

const menuItems: MenuItem[] = [
  {
    href: "/supplies",
    title: "เวชภัณฑ์",
    icon: <InventoryIcon fontSize="large" color="secondary" />
  },
  {
    href: "/summary",
    title: "ภาพรวมเวชภัณฑ์",
    icon: <SummaryIcon fontSize="large" color="success" />
  },
  {
    href: "/activity_smog",
    title: "มาตรการ",
    icon: <BuildIcon fontSize="large" color="warning" />
  },
  {
    href: "/summaryreportsmog",
    title: "ภาพรวมมาตรการ",
    icon: <AssessmentIcon fontSize="large" color="error" />
  }
];

const CardMenu: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.href}>
            <Card>
              <CardActionArea component={Link} href={item.href}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', p: 4 }}>
                  {item.icon}
                  <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                    {item.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CardMenu;
