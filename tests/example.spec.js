// @ts-check
const { test, expect } = require('@playwright/test');
const setup = {
  url: 'https://www.welcometothejungle.com/fr/me/settings/account',
  email: 'inqom.qaautomationapplicant@gmail.com',
  password: 'o5N,d5ZR@R7^',
  photoFilePath: './assets/marguerite-729510__340.jpg'
}

// Sénario 1 : Vérifier que l'utilisateur est bien sur la page de connexion
test('has title', async ({ page }) => {
  await page.goto(setup.url);

  // assert that page title is "Welcome to the Jungle - Le guide de l'emploi"
  await expect(page).toHaveTitle("Welcome to the Jungle - Le guide de l'emploi");
  
  // assert page url should be sign in page url because we are not logged in
  await expect(page).toHaveURL('https://www.welcometothejungle.com/fr/signin');

  // clicking on ["Se connecter"] button,
  await page.click('[id="login"]');

  // filling into ["Email", "Mot de passe"] inputs
  await page.fill('[id="email_login"]', setup.email);
  await page.fill('[id="password"]', setup.password);

  // clicking on Se connecter
  await page.getByTestId('login-button-submit').click();
  
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Mon compte | Welcome to the Jungle");

  // assert the right url after login
  await expect(page).toHaveURL(setup.url);

  // uploading new avatar
  await page.locator('[id="avatar"] > input').first().setInputFiles(setup.photoFilePath);

  // clicking on Enregistrer
  await page.getByTestId('account-edit-button-submit').click();

  // wait for the success message
  await page.getByText('Mise à jour réussie !').waitFor();

  
});


