const express = require('express');
const path = require('path');
const schedule = require('node-schedule');
const auctionScraper = require('./src/tasks/auctionScraper');

const app = express();
const port = process.env.PORT || 3000;

// Serve the static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Schedule the auctionScraper task to run every 10 minutes
const configPath = path.join(__dirname, 'src', 'tasks', 'auctionConfig.json');
schedule.scheduleJob('*/5 * * * *', () => {
    console.log('Running auctionScraper task...');
    auctionScraper(configPath);
});

// Start the server
app.listen(port, () => {
    console.log(`Geoffrey is running on port ${port}`);
});

// temporary entry to run the auction scraper
auctionScraper(configPath);