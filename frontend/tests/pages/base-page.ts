import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async navigateTo(url: string) {
    console.log(`Navigating to: ${url}`);
    try {
      await this.page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 45000
      });
      console.log('Navigation successful');
    } catch (error) {
      console.log(`Failed to navigate to ${url}:`, error);
      throw error;
    }
  }

  async waitForElement(selector: string, timeout = 10000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  async click(selector: string) {
    await this.page.click(selector);
  }

  async type(selector: string, text: string) {
    await this.page.fill(selector, text);
  }

  async waitForTimeout(ms: number) {
    await this.page.waitForTimeout(ms);
  }
}
