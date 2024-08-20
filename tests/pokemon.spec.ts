import { test, expect } from '@playwright/test'
import PokemonPage from '../pom/pokemonPage'

test('Check Title', async ({ page }) => {
    await page.goto('/')
    const pokemonPage = new PokemonPage(page)
    await expect(pokemonPage.title).toBeVisible()
})

test('Check Pokemon List', async ({ page }) => {
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

    test('Warning message when pokemon is not selected', async ({page}) => {
        
        const pokemonPage = new PokemonPage(page)
        await pokemonPage.goto()
        await pokemonPage.createButton.click()

        expect(await pokemonPage.warningMessage.textContent()).toEqual('No se selecciono una imagen de pokemon')
    })

    test('Warning message when pokemon does not has name', async ({page}) => {
        const pokemonPage = new PokemonPage(page)
        await pokemonPage.goto()
        await pokemonPage.listImages.getByAltText(data.image).click()
        await pokemonPage.createButton.click()

        expect(await pokemonPage.warningMessage.textContent()).toEqual('Falta ingresar el Nombre')
    })

    test('Warning message when pokemon does not has hp', async ({page}) => {
        const pokemonPage = new PokemonPage(page)
        await pokemonPage.goto()
        await pokemonPage.listImages.getByAltText(data.image).click()
        await pokemonPage.fillInput("Nombre *", data.name)
        await pokemonPage.createButton.click()

        expect(await pokemonPage.warningMessage.textContent()).toEqual('Falta ingresar la Vida')
    })

    test('Warning message when pokemon does not has attack', async ({page}) => {
        const pokemonPage = new PokemonPage(page)
        await pokemonPage.goto()
        await pokemonPage.listImages.getByAltText(data.image).click()
        await pokemonPage.fillInput("Nombre *", data.name)
        await pokemonPage.fillInput('Vida 1-100 *', data.hp)
        await pokemonPage.createButton.click()

        expect(await pokemonPage.warningMessage.textContent()).toEqual('Falta ingresar el Ataque')
    })
    
    test('Warning message when pokemon does not has speed', async ({page}) => {
        const pokemonPage = new PokemonPage(page)
        await pokemonPage.goto()
        await pokemonPage.listImages.getByAltText(data.image).click()
        await pokemonPage.fillInput("Nombre *", data.name)
        await pokemonPage.fillInput('Vida 1-100 *', data.hp)
        await pokemonPage.fillInput('Ataque 1-100 *', data.attack)
        await pokemonPage.createButton.click()

        expect(await pokemonPage.warningMessage.textContent()).toEqual('Falta ingresar la Velocidad')
    })
    
    test('Warning message when pokemon does not has defense', async ({page}) => {
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
    
    test('Card created', async ({page}) => {
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

    test('Verify card elements', async ({page}) => {
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

        expect(await pokemonPage.getImageInCard(1)).toBeVisible()
        expect(await (await pokemonPage.getNameInCard(1)).textContent()).toEqual(data.name)
        expect(await (await pokemonPage.getStatInCard(1, {hp: true}))?.textContent()).toEqual(data.hp)
        expect(await (await pokemonPage.getStatInCard(1, {attack: true}))?.textContent()).toEqual(data.attack)
        expect(await (await pokemonPage.getStatInCard(1, {speed: true}))?.textContent()).toEqual(data.speed)
        expect(await (await pokemonPage.getStatInCard(1, {defense: true}))?.textContent()).toEqual(data.defense)
        await expect(await pokemonPage.getDeleteButtonInCard(1)).toBeVisible()
    })

    test('Delete card', async ({page}) => {
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



})