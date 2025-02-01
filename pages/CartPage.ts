import { expect, Page } from '@playwright/test'
import BasePage from './BasePage.ts'
import { AbstractComponent } from 'components/index.ts'

export default class CartPage extends BasePage {
  private container = new AbstractComponent(this.page, '.cart_item')
  private continueShopping = new AbstractComponent(this.page, '#continue-shopping')
  private checkout = new AbstractComponent(this.page, '#checkout')

  constructor(page: Page) {
    super(page)
  }

  public async clickContinueShopping() {
    await this.continueShopping.click()
  }

  public async goToCheckout() {
    await this.checkout.click()
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
    return itemNames
  }
}
