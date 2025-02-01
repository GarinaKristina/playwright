import { Page } from '@playwright/test'
import InventoryPage from './InventoryPage.ts'
import LoginPage from './LoginPage.ts'
import BasePage from './BasePage.ts'
import BurgerMenuPage from './BurgerMenuPage.ts'
import CartPage from './CartPage.ts'

let loginPage: LoginPage
let inventoryPage: InventoryPage
let burgerMenuPage: BurgerMenuPage
let cartPage: CartPage

export const initializePages = (page: Page) => {
  loginPage = new LoginPage(page)
  inventoryPage = new InventoryPage(page)
  burgerMenuPage = new BurgerMenuPage(page)
  cartPage = new CartPage(page)
}

export { BasePage, loginPage, inventoryPage, burgerMenuPage, cartPage }
