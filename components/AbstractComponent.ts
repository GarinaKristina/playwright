import { Page } from '@playwright/test'

import { BaseComponent } from './index.ts'

export class AbstractComponent extends BaseComponent {
  constructor(page: Page, selector: string) {
    super(page, selector)
  }
}
