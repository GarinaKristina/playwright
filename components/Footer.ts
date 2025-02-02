import { Page } from '@playwright/test'
import { BaseComponent, Button } from './index.ts'
import BasePage from 'pages/BasePage.ts'

type tFooterItems = 'faqs' | 'security' | 'contactUs' | 'careers'

export class Footer extends BaseComponent {
  private basePage: BasePage
  private faqs = new Button(this.page, "(//span[contains(text(),'FAQs')])[2]")
  private security = new Button(this.page, "(//*[contains(text(),'Security')])")
  private contactUs = new Button(this.page, "(//span[contains(text(),'Contact us')])[1]")
  private careers = new Button(this.page, "(//span[contains(text(),'Careers')])")

  constructor(page: Page, selector: string) {
    super(page, selector)
    this.basePage = new BasePage(page)
  }

  public async selectFooterMenu(menuItem: tFooterItems): Promise<void> {
    try {
      await this[menuItem].isElementVisible()
      await this[menuItem].click()
    } catch (e) {
      await this.basePage.wheelMouse()
      await this.selectFooterMenu(menuItem)
    }
  }
}
