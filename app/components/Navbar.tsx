// app/components/Navbar.tsx
"use client";

import React, { useState, useContext } from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import LoginModal from "./LoginModal";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const auth = useContext(AuthContext);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        auth?.setUser(null);
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar className="flex justify-between">
          <Typography variant="h6" component="div">
            My Supplies App
          </Typography>
          <div>
            <Link href="/supplies" passHref>
              <Button color="inherit">Supplies</Button>
            </Link>
            <Link href="/summary" passHref>
              <Button color="inherit">Summary</Button>
            </Link>
            {auth?.user ? (
              <>
                <span>{auth.user.hospname}</span>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button color="inherit" onClick={handleOpen}>
                Login
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <LoginModal open={open} handleClose={handleClose} />
    </>
  );
};

export default Navbar;
