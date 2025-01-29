import { Page } from '@playwright/test'
import InventoryPage from './InventoryPage.ts'
import LoginPage from './LoginPage.ts'
import BasePage from './BasePage.ts'

let loginPage: LoginPage
let inventoryPage: InventoryPage

export const initializePages = (page: Page) => {
  loginPage = new LoginPage(page)
  inventoryPage = new InventoryPage(page)
}

export { BasePage, loginPage, inventoryPage }
