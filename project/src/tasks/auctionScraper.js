const fs = require('fs');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

class Search {
  constructor(type, seller, titleInclude, titleExclude, descriptionInclude, descriptionExclude) {
    this.type = type;
    this.seller = seller;
    this.titleInclude = titleInclude;
    this.titleExclude = titleExclude;
    this.descriptionInclude = descriptionInclude;
    this.descriptionExclude = descriptionExclude;
  }
}

async function searchItem(search) {
  // TODO: Implement searchItem logic
  console.log("Running item search " + JSON.stringify(search));
}

async function searchSeller(search) {
  console.log("Running seller search " + JSON.stringify(search));
  const urlTemplate = 'https://www.ricardo.ch/de/shop/{SELLER}/offers/?sort=newest{search_one_of}{search_exclude}';
  let url = urlTemplate.replace('{SELLER}', encodeURIComponent(search.seller));

  if (search.titleInclude && search.titleInclude.length > 0) {
    const titleInclude = encodeURIComponent(search.titleInclude);
    url = url.replace('{search_one_of}', `&search_one_of=${titleInclude}`);
  } else {
    url = url.replace('{search_one_of}', '');
  }

  if (search.titleExclude && search.titleExclude.length > 0) {
    const titleExclude = encodeURIComponent(search.titleExclude);
    url = url.replace('{search_exclude}', `&search_exclude=${titleExclude}`);
  } else {
    url = url.replace('{search_exclude}', '');
  }

  try {
    console.log("About to load URL: " + url);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    
    const itemLinksSelector = 'div[data-testid="regular-results"] a';
    const itemLinks = await page.$$eval(itemLinksSelector, (links) => {
      const hrefs = new Set();
      const regex = /([0-9]{5,})\/$/;

      for (const link of links) {
        const href = link.getAttribute('href');
        if (href && regex.test(href)) {
          hrefs.add(href);
        }
      }

      return Array.from(hrefs);
    });

    console.log("Found item URLs: ", itemLinks);

    await browser.close();
  } catch (error) {
    console.error(`Error in searchSeller: ${error.message}`);
  }
}

async function auctionScraper(configFilePath) {
  try {
    const configFile = fs.readFileSync(configFilePath);
    const config = JSON.parse(configFile);

    const searchObjects = config.searches.map(
      (search) =>
        new Search(
          search.type,
          search.seller,
          search.titleInclude,
          search.titleExclude,
          search.descriptionInclude,
          search.descriptionExclude
        )
    );

    for (const searchObject of searchObjects) {
      if (searchObject.type === 'ITEM') {
        await searchItem(searchObject);
      } else if (searchObject.type === 'SELLER') {
        await searchSeller(searchObject);
      } else {
        console.error(`Invalid search type: ${searchObject.type}`);
      }
    }
  } catch (error) {
    console.error(`Error in auctionScraper: ${error.message}`);
  }
}

module.exports = auctionScraper;
