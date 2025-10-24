# Etapa de construcción
FROM node:20-slim AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Etapa de producción
FROM node:20-slim AS runner
WORKDIR /app
# Solo copia lo necesario para producción
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Cloud Run usa la variable de entorno PORT por defecto
ENV PORT 8080 
EXPOSE 8080

CMD ["yarn", "start"]