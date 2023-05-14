# geoffrey

## Concept

Geoffrey is an application that acts as a butler, carrying out tasks autonoumously. 

The initial ideas for tasks are:
- Check auction websites for interesting articles
- Web scraping for supermarket price updates

## Technologies

Implemention will use the following technologies
- Runs on Linux (Will be a raspberry pi, but that should not be important as it should run on any linux)
- Node.js for the main implementation which carries out tasks, and provides any web interface
- Express.js to help serve the web interface
- WebStorm as an IDE
- Node Schedule to schedule tasks
- Puppeteer for any tasks requiring actions to be carried out through a browser
- Cheerio and Got Scraping for any webscraping
- JavaScript, HTML, CSS for and available web interface
- PM2 to ensure node is always up
- Docker for reliable deployment
- GitHub as a repository

## Raspberry Pi setup

- Install latest Raspberry Pi OS
- run `sudo apt-get update`
- run `sudo apt-get upgrade`
- follow the rest of the installation instructions at https://withblue.ink/2020/06/24/docker-and-docker-compose-on-raspberry-pi-os.html until the Hello World example to confirm success
- double check that systemd setup to start docker automatically, and restart it if it goes down is in place

