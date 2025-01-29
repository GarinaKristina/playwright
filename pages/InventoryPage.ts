import { Page } from '@playwright/test'
import { Button } from '../components/index.ts'
import BasePage from './BasePage.ts'

type tAddToCartItems =
  | 'Sauce Labs Backpack'
  | 'Sauce Labs Bike Light'
  | 'Sauce Labs Bolt T-Shirt'
  | 'Sauce Labs Fleece Jacket'
  | 'Sauce Labs Onesie'
  | 'Test.allTheThings() T-Shirt (Red)'

export default class InventoryPage extends BasePage {
  private sauceLabsBackpack = new Button(this.page, '#add-to-cart-sauce-labs-backpack')
  private sauceLabsBikeLight = new Button(this.page, '#add-to-cart-sauce-labs-bike-light')
  private sauceLabsBoltTShirt = new Button(this.page, '#add-to-cart-sauce-labs-bolt-t-shirt')
  private sauceLabsFleeceJacket = new Button(this.page, '#add-to-cart-sauce-labs-fleece-jacket')
  private sauceLabsOnesie = new Button(this.page, '#add-to-cart-sauce-labs-onesie')
  private testAllTheThingsTShirtRed = new Button(this.page, 'button[id="add-to-cart-test.allthethings()-t-shirt-(red)"]')
  private cart = new Button(this.page, '#shopping_cart_container')

  constructor(page: Page) {
    super(page)
  }

  public async addItemToCart(itemName: tAddToCartItems) {
    const cartItemMap: { [key: string]: Button } = {
      'Sauce Labs Backpack': this.sauceLabsBackpack,
      'Sauce Labs Bike Light': this.sauceLabsBikeLight,
      'Sauce Labs Bolt T-Shirt': this.sauceLabsBoltTShirt,
      'Sauce Labs Fleece Jacket': this.sauceLabsFleeceJacket,
      'Sauce Labs Onesie': this.sauceLabsOnesie,
      'Test.allTheThings() T-Shirt (Red)': this.testAllTheThingsTShirtRed,
    }

    const element = cartItemMap[itemName]
    await element.click()
  }

  public async assertCartHaveItem(itemCount: string) {
    await this.cart.toHaveValue(itemCount)
  }
}
