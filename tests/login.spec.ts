import { test } from '@playwright/test'
import { inventoryPage, initializePages, loginPage } from '../pages'

test.beforeEach(async ({ page }) => {
  initializePages(page)
})

test('Verify login to website', async () => {
  await loginPage.openBaseWebSite()
  await loginPage.login()
  await inventoryPage.validateCurrentUrl(/inventory/)
})
