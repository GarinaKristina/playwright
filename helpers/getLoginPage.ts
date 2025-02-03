import { Page } from '@playwright/test'
import { LockedOutUserLoginPage, ProblemUserLoginPage, StandardUserLoginPage } from 'pages/LoginPage.ts'

export const getLoginPage = (page: Page) => {
  const userType = process.env.USER_TYPE || 'standard'

  return userType === 'problem'
    ? new ProblemUserLoginPage(page)
    : userType === 'locked-out'
      ? new LockedOutUserLoginPage(page)
      : new StandardUserLoginPage(page)
}
