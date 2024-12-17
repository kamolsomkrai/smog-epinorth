// app/components/Navbar.tsx
"use client";

import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import LoginModal from "./LoginModal";
import { AuthContext } from "../context/AuthContext";
import LogoutIcon from '@mui/icons-material/Logout';
import { Menu as MenuIcon, AccountCircle } from "@mui/icons-material";
import SidebarMenu from "./SidebarMenu";
import Link from "next/link";
import Image from "next/image"; // นำเข้า Image จาก next/image

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const auth = useContext(AuthContext);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        auth?.setUser(null);
        handleCloseMenu();
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar className="flex justify-between items-center">
          {/* ส่วนของเมนู Sidebar */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar}
            className="hover:bg-indigo-600 rounded-md transition-colors duration-200"
          >
            <MenuIcon className="text-white" />
          </IconButton>

          {/* ส่วนของโลโก้และข้อความ */}
          <Link href="/" className="flex items-center">
            <Box display="flex" alignItems="center">
              {/* ปรับขนาดโลโก้ให้พอดีกับข้อความ */}
              <Image
                src="/symbol.png" // ใช้เส้นทางที่ถูกต้องไปยังไฟล์ภาพใน public
                alt="Logo" // คำอธิบายของภาพสำหรับ SEO และการเข้าถึง
                width={40} // กำหนดความกว้างตามต้องการ
                height={40} // กำหนดความสูงตามต้องการ
                style={{ objectFit: 'contain', marginRight: '1rem' }} // ปรับให้ภาพไม่บิดเบี้ยว
              />
              <Typography
                variant="h6"
                component="div"
                className="font-bold text-white ml-2"
              >
                ข้อมูลการดำเนินงานด้านการแพทย์และสาธารณสุข กรณีหมอกควันและฝุ่นละอองขนาดเล็ก เขตสุขภาพที่ 1
              </Typography>
            </Box>
          </Link>

          {/* ส่วนของการเข้าสู่ระบบ/เมนูผู้ใช้ */}
          <div>
            {auth?.user ? (
              <>
                <Box display="flex" alignItems="center">
                  <span className="mr-4">{auth.user.hospname}</span>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                    className="hover:bg-indigo-600 rounded-md transition-colors duration-200"
                  >
                    <AccountCircle className="text-white" />
                  </IconButton>
                </Box>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                  PaperProps={{
                    sx: {
                      backgroundColor: 'green.300',
                      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                      borderRadius: '8px',
                      mt: '1rem', // ปรับระยะห่างจาก IconButton
                      '& .MuiMenuItem-root': {
                        '&:hover': {
                          backgroundColor: 'green.300',
                          transition: 'background-color 0.2s ease',
                        },
                        '& svg': {
                          mr: 2,
                          color: 'green.800',
                        },
                      },
                    }
                  }}
                >
                  <MenuItem onClick={handleCloseMenu}>
                    <span className="text-gray-700 font-medium">
                      {auth.user.hospname}
                    </span>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Button
                      color="inherit"
                      startIcon={<LogoutIcon />}
                      sx={{
                        color: 'green.800',
                        '&:hover': {
                          backgroundColor: 'green.500',
                        }
                      }}
                    >
                      ออกจากระบบ
                    </Button>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                color="inherit"
                onClick={handleOpen}
                className="bg-indigo-700 hover:bg-indigo-400 text-white font-medium rounded-md px-4 py-2 transition-colors duration-200"
              >
                เข้าสู่ระบบ
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>

      <SidebarMenu open={sidebarOpen} onClose={toggleSidebar} />
      <LoginModal open={open} handleClose={handleClose} />
    </>
  );
};

export default Navbar;
