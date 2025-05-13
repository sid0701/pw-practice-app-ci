import { test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

test.describe('forms suite', () => {

    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
    })

    test('go to form layouts', async ({ page }) => {
        await page.getByText('Form Layouts').click()
    })

    test('go to date picker', async ({ page }) => {
        await page.getByText('Datepicker').click()
    })

})

test.describe('modals n overlays suite', () => {

    test.beforeEach(async ({ page }) => {
        await page.getByText('Modal & Overlays').click()
    })

    test('go to Dialog', async ({ page }) => {
        await page.getByText('Dialog').click()
    })

    test('go to Window', async ({ page }) => {
        await page.getByText('Window').click()
    })

})