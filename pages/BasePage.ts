import { type Page } from '@playwright/test'

export default class BasePage {
  protected readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  public async openPage(link: string) {
    await this.page.goto(link)
  }
}
