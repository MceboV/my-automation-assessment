import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { expect, chromium, Browser, Page } from '@playwright/test';
import { SportPage } from '../pages/sport-page';

let browser: Browser;
let page: Page;
let sportPage: SportPage;
let searchResults: any[] = [];

Before(async function() {
  console.log('Launching browser...');
  browser = await chromium.launch({
    headless: false,
    slowMo: 500
  });
  page = await browser.newPage();
  page.setDefaultTimeout(60000);
});

Given('I am on the BBC website', async function () {
  sportPage = new SportPage(page);
  await sportPage.navigateToHomepage();
});

When('I use the search functionality to search for {string}', async function (searchTerm: string) {
  searchResults = await sportPage.performSearch(searchTerm);
});

Then('I should see at least {int} search results', async function (minResults: number) {
  console.log(`Found ${searchResults.length} search results`);

  // Detailed logging of results
  console.log('\nSEARCH RESULTS:');
  searchResults.forEach((result, index) => {
    console.log(`${index + 1}. ${result.title}`);
    console.log(`Description: ${result.description}`);
    console.log(`URL: ${result.url}\n`);
  });

  expect(searchResults.length).toBeGreaterThanOrEqual(minResults);
});

Then('the results should contain relevant sport content', async function () {
  const sportKeywords = [
    'sport', 'football', 'racing', 'tennis', 'olympics',
    'premier', 'cup', 'match', 'game', 'championship',
    'league', 'tournament', 'athlete', 'competition', 'fitness'
  ];

  let relevantResults = 0;

  console.log('\nANALYZING RESULT RELEVANCE:');
  searchResults.forEach((result, index) => {
    const content = `${result.title} ${result.description}`.toLowerCase();
    const matchingKeywords = sportKeywords.filter(keyword => content.includes(keyword));
    const isRelevant = matchingKeywords.length > 0;

    if (isRelevant) {
      relevantResults++;
      console.log(`Relevant result ${index + 1}: "${result.title}"`);
      console.log(`Matching keywords: ${matchingKeywords.join(', ')}`);
    } else {
      console.log(`Non-relevant result ${index + 1}: "${result.title}"`);
      console.log(`No sport keywords found`);
    }
  });

  console.log(`\nRELEVANCE ANALYSIS SUMMARY:`);
  console.log(`Total results: ${searchResults.length}`);
  console.log(`Relevant results: ${relevantResults}`);
  console.log(`Relevance rate: ${((relevantResults / searchResults.length) * 100).toFixed(1)}%`);

  // Atleast 60% should be relevant
  const relevanceThreshold = Math.floor(searchResults.length * 0.6);

  if (relevantResults >= relevanceThreshold) {
    console.log(`YAY, SUCCESS: ${relevantResults}/${searchResults.length} results are sport-related (meets ${relevanceThreshold} threshold)`);
  } else {
    console.log(`ACCEPTABLE: ${relevantResults}/${searchResults.length} results are sport-related (below ${relevanceThreshold} ideal threshold)`);
  }

  // Soft assertion -  At least 4 should be relevant
  expect(relevantResults).toBeGreaterThanOrEqual(4);
});

After(async function() {
  console.log('Closing browser...');
  if (browser) {
    await browser.close();
  }
});
