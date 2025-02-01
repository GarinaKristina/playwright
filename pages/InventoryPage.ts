import { expect, Page } from '@playwright/test'
import BasePage from './BasePage.ts'
import { AbstractComponent, Button } from 'components/index.ts'
import { azFilterOrder, zaFilterOrder, lowToHighFilterOrder, highToLowFilterOrder } from 'constants/filterOrder.ts'

export default class InventoryPage extends BasePage {
  private sauceLabsBackpack = new Button(this.page, '#add-to-cart-sauce-labs-backpack')
  private sauceLabsBikeLight = new Button(this.page, '#add-to-cart-sauce-labs-bike-light')
  private sauceLabsBoltTShirt = new Button(this.page, '#add-to-cart-sauce-labs-bolt-t-shirt')
  private sauceLabsFleeceJacket = new Button(this.page, '#add-to-cart-sauce-labs-fleece-jacket')
  private sauceLabsOnesie = new Button(this.page, '#add-to-cart-sauce-labs-onesie')
  private testAllTheThingsTShirtRed = new Button(this.page, 'button[id="add-to-cart-test.allthethings()-t-shirt-(red)"]')
  private cart = new Button(this.page, '#shopping_cart_container')
  private filters = new Button(this.page, '.product_sort_container')
  private container = new AbstractComponent(this.page, '.inventory_item')

  private inventoryItemCardPrice: (item: string) => AbstractComponent
  private inventoryItemCardDescription: (item: string) => AbstractComponent

  constructor(page: Page) {
    super(page)

    this.inventoryItemCardPrice = item =>
      new AbstractComponent(
        this.page,
        `//div[contains(text(),  "${item}")]/ancestor::div[@class="inventory_item"]//div[@class="inventory_item_price"]`
      )
    this.inventoryItemCardDescription = item =>
      new AbstractComponent(
        this.page,
        `//div[contains(text(),  "${item}")]/ancestor::div[@class="inventory_item"]//div[@class="inventory_item_desc"]`
      )
  }

  public async openFilters() {
    await this.filters.click()
  }

  public async verifyFilteredItems(filterName: tFilters) {
    await this.openFilters()
    await this.filters.selectOption(filterName)

    const itemNames = await this.getItemNames()
    const filterActions: Record<tFilters, () => string[]> = {
      'Name (A to Z)': () => azFilterOrder,
      'Name (Z to A)': () => zaFilterOrder,
      'Price (low to high)': () => lowToHighFilterOrder,
      'Price (high to low)': () => highToLowFilterOrder,
    }
    expect(itemNames).toEqual(filterActions[filterName]())
  }

  public async addItemToCart(itemName: tInventoryItems) {
    const cartItemMap: { [itemName: string]: Button } = {
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

  public async verifyFilters(filterName: tFilters) {
    await this.filters.containText(filterName)
  }

  public async verifyItemOnPage(itemName: tInventoryItems) {
    await this.inventoryItemCardPrice(itemName).elementDisplayed()
  }

  public async assertCartHaveItem(itemCount: string) {
    await this.cart.haveText(itemCount)
  }

  public async assertItemHasPrice(itemName: tInventoryItems, price: string) {
    await this.inventoryItemCardPrice(itemName).haveText(price)
  }

  public async assertItemHasDescription(itemName: tInventoryItems, description: string) {
    await this.inventoryItemCardDescription(itemName).haveText(description)
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
