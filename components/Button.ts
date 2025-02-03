import { Page } from '@playwright/test'

import { BaseComponent } from './index.ts'

export class Button extends BaseComponent {
  constructor(page: Page, selector: string) {
    super(page, selector)
  }
}
