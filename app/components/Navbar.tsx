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
} from "@mui/material";
import LoginModal from "./LoginModal";
import { AuthContext } from "../context/AuthContext";
import LogoutIcon from '@mui/icons-material/Logout';
import { Menu as MenuIcon, AccountCircle } from "@mui/icons-material";
import SidebarMenu from "./SidebarMenu";

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
      <AppBar position="static" className="bg-green-600">
        <Toolbar className="flex justify-between items-center">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar}
            className="hover:bg-green-300 rounded-md transition-colors duration-200"
          >
            <MenuIcon className="text-green-800" />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            className="font-bold text-green-800"
          >
            ระบาดวิทยาและตอบโต้ ฯ
          </Typography>
          <div>
            {auth?.user ? (
              <>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  className="hover:bg-green-300 rounded-md transition-colors duration-200"
                >
                  <AccountCircle className="text-green-800" />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
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
                      backgroundColor: 'green.100',
                      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                      borderRadius: '8px',
                      mt: 1.5,
                      '& .MuiMenuItem-root': {
                        '&:hover': {
                          backgroundColor: 'green.200',
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
                          backgroundColor: 'green.200',
                        }
                      }}
                    >
                      Logout
                    </Button>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                color="inherit"
                onClick={handleOpen}
                className="bg-white hover:bg-green-100 text-green-800 font-medium rounded-md px-4 py-2 transition-colors duration-200"
              >
                Login
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
