import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'

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

    await navigateTo.formLayoutsPage()
    await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test1@test.com', 'test456', 'Option 2')
    await onFormLayoutsPage.submitInlineFormWithNameEmailAndCheckbox('Sid', 'sid@123.com', false)
})

test('testing of date picker', async ({ page }) => {
    const pm = new PageManager(page)
    const navigateTo = pm.navigateTo()
    const onDatePickerPage = pm.onDatePickerPage()

    await navigateTo.datePickerPage()
    await onDatePickerPage.selectCommonDatePickerDateFromToday(7)
    await onDatePickerPage.selectDatepickerWithRangeDateFromToday(7, 27)
})