import { expect, Page } from '@playwright/test'
import BasePage from './BasePage.ts'

export default class HomePage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  public async validateCurrentUrl(url: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(url)
  }
}
