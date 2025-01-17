import { Page } from '@playwright/test'
import BasePage from './BasePage'
import { Button } from '../components'

export default class HomePage extends BasePage {
  private logIn = new Button(this.page, '#login-button')
  constructor(page: Page) {
    super(page)
  }

  public async openBaseWebSite() {
    await this.openPage('https://www.saucedemo.com/')
  }

  public async login() {
    await this.logIn.click()
  }
}
