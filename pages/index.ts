import { Page } from '@playwright/test'
import InventoryPage from './InventoryPage.ts'
import { LockedOutUserLoginPage, ProblemUserLoginPage, StandardUserLoginPage } from './LoginPage.ts'
import BasePage from './BasePage.ts'
import BurgerMenuPage from './BurgerMenuPage.ts'
import CartPage from './CartPage.ts'
import CheckoutPage from './CheckoutPage.ts'
import SauceLabsPage from './SauceLabsPage.ts'
import SauceLabsFAQPage from './SauceLabsPage.ts'
import ContactUsPage from './ContactUsPage.ts'

let standardUserLoginPage: StandardUserLoginPage
let lockedOutUserLoginPage: LockedOutUserLoginPage
let inventoryPage: InventoryPage
let burgerMenuPage: BurgerMenuPage
let cartPage: CartPage
let checkoutPage: CheckoutPage
let sauceLabsPage: SauceLabsPage
let sauceLabsFAQPage: SauceLabsFAQPage
let contactUsPage: ContactUsPage
let problemUserLoginPage: ProblemUserLoginPage

export const initializePages = (page: Page) => {
  standardUserLoginPage = new StandardUserLoginPage(page)
  lockedOutUserLoginPage = new LockedOutUserLoginPage(page)
  problemUserLoginPage = new ProblemUserLoginPage(page)
  inventoryPage = new InventoryPage(page)
  burgerMenuPage = new BurgerMenuPage(page)
  cartPage = new CartPage(page)
  checkoutPage = new CheckoutPage(page)
  sauceLabsPage = new SauceLabsPage(page)
  sauceLabsFAQPage = new SauceLabsFAQPage(page)
  contactUsPage = new ContactUsPage(page)
}

export {
  BasePage,
  standardUserLoginPage,
  lockedOutUserLoginPage,
  problemUserLoginPage,
  inventoryPage,
  burgerMenuPage,
  cartPage,
  checkoutPage,
  sauceLabsPage,
  sauceLabsFAQPage,
  contactUsPage,
}
