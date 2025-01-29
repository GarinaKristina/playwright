import { Locator, Page, expect } from '@playwright/test'
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

  public async toHaveValue(expectedText: string) {
    await expect(this.locator).toHaveText(expectedText)
  }
}
