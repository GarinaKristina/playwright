import { Page } from '@playwright/test';
import BasePage from './BasePage';

export default class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async openBaseWebSite() {
    await this.openPage('https://demoqa.com/');
  }
}