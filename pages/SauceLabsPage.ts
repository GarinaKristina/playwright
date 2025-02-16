import { expect, Locator, Page } from '@playwright/test'
import { Footer } from 'components/Footer.ts'
import Logger from 'helpers/Logger.ts'

import BasePage from './BasePage.ts'

export class SauceLabsPage extends BasePage {
  public footer: Locator = this.page.locator('footer-selector')
  private securityCertifications: Locator = this.page.locator('//h2[normalize-space()="Security & Certifications"]')

  private securityMenuBlock: (menuBlock: string) => Locator
  constructor(page: Page) {
    super(page)

    this.securityMenuBlock = menuBlock => this.page.locator(`//*[contains(text(), '${menuBlock}')]`)
  }

  public async verifySecurityCertifications(): Promise<void> {
    await expect(this.securityCertifications).toBeEnabled()
  }

  public async verifyMenuSecurityBlockVisible(menuBlock: string): Promise<void> {
    try {
      await expect(this.securityMenuBlock(menuBlock)).toBeEnabled()
    } catch (e) {
      Logger.error(`SauceLabsPage.verifyMenuSecurityBlockVisible] Menu block [${menuBlock}] not visible, scrolling down. Error: ${e}`)
      await this.wheelMouse()
      await this.verifyMenuSecurityBlockVisible(menuBlock)
    }
  }
}

export default class SauceLabsFAQPage extends SauceLabsPage {
  public footerComponent: Footer
  private platformIntegrations: Locator = this.page.locator('//span[normalize-space()="Platform & Integrations"]')
  private mobileAppTesting: Locator = this.page.locator('//span[normalize-space()="Mobile App Testing"]')
  private apiTesting: Locator = this.page.locator('//span[normalize-space()="API testing"]')
  private errorReporting: Locator = this.page.locator('//span[normalize-space()="Error Reporting (Backtrace)"]')
  private security: Locator = this.page.locator('//span[normalize-space()="Security"]')

  private platformIntegrationsItems: (menuItem: string) => Locator
  private platformIntegrationsItemsDescription: (menuItem: string) => Locator

  constructor(page: Page) {
    super(page)
    this.footerComponent = new Footer(page)
    this.platformIntegrationsItems = menuItem => this.page.locator(`//*[contains(text(), '${menuItem}')]`)
    this.platformIntegrationsItemsDescription = menuItem => this.page.locator(`//p[contains(., '${menuItem}')]`)
  }

  public async selectFAQTab(menuItem: tSauceLabsFAQItems): Promise<void> {
    const menuItemMap: { [key in tSauceLabsFAQItems]: Locator } = {
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
    await expect(this.platformIntegrationsItemsDescription(menuItem)).toBeEnabled()
  }
}
