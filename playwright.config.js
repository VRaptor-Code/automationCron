const { defineConfig } = require('@playwright/test')

module.exports = defineConfig({
    use: {
        headless: false, // Define como false para ver a interface do usuário durante os testes
        channel: 'chrome', // Use 'chrome' ou 'firefox' como navegador
    },
})
