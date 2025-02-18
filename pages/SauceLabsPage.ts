import { Page, Locator } from '@playwright/test'
import Logger from 'helpers/Logger.ts'

import BasePage from './BasePage.ts'
import { IVerificationStrategy, EnabledVerificationStrategy } from './VerificationStrategies.ts'

export class SauceLabsPage extends BasePage {
  private search: Locator = this.page.locator('//button[@type="button"]//div[@class="MuiBox-root css-vxcmzt"]')
  private searchInput: Locator = this.page.locator('//input[@id="search"]')
  private securityItem: Locator = this.page.locator('//span[contains(text(),"Learn more about our company")]')
  private securityCertifications: Locator = this.page.locator('//h2[normalize-space()="Security & Certifications"]')
  private securityMenuBlock: (menuBlock: string) => Locator

  protected verificationStrategy: IVerificationStrategy

  constructor(page: Page, verificationStrategy: IVerificationStrategy = new EnabledVerificationStrategy()) {
    super(page)
    this.securityMenuBlock = menuBlock => this.page.locator(`//*[contains(text(), '${menuBlock}')]`)
    this.verificationStrategy = verificationStrategy
  }

  public async searchSecurityItem(): Promise<void> {
    await this.search.click()
    await this.searchInput.fill('Security')
    await this.searchInput.press('Enter')
    await this.securityItem.click()
  }
  public async verifySecurityCertifications(): Promise<void> {
    await this.verificationStrategy.verify(this.securityCertifications)
  }

  public async verifyMenuSecurityBlockVisible(menuBlock: string): Promise<void> {
    for (let attempt = 1; attempt <= 10; attempt++) {
      try {
        await this.verificationStrategy.verify(this.securityMenuBlock(menuBlock))
      } catch (e) {
        Logger.error(`SauceLabsPage.verifyMenuSecurityBlockVisible] Menu block [${menuBlock}] not visible, scrolling down. Error: ${e}`)
        await this.footer.wheelMouse()
      }
    }
  }
}

export default class SauceLabsFAQPage extends SauceLabsPage {
  private platformIntegrations: Locator = this.page.locator('//span[normalize-space()="Platform & Integrations"]')
  private mobileAppTesting: Locator = this.page.locator('//span[normalize-space()="Mobile App Testing"]')
  private apiTesting: Locator = this.page.locator('//span[normalize-space()="API testing"]')
  private errorReporting: Locator = this.page.locator('//span[normalize-space()="Error Reporting (Backtrace)"]')
  private security: Locator = this.page.locator('//span[normalize-space()="Security"]')

  private platformIntegrationsItems: (menuItem: string) => Locator
  private platformIntegrationsItemsDescription: (menuItem: string) => Locator

  constructor(page: Page, verificationStrategy: IVerificationStrategy = new EnabledVerificationStrategy()) {
    super(page, verificationStrategy)

    this.platformIntegrationsItems = menuItem => this.page.locator(`//*[contains(text(), '${menuItem}')]`)
    this.platformIntegrationsItemsDescription = menuItem => this.page.locator(`//p[contains(., '${menuItem}')]`)
  }

  public async selectFAQTab(menuItem: string): Promise<void> {
    const menuItemMap: { [key: string]: Locator } = {
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
    await this.verificationStrategy.verify(this.platformIntegrationsItemsDescription(menuItem))
  }
}
