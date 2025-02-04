import { Page } from '@playwright/test'
import { Button } from 'components/index.ts'
import Logger from 'helpers/Logger.ts'

import BasePage from './BasePage.ts'

export default class BurgerMenuPage extends BasePage {
  private about = new Button(this.page, '#about_sidebar_link')
  private logout = new Button(this.page, '#logout_sidebar_link')
  private resetAppState = new Button(this.page, '#reset_sidebar_link')
  private allItems = new Button(this.page, '#inventory_sidebar_link')

  constructor(page: Page) {
    super(page)
  }

  public async open(menuItem: tBurgerMenuItems) {
    try {
      const menuItemMap: { [key in tBurgerMenuItems]: Button } = {
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
    const menuItemMap: { [key in tBurgerMenuItems]: Button } = {
      About: this.about,
      Logout: this.logout,
      'Reset App State': this.resetAppState,
      'All Items': this.allItems,
    }
    await menuItemMap[menuItem].isElementVisible()
    Logger.info(`BurgerMenuPage.verifyMenuItemDisplayed] Burger menu [${menuItem}] displayed`)
  }
}
