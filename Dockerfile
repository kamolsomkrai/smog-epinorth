# Stage 1: Build the application
FROM node:18-alpine AS builder

# ตั้งค่าตัวแปรสิ่งแวดล้อม
ENV NODE_ENV=production

# สร้าง directory สำหรับแอป
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm ci

# คัดลอกโค้ดทั้งหมด
COPY . .

# สร้างแอป Next.js
RUN npm run build

# Stage 2: Serve the application
FROM node:18-alpine

ENV NODE_ENV=production

# สร้าง directory สำหรับแอป
WORKDIR /app

# คัดลอกเฉพาะ dependencies จาก builder
COPY package*.json ./

RUN npm ci --only=production

# คัดลอกผลลัพธ์การ build จาก builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./

# เปิดพอร์ตที่ Next.js ใช้ (โดยปกติคือ 3000)
EXPOSE 3000

# รันแอป
CMD ["npm", "start"]
