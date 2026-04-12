FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

# Gerar o Prisma Client
RUN npx prisma generate

# Copiar o restante do código
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/src/index.js"]