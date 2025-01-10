import { test, expect } from '@playwright/test';
import { initializePages,homePage } from '../pages';


test('Open web site', async ({page}) => {
    initializePages(page);
await homePage.openBaseWebSite()
})
