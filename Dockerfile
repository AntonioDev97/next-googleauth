# === ETAPA DE CONSTRUCCIÓN (Builder) ===
# Usa una imagen base de Node.js ligera
FROM node:20-slim AS builder 
WORKDIR /app

# Copia los archivos de configuración de dependencias (package.json y package-lock.json)
# Esto permite que Docker use caché si solo cambias tu código, no las dependencias.
COPY package.json package-lock.json ./ 

# Instala las dependencias de npm
RUN npm install --frozen-lockfile --force

# Copia el código fuente de tu aplicación
COPY . .

# Construye la aplicación Next.js
# Esto genera el directorio .next con el código listo para servir.
RUN npm run build 

# === ETAPA DE PRODUCCIÓN (Runner) ===
# Usa la misma imagen base, pero esta será la imagen final y ligera.
FROM node:20-slim AS runner
WORKDIR /app

# Copia solo los archivos necesarios para la producción desde la etapa 'builder'
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public

# Configura el puerto y expone. Cloud Run escucha en $PORT (por defecto 8080)
ENV PORT 8080
EXPOSE 8080

# Comando para iniciar la aplicación Next.js en modo producción
CMD ["npm", "start"]