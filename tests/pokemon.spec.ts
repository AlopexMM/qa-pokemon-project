import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('/')
} )

test('Check Title', async ({ page }) => {
    const title = page.getByTestId('title')
    await expect(title.getByRole('heading', {name: 'Creador de cartas Pokemon' })).toBeVisible()
})

test('Check Pokemon List', async ({ page }) => {
    const list = page.getByTestId('list-of-pokemon-img')
    await expect(list.getByAltText('pikachu')).toBeVisible()
    await expect(list.getByAltText('bulbasaur')).toBeVisible()
    await expect(list.getByAltText('squirtle')).toBeVisible()
})