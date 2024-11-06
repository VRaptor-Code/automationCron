const { _electron: electron } = require('playwright') // Importa o módulo Electron do Playwright
const { test, expect } = require('@playwright/test')

test.describe('Cronômetro', () => {
    let app
    let window

    test.beforeAll(async () => {
        // Inicia a aplicação Electron
        app = await electron.launch({
            executablePath: '/path/to/electron', // Substitua pelo caminho do executável do Electron
            args: ['/path/to/your/app', '--no-sandbox'] // Substitua pelo caminho para o diretório da sua aplicação
        })

        // Captura a janela principal da aplicação Electron
        window = await app.firstWindow()
    })

    test.afterAll(async () => {
        await app.close()
    })

    test('Iniciar o cronômetro', async () => {
        // Acessa a interface da aplicação Electron
        await window.goto('http://localhost:3000') 

        // Clica no botão "Iniciar"
        await window.click('button#start')

        // Aguarda 5 segundos(ajuste conforme necessário)
        await window.waitForTimeout(5000)

        // Verifica se o cronômetro está rodando
        const timerText = await window.textContent('#timer')
        expect(timerText).not.toBe('00:00:00')
    })

    test('Pausar o cronômetro', async () => {
        // Clica no botão "Pausar"
        await window.click('button#pause')

        // Aguarda um segundo
        await window.waitForTimeout(1000)

        // Verifica se o cronômetro parou
        const timerTextAfterPause = await window.textContent('#timer')
        expect(timerTextAfterPause).toBe('00:00:05') // Verifique o valor com base no tempo esperado
    })

    test('Reiniciar o cronômetro', async () => {
        // Clica no botão "Reiniciar"
        await window.click('button#reset')

        // Verifica se o cronômetro foi reiniciado
        const timerTextAfterReset = await window.textContent('#timer')
        expect(timerTextAfterReset).toBe('00:00:00')
    })

    test('Fechar o aplicativo', async () => {
        // Clica no botão "Fechar" e confirma
        await window.click('button#close')
        const dialog = await window.waitForEvent('dialog')
        expect(dialog.message()).toContain('Você tem certeza que deseja fechar o aplicativo?')
        await dialog.accept()
    })
})
