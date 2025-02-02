import { Page } from '@playwright/test'
import BasePage from './BasePage.ts'
import { Footer } from 'components/Footer.ts'
import { AbstractComponent, Button } from 'components/index.ts'

export class SauceLabsPage extends BasePage {
  public footer = new Footer(this.page, 'footer-selector')
  private securityCertifications = new Button(this.page, '//h2[normalize-space()="Security & Certifications"]')

  private securityMenuBlock: (menuBlock: string) => AbstractComponent
  constructor(page: Page) {
    super(page)
    this.securityMenuBlock = menuBlock => new AbstractComponent(this.page, `//*[contains(text(), '${menuBlock}')]`)
  }

  public async verifySecurityCertifications(): Promise<void> {
    await this.securityCertifications.isElementVisible()
  }

  public async verifyMenuSecurityBlockVisible(menuBlock: string): Promise<void> {
    try {
      await this.securityMenuBlock(menuBlock).isElementVisible()
    } catch (e) {
      await this.wheelMouse()
      await this.verifyMenuSecurityBlockVisible(menuBlock)
    }
  }
}

export default class SauceLabsFAQPage extends SauceLabsPage {
  private platformIntegrations = new Button(this.page, '//span[normalize-space()="Platform & Integrations"]')
  private mobileAppTesting = new Button(this.page, '//span[normalize-space()="Mobile App Testing"]')
  private apiTesting = new Button(this.page, '//span[normalize-space()="API testing"]')
  private errorReporting = new Button(this.page, '//span[normalize-space()="Error Reporting (Backtrace)"]')
  private security = new Button(this.page, '//span[normalize-space()="Security"]')

  private platformIntegrationsItems: (menuItem: string) => AbstractComponent
  private platformIntegrationsItemsDescription: (menuItem: string) => AbstractComponent

  constructor(page: Page) {
    super(page)
    this.platformIntegrationsItems = menuItem => new AbstractComponent(this.page, `//*[contains(text(), '${menuItem}')]`)
    this.platformIntegrationsItemsDescription = menuItem => new AbstractComponent(this.page, `//p[contains(., '${menuItem}')]`)
  }

  public async selectFAQTab(menuItem: tSauceLabsFAQItems): Promise<void> {
    const menuItemMap: { [key in tSauceLabsFAQItems]: Button } = {
      'Platform & Integrations': this.platformIntegrations,
      'Mobile App Testing': this.mobileAppTesting,
      'API testing': this.apiTesting,
      'Error Reporting (Backtrace)': this.errorReporting,
      Security: this.security,
    }
    await menuItemMap[menuItem].click()
  }

  public async expandFAQItem(menuItem: string): Promise<void> {
    await this.platformIntegrationsItems(menuItem).click()
  }

  public async verifyFAQItemDescription(menuItem: string): Promise<void> {
    await this.platformIntegrationsItemsDescription(menuItem).isElementVisible()
  }
}
