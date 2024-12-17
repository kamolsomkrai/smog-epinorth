// app/login/page.tsx
"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginModal from "../../components/LoginModal";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (auth?.user) {
      router.push("/"); // หรือเส้นทางที่คุณต้องการให้ผู้ใช้ไปเมื่อเข้าสู่ระบบแล้ว
    }
  }, [auth?.user, router]);

  const handleClose = () => {
    setOpen(false);
    router.push("/"); // ตัวอย่าง: นำทางไปหน้าแรกเมื่อปิด modal
  };

  return (
    <div>
      <LoginModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default LoginPage;
