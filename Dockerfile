# Stage 1: Builder
FROM node:22-alpine AS builder 

WORKDIR /app

# # Copia apenas o necessário para as dependências
COPY package.json yarn.lock ./
COPY prisma ./prisma/

# Instala TUDO e gera o client
RUN yarn install
#RUN npx prisma generate

# # Copia o código e compila
COPY . . 
# RUN yarn install
RUN yarn build:ts

RUN npx prisma db push 

# Stage 2: Runner (A imagem final)
FROM node:22-alpine

# Instala dependências de sistema e timezone
RUN apk add --no-cache tzdata libc6-compat && \
    cp /usr/share/zoneinfo/Africa/Luanda /etc/localtime && \
    echo "Africa/Luanda" > /etc/timezone

WORKDIR /app

# Copia apenas o necessário do builder (node_modules já limpo)
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/.env.production ./.env
COPY --from=builder /app/db/. ./db/

# Limpeza final de binários do Prisma e CACHE residual do sistema
RUN rm -rf node_modules/@prisma/engines && \
    rm -rf node_modules/@prisma/studio-core && \
    rm -rf /usr/local/share/.cache/yarn && \
    rm -rf /root/.cache

EXPOSE 3000

CMD ["yarn", "start:prod"]