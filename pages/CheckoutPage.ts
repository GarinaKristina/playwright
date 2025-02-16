import { Locator, Page } from '@playwright/test'
// import { AbstractComponent, Button, Input } from 'components/index.ts'
import UniqueData from 'helpers/UniqueData.ts'

import BasePage from './BasePage.ts'

type tPriceType = 'itemTotalPrice' | 'totalPrice' | 'tax'

export default class CartPage extends BasePage {
  private firstName: Locator = this.page.locator('#first-name')
  private lastName: Locator = this.page.locator('#last-name')
  private postalCode: Locator = this.page.locator('#postal-code')
  private continue: Locator = this.page.locator('#continue')
  private cancel: Locator = this.page.locator('#cancel')
  private itemTotalPrice: Locator = this.page.locator('.summary_subtotal_label')
  private totalPrice: Locator = this.page.locator('.summary_total_label')
  private tax: Locator = this.page.locator('.summary_tax_label')
  private finish: Locator = this.page.locator('#finish')
  private error: Locator = this.page.locator('.error-message-container.error')

  //Complete
  private completeHeder: Locator = this.page.locator('.complete-header')
  private completeText: Locator = this.page.locator('.complete-text')
  private backHome: Locator = this.page.locator('#back-to-products')

  constructor(page: Page) {
    super(page)
  }

  public async fillClientData() {
    await this.firstName.fill(UniqueData.firstName)
    await this.lastName.fill(UniqueData.lastName)
    await this.postalCode.fill(UniqueData.zipCode)
  }

  public async clickContinue() {
    await this.continue.click()
  }

  public async clickFinish() {
    await this.finish.click()
  }

  public async clickCancel() {
    await this.cancel.click()
  }

  public async goToInventoryPage() {
    await this.backHome.click()
  }
  public async verifyPrice(priceType: tPriceType, price: string) {
    const priceMap: { [key in tPriceType]: Locator } = {
      itemTotalPrice: this.itemTotalPrice,
      totalPrice: this.totalPrice,
      tax: this.tax,
    }
    await priceMap[priceType].containText(price)
  }

  public async verifyCompleteHeader() {
    await this.completeHeder.containText('Thank you for your order!')
  }

  public async verifyCompleteText() {
    await this.completeText.containText('Your order has been dispatched, and will arrive just as fast as the pony can get there!')
  }

  public async verifyErrorMessage() {
    await this.error.isElementVisible()
  }
}
