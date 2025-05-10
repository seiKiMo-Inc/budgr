FROM oven/bun

# Set the working directory.
WORKDIR /app

# Copy dependencies.
COPY package.json ../../bun.lock ./

# Install dependencies.
RUN bun install --production

# Copy source code.
COPY src .
COPY tsconfig.json .

# Run the app.
ENV NODE_ENV production
CMD ["bun", "run", "start"]

EXPOSE 3000
