import { Page } from '@playwright/test'
import BasePage from './BasePage.ts'
import { Button } from 'components/index.ts'

export default class BurgerMenuPage extends BasePage {
  private about = new Button(this.page, '#about_sidebar_link')
  private logout = new Button(this.page, '#logout_sidebar_link')
  private resetAppState = new Button(this.page, '#reset_sidebar_link')
  private allItems = new Button(this.page, '#inventory_sidebar_link')

  constructor(page: Page) {
    super(page)
  }

  public async open(menuItem: tBurgerMenuItems) {
    const menuItemMap: { [key in tBurgerMenuItems]: Button } = {
      About: this.about,
      Logout: this.logout,
      'Reset App State': this.resetAppState,
      'All Items': this.allItems,
    }
    await menuItemMap[menuItem].click()
  }

  public async verifyMenuItemDisplayed(menuItem: tBurgerMenuItems) {
    const menuItemMap: { [key in tBurgerMenuItems]: Button } = {
      About: this.about,
      Logout: this.logout,
      'Reset App State': this.resetAppState,
      'All Items': this.allItems,
    }
    await menuItemMap[menuItem].isElementVisible()
  }
}
