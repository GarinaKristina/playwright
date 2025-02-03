import { test } from '@playwright/test'
import { getLoginPage } from 'helpers/getLoginPage.ts'
import { burgerMenuPage, contactUsPage, initializePages, inventoryPage, sauceLabsPage } from 'pages/index.ts'

test.describe('Contact Us', () => {
  const contextTexts = [
    'How can we help?',
    "Have a question? Want more information on our products? Let us know and we'll be in touch soon!",
    'General inquiries',
    'inquiries@saucelabs.com',
    'Need support?',
    'support@saucelabs.com',
    'Contact sales',
    'sales@saucelabs.com',
  ]

  test.beforeEach(async ({ page }) => {
    initializePages(page)
    const loginPage = getLoginPage(page)
    await loginPage.openBaseWebSite()
    await loginPage.login()
    await inventoryPage.validateCurrentUrl(/inventory/)
  })

  test('Verify contact us detail form', async () => {
    await inventoryPage.openBurgerMenu()
    await burgerMenuPage.open('About')
    await sauceLabsPage.footer.selectFooterMenu('contactUs')
    await inventoryPage.validateCurrentUrl(/contact-us/)
    for (const text of contextTexts) {
      await contactUsPage.verifyContext(text)
    }
    await contactUsPage.fillContactDetails()
    await contactUsPage.getDemo()
  })
})
