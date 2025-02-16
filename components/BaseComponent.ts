import { Page } from '@playwright/test'

export default abstract class BaseComponent {
  protected page: Page

  protected constructor(page: Page) {
    this.page = page
  }

  // /**
  //  * Clicks on the element located by this component's locator.
  //  *
  //  * @returns {Promise<void>} A promise that resolves when the click action is complete.
  //  */
  // public async click(): Promise<void> {
  //   await this.click()
  // }

  // /**
  //  * Asserts that the element located by `this.locator` has the specified value.
  //  *
  //  * @param expectedText - The expected value of the element.
  //  * @returns A promise that resolves when the assertion is complete.
  //  */
  // public async haveText(expectedText: string): Promise<void> {
  //   await expect(this.Locator).toHaveText(expectedText)
  // }

  // /**
  //  * Asserts that the element located by `this.locator` has the specified value.
  //  *
  //  * @param expectedText - The expected value of the element.
  //  * @returns A promise that resolves when the assertion is complete.
  //  */
  // public async containText(expectedText: string): Promise<void> {
  //   await expect(this.locator).toContainText(expectedText)
  // }

  // /**
  //  * Asserts that the element located by `this.locator` has the specified value.
  //  *
  //  * @param expectedText - The expected value of the element.
  //  * @returns A promise that resolves when the assertion is complete.
  //  */
  // public async getAllTextContents(): Promise<Array<string>> {
  //   return await this.allTextContents()
  // }

  // /**
  //  * Retrieves all elements matching the locator.
  //  *
  //  * @returns {Promise<any[]>} A promise that resolves to an array of elements.
  //  */
  // public async all(): Promise<any[]> {
  //   return await this.all()
  // }

  // /**
  //  * Selects an option from a dropdown or select element.
  //  *
  //  * @param option - The value of the option to be selected.
  //  * @returns A promise that resolves when the option has been selected.
  //  */
  // public async selectOption(option: string): Promise<void> {
  //   await this.page.selectOption(option)
  // }

  // // /**
  // //  * Checks if the element located by `this.locator` is enabled.
  // //  *
  // //  * @returns {Promise<void>} A promise that resolves when the check is complete.
  // //  */
  // // public async isElementVisible(): Promise<void> {
  // //   await expect(this.locator).toBeEnabled()
  // // }

  // public async getLocatorByRole(role: any, name: string): Promise<Locator> {
  //   return this.page.getByRole(role, { name })
  // }
}
