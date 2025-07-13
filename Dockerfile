# Base image
FROM node:22-alpine AS base

WORKDIR /app
COPY package.json /app

# Install dependencies
RUN npm install

# Production build
FROM base AS prod
COPY . /app
RUN npm run build

# Port information
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]

