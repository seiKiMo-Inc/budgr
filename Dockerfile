# ------------------------------------------------------
FROM oven/bun as build

# Set the working directory.
WORKDIR /app

# Copy the monorepo.
COPY . .

# Install dependencies.
RUN bun install --production

# Set the working directory.
WORKDIR /app/apps/backend

# Build the app.
ENV NODE_ENV=production
RUN bun run build

# Move the built app to the root directory.
RUN mv server ../../server

# ------------------------------------------------------
FROM alpine:latest as run

# Set the working directory.
WORKDIR /app

# Copy the built app from the build stage.
COPY --from=build /app/server server
RUN chmod +x server

# Run the app.
ENV NODE_ENV=production
CMD ["./server"]

EXPOSE 3000
