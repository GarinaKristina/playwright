import { burgerMenuPage, initializePages, inventoryPage } from 'pages/index.ts'

import { test } from './fixtures/testFixtures.ts'

test.describe('Burger Menu', () => {
  const burgerMenuItems: tBurgerMenuItems[] = ['All Items', 'About', 'Logout', 'Reset App State']

  test.beforeEach(async ({ page, login }) => {
    initializePages(page)
    await login()
    await inventoryPage.validateCurrentUrl(/inventory/)
    await inventoryPage.openBurgerMenu()
  })

  for (const menuItem of burgerMenuItems) {
    test(`Verify menu item ${menuItem} displayed on Burger Menu`, async () => {
      await burgerMenuPage.verifyMenuItemDisplayed(menuItem)
    })
  }
})
