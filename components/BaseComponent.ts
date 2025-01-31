import { expect, Locator, Page } from '@playwright/test'

export default abstract class BaseComponent {
  public locator: Locator

  protected constructor(
    private page: Page,
    private selector: string
  ) {
    this.locator = page.locator(selector)
  }

  public async click(): Promise<void> {
    await this.locator.click()
  }

  public async toHaveText(expectedText: string): Promise<void> {
    await expect(this.locator).toHaveText(expectedText)
  }

  public async elementDisplayed(): Promise<void> {
    await expect(this.locator).toBeEnabled()
  }
}
