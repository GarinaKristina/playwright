
import { Page } from '@playwright/test';
import BasePage from './BasePage';
import HomePage from './HomePage';

let homePage: HomePage

export const initializePages = (page: Page) => {
  homePage = new HomePage(page);
};

export { BasePage, homePage };
