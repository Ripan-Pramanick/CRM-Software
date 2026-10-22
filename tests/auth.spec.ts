import { test, expect } from '@playwright/test'

test('dashboard requires authentication', async ({ page }) => {
  await page.goto('/dashboard')
  await expect(page).toHaveURL(/.*login/)
})

test('successful login redirects to dashboard', async ({ page }) => {
  await page.goto('/login')
  
  await page.fill('input[name="email"]', 'test@example.com')
  await page.fill('input[name="password"]', 'password123')
  await page.click('button[type="submit"]')
  
  await expect(page).toHaveURL(/.*dashboard/)
  await expect(page.locator('h1')).toContainText('Dashboard')
})