import { expect, Locator, Page } from '@playwright/test'
// import { Button } from 'components/index.ts'
import Logger from 'helpers/Logger.ts'

import BasePage from './BasePage.ts'

export default class BurgerMenuPage extends BasePage {
  private about: Locator = this.page.locator('#about_sidebar_link')
  private logout: Locator = this.page.locator('#logout_sidebar_link')
  private resetAppState: Locator = this.page.locator('#reset_sidebar_link')
  private allItems: Locator = this.page.locator('#inventory_sidebar_link')

  constructor(page: Page) {
    super(page)
  }

  public async open(menuItem: tBurgerMenuItems) {
    try {
      const menuItemMap: { [key in tBurgerMenuItems]: Locator } = {
        About: this.about,
        Logout: this.logout,
        'Reset App State': this.resetAppState,
        'All Items': this.allItems,
      }
      await menuItemMap[menuItem].click()
      Logger.info(`BurgerMenuPage.open] Burger menu [${menuItem}] opened`)
    } catch {
      Logger.error(`BurgerMenuPage.open] Burger menu [${menuItem}] not opened`)
    }
  }

  public async verifyMenuItemDisplayed(menuItem: tBurgerMenuItems) {
    const menuItemMap: { [key in tBurgerMenuItems]: Locator } = {
      About: this.about,
      Logout: this.logout,
      'Reset App State': this.resetAppState,
      'All Items': this.allItems,
    }
    await expect(menuItemMap[menuItem]).toBeEnabled()
    Logger.info(`BurgerMenuPage.verifyMenuItemDisplayed] Burger menu [${menuItem}] displayed`)
  }
}
