// cypress/support/actions.js
import { pageElements } from '../PageElement/WebElement';
class PageActions {
  // Ouvrir la page d'accueil
  visitHomePage() {
    cy.visit(pageElements.homePage);
    
  }

  // Cliquer sur le lien "Login or Register"
  clickLoginOrRegister() {
    cy.get(pageElements.loginLink).click();
  }

  // Cliquer sur le bouton "Continue" sous "I am a new customer"
  clickContinue() {
    cy.get(pageElements.continueButton).click();
  }

  // Remplir le formulaire d'inscription
  fillRegistrationForm(firstName, lastName, email, telephone, address, city, postcode, country, state, loginName, password) {
    cy.get(pageElements.firstNameInput).type(firstName);
    cy.get(pageElements.lastNameInput).type(lastName);
    cy.get(pageElements.emailInput).type(email);
    cy.get(pageElements.telephoneInput).type(telephone);
    cy.get(pageElements.addressInput).type(address);
    cy.get(pageElements.cityInput).type(city);
    cy.get(pageElements.postcodeInput).type(postcode);
    cy.get(pageElements.countrySelect).select(country);
    cy.get(pageElements.stateSelect).select(state);
    cy.get(pageElements.loginNameInput).type(loginName);
    cy.get(pageElements.passwordInput).type(password);
    cy.get(pageElements.confirmPasswordInput).type(password);
    cy.get(pageElements.newsletterCheckbox).check(); // Souscrire à la newsletter
    cy.get(pageElements.agreeTermsCheckbox).check(); // Accepter les conditions
    cy.get(pageElements.submitButton).click(); // Soumettre le formulaire
  }

  // Vérifier la présence d'un message de succès après l'inscription
  verifyAccountCreated() {
    cy.url().should('include', 'account/success');
    cy.contains("Your Account Has Been Created!").should('be.visible');
  }

 

  // Vérifier la présence d'un message d'erreur
  verifyErrorMessage() {
    cy.get(pageElements.alertError).should("be.visible");
  }

  // Se connecter avec des informations valides
  login(email, password) {
    cy.get(pageElements.loginNameField).type(email);
    cy.get(pageElements.passwordField).type(password);
    cy.get('button[title="Login"]').click();
  }

  // Vérifier que l'utilisateur est connecté
  verifySuccessfulLogin() {
    cy.url().should('eq', 'https://automationteststore.com/index.php?rt=account/account');
  }

  // Ajouter des produits au panier
  addToCart(productIDs) {
    cy.get(pageElements.addToCartButtons).each(($el, index) => {
      if (productIDs.includes($el.attr('data-id'))) {
        cy.wrap($el).click();
      }
    });
  }

  // Vérifier que les produits sont ajoutés au panier
  verifyProductsInCart(products) {
    cy.contains('span.menu_text', 'Cart').click(); 
    products.forEach(product => {
      cy.contains('tr', product).should('exist');
    });
  }
  

  // Rechercher un produit
  searchProduct(productName) {
    cy.get(pageElements.searchInput).type(`${productName}{enter}`);
  }

  // Vérifier que le produit correct est affiché
  verifyProductDisplayed(productId, productName) {
    cy.url().should('include', `product_id=${productId}`);
    cy.get(pageElements.productName).should('contain.text', productName);
  }

  // Passer à la caisse
  proceedToCheckout() {
    cy.contains('span.menu_text', 'Checkout').click();;
    cy.get('#checkout_btn').click();
  }

  // Vérifier que la commande a été traitée avec succès
  verifyOrderSuccess() {
    cy.get(pageElements.orderSuccessMessage).should('contain.text', 'Your Order Has Been Processed!');
    cy.url().should('include', 'checkout/success');
  }

  // Se déconnecter
  logout() {
    cy.contains('span.menu_text', 'Account').click();
    cy.get(pageElements.logoutButton).click();
  }
  clickAutomationStore() {
    cy.get(pageElements.automationStore).click();
  }

  // Vérifier que l'utilisateur est déconnecté avec succès
  verifyLogoutSuccess() {
    cy.url().should('include', 'account/logout');
    cy.get('.maintext').should('contain.text', 'Account Logout');
  }
}

export const pageActions = new PageActions();
