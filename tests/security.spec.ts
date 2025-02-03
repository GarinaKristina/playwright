import { test } from '@playwright/test'
import { getLoginPage } from 'helpers/getLoginPage.ts'
import { burgerMenuPage, initializePages, inventoryPage, sauceLabsPage } from 'pages/index.ts'

test.describe('Security', () => {
  test.beforeEach(async ({ page }) => {
    initializePages(page)
    const loginPage = getLoginPage(page)
    await loginPage.openBaseWebSite()
    await loginPage.login()
    await inventoryPage.validateCurrentUrl(/inventory/)
  })

  test('Verify security page contain needed blocks', async () => {
    await inventoryPage.openBurgerMenu()
    await burgerMenuPage.open('About')
    await sauceLabsPage.footer.selectFooterMenu('security')
    await sauceLabsPage.verifySecurityCertifications()
    await sauceLabsPage.verifyMenuSecurityBlockVisible('Sauce Labs makes software work for everyone, when they want it, everytime.')
    await sauceLabsPage.verifyMenuSecurityBlockVisible('Security Details')
    await sauceLabsPage.verifyMenuSecurityBlockVisible('How do I track my submission? What is the process?')
    await sauceLabsPage.verifyMenuSecurityBlockVisible('Deliver quality software continuously')
    await sauceLabsPage.verifyMenuSecurityBlockVisible('Latest resources')
  })
})
