// app/layout.tsx
import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import ClientProviders from "./components/ClientProviders"; // คอมโพเนนต์ Client ที่เราจะสร้าง

export const metadata: Metadata = {
  title: "กลุ่มระบาดวิทยาและตอบโต้ฯ เชียงใหม่",
  description: "กลุ่มระบาดวิทยาและตอบโต้ฯ เชียงใหม่",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <main className="p-8">{children}</main>
        </ClientProviders>
      </body>
    </html>
  );
}
