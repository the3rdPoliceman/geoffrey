# Use the official Node.js base image
FROM arm32v7/node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install
RUN npm install -g pm2

# Install Chromium dependencies
RUN apt-get update && apt-get install -y \
    libasound2 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    libgdk-pixbuf2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libxslt1.1 \
    libatspi2.0-0 \
    libappindicator3-1 \
    libsecret-1-0 \
    libgbm-dev \
    --no-install-recommends \
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Set Puppeteer launch args
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Copy the rest of the application code to the working directory
COPY . .

# Expose the application port (change to the port used by your Express.js server)
EXPOSE 3000

# Start the application
CMD ["pm2-runtime", "start", "server.js"]