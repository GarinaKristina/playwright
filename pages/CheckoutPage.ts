import { Page } from '@playwright/test'
import BasePage from './BasePage.ts'
import { AbstractComponent, Button, Input } from 'components/index.ts'
import UniqueData from 'helpers/UniqueData.ts'

type tPriceType = 'itemTotalPrice' | 'totalPrice' | 'tax'

export default class CartPage extends BasePage {
  private firstName = new Input(this.page, '#first-name')
  private lastName = new Input(this.page, '#last-name')
  private postalCode = new Input(this.page, '#postal-code')
  private continue = new Button(this.page, '#continue')
  // private cancel = new Button(this.page, '#cancel')
  private itemTotalPrice = new AbstractComponent(this.page, '.summary_subtotal_label')
  private totalPrice = new AbstractComponent(this.page, '.summary_total_label')
  private tax = new AbstractComponent(this.page, '.summary_tax_label')
  private finish = new Button(this.page, '#finish')

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

  public async verifyPrice(priceType: tPriceType, price: string) {
    const priceMap: { [key in tPriceType]: AbstractComponent } = {
      itemTotalPrice: this.itemTotalPrice,
      totalPrice: this.totalPrice,
      tax: this.tax,
    }
    await priceMap[priceType].containText(price)
  }
}
