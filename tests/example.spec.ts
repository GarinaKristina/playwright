import { test } from '@playwright/test'
import { initializePages, homePage } from '../pages'

// test.beforeEach(async ({ page }) => {

// })

test('Open web site', async ({ page }) => {
  initializePages(page)
  await homePage.openBaseWebSite()
  await homePage.login()
})
