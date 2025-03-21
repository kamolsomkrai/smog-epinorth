# Stage 1: Build
FROM node:18-alpine AS builder

# ตั้งค่าโฟลเดอร์ทำงานใน Container
WORKDIR /app

# คัดลอกเฉพาะไฟล์ที่จำเป็นสำหรับการติดตั้ง dependencies
COPY package.json package-lock.json* ./

# ติดตั้ง Dependencies ทั้งหมด (ใช้ cache จาก Docker layer หาก package.json ไม่เปลี่ยนแปลง)
RUN npm ci

# คัดลอกโค้ดแอปพลิเคชันทั้งหมด
COPY . .

# สร้างแอป Next.js
RUN npm run build

# Stage 2: Production
FROM node:18-alpine

# ตั้งค่าโฟลเดอร์ทำงาน
WORKDIR /app

# คัดลอก package.json และติดตั้ง Dependencies เฉพาะ Production
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# คัดลอกไฟล์ที่ Build แล้วจาก Builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/postcss.config.mjs ./
COPY --from=builder /app/tailwind.config.ts ./

# เปิดพอร์ต
EXPOSE 3000

# รันแอป
CMD ["npm", "start"]