import { azFilterOrder, zaFilterOrder, lowToHighFilterOrder, highToLowFilterOrder } from 'constants/filterOrder.ts'

import { expect, Locator, Page } from '@playwright/test'

import BasePage from './BasePage.ts'

export default class InventoryPage extends BasePage {
  private sauceLabsBackpack: Locator = this.page.locator('#add-to-cart-sauce-labs-backpack')
  private sauceLabsBikeLight: Locator = this.page.locator('#add-to-cart-sauce-labs-bike-light')
  private sauceLabsBoltTShirt: Locator = this.page.locator('#add-to-cart-sauce-labs-bolt-t-shirt')
  private sauceLabsFleeceJacket: Locator = this.page.locator('#add-to-cart-sauce-labs-fleece-jacket')
  private sauceLabsOnesie: Locator = this.page.locator('#add-to-cart-sauce-labs-onesie')
  private testAllTheThingsTShirtRed: Locator = this.page.locator('button[id="add-to-cart-test.allthethings()-t-shirt-(red)"]')
  private cart: Locator = this.page.locator('#shopping_cart_container')
  private filters: Locator = this.page.locator('.product_sort_container')
  private container: Locator = this.page.locator('.inventory_item')
  private burgerMenu: Locator = this.page.locator('#react-burger-menu-btn')

  private inventoryItemCardPrice: (item: string) => Locator
  private inventoryItemCardDescription: (item: string) => Locator
  private item: (itemName: string) => Locator

  constructor(page: Page) {
    super(page)

    this.inventoryItemCardPrice = item =>
      this.page.locator(`//div[contains(text(),  "${item}")]/ancestor::div[@class="inventory_item"]//div[@class="inventory_item_price"]`)
    this.inventoryItemCardDescription = item =>
      this.page.locator(`//div[contains(text(),  "${item}")]/ancestor::div[@class="inventory_item"]//div[@class="inventory_item_desc"]`)
    this.item = itemName => this.page.locator(`//div[normalize-space()='${itemName}']`)
  }

  public async openFilters() {
    await this.filters.click()
  }

  public async openBurgerMenu() {
    await this.burgerMenu.click()
  }

  public async openCart() {
    await this.cart.click()
  }

  public async clickOnItemCard(itemName: tInventoryItems) {
    await this.item(itemName).click()
  }

  public async addItemToCart(itemName: tInventoryItems) {
    const cartItemMap: { [itemName: string]: Locator } = {
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

  public async verifyFilters(filterName: tFilters) {
    await expect(this.filters).toContainText(filterName)
  }

  public async verifyItemOnPage(itemName: tInventoryItems) {
    await expect(this.inventoryItemCardPrice(itemName)).toBeEnabled()
  }

  public async assertCartHaveItem(itemCount: string) {
    await expect(this.cart).toHaveText(itemCount)
  }

  public async assertItemHasPrice(itemName: tInventoryItems, price: string) {
    await expect(this.inventoryItemCardPrice(itemName)).toHaveText(price)
  }

  public async assertItemHasDescription(itemName: tInventoryItems, description: string) {
    await expect(this.inventoryItemCardDescription(itemName)).toHaveText(description)
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
