import { expect, type Page } from '@playwright/test'
import Logger from 'helpers/Logger.ts'

export default class BasePage {
  protected readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  public async openPage(link: string): Promise<void> {
    await this.page.goto(link)
    Logger.info(`BasePage.openPage] Navigated to ${link}`)
  }

  public async validateCurrentUrl(url: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(url)
  }

  public async wheelMouse(x: number = 0, y: number = 1000): Promise<void> {
    await this.page.mouse.wheel(x, y)
  }
}
