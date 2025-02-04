import { INVENTORY } from 'constants/items.ts'

import { test } from '@playwright/test'
import { getLoginPage } from 'helpers/getLoginPage.ts'
import { burgerMenuPage, cartPage, checkoutPage, initializePages, inventoryItemPage, inventoryPage } from 'pages/index.ts'

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

  test('Verify order with empty cart', async () => {
    await inventoryPage.clickOnItemCard('Sauce Labs Backpack')
    await inventoryItemPage.addItemToCart()
    await inventoryPage.assertCartHaveItem('1')
    await inventoryPage.openCart()
    await cartPage.remove()
    await cartPage.goToCheckout()

    await checkoutPage.fillClientData()
    await checkoutPage.clickContinue()
    await checkoutPage.verifyPrice('totalPrice', '$0.00')
    await checkoutPage.verifyPrice('itemTotalPrice', '$0')
    await checkoutPage.verifyPrice('tax', '$0.0')
    await checkoutPage.clickFinish()
    await checkoutPage.validateCurrentUrl(/checkout-complete/)

    await checkoutPage.verifyCompleteHeader()
    await checkoutPage.verifyCompleteText()
    await checkoutPage.goToInventoryPage()
    await inventoryPage.validateCurrentUrl(/inventory/)
  })

  test('Verify no fill order data', async () => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack')
    await inventoryPage.openCart()
    await cartPage.goToCheckout()
    await checkoutPage.clickContinue()
    await checkoutPage.verifyErrorMessage()
  })

  test('Verify order with an ever-changing list', async () => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack')
    await inventoryPage.assertCartHaveItem('1')
    await inventoryPage.openCart()
    await cartPage.clickContinueShopping()

    await inventoryPage.addItemToCart('Sauce Labs Bike Light')
    await inventoryPage.assertCartHaveItem('2')
    await inventoryPage.openCart()
    await cartPage.clickContinueShopping()

    await inventoryPage.addItemToCart('Sauce Labs Onesie')
    await inventoryPage.assertCartHaveItem('3')
    await inventoryPage.openCart()
    await cartPage.goToCheckout()
    await checkoutPage.fillClientData()
    await checkoutPage.clickContinue()
    await checkoutPage.verifyPrice('totalPrice', '$51.81')
    await checkoutPage.verifyPrice('itemTotalPrice', '$47.97')
    await checkoutPage.verifyPrice('tax', '$3.84')
    await checkoutPage.clickCancel()
    await inventoryPage.validateCurrentUrl(/inventory/)

    await inventoryPage.openCart()
    await cartPage.goToCheckout()
    await checkoutPage.fillClientData()
    await checkoutPage.clickContinue()
    await checkoutPage.verifyPrice('totalPrice', '$51.81')
    await checkoutPage.verifyPrice('itemTotalPrice', '$47.97')
    await checkoutPage.verifyPrice('tax', '$3.84')
    await checkoutPage.clickFinish()
  })

  test('Verify added item be stored on the cart after re-login', async ({ page }) => {
    const loginPage = getLoginPage(page)
    await inventoryPage.addItemToCart('Sauce Labs Backpack')
    await inventoryPage.assertCartHaveItem('1')
    await inventoryPage.openCart()
    await cartPage.clickContinueShopping()
    await inventoryPage.assertCartHaveItem('1')
    await inventoryPage.openBurgerMenu()
    await burgerMenuPage.open('Logout')
    await loginPage.login()
    await inventoryPage.validateCurrentUrl(/inventory/)
    await inventoryPage.assertCartHaveItem('1')
  })
})
