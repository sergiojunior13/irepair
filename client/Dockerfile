# ---- Stage 1: Build ----
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# ---- Stage 2: Serve ----
FROM nginx:alpine

# Copia os arquivos gerados pelo build para o Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuração do Nginx para SPA (React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]