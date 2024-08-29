import { Page, Locator } from '@playwright/test'

export default class PokemonPage {

    title: Locator
    createButton: Locator
    warningMessage: Locator
    listImages: Locator
    showroom: Locator
    page: Page
    pinout: Locator

    constructor(page: Page) {
        this.page = page
        this.listImages = page.getByTestId('list-of-pokemon-img')
        this.createButton = page.getByRole('button', { name: 'Crear Pokemon' })
        this.warningMessage = page.getByTestId('warning-message').getByRole('paragraph')
        this.title = page.getByTestId('title').getByRole('heading', { name: 'Creador de cartas Pokemon' })
        this.pinout = page.getByTestId('pinout')
    }

    async showroomCardContainer(child: number) {
        const locator = this.page.locator(`//div[@automation-id="showroom"]/div[${child}]`)
        return locator
    }

    async getImageInCard(child: number) {
        return this.page.locator(`//div[@automation-id="showroom"]/div[${child}]/div/div[@class="image"]/img`)
    }

    async getNameInCard(child: number) {
        return this.page.locator(`//div[@automation-id="showroom"]/div[${child}]/div[@class="name"]/h3`)
    }

    async getStatInCard(child: number, option: { hp?: Boolean, attack?: Boolean, speed?: Boolean, defense?: Boolean }) {
        if (option.hp) return this.page.locator(`//div[@automation-id="showroom"]/div[${child}]/div[@class="stats"]/div[1]/div/span/span`)
        if (option.attack) return this.page.locator(`//div[@automation-id="showroom"]/div[${child}]/div[@class="stats"]/div[2]/div/span/span`)
        if (option.speed) return this.page.locator(`//div[@automation-id="showroom"]/div[${child}]/div[@class="stats"]/div[3]/div/span/span`)
        if (option.defense) return this.page.locator(`//div[@automation-id="showroom"]/div[${child}]/div[@class="stats"]/div[4]/div/span/span`)
    }

    async getDeleteButtonInCard(child: number) {
        return this.page.locator(`//div[@automation-id="showroom"]/div[${child}]/div/button`)
    }

    async goto() {
        await this.page.goto('/')
    }

    async fillInput(label: string, text: string) {
        await this.page.getByLabel(label).fill(text)
    }

}