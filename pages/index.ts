import { Page } from '@playwright/test'
import BasePage from './BasePage'
import HomePage from './HomePage'
import LoginPage from './LoginPage'

let loginPage: LoginPage
let homePage: HomePage

export const initializePages = (page: Page) => {
  loginPage = new LoginPage(page)
  homePage = new HomePage(page)
}

export { BasePage, loginPage, homePage }
