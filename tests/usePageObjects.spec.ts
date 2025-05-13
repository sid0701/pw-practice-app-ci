import { test, expect } from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
import { DatePickerPage } from '../page-objects/datePickerPage'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

test('navigate to form page', async ({ page }) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datePickerPage()
    await navigateTo.smartTablePage()
    await navigateTo.toastrPage()
    await navigateTo.tooltipPage()
})

test('testing form layouts page', async ({ page }) => {
    const navigateTo = new NavigationPage(page)
    const onFormLayoutsPage = new FormLayoutsPage(page)

    await navigateTo.formLayoutsPage()
    await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test1@test.com', 'test456', 'Option 2')
    await onFormLayoutsPage.submitInlineFormWithNameEmailAndCheckbox('Sid', 'sid@123.com', false)
})

test('testing of date picker', async ({ page }) => {
    const navigateTo = new NavigationPage(page)
    const onDatePickerPage = new DatePickerPage(page)

    await navigateTo.datePickerPage()
    await onDatePickerPage.selectCommonDatePickerDateFromToday(7)
    await onDatePickerPage.selectDatepickerWithRangeDateFromToday(7, 27)
})