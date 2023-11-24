# FROM node:18-alpine3.15

# # Set the working directory to /app
# RUN mkdir -p /var/www/pokedex
# WORKDIR /var/www/pokedex

# # Copiar el directorio y su contenido
# # El primer . es para decirle que copie la carpeta origen el segundo . es para indicarle el destiino
# COPY . ./var/www/pokedex
# COPY pack.json tsconfig.json tsconfig.build.json /var/www/pokedex/
# RUN npm install --prod
# RUN npm build


# # Dar permiso para ejecutar la applicacion
# # Es una buena practica crear un nuevo usuario
# RUN adduser --disabled-password pokeuser
# RUN chow -R pokeuser:pokeuser /var/www/pokedex
# USER pokeuser

# # Limpiar el cache
# RUN npm i cahce clean --force

# EXPOSE 3000

# CMD [ "npm","run","start" ]

# Install Dependencies only when needed
FROM node:18-alpine3.15 AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json ./
RUN npm install --frozen-lockfile

# Build the app with cahce dependencies
FROM node:18-alpine3.15 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM node:18-alpine3.15 AS runner

# Set working directory
WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --prod

COPY --from=builder /app/dist ./dist

CMD [ "node", "dist/main" ]