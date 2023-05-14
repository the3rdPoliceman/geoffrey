# Use the official Node.js base image
FROM arm32v7/node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the application port (change to the port used by your Express.js server)
EXPOSE 3000

# Start the application
CMD ["pm2-runtime", "start", "server.js"]