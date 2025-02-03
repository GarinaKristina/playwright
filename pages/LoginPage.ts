import { Page } from '@playwright/test'
import defineConfig from '../playwright.config.ts'
import BasePage from './BasePage.ts'
import { AbstractComponent, Button, Input } from '../components/index.ts'
import Logger from 'helpers/Logger.ts'

abstract class LoginPage extends BasePage {
  protected logIn = new Button(this.page, '#login-button')
  protected userName = new Input(this.page, '#user-name')
  protected password = new Input(this.page, '#password')
  protected errorContainer = new AbstractComponent(this.page, 'h3[data-test="error"]')

  readonly baseURL = defineConfig.use!.baseURL as string
  readonly passwordData = 'secret_sauce'

  constructor(page: Page) {
    super(page)
  }

  public async login(username?: string, password?: string) {
    await this.openBaseWebSite()
    await this.enterCredentials(username, password)
    await this.submitLogin()
    await this.checkAuthentication()
  }

  protected abstract enterCredentials(username?: string, password?: string): Promise<void>
  protected abstract submitLogin(): Promise<void>
  protected abstract checkAuthentication(): Promise<void>

  public async openBaseWebSite() {
    await super.openPage(this.baseURL)
  }
}
export class StandardUserLoginPage extends LoginPage {
  protected async enterCredentials(username = 'standard_user', password = this.passwordData) {
    await this.userName.fill(username)
    await this.password.fill(password)
  }

  protected async submitLogin() {
    await this.logIn.click()
  }

  protected async checkAuthentication() {
    await this.page.waitForURL('https://www.saucedemo.com/inventory.html')
    Logger.http('Standard user login successful')
  }
}

export class ProblemUserLoginPage extends LoginPage {
  protected async enterCredentials(username = 'problem_user', password = this.passwordData) {
    await this.userName.fill(username)
    await this.password.fill(password)
  }

  protected async submitLogin() {
    await this.logIn.click()
  }

  protected async checkAuthentication() {
    const errorMessage = await this.errorContainer.getAllTextContents()
    Logger.http(`Problem user login error:', ${errorMessage}`)
  }
}

export class LockedOutUserLoginPage extends LoginPage {
  protected async enterCredentials(username = 'locked_out_user', password = this.passwordData) {
    await this.userName.fill(username)
    await this.password.fill(password)
  }

  protected async submitLogin() {
    await this.logIn.click()
  }

  protected async checkAuthentication() {
    const errorMessage = await this.errorContainer.getAllTextContents()
    Logger.http(`Locked out user login error:', ${errorMessage}`)
  }
}
