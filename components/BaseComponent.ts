import { Page } from '@playwright/test'

export default abstract class BaseComponent {
  protected page: Page

  protected constructor(page: Page) {
    this.page = page
  }
}
