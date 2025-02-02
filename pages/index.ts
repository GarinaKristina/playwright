import { Page } from '@playwright/test'
import InventoryPage from './InventoryPage.ts'
import LoginPage from './LoginPage.ts'
import BasePage from './BasePage.ts'
import BurgerMenuPage from './BurgerMenuPage.ts'
import CartPage from './CartPage.ts'
import CheckoutPage from './CheckoutPage.ts'
import SauceLabsPage from './SauceLabsPage.ts'
import SauceLabsFAQPage from './SauceLabsPage.ts'

let loginPage: LoginPage
let inventoryPage: InventoryPage
let burgerMenuPage: BurgerMenuPage
let cartPage: CartPage
let checkoutPage: CheckoutPage
let sauceLabsPage: SauceLabsPage
let sauceLabsFAQPage: SauceLabsFAQPage

export const initializePages = (page: Page) => {
  loginPage = new LoginPage(page)
  inventoryPage = new InventoryPage(page)
  burgerMenuPage = new BurgerMenuPage(page)
  cartPage = new CartPage(page)
  checkoutPage = new CheckoutPage(page)
  sauceLabsPage = new SauceLabsPage(page)
  sauceLabsFAQPage = new SauceLabsFAQPage(page)
}

export { BasePage, loginPage, inventoryPage, burgerMenuPage, cartPage, checkoutPage, sauceLabsPage, sauceLabsFAQPage }
