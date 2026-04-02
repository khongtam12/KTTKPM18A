# ===== Stage 1: Build =====
FROM node:18 AS build

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

# ===== Stage 2: 
FROM node:18-alpine

WORKDIR /app

# Chỉ copy những gì cần từ stage build
COPY --from=build /app /app

EXPOSE 3000

CMD ["node", "app.js"]