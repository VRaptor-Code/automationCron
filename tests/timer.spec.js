/* Este arquivo conterá os testes automatizados para o seu cronômetro. Aqui está um exemplo de como os 
testes podem ser estruturados: */

const { test, expect } = require('@playwright/test')

test.describe('Cronômetro', () => {
    test.beforeAll(async ({ browser }) => {
        // Inicia o aplicativo Electron
        this.app = await browser.launch({
            executablePath: 'path/to/electron', // Caminho para o executável do Electron, se necessário
            args: ['path/to/your/app'], // Caminho para o seu aplicativo (a pasta onde está o main.js)
        })
    })

    test.afterAll(async () => {
        await this.app.close()
    })

    test('Iniciar o cronômetro', async ({ page }) => {
        await page.goto('http://localhost:3000') // Se necessário, ajuste a URL

        // Clica no botão "Iniciar"
        await page.click('button#start')

        // Aguarda alguns segundos (ajuste conforme necessário)
        await page.waitForTimeout(5000)

        // Verifica se o cronômetro está rodando
        const timerText = await page.textContent('#timer')
        expect(timerText).not.toBe('00:00:00')
    })

    test('Pausar o cronômetro', async ({ page }) => {
        // Clica no botão "Pausar"
        await page.click('button#pause')

        // Aguarda um segundo
        await page.waitForTimeout(1000)

        // Verifica se o cronômetro parou
        const timerTextAfterPause = await page.textContent('#timer')
        expect(timerTextAfterPause).toBe('00:00:05') // Verifique o valor com base no tempo esperado
    })

    test('Reiniciar o cronômetro', async ({ page }) => {
        // Clica no botão "Reiniciar"
        await page.click('button#reset')

        // Verifica se o cronômetro foi reiniciado
        const timerTextAfterReset = await page.textContent('#timer')
        expect(timerTextAfterReset).toBe('00:00:00')
    })

    test('Fechar o aplicativo', async ({ page }) => {
        // Clica no botão "Fechar" e confirma
        await page.click('button#close')
        const dialog = await page.waitForEvent('dialog')
        expect(dialog.message()).toContain('Você tem certeza que deseja fechar o aplicativo?')
        await dialog.accept()
    })
})
