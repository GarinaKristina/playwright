import { Page } from '@playwright/test'
import { BaseComponent, Button } from './index.ts'

type tFooterItems = 'faqs'

export class Footer extends BaseComponent {
  private faqs = new Button(this.page, "(//span[contains(text(),'FAQs')])[2]")

  constructor(page: Page, selector: string) {
    super(page, selector)
  }

  public async selectFooterMenu(menuItem: tFooterItems): Promise<void> {
    try {
      await this[menuItem].isElementVisible()
      await this[menuItem].click()
    } catch (e) {
      await this.page.mouse.wheel(0, 1000)
      await this.selectFooterMenu(menuItem)
    }
  }
}
