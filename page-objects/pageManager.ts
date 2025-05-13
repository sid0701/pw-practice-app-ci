import { Page } from '@playwright/test'
import { NavigationPage } from './navigationPage'
import { FormLayoutsPage } from './formLayoutsPage'
import { DatePickerPage } from './datePickerPage'

export class PageManager {

    readonly page: Page
    readonly navigationPage: NavigationPage
    readonly formLayoutsPage: FormLayoutsPage
    readonly datePickerPage: DatePickerPage

    constructor(page: Page) {
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.formLayoutsPage = new FormLayoutsPage(this.page)
        this.datePickerPage = new DatePickerPage(this.page)
    }

    navigateTo() {
        return this.navigationPage
    }

    onFormLayoutsPage() {
        return this.formLayoutsPage
    }

    onDatePickerPage() {
        return this.datePickerPage
    }

}