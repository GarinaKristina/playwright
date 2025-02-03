import { Page } from '@playwright/test'

import { BaseComponent } from './index.ts'

export class Dropdown extends BaseComponent {
  constructor(page: Page, selector: string) {
    super(page, selector)
  }

  public async setSelectOption(optionValue: string): Promise<void> {
    await this.locator.selectOption(optionValue)
  }
}
