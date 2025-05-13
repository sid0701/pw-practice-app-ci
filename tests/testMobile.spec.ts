import { test, expect } from '@playwright/test'

test('input fields', async ({ page }, testInfo) => {

    await page.goto('/')


    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

    //test info can be used to add conditional statements related to diff projects
    //like in this case we can decide to run the step if, the test is being run from a project named mobile
    if (testInfo.project.name == 'mobile') {
        await page.locator('.sidebar-toggle').click()
    }
    const usingTheGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" })
    await usingTheGridEmailInput.fill("test@test.com")
    await usingTheGridEmailInput.clear()
    await usingTheGridEmailInput.fill("test2@test2.com")

})