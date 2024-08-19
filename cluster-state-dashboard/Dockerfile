# Use the official Node.js 22.x image
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory into the container
COPY . .

# Build the app with the environment variable
ENV NEXT_PUBLIC_API_BASE_URL=http://cluster-state-api:3333/api/v1
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3000

# Command to start the app
CMD ["npm", "run", "start"]
