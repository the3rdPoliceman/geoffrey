const express = require('express');
const path = require('path');
const schedule = require('node-schedule');
const auctionScraper = require('./src/tasks/auctionScraper');

const app = express();
const port = process.env.PORT || 3000;

// Serve the static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Schedule the auctionScraper task to run daily at 08:00
schedule.scheduleJob('0 8 * * *', () => {
    console.log('Running auctionScraper task...');
    auctionScraper();
});

// Start the server
app.listen(port, () => {
    console.log(`Geoffrey is running on port ${port}`);
});