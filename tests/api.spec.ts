import { test, expect } from '@playwright/test'

test.describe('API', () => {
  test('GET', async ({ request, baseURL }) => {
    const response = await request.get(baseURL!)

    expect(response.status()).toBe(200)
    expect(response.ok()).toBe(true)
    const contentType = response.headers()['content-type']
    expect(contentType).toContain('text/html')

    const body = await response.text()
    expect(body).toContain('Swag Labs')
  })
})
