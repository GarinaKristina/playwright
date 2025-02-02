import { test } from '@playwright/test'
import { burgerMenuPage, initializePages, inventoryPage, loginPage, sauceLabsPage, sauceLabsFAQPage } from 'pages/index.ts'

test.describe('FAQ', () => {
  const faqItemsPlatformIntegrations: FAQItem[] = [
    {
      question: 'What automation frameworks does Sauce Labs saucectl support?',
      description: 'See the frameworks supported by Sauce Labs here, in addition to quickstart guides and sample code repos',
    },
    {
      question: 'How does Sauce Labs run different automation frameworks?',
      description: 'Sauce Labs runs different automation frameworks via saucectl, our test orchestration tool',
    },
    {
      question: 'Can Sauce Labs support my team using multiple frameworks?',
      description: 'Yes!',
    },
    {
      question: 'Which automation framework is right for me?',
      description: 'The right framework for your project depends on the kind of application you are working on',
    },
    {
      question: 'Which test automation frameworks does Sauce Labs support for mobile app testing?',
      description: 'Sauce Labs supports Appium, Espresso, and XCUITest frameworks for mobile app testing',
    },
    {
      question: 'Which test automation frameworks should I use for web testing?',
      description: 'Selenium, Playwright, Puppeteer, TestCafe, Cucumber JS, and Cypress.',
    },
    {
      question: 'Which issue tracking tools does Sauce Labs support?',
      description: 'Sauce Labs supports the popular issue management and tracking tools you already love and work with.',
    },
  ]

  test.beforeEach(async ({ page }) => {
    initializePages(page)
    await loginPage.openBaseWebSite()
    await loginPage.login()
    await inventoryPage.validateCurrentUrl(/inventory/)
    await inventoryPage.openBurgerMenu()
    await burgerMenuPage.open('About')
    await sauceLabsPage.footer.selectFooterMenu('faqs')
  })

  test(`Verify platform integrations on Sauce Labs FAQs Page`, async () => {
    await sauceLabsFAQPage.selectFAQTab('Platform & Integrations')
    for (const faq of faqItemsPlatformIntegrations) {
      await sauceLabsFAQPage.expandFAQItem(faq.question)
      await sauceLabsFAQPage.verifyFAQItemDescription(faq.description)
    }
  })
})
