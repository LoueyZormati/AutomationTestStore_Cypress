Feature: Test complet du site Automation Test Store  
  En tant qu'utilisateur, je veux tester l'inscription, la connexion, et les fonctionnalités de gestion de panier et de commande.

  Background: Ouverture du site Automation Test Store
    Given Je suis sur la page d'accueil du site Automation Test Store

  Scenario: Inscription réussie avec des informations valides
    When Je clique sur le lien Login or Register
    And Je clique sur le bouton Continue sous I am a new customer
    And Je remplis tous les champs requis avec des informations valides
    Then Je devrais avoir un compte

  Scenario: Inscription échouée avec un email et un login existants
    When Je clique sur le lien Login or Register
    And Je clique sur le bouton Continue sous I am a new customer
    And Je remplis les champs avec un email et un login existants
    Then Je devrais voir un message d'erreur

  Scenario: Connexion réussie avec des informations valides
    When Je clique sur le lien Login or Register
    And J'entre mon email et mon mot de passe valides et je clique sur le bouton login
    Then Je devrais être connecté avec succès

  Scenario Outline: Connexion échouée avec des identifiants invalides
    When Je clique sur le lien Login or Register
    And J'entre un <email> et <password> invalides
    Then Je devrais voir un message d'erreur

    Examples:
      | email                  | password  |
      | "louey@gmail.com"      | " "        |
      | "moedfkerzl@gmail.com" | "louey10" |
      | "121616561656"         | " "        |

  Scenario: Ajout de produits au panier après connexion
    Given Je suis connecté à mon compte
    When Je clique sur le bouton Add to cart pour plusieurs produits
    Then Je vérifie que les produits sont ajoutés au panier

  Scenario: Recherche de produit spécifique
    When J'entre le nom du produit dans la barre de recherche et clique sur 'Search'
    Then Je vérifie que le produit correct est affiché

  Scenario: Passage à la caisse
   Given Je suis connecté à mon compte
    When Je clique sur le bouton Add to cart pour plusieurs produits
    And Je clique sur le bouton 'Checkout' et Je confirme ma commande
    Then Je vérifie que la commande a été traitée avec succès

  Scenario: Déconnexion après achat
    Given Je suis connecté à mon compte
    When Je clique sur le bouton 'Logout'
    Then Je devrais être déconnecté avec succès
