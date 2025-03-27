// app/components/SidebarMenu.tsx
"use client";

import React from "react";
import Link from "next/link";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography
} from "@mui/material";
import {
  // Inventory2 as InventoryIcon,
  Cottage as CottageIcon,
  Medication as MedicationIcon,
  HealthAndSafety as HealthAndSafetyIcon,
  Leaderboard as LeaderboardIcon,
  QueryStats as QueryStatsIcon,
  SettingsSystemDaydream as SettingsSystemDaydreamIcon
} from "@mui/icons-material";

interface SidebarMenuProps {
  open: boolean;
  onClose: () => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ open, onClose }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 250, bgcolor: 'background.paper' }}>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
          <CottageIcon sx={{ color: 'primary.main', mr: 1 }} />
          <Typography variant="h6" component="div">
            <ListItemButton component={Link} href="/" onClick={onClose}>หน้าหลัก</ListItemButton>
          </Typography>
        </Box>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} href="https://smog-epinorth.ddc.moph.go.th/web/" onClick={onClose}>
              <ListItemIcon>
                <SettingsSystemDaydreamIcon />
              </ListItemIcon>
              <ListItemText primary="Smog-epinorth" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} href="/supplies" onClick={onClose}>
              <ListItemIcon>
                <MedicationIcon />
              </ListItemIcon>
              <ListItemText primary="เวชภัณฑ์" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} href="/summary" onClick={onClose}>
              <ListItemIcon>
                <QueryStatsIcon />
              </ListItemIcon>
              <ListItemText primary="ภาพรวมเวชภัณฑ์" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} href="/activity_smog" onClick={onClose}>
              <ListItemIcon>
                <HealthAndSafetyIcon />
              </ListItemIcon>
              <ListItemText primary="มาตรการ" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} href="/summaryreportsmog" onClick={onClose}>
              <ListItemIcon>
                <LeaderboardIcon />
              </ListItemIcon>
              <ListItemText primary="ภาพรวมมาตรการ" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default SidebarMenu;
