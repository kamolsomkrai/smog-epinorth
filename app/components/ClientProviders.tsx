// app/components/ClientProviders.tsx
"use client";

import React, { ReactNode } from "react";
import AuthProvider from "../context/AuthContext";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

interface ClientProvidersProps {
  children: ReactNode;
}

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#7e22ce",
    },
    secondary: {
      main: "#7e22ce",
    },
  },
  typography: {
    fontFamily: 'Sarabun, sans-serif',
  },
});

const ClientProviders: React.FC<ClientProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Navbar />
        {children}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default ClientProviders;
