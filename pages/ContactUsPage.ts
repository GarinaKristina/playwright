import { Page } from '@playwright/test'

import BasePage from './BasePage.ts'
import { AbstractComponent, Button, Dropdown, Input } from '../components/index.ts'

export default class ContactUsPage extends BasePage {
  private email = new Input(this.page, '#Email')
  private company = new Input(this.page, '#Company')
  private comments = new Input(this.page, '#Sales_Contact_Comments__c')
  private interest = new Dropdown(this.page, '#Solution_Interest__c')
  private agreedPolicy = new Button(this.page, '#LblmktoCheckbox_44257_0')

  private textContext: (value: string) => AbstractComponent

  constructor(page: Page) {
    super(page)
    this.textContext = value => new AbstractComponent(this.page, `//*[contains(text(),"${value}")]`)
  }

  public async fillContactDetails() {
    await this.email.fill('standard_user')
    await this.company.fill('secret_sauce')
    await this.comments.fill('I am interested in your product')
    await this.interest.setSelectOption('Debugging')
  }

  public async getDemo() {
    await this.agreedPolicy.click()
  }

  public async verifyContext(value: string) {
    await this.textContext(value).isElementVisible()
  }
}
