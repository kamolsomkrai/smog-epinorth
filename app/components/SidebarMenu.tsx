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
  Inventory2 as InventoryIcon,
  Summarize as SummaryIcon
} from "@mui/icons-material";

interface SidebarMenuProps {
  open: boolean;
  onClose: () => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ open, onClose }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose} >
      <Box sx={{ width: 250, bgcolor: 'background.paper' }}> {/* Set width and background */}
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}> {/* Add header */}
          <InventoryIcon sx={{ color: 'primary.main', mr: 1 }} /> {/* Add icon */}
          <Typography variant="h6" component="div">
            My Supplies
          </Typography>
        </Box>
        <List>
          <Link href="/supplies" passHref>
            <ListItem disablePadding>
              <ListItemButton onClick={onClose}>
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="เวชภัณฑ์" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href="/summary" passHref>
            <ListItem disablePadding>
              <ListItemButton onClick={onClose}>
                <ListItemIcon>
                  <SummaryIcon />
                </ListItemIcon>
                <ListItemText primary="ภาพรวมเวชภัณฑ์" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href="/activity_smog" passHref>
            <ListItem disablePadding>
              <ListItemButton onClick={onClose}>
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="มาตรการ" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href="/summaryreportsmog" passHref>
            <ListItem disablePadding>
              <ListItemButton onClick={onClose}>
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="ภาพรวมมาตรการ" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </Box>
    </Drawer>
  );
};

export default SidebarMenu;