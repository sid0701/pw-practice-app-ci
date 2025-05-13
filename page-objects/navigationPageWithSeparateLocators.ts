import { Locator, Page } from '@playwright/test'

export class NavigationPage {

    readonly page: Page
    readonly formLayouts: Locator
    readonly datePicker: Locator
    readonly smartTable: Locator
    readonly toastr: Locator
    readonly tooltip: Locator

    //in the constructor we have to provide d parameter that we expect to be constructed when we call this page object
    //so we have a page parameter of Page Type
    constructor(page: Page) {
        this.page = page
        this.formLayouts = this.page.getByText('Form Layouts')
        this.datePicker = this.page.getByText('Datepicker')
        this.smartTable = this.page.getByText('Smart Table')
        this.toastr = this.page.getByText('Toastr')
        this.tooltip = this.page.getByText('Tooltip')
    }

    async formLayoutsPage() {
        await this.clickGroupMenuItem('Forms')
        await this.formLayouts.click()
    }

    async datePickerPage() {
        await this.clickGroupMenuItem('Forms')
        await this.datePicker.click()
    }

    async smartTablePage() {
        await this.clickGroupMenuItem('Tables & Data')
        await this.smartTable.click()
    }

    async toastrPage() {
        await this.clickGroupMenuItem('Modal & Overlays')
        await this.toastr.click()
    }

    async tooltipPage() {
        await this.clickGroupMenuItem('Modal & Overlays')
        await this.tooltip.click()
    }

    private async clickGroupMenuItem(groupMenuItem: string) {
        const groupMenuItemLocator = this.page.getByTitle(groupMenuItem)
        const collapsed = await groupMenuItemLocator.getAttribute('aria-expanded')

        if (collapsed == 'false')
            await groupMenuItemLocator.click()
    }
}