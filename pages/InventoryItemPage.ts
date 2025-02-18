import { Locator, Page } from '@playwright/test'

import BasePage from './BasePage.ts'

export default class InventoryItemPage extends BasePage {
  private addToCart: Locator = this.page.locator('#add-to-cart')
  constructor(page: Page) {
    super(page)
  }

  public async addItemToCart() {
    await this.addToCart.click()
  }
}
