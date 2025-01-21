"use client";

import React, { ReactNode } from "react";
import AuthProvider from "../context/AuthContext";
import Navbar from "./Navbar";
import Navbar2 from "./Navbar2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useRouter } from "next/router"; // สำหรับ Next.js

interface ClientProvidersProps {
  children: ReactNode;
}

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4338ca",
    },
    secondary: {
      main: "#4338ca",
    },
  },
  typography: {
    fontFamily: 'Sarabun, sans-serif',
  },
});


const ClientProviders: React.FC<ClientProvidersProps> = ({ children }) => {
  const router = useRouter(); // ใช้ useRouter เพื่อตรวจสอบ path ปัจจุบัน
  const isFormOrLocationPage = router.pathname === "/form" || router.pathname === "/location";
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        {isFormOrLocationPage ? <Navbar2 /> : <Navbar />}
        {/* <Navbar /> */}
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
