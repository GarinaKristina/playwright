import { test } from '@playwright/test'
import { initializePages, inventoryPage, loginPage } from 'pages/index.ts'

test.beforeEach(async ({ page }) => {
  initializePages(page)
  await loginPage.openBaseWebSite()
  await loginPage.login()
  await inventoryPage.validateCurrentUrl(/inventory/)
})

test(`Verify filters on Inventory Page`, async () => {
  const filters: tFilters[] = ['Name (A to Z)', 'Name (Z to A)', 'Price (low to high)', 'Price (high to low)']

  await inventoryPage.openFilters()
  for (const filter of filters) {
    await inventoryPage.verifyFilters(filter)
  }
})
