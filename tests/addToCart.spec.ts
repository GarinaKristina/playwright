import { test } from '@playwright/test'
import { initializePages, inventoryPage, loginPage } from 'pages/index.ts'

test.beforeEach(async ({ page }) => {
  initializePages(page)
})

test('Verify items added to cart', async () => {
  const items: tAddToCartItems[] = [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Fleece Jacket',
    'Sauce Labs Onesie',
    'Test.allTheThings() T-Shirt (Red)',
  ]

  await loginPage.openBaseWebSite()
  await loginPage.login()
  await inventoryPage.validateCurrentUrl(/inventory/)

  for (const item of items) {
    await inventoryPage.addItemToCart(item)
  }

  await inventoryPage.assertCartHaveItem('6')
})
