# Stage 1: Build the application
FROM node:18-alpine AS builder

# สร้าง directory สำหรับแอป
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies รวมถึง devDependencies
RUN npm ci

# คัดลอกโค้ดทั้งหมดของแอปพลิเคชัน
COPY . .

# สร้างแอป Next.js
RUN npm run build

# Stage 2: Serve the application
FROM node:18-alpine

# ตั้งค่าตัวแปรสิ่งแวดล้อมสำหรับ production
ENV NODE_ENV=production

# สร้าง directory สำหรับแอป
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json จาก builder
COPY package*.json ./

# ติดตั้งเฉพาะ production dependencies
RUN npm ci --only=production

# คัดลอกผลลัพธ์การ build จาก builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./

# เปิดพอร์ตที่ Next.js ใช้ (โดยปกติคือ 3000)
EXPOSE 3000

# รันแอป
CMD ["npm", "start"]
