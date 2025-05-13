import { Page } from '@playwright/test'
import { HelperBase } from './helperBase'

export class NavigationPage extends HelperBase {


    //in the constructor we have to provide d parameter that we expect to be constructed when we call this page object
    //so we have a page parameter of Page Type
    constructor(page: Page) {
        super(page)
    }

    async formLayoutsPage() {
        await this.clickGroupMenuItem('Forms')
        await this.page.getByText('Form Layouts').click()
        await this.waitForNumberOfSecs(2)
    }

    async datePickerPage() {
        await this.clickGroupMenuItem('Forms')
        await this.page.getByText('Datepicker').click()
    }

    async smartTablePage() {
        await this.clickGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()
    }

    async toastrPage() {
        await this.clickGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()
    }

    async tooltipPage() {
        await this.clickGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }

    private async clickGroupMenuItem(groupMenuItem: string) {
        const groupMenuItemLocator = this.page.getByTitle(groupMenuItem)
        const collapsed = await groupMenuItemLocator.getAttribute('aria-expanded')

        if (collapsed == 'false')
            await groupMenuItemLocator.click()
    }
}