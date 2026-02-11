FROM node:20-alpine AS base

WORKDIR /app

# Install dependencies (root + client) using npm ci when package-lock exists
COPY package.json package-lock.json ./
RUN npm install

COPY client/package.json client/package-lock.json ./client/
RUN cd client && npm install

# Copy the rest of the source code
COPY . .

# Build client (this will also run any other build steps you define at root)
RUN npm run build


# ---- Production image ----
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Copy only what we need for runtime
COPY --from=base /app/package.json /app/package-lock.json ./
RUN npm install --omit=dev

COPY --from=base /app/api ./api
COPY --from=base /app/client/dist ./client/dist

# If you use uploads on disk and want them persisted in the container,
# you can create the directory here (Render recommends external storage for real apps).
RUN mkdir -p /app/uploads

# Expose the port your Express app uses
EXPOSE 3000

# Default command for Render
CMD ["npm", "start"]


