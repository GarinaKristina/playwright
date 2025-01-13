import { expect, type Locator, type Page } from '@playwright/test'
const { webkit } = require('playwright')

let currentPage

export default class BasePage {
  protected readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  public async newPage() {
    const browser = await webkit.launch()
    const context = await browser.newContext()
    const page = await context.newPage()
    return page
  }

  public async newPageIfNeeded() {
    if (!currentPage) {
      const browser = await webkit.launch()
      const context = await browser.newContext()
      currentPage = await context.newPage()
    }
    return currentPage
  }

  public async openPage(path = '') {
    const page = await this.newPageIfNeeded()
    await page.goto(`${'https://demoqa.com/'}${path}`)
  }

  //  public async getElement(selector: string) {
  //   const page = await this.newPageIfNeeded();
  //   const locator = page.locator(selector);
  //   return locator;
  // }
}
