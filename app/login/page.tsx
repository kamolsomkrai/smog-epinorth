// app/login/page.tsx
"use client";

import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginModal from "../components/LoginModal";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const auth = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (auth?.user) {
      router.push("/"); // หรือเส้นทางที่คุณต้องการให้ผู้ใช้ไปเมื่อเข้าสู่ระบบแล้ว
    }
  }, [auth?.user, router]);

  return (
    <div>
      <LoginModal open={true} handleClose={() => { }} />
    </div>
  );
};

export default LoginPage;
