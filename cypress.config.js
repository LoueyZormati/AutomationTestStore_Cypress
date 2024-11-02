const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;
const allureWriter = require('@shelex/cypress-allure-plugin/writer'); // Import Allure writer
const { allureCypress } = require("allure-cypress/reporter"); 

module.exports = defineConfig({
  viewportWidth: 1280,  // Largeur de la fenêtre
  viewportHeight: 800,  // Hauteur de la fenêtre
  env: {
    // Vous pouvez ajouter ici les valeurs pour username, password, etc.
  },

  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'AutomationTestStore HTML-Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    quiet: true,
    debug: true
  },

  e2e: {
    setupNodeEvents(on, config) {
      screenshotOnRunFailure = true;

      // Plugin pour mochawesome reporter
      require('cypress-mochawesome-reporter/plugin')(on);
      
      // Plugin pour Cucumber
      on('file:preprocessor', cucumber());
      
      // Plugin pour Allure
      allureWriter(on, config);  // Ajoutez cette ligne pour que Allure fonctionne correctement
      allureCypress(on, config);
      
      
      return config;
    },
    
    baseUrl: "https://automationteststore.com/", // URL de base pour vos tests
    specPattern: "cypress/e2e/Feature/**/*.feature", // Emplacement des fichiers de tests
  },
});