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
  CircularProgress,
  Alert,
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
  width: 350,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const LoginModal: React.FC<LoginModalProps> = ({ open, handleClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const auth = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Basic validation
    if (username.length < 3) {
      setLoading(false);
      setError("Username must be at least 3 characters long");
      return;
    }
    if (password.length < 4) {
      setLoading(false);
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        auth?.setUser(data.user);
        handleClose();
      } else {
        const data = await res.json();
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} className="relative rounded-lg bg-white p-6">
        <IconButton
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          size="small"
        >
          <CloseIcon />
        </IconButton>
        <Typography
          variant="h5"
          component="h2"
          className="mb-6 text-center font-bold text-blue-500"
        >
          Login
        </Typography>
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            label="Username"
            variant="outlined"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} className="text-white" />
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default LoginModal;
