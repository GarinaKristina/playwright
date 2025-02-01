import { Page } from '@playwright/test'
import InventoryPage from './InventoryPage.ts'
import LoginPage from './LoginPage.ts'
import BasePage from './BasePage.ts'
import BurgerMenuPage from './BurgerMenuPage.ts'
import CartPage from './CartPage.ts'
import CheckoutPage from './CheckoutPage.ts'

let loginPage: LoginPage
let inventoryPage: InventoryPage
let burgerMenuPage: BurgerMenuPage
let cartPage: CartPage
let checkoutPage: CheckoutPage

export const initializePages = (page: Page) => {
  loginPage = new LoginPage(page)
  inventoryPage = new InventoryPage(page)
  burgerMenuPage = new BurgerMenuPage(page)
  cartPage = new CartPage(page)
  checkoutPage = new CheckoutPage(page)
}

export { BasePage, loginPage, inventoryPage, burgerMenuPage, cartPage, checkoutPage }
