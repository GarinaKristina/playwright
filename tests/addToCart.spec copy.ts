import { test } from '@playwright/test'
import { initializePages, inventoryPage, loginPage } from 'pages/index.ts'

test.beforeEach(async ({ page }) => {
  initializePages(page)
})

test('Verify items added to cart', async () => {
  await loginPage.openBaseWebSite()
  await loginPage.login()
  await inventoryPage.validateCurrentUrl(/inventory/)
  await inventoryPage.addItemToCart('Sauce Labs Backpack')
  await inventoryPage.addItemToCart('Sauce Labs Bike Light')
  await inventoryPage.addItemToCart('Sauce Labs Bolt T-Shirt')
  await inventoryPage.addItemToCart('Sauce Labs Fleece Jacket')
  await inventoryPage.addItemToCart('Sauce Labs Onesie')
  await inventoryPage.addItemToCart('Test.allTheThings() T-Shirt (Red)')
  await inventoryPage.assertCartHaveItem('6')
})
