import { Page } from '@playwright/test'
import BasePage from './BasePage'
import InventoryPage from './InventoryPage'
import LoginPage from './LoginPage'

let loginPage: LoginPage
let inventoryPage: InventoryPage

export const initializePages = (page: Page) => {
  loginPage = new LoginPage(page)
  inventoryPage = new InventoryPage(page)
}

export { BasePage, loginPage, inventoryPage }
