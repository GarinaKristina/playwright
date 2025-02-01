import { test } from '@playwright/test'
import { INVENTORY } from 'constants/items.ts'
import { cartPage, initializePages, inventoryPage, loginPage } from 'pages/index.ts'

test.describe('Cart/ Basket', () => {
  const inventoryKeys = Object.keys(INVENTORY) as tInventoryItems[]

  test.beforeEach(async ({ page }) => {
    initializePages(page)
    await loginPage.openBaseWebSite()
    await loginPage.login()
    await inventoryPage.validateCurrentUrl(/inventory/)
  })

  test('Verify items added to cart', async () => {
    for (const item of inventoryKeys) {
      await inventoryPage.verifyItemOnPage(item)
      await inventoryPage.addItemToCart(item)
    }

    await inventoryPage.assertCartHaveItem('6')
    await inventoryPage.openCart()
    await inventoryPage.validateCurrentUrl(/cart/)
    for (const item of inventoryKeys) {
      await cartPage.verifyItems(item)
    }

    await cartPage.clickContinueShopping()
    await inventoryPage.validateCurrentUrl(/inventory/)
    await inventoryPage.openCart()
    await cartPage.goToCheckout()
    await inventoryPage.validateCurrentUrl(/checkout-step-one/)
  })
})
