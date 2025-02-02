import { test } from '@playwright/test'
import { burgerMenuPage, initializePages, inventoryPage, loginPage } from 'pages/index.ts'

test.describe('Burger Menu', () => {
  const burgerMenuItems: tBurgerMenuItems[] = ['All Items', 'About', 'Logout', 'Reset App State']

  test.beforeEach(async ({ page }) => {
    initializePages(page)
    await loginPage.openBaseWebSite()
    await loginPage.login()
    await inventoryPage.validateCurrentUrl(/inventory/)
    await inventoryPage.openBurgerMenu()
  })

  for (const menuItem of burgerMenuItems) {
    test(`Verify menu item ${menuItem} displayed on Burger Menu`, async () => {
      await burgerMenuPage.verifyMenuItemDisplayed(menuItem)
    })
  }
})
