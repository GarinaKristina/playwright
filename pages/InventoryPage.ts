import { expect, Page } from '@playwright/test'
import BasePage from './BasePage.ts'

export default class InventoryPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }
}
