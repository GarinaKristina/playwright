import { expect, Locator, Page } from '@playwright/test'
import Logger from 'helpers/Logger.ts'

import BasePage from './BasePage.ts'

export default class CartPage extends BasePage {
  private container: Locator = this.page.locator('.cart_item')
  private continueShopping: Locator = this.page.locator('#continue-shopping')
  private checkout: Locator = this.page.locator('#checkout')
  private removeSauceLab: Locator = this.page.locator('#remove-sauce-labs-backpack')

  constructor(page: Page) {
    super(page)
  }

  public async clickContinueShopping() {
    await this.continueShopping.click()
  }

  public async goToCheckout() {
    await this.checkout.click()
  }

  public async remove() {
    await this.removeSauceLab.click()
  }

  public async verifyItems(itemName: tInventoryItems) {
    const itemNames = await this.getItemNames()
    expect(itemNames).toContain(itemName)
  }

  private async getItemNames(): Promise<string[]> {
    const items = await this.container.all()
    const itemNames = await Promise.all(
      items.map(async item => {
        return (await item.locator('.inventory_item_name').innerText()).trim()
      })
    )
    Logger.info(`CartPage.getItemNames] Item names: [${itemNames}]`)
    return itemNames
  }
}
