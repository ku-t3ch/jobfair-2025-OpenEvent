FROM node:18-alpine AS builder

WORKDIR /app 

COPY package.json package-lock.json ./

RUN npm install --omit=dev

COPY . .

RUN npm run start

# Production Image

FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server.js .
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]