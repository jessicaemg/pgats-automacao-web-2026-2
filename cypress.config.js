const { defineConfig } = require("cypress");

module.exports = defineConfig({
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports/html',
      charts: true,
      reportPageTitle: 'Relatório de testes automatizados',
      embeddedScreenshots: true, 
      inlineAssets: true,       
      saveAllAttempts: false,   

    },
  e2e: {
    specPattern: [
      'cypress/e2e/**/*.{js,jsx,ts,tsx}',
      'cypress/modules/**/*.{js,jsx,ts,tsx}'
    ],
    baseUrl: "https://automationexercise.com/",
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});
