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

    test('Warning message when pokemon is not selected', async ({page}) => {
        
        const pokemonPage = new PokemonPage(page)
        await pokemonPage.goto()
        await pokemonPage.createButton.click()

        expect(await pokemonPage.warningMessage.textContent()).toEqual('No se selecciono una imagen de pokemon')
    })

    test('Warning message when pokemon does not has name', async ({page}) => {
        const pokemonPage = new PokemonPage(page)
        await pokemonPage.goto()
        await pokemonPage.listImages.getByAltText('pikachu').click()
        await pokemonPage.createButton.click()

        expect(await pokemonPage.warningMessage.textContent()).toEqual('Falta ingresar el Nombre')
    })

    test('Warning message when pokemon does not has hp', async ({page}) => {
        const pokemonPage = new PokemonPage(page)
        await pokemonPage.goto()
        await pokemonPage.listImages.getByAltText('pikachu').click()
        await pokemonPage.fillInput("Nombre *", 'Raton veloz')
        await pokemonPage.createButton.click()

        expect(await pokemonPage.warningMessage.textContent()).toEqual('Falta ingresar la Vida')
    })

    test('Warning message when pokemon does not has attack', async ({page}) => {
        const pokemonPage = new PokemonPage(page)
        await pokemonPage.goto()
        await pokemonPage.listImages.getByAltText('pikachu').click()
        await pokemonPage.fillInput("Nombre *", 'Raton veloz')
        await pokemonPage.fillInput('Vida 1-100 *', '10')
        await pokemonPage.createButton.click()

        expect(await pokemonPage.warningMessage.textContent()).toEqual('Falta ingresar el Ataque')
    })
    
    test('Warning message when pokemon does not has speed', async ({page}) => {
        const pokemonPage = new PokemonPage(page)
        await pokemonPage.goto()
        await pokemonPage.listImages.getByAltText('pikachu').click()
        await pokemonPage.fillInput("Nombre *", 'Raton veloz')
        await pokemonPage.fillInput('Vida 1-100 *', '10')
        await pokemonPage.fillInput('Ataque 1-100 *', '10')
        await pokemonPage.createButton.click()

        expect(await pokemonPage.warningMessage.textContent()).toEqual('Falta ingresar la Velocidad')
    })
    
    test('Warning message when pokemon does not has defense', async ({page}) => {
        const pokemonPage = new PokemonPage(page)
        await pokemonPage.goto()
        await pokemonPage.listImages.getByAltText('pikachu').click()
        await pokemonPage.fillInput("Nombre *", 'Raton veloz')
        await pokemonPage.fillInput('Vida 1-100 *', '10')
        await pokemonPage.fillInput('Ataque 1-100 *', '10')
        await pokemonPage.fillInput('Velocidad 1-100 *', '10')
        await pokemonPage.createButton.click()

        expect(await pokemonPage.warningMessage.textContent()).toEqual('Falta ingresar la Defensa')
    })
    
    test('Card created', async ({page}) => {
        const pokemonPage = new PokemonPage(page)
        await pokemonPage.goto()
        await pokemonPage.listImages.getByAltText('pikachu').click()
        await pokemonPage.fillInput("Nombre *", 'Raton veloz')
        await pokemonPage.fillInput('Vida 1-100 *', '10')
        await pokemonPage.fillInput('Ataque 1-100 *', '10')
        await pokemonPage.fillInput('Velocidad 1-100 *', '10')
        await pokemonPage.fillInput('Defensa 1-100 *', '10')
        await pokemonPage.createButton.click()

        expect(await pokemonPage.showroomCardContainer(1)).toBeVisible()
    })



})