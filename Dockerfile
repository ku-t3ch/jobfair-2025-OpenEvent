FROM node:18-alpine AS builder

WORKDIR /app 

COPY package.json package-lock.json ./

RUN npm install --omit=dev

COPY . .

RUN npm run build

# Production Image

FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "server.js"]