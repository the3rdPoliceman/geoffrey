const schedule = require('node-schedule');
const auctionScraper = require('./src/tasks/auctionScraper');

// Schedule the auctionScraper task to run daily at 08:00
schedule.scheduleJob('0 8 * * *', () => {
    console.log('Running auctionScraper task...');
    auctionScraper();
});