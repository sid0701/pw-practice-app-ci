import { Page } from '@playwright/test'
import { using } from 'rxjs'


export class FormLayoutsPage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, option: string) {

        const usingTheGridForm = this.page.locator('nb-card', { hasText: 'Using The Grid' })
        await usingTheGridForm.getByRole('textbox', { name: 'Email' }).fill(email)
        await usingTheGridForm.getByRole('textbox', { name: 'Password' }).fill(password)
        await usingTheGridForm.getByRole('radio', { name: option }).check({ force: true })
        await usingTheGridForm.getByRole('button').click()

    }


    /**
     * This method will fill out the Inline Form with user details
     * @param name - should be first and last name
     * @param email - valid email for the test user
     * @param rememberMe - true or false if user session to be saved
     */
    async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean) {
        const usingTheInlineForm = this.page.locator('nb-card', { hasText: 'Inline form' })
        await usingTheInlineForm.getByPlaceholder('Jane Doe').fill(name)
        await usingTheInlineForm.getByPlaceholder('Email').fill(email)

        if (rememberMe)
            await usingTheInlineForm.getByRole('checkbox').check({ force: true })

        await usingTheInlineForm.getByRole('button').click()

    }

}