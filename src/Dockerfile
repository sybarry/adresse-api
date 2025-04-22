# 1 - build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2 - test
FROM node:20-alpine AS tester
WORKDIR /app
COPY --from=builder /app ./
CMD ["npm", "run", "test"]

# 3 - prod
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
EXPOSE 8000
CMD ["node", "dist/main.js"]
