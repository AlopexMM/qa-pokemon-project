import { Page, Locator } from '@playwright/test'

export default class PokemonPage {

    title: Locator
    createButton: Locator
    warningMessage: Locator
    listImages: Locator
    showroom: Locator
    page: Page

    constructor(page: Page) {
        this.page = page
        this.listImages = page.getByTestId('list-of-pokemon-img')
        this.createButton = page.getByRole('button', { name: 'Crear Pokemon'})
        this.warningMessage = page.getByTestId('warning-message').getByRole('paragraph')
        this.title = page.getByTestId('title').getByRole('heading', { name: 'Creador de cartas Pokemon' })
    }

    async showroomCardContainer(child: number) {
        return this.page.locator(`//div[@automation-id="showroom"]/div[${child}]`)
    }

    async goto() {
        await this.page.goto('/')
    }

    async fillInput(label: string, text: string) {
        await this.page.getByLabel(label).fill(text)
    }

}