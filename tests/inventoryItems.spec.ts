import { INVENTORY } from 'constants/items.ts'

import { test } from '@playwright/test'

import { getLoginPage } from 'helpers/getLoginPage.ts'
import { initializePages, inventoryPage } from 'pages/index.ts'

const inventoryKeys = Object.keys(INVENTORY) as tInventoryItems[]

test.describe('Inventory Items', () => {
  test.beforeEach(async ({ page }) => {
    initializePages(page)
    const loginPage = getLoginPage(page)
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

    for (const item of inventoryKeys) {
      await inventoryPage.assertItemHasPrice(item, INVENTORY[item].price)
      await inventoryPage.assertItemHasDescription(item, INVENTORY[item].description)
    }
  })
})
