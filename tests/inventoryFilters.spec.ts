import { test } from '@playwright/test'
import { getLoginPage } from 'helpers/getLoginPage.ts'
import { initializePages, inventoryPage } from 'pages/index.ts'

test.describe('Inventory Filters', () => {
  test.beforeEach(async ({ page }) => {
    initializePages(page)
    const loginPage = getLoginPage(page)
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

  test(`Verify filtered Items on Inventory Page`, async () => {
    await inventoryPage.verifyFilteredItems('Name (Z to A)')
    await inventoryPage.verifyFilteredItems('Price (high to low)')
    await inventoryPage.verifyFilteredItems('Price (low to high)')
    await inventoryPage.verifyFilteredItems('Name (A to Z)')
  })
})
