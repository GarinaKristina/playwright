import { expect, Locator, Page } from '@playwright/test'
import Logger from 'helpers/Logger.ts'

import BaseComponent from './BaseComponent.ts'

type tFooterItems = 'faqs' | 'security' | 'contactUs' | 'careers'

export class Footer extends BaseComponent {
  private faqs: Locator = this.page.locator("(//span[contains(text(),'FAQs')])[2]")
  private security: Locator = this.page.locator("(//*[contains(text(),'Security')])[2]")
  private contactUs: Locator = this.page.locator("(//span[contains(text(),'Contact us')])[1]")
  private careers: Locator = this.page.locator("(//span[contains(text(),'Careers')])")

  constructor(page: Page) {
    super(page)
  }

  public async wheelMouse(x: number = 0, y: number = 1000): Promise<void> {
    await this.page.mouse.wheel(x, y)
  }

  public async selectFooterMenu(menuItem: tFooterItems): Promise<void> {
    try {
      await expect(this[menuItem]).toBeEnabled()
      await this[menuItem].click()
    } catch (e) {
      Logger.error(`Footer.selectFooterMenu] Menu item [${menuItem}] not visible, scrolling down. Error: ${e}`)
      await this.wheelMouse()
      await this.selectFooterMenu(menuItem)
    }
  }
}
