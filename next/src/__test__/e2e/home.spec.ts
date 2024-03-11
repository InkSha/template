import { test, expect } from '@playwright/test'

test.describe('home', () => {
  const title = 'Create Next App'

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')
  })

  test(`title equal ${title}`, async ({ page }) => {
    await expect(page).toHaveTitle(title)
  })

  test('jump to count', async ({ page }) => {
    const link = page.getByRole('link', { name: 'redux' })
    const url = 'http://localhost:3000/count'

    await expect(link).toBeVisible()
    await link.click()
    await page.waitForURL(url)
    expect(page.url()).toEqual(url)
  })

  test('snapshot', async ({ page }) => {
    expect(await page.screenshot()).toMatchSnapshot('home-page.png')
  })
})
