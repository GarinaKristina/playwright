import { Page } from '@playwright/test'
import { Button } from 'components/index.ts'

import BasePage from './BasePage.ts'

export default class InventoryItemPage extends BasePage {
  private addToCart: Button = this.page.locator('#add-to-cart')
  constructor(page: Page) {
    super(page)
  }

  public async addItemToCart() {
    await this.addToCart.click()
  }
}
