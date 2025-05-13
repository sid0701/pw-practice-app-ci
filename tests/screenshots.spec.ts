import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import { faker } from '@faker-js/faker'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

test('navigate to form page', async ({ page }) => {
    const pm = new PageManager(page)
    const navigateTo = pm.navigateTo()
    await navigateTo.formLayoutsPage()
    await navigateTo.datePickerPage()
    await navigateTo.smartTablePage()
    await navigateTo.toastrPage()
    await navigateTo.tooltipPage()
})

test('testing screenshots', async ({ page }) => {
    const pm = new PageManager(page)
    const navigateTo = pm.navigateTo()
    const onFormLayoutsPage = pm.onFormLayoutsPage()
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`

    await navigateTo.formLayoutsPage()
    //taking screenshot n placing it inside a folder
    await page.screenshot({ path: 'screenshots/formsLayoutPage.png' })

    //if u want to save d screenshot as a binary in order to send it to some other system or servers or may be integrate with a slack
    const buffer = await page.screenshot()
    console.log(buffer.toString('base64'))

    await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption(randomEmail, `${randomFullName.replace(' ', '')}${faker.number.int(1000)}`, `Option ${faker.number.int(2)}`)

    //sometimes we want a screenshot for a particular area, for example, lets say we want a screenshot for just the inline form
    await onFormLayoutsPage.submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false)
    await page.locator('nb-card', { hasText: 'Inline form' }).screenshot({ path: 'screenshots/inlineForm.png' })

})

test('testing of date picker', async ({ page }) => {
    const pm = new PageManager(page)
    const navigateTo = pm.navigateTo()
    const onDatePickerPage = pm.onDatePickerPage()

    await navigateTo.datePickerPage()
    await onDatePickerPage.selectCommonDatePickerDateFromToday(7)
    await onDatePickerPage.selectDatepickerWithRangeDateFromToday(7, 27)
})