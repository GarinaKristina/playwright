import { test} from '@playwright/test';
import { initializePages,homePage } from '../pages';


test.beforeEach(async ({ page }) => {
      initializePages(page)
});

test('Open web site', async ({page}) => {
   await homePage.openBaseWebSite()
})
