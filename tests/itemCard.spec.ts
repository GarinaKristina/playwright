import { test } from '@playwright/test'
import { initializePages, inventoryPage, loginPage } from 'pages/index.ts'

test.beforeEach(async ({ page }) => {
  initializePages(page)
})

test('Verify items added to cart', async () => {
  await loginPage.openBaseWebSite()
  await loginPage.login()
  await inventoryPage.verifyItemOnPage('Sauce Labs Backpack')
})
