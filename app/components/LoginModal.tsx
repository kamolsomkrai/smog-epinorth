// app/components/LoginModal.tsx
"use client";

import React, { useState, useContext } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "../context/AuthContext";

interface LoginModalProps {
  open: boolean;
  handleClose: () => void;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const LoginModal: React.FC<LoginModalProps> = ({ open, handleClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // ส่งข้อมูลเข้าสู่ API การล็อกอิน
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        // เพื่อส่งและรับคุกกี้
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        // อัปเดตสถานะผู้ใช้
        auth?.setUser(data.user);
        handleClose();
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} className="relative">
        <IconButton
          onClick={handleClose}
          className="absolute top-2 right-2"
          size="small"
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" className="mb-4 text-center">
          Login
        </Typography>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            label="Username"
            variant="outlined"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default LoginModal;
