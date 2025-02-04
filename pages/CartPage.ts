import { expect, Page } from '@playwright/test'
import { AbstractComponent, Button } from 'components/index.ts'
import Logger from 'helpers/Logger.ts'

import BasePage from './BasePage.ts'

export default class CartPage extends BasePage {
  private container = new AbstractComponent(this.page, '.cart_item')
  private continueShopping = new AbstractComponent(this.page, '#continue-shopping')
  private checkout = new AbstractComponent(this.page, '#checkout')
  private removeSauceLab = new Button(this.page, '#remove-sauce-labs-backpack')

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
