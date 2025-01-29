import { Page } from '@playwright/test'
import defineConfig from '../playwright.config.ts'
import { Button, Input } from '../components/index.ts'
import BasePage from './BasePage.ts'

export default class LoginPage extends BasePage {
  private logIn = new Button(this.page, '#login-button')
  private userName = new Input(this.page, '#user-name')
  private password = new Input(this.page, '#password')

  readonly baseURL = defineConfig.use!.baseURL as string

  constructor(page: Page) {
    super(page)
  }

  public async openBaseWebSite() {
    await super.openPage(this.baseURL)
  }

  public async login() {
    await this.userName.fill('standard_user')
    await this.password.fill('secret_sauce')
    await this.logIn.click()
  }
}
