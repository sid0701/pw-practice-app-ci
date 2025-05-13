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

test('testing form layouts page', async ({ page }) => {
    const pm = new PageManager(page)
    const navigateTo = pm.navigateTo()
    const onFormLayoutsPage = pm.onFormLayoutsPage()
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`

    await navigateTo.formLayoutsPage()
    await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption(randomEmail, `${randomFullName.replace(' ', '')}${faker.number.int(1000)}`, `Option ${faker.number.int(2)}`)
    await onFormLayoutsPage.submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false)
})

test('testing of date picker', async ({ page }) => {
    const pm = new PageManager(page)
    const navigateTo = pm.navigateTo()
    const onDatePickerPage = pm.onDatePickerPage()

    await navigateTo.datePickerPage()
    await onDatePickerPage.selectCommonDatePickerDateFromToday(7)
    await onDatePickerPage.selectDatepickerWithRangeDateFromToday(7, 27)
})