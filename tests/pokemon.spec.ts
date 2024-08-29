import { test, expect } from '@playwright/test'
import PokemonPage from '../pom/pokemonPage'

test('[3] Check Title', async ({ page }) => {
    await page.goto('/')
    const pokemonPage = new PokemonPage(page)
    await expect(pokemonPage.title).toBeVisible()
})

test('[4] Check Pokemon List', async ({ page }) => {
    await page.goto('/')
    const pokemonPage = new PokemonPage(page)
    await expect(pokemonPage.listImages.getByAltText('pikachu')).toBeVisible()
    await expect(pokemonPage.listImages.getByAltText('bulbasaur')).toBeVisible()
    await expect(pokemonPage.listImages.getByAltText('squirtle')).toBeVisible()
})


test.describe('Smoke end to end', () => {
    const data = {
        name: "Raton veloz",
        hp: "100",
        speed: "80",
        attack: "30",
        defense: "15",
        image: "pikachu"
    }

    test.describe.configure({ mode: 'serial' })

    test('[5] Warning message when pokemon is not selected', async ({ page }) => {

        const pokemonPage = new PokemonPage(page)
        await pokemonPage.goto()
        await pokemonPage.createButton.click()

        expect(await pokemonPage.warningMessage.textContent()).toEqual('No se selecciono una imagen de pokemon')
    })

    test('[6] Warning message when pokemon does not has name', async ({ page }) => {
        const pokemonPage = new PokemonPage(page)
        await pokemonPage.goto()
        await pokemonPage.listImages.getByAltText(data.image).click()
        await pokemonPage.createButton.click()

        expect(await pokemonPage.warningMessage.textContent()).toEqual('Falta ingresar el Nombre')
    })

    test('[7] Warning message when pokemon does not has hp', async ({ page }) => {
        const pokemonPage = new PokemonPage(page)
        await pokemonPage.goto()
        await pokemonPage.listImages.getByAltText(data.image).click()
        await pokemonPage.fillInput("Nombre *", data.name)
        await pokemonPage.createButton.click()

        expect(await pokemonPage.warningMessage.textContent()).toEqual('Falta ingresar la Vida')
    })

    test('[8] Warning message when pokemon does not has attack', async ({ page }) => {
        const pokemonPage = new PokemonPage(page)
        await pokemonPage.goto()
        await pokemonPage.listImages.getByAltText(data.image).click()
        await pokemonPage.fillInput("Nombre *", data.name)
        await pokemonPage.fillInput('Vida 1-100 *', data.hp)
        await pokemonPage.createButton.click()

        expect(await pokemonPage.warningMessage.textContent()).toEqual('Falta ingresar el Ataque')
    })

    test('[9] Warning message when pokemon does not has speed', async ({ page }) => {
        const pokemonPage = new PokemonPage(page)
        await pokemonPage.goto()
        await pokemonPage.listImages.getByAltText(data.image).click()
        await pokemonPage.fillInput("Nombre *", data.name)
        await pokemonPage.fillInput('Vida 1-100 *', data.hp)
        await pokemonPage.fillInput('Ataque 1-100 *', data.attack)
        await pokemonPage.createButton.click()

        expect(await pokemonPage.warningMessage.textContent()).toEqual('Falta ingresar la Velocidad')
    })

    test('[10] Warning message when pokemon does not has defense', async ({ page }) => {
        const pokemonPage = new PokemonPage(page)
        await pokemonPage.goto()
        await pokemonPage.listImages.getByAltText(data.image).click()
        await pokemonPage.fillInput("Nombre *", data.name)
        await pokemonPage.fillInput('Vida 1-100 *', data.hp)
        await pokemonPage.fillInput('Ataque 1-100 *', data.attack)
        await pokemonPage.fillInput('Velocidad 1-100 *', data.speed)
        await pokemonPage.createButton.click()

        expect(await pokemonPage.warningMessage.textContent()).toEqual('Falta ingresar la Defensa')
    })

    test('[11] Card created', async ({ page }) => {
        const pokemonPage = new PokemonPage(page)
        await pokemonPage.goto()
        await pokemonPage.listImages.getByAltText(data.image).click()
        await pokemonPage.fillInput("Nombre *", data.name)
        await pokemonPage.fillInput('Vida 1-100 *', data.hp)
        await pokemonPage.fillInput('Ataque 1-100 *', data.attack)
        await pokemonPage.fillInput('Velocidad 1-100 *', data.speed)
        await pokemonPage.fillInput('Defensa 1-100 *', data.defense)
        await pokemonPage.createButton.click()

        await expect(await pokemonPage.showroomCardContainer(1)).toBeVisible()
    })

    test('[12] Verify card elements', async ({ page }) => {
        const pokemonPage = new PokemonPage(page)
        await pokemonPage.goto()
        await pokemonPage.listImages.getByAltText(data.image).click()
        await pokemonPage.fillInput("Nombre *", data.name)
        await pokemonPage.fillInput('Vida 1-100 *', data.hp)
        await pokemonPage.fillInput('Ataque 1-100 *', data.attack)
        await pokemonPage.fillInput('Velocidad 1-100 *', data.speed)
        await pokemonPage.fillInput('Defensa 1-100 *', data.defense)
        await pokemonPage.createButton.click()

        expect(await pokemonPage.getImageInCard(1)).toBeVisible()
        expect(await (await pokemonPage.getNameInCard(1)).textContent()).toEqual(data.name)
        expect(await (await pokemonPage.getStatInCard(1, { hp: true }))?.textContent()).toEqual(data.hp)
        expect(await (await pokemonPage.getStatInCard(1, { attack: true }))?.textContent()).toEqual(data.attack)
        expect(await (await pokemonPage.getStatInCard(1, { speed: true }))?.textContent()).toEqual(data.speed)
        expect(await (await pokemonPage.getStatInCard(1, { defense: true }))?.textContent()).toEqual(data.defense)
        await expect(await pokemonPage.getDeleteButtonInCard(1)).toBeVisible()
    })

    test('[13] Delete card', async ({ page }) => {
        const pokemonPage = new PokemonPage(page)
        await pokemonPage.goto()
        await pokemonPage.listImages.getByAltText(data.image).click()
        await pokemonPage.fillInput("Nombre *", data.name)
        await pokemonPage.fillInput('Vida 1-100 *', data.hp)
        await pokemonPage.fillInput('Ataque 1-100 *', data.attack)
        await pokemonPage.fillInput('Velocidad 1-100 *', data.speed)
        await pokemonPage.fillInput('Defensa 1-100 *', data.defense)
        await pokemonPage.createButton.click()

        await expect(await pokemonPage.showroomCardContainer(1)).toBeVisible()

        await (await pokemonPage.getDeleteButtonInCard(1)).click()

        await expect(await pokemonPage.showroomCardContainer(1)).not.toBeVisible()
    })

    test('[14] Pinout a pokemon', async ({ page }) => {
        const pokemonPage = new PokemonPage(page)
        await pokemonPage.goto()
        await pokemonPage.listImages.getByAltText(data.image).click()
        await pokemonPage.fillInput("Nombre *", data.name)
        await pokemonPage.fillInput('Vida 1-100 *', data.hp)
        await pokemonPage.fillInput('Ataque 1-100 *', data.attack)
        await pokemonPage.fillInput('Velocidad 1-100 *', data.speed)
        await pokemonPage.fillInput('Defensa 1-100 *', data.defense)
        await pokemonPage.createButton.click()

        await expect(await pokemonPage.showroomCardContainer(1)).toBeVisible()

        await expect(await pokemonPage.getDeleteButtonInCard(1)).toBeVisible()
        await pokemonPage.pinout.click()
        await expect(await pokemonPage.getDeleteButtonInCard(1)).toBeHidden()
        await pokemonPage.pinout.click()
        await expect(await pokemonPage.getDeleteButtonInCard(1)).toBeVisible()

        await (await pokemonPage.getDeleteButtonInCard(1)).click()
    })



})