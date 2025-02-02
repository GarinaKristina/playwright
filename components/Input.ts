import { Page } from '@playwright/test'
import { BaseComponent } from './index.ts'

export class Input extends BaseComponent {
  constructor(page: Page, selector: string) {
    super(page, selector)
  }

  public async fill(value: string | number): Promise<void> {
    await this.locator.isEnabled()
    await this.locator.fill(value.toString())
  }
}
