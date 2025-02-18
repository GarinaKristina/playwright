import { expect, Locator, Page } from '@playwright/test'

import BasePage from './BasePage.ts'

export default class ContactUsPage extends BasePage {
  private email: Locator = this.page.locator('#Email')
  private company: Locator = this.page.locator('#Company')
  private comments: Locator = this.page.locator('#Sales_Contact_Comments__c')
  private interest: Locator = this.page.locator('#Solution_Interest__c')
  private agreedPolicy: Locator = this.page.locator('#LblmktoCheckbox_44257_0')

  private textContext: (value: string) => Locator

  constructor(page: Page) {
    super(page)
    this.textContext = value => this.page.locator(`//*[contains(text(),"${value}")]`)
  }

  public async fillContactDetails() {
    await this.email.fill('standard_user')
    await this.company.fill('secret_sauce')
    await this.comments.fill('I am interested in your product')
    await this.interest.selectOption('Debugging')
  }

  public async getDemo() {
    await this.agreedPolicy.click()
  }

  public async verifyContext(value: string) {
    await expect(this.textContext(value)).toBeEnabled()
  }
}
