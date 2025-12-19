import { test as base, expect } from '@playwright/test'
import { getLoginPage } from 'helpers/getLoginPage.ts'
export type TestFixtures = {
  loginPage: ReturnType<typeof getLoginPage>
  login: () => Promise<void>
}

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    await use(getLoginPage(page))
  },

  login: async ({ loginPage }, use) => {
    await use(async () => {
      await loginPage.login()
    })
  },
})

export { expect }
