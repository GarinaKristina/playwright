import { Locator, Page } from '@playwright/test'

interface GetElementOptions {
  method?:
    | 'getByRole'
    | 'getByLabel'
    | 'getByPlaceholder'
    | 'getByText'
    | 'getByTestId'
    | 'byLocator'
  selector: string
  methodOptions?: tGetRoleOptions | string
}

interface tGetRoleOptions {
  checked?: boolean
  disabled?: boolean
  exact?: boolean
  expanded?: boolean
  includeHidden?: boolean
  level?: number
  name?: string
  pressed?: boolean
  selected?: boolean
}

interface Matcher {
  getByLabel: (selector: string) => Locator
  getByPlaceholder: (selector: string) => Locator
  getByText: (selector: string) => Locator
  getByTestId: (selector: string) => Locator
  byLocator: (selector: string) => Locator
}

export default abstract class BaseComponent {
  private locator: string

  protected constructor(locator: string) {
    this.locator = locator
  }

  public getElement(page: Page, options?: GetElementOptions): Locator {
    const matcher: Matcher = {
      getByLabel: (selector: string) => page.getByLabel(selector),
      getByPlaceholder: (selector: string) => page.getByPlaceholder(selector),
      getByText: (selector: string) => page.getByText(selector),
      getByTestId: (selector: string) => page.getByTestId(selector),
      byLocator: (selector: string) => page.locator(selector),
    }

    // const method = options?.method || 'byLocator'
    const selector = options?.selector
    const methodOptions = options?.methodOptions

    const baseElement = matcher[method](selector, methodOptions)
    return baseElement
  }

  public async click(page: Page, options?: GetElementOptions): Promise<void> {
    await this.getElement(page, options).click()
  }
}
