import { test } from '@playwright/test'
import { INVENTORY } from 'constants/items.ts'
import { getLoginPage } from 'helpers/getLoginPage.ts'
import { cartPage, checkoutPage, initializePages, inventoryPage } from 'pages/index.ts'

test.describe('Cart/ Basket', () => {
  const inventoryKeys = Object.keys(INVENTORY) as tInventoryItems[]

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
    await inventoryPage.openCart()
    await inventoryPage.validateCurrentUrl(/cart/)
    for (const item of inventoryKeys) {
      await cartPage.verifyItems(item)
    }

    await cartPage.clickContinueShopping()
    await inventoryPage.validateCurrentUrl(/inventory/)

    await inventoryPage.openCart()
    await inventoryPage.assertCartHaveItem('6')
    await cartPage.goToCheckout()
    await inventoryPage.validateCurrentUrl(/checkout-step-one/)

    await checkoutPage.fillClientData()
    await checkoutPage.clickContinue()
    await checkoutPage.verifyPrice('totalPrice', '$140.34')
    await checkoutPage.verifyPrice('itemTotalPrice', '$129.94')
    await checkoutPage.verifyPrice('tax', '$10.40')
    await checkoutPage.clickFinish()
    await checkoutPage.validateCurrentUrl(/checkout-complete/)

    await checkoutPage.verifyCompleteHeader()
    await checkoutPage.verifyCompleteText()
    await checkoutPage.goToInventoryPage()
    await inventoryPage.validateCurrentUrl(/inventory/)
  })
})
