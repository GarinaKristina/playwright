import { Locator, Page } from '@playwright/test'

export default abstract class BaseComponent {
  private locator: Locator

  protected constructor(
    private page: Page,
    private selector: string
  ) {
    this.locator = page.locator(selector)
  }

  public getElement(page: Page, locator: string): Locator {
    return page.locator(locator)
  }

  public async click(): Promise<void> {
    await this.locator.click()
  }
}
