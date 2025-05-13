import { Page, expect } from '@playwright/test'

export class DatePickerPage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {

        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()
        const dateToAssert = await this.selectDate(numberOfDaysFromToday)
        await expect(calendarInputField).toHaveValue(dateToAssert)
    }

    async selectDatepickerWithRangeDateFromToday(startDayFromToday: number, endDayFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click()
        const startDateToAssert = await this.selectDate(startDayFromToday)
        const endDateToAssert = await this.selectDate(endDayFromToday)
        const fullDateToAssert = `${startDateToAssert} - ${endDateToAssert}`
        await expect(calendarInputField).toHaveValue(fullDateToAssert)
    }

    private async selectDate(numberOfDaysFromToday: number) {
        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday)
        const expectedDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' })
        const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' })
        const expectedYear = date.getFullYear()
        const expectedFullDate = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

        let currentMonthNYear = await this.page.locator('.calendar-navigation').textContent()
        const expectedMonthNYear = ` ${expectedMonthLong} ${expectedYear} `

        if (numberOfDaysFromToday > 0) {
            while (!expectedMonthNYear.includes(currentMonthNYear)) {
                await this.page.locator('[data-name="chevron-right"]').click()
                currentMonthNYear = await this.page.locator('.calendar-navigation').textContent()
            }
        }
        else {
            while (!expectedMonthNYear.includes(currentMonthNYear)) {
                await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-left"]').click()
                currentMonthNYear = await this.page.locator('.calendar-navigation').textContent()
            }
        }
        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, { exact: true }).click()
        return expectedFullDate
    }

}