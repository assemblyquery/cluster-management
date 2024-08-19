# Use the official Node.js 22.x image
FROM node:22

# Set the working directory inside the container
WORKDIR /app


# Copy the entire project directory into the container
COPY . .

# Install dependencies
RUN npm install

# Build the AdonisJS project
RUN npm run build

# Move into the build directory
WORKDIR /app/build

# Install only production dependencies
RUN npm ci --omit=dev

RUN cp /app/.env /app/build/.env

# Expose the port on which the app will run
EXPOSE 3333

# Command to start the server
CMD ["sh", "-c", "node ace migration:run && node bin/server.js"]
