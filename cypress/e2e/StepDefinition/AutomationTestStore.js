/// <reference types="cypress" />
import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import { pageActions } from "../../PageObject/PageActions/PageActions";
const productIDs = ['52','66'];

// Ouvrir la page d'accueil
Given("Je suis sur la page d'accueil du site Automation Test Store", () => {
  pageActions.visitHomePage();
});

// Cliquer sur le lien "Login or Register"
When("Je clique sur le lien Login or Register", () => {
  pageActions.clickLoginOrRegister();
});

// Cliquer sur le bouton "Continue" sous "I am a new customer"
And("Je clique sur le bouton Continue sous I am a new customer", () => {
  pageActions.clickContinue();
});

// Remplir tous les champs d'inscription avec des données valides
When("Je remplis tous les champs requis avec des informations valides", () => {
  pageActions.fillRegistrationForm(
    "John",
    "Doe",
    "loueyzormatiiiiss988178@example.com",
    "1234567890",
    "123 Main St",
    "Paris",
    "75001",
    "United Kingdom",
    "Aberdeenshire",
    "loueyzormatiiiisss9718",
    "password123ZO!"
  );
});

// Vérifier que l'on a un compte
Then("Je devrais avoir un compte", () => {
  pageActions.verifyAccountCreated();
});

// Remplir les champs avec un email et un login existants
When("Je remplis les champs avec un email et un login existants", () => {
  // Remplissez ici avec les détails de l'utilisateur existant
  pageActions.fillRegistrationForm(
    "John",                       // Prénom
    "Doe",                        // Nom
    "existing.email@example.com", // Email existant
    "1234567890",                // Téléphone
    "123 Main St",               // Adresse
    "Paris",                     // Ville
    "75001",                     // Code postal
    "United Kingdom",            // Pays
    "Aberdeenshire",             // État
    "login.exist",               // Login existant
    "somePassword"               // Mot de passe (ou laissez vide si c'est un champ obligatoire)
  );
});

// Vérifier la présence d'un message d'erreur
Then("Je devrais voir un message d'erreur", () => {
  cy.get(".alert.alert-error.alert-danger").should("be.visible");
});

// Entrer un email et un mot de passe pour la connexion
When("J'entre mon email et mon mot de passe valides et je clique sur le bouton login", () => {
  pageActions.login("loueyzormatiiiisss", "password123ZO!");
});

// Vérifier une connexion réussie
Then("Je devrais être connecté avec succès", () => {
  cy.url().should('eq', 'https://automationteststore.com/index.php?rt=account/account');
});
// Connexion échouée avec des identifiants invalides
When("J'entre un {string} et {string} invalides", (email, password) => {
  pageActions.login(email, password);
});

// Vérifier la présence d'un message d'erreur
Then("Je devrais voir un message d'erreur", () => {
  cy.get(".alert.alert-error.alert-danger").should("be.visible");
});

Given("Je suis connecté à mon compte", () => {
  pageActions.clickLoginOrRegister();
  pageActions.login("loueyzormatiiiisss", "password123ZO!"); // Remplacez avec vos identifiants

});
// Ajouter des produits au panier
When("Je clique sur le bouton Add to cart pour plusieurs produits", () => {
  pageActions.clickAutomationStore();
  pageActions.addToCart(productIDs); // Vous devez gérer plusieurs produits ici
});

// Vérifier la présence des produits dans le panier
Then("Je vérifie que les produits sont ajoutés au panier", () => {
  pageActions.verifyProductsInCart([
    "Total Moisture Facial Cream", // Remplacez par le nom de votre produit
    "Benefit Bella Bamba", // Remplacez par le nom de votre produit
    // Ajoutez d'autres noms de produits selon vos besoins
  ]);
});

// Rechercher un produit
When("J'entre le nom du produit dans la barre de recherche et clique sur 'Search'", () => {
  pageActions.searchProduct("Benefit Bella Bamba"); // Remplacez par le nom du produit à rechercher
});

// Vérifier l'affichage du produit
Then("Je vérifie que le produit correct est affiché", () => {
  pageActions.verifyProductDisplayed(52,"Benefit Bella Bamba"); // Remplacez par le nom du produit attendu
});

// Cliquer sur le bouton Checkout
When("Je clique sur le bouton 'Checkout' et Je confirme ma commande", () => {
  pageActions.proceedToCheckout();
});

// Vérifier la réussite de la commande
Then("Je vérifie que la commande a été traitée avec succès", () => {
  pageActions.verifyOrderSuccess();
});

// Se déconnecter
When("Je clique sur le bouton 'Logout'", () => {
  pageActions.logout();
});

// Vérifier la réussite de la déconnexion
Then("Je devrais être déconnecté avec succès", () => {
  pageActions.verifyLogoutSuccess();
});
