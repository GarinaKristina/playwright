import { expect, type Locator } from '@playwright/test'

export interface IVerificationStrategy {
  verify(locator: Locator): Promise<void>
}

export class EnabledVerificationStrategy implements IVerificationStrategy {
  public async verify(locator: Locator): Promise<void> {
    await expect(locator).toBeEnabled()
  }
}

export class VisibleVerificationStrategy implements IVerificationStrategy {
  public async verify(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible()
  }
}
