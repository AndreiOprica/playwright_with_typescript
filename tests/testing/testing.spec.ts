import { test, expect, defineConfig } from '@playwright/test';


export default defineConfig({
    timeout: 1_920_000,
});


test('Login - positive case', async ({ page }) => {
  await page.goto('https://practicetestautomation.com/practice-test-login/');

  await page.locator('//*[@id="username"]').click();
  await page.locator('//*[@id="username"]').fill('student');
  await page.locator("//input[@id='password']").click();
  await page.locator("//input[@id='password']").fill('Password123');
  await page.locator("//button[@id='submit']").click();

  await expect(page.getByRole('heading', { name: 'Logged In Successfully' })).toBeVisible();

  await page.locator("//a[@class='wp-block-button__link has-text-color has-background has-very-dark-gray-background-color']").click();
  
  await expect(page.locator("//h2[normalize-space()='Test login']")).toBeVisible();
  
  await page.close();
});


test('Login - negative username case', async ({ page }) => {
  await page.goto('https://practicetestautomation.com/practice-test-login/');

  await page.locator('//*[@id="username"]').click();
  await page.locator('//*[@id="username"]').fill('incorrectUser');
  await page.locator("//input[@id='password']").click();
  await page.locator("//input[@id='password']").fill('Password123');
  await page.locator("//button[@id='submit']").click();

  await expect(page.locator("//div[@id='error']")).toHaveText("Your username is invalid!");

  await page.close();
});


test('Login - negative password case', async ({ page }) => {
  await page.goto('https://practicetestautomation.com/practice-test-login/');

  await page.locator('//*[@id="username"]').click();
  await page.locator('//*[@id="username"]').fill('student');
  await page.locator("//input[@id='password']").click();
  await page.locator("//input[@id='password']").fill('IncorrectPassword');
  await page.locator("//button[@id='submit']").click();

  await expect(page.locator("//div[@id='error']")).toHaveText("Your password is invalid!");
  
  await page.close();
});


test('Login - if both username and password are wrong, username error will be displayed', async ({ page }) => {
  await page.goto('https://practicetestautomation.com/practice-test-login/');

  await page.locator('//*[@id="username"]').click();
  await page.locator('//*[@id="username"]').fill('incorrectUser');
  await page.locator("//input[@id='password']").click();
  await page.locator("//input[@id='password']").fill('Password123');
  await page.locator("//button[@id='submit']").click();

  await expect(page.locator("//div[@id='error']")).toHaveText("Your username is invalid!");

  await page.close();
});


test('Create an row in a table', async ({ page }) => {
  await page.goto('https://demoqa.com/webtables');

  await page.locator("//button[@id='addNewRecordButton']").click();
  await page.locator("//input[@id='firstName']").click();
  await page.locator("//input[@id='firstName']").fill('Andrei');
  await page.locator("//input[@id='lastName']").click();
  await page.locator("//input[@id='lastName']").fill('Oprica');
  await page.locator("//input[@id='userEmail']").click();
  await page.locator("//input[@id='userEmail']").fill('andy.oprica99@gmail.com');
  await page.locator("//input[@id='age']").click();
  await page.locator("//input[@id='age']").fill('25');
  await page.locator("//input[@id='salary']").click();
  await page.locator("//input[@id='salary']").fill('20000');
  await page.locator("//input[@id='department']").click();
  await page.locator("//input[@id='department']").fill('QA');
  await page.locator("//button[@id='submit']").click();

  await expect(page.locator("//div[normalize-space()='Andrei']")).toHaveText("Andrei");
  await expect(page.locator("//div[normalize-space()='Oprica']")).toHaveText("Oprica");
  await expect(page.locator("//div[normalize-space()='25']")).toHaveText("25");
  await expect(page.locator("//div[normalize-space()='andy.oprica99@gmail.com']")).toHaveText("andy.oprica99@gmail.com");
  await expect(page.locator("//div[normalize-space()='20000']")).toHaveText("20000");
  await expect(page.locator("//div[normalize-space()='QA']")).toHaveText("QA");

  await page.close();
});


test('Delete an row in a table', async ({ page }) => {
  await page.goto('https://demoqa.com/webtables');

  await expect(page.locator("//div[normalize-space()='Cierra']")).toHaveText("Cierra");
  await expect(page.locator("//div[normalize-space()='Vega']")).toHaveText("Vega");
  await expect(page.locator("//div[normalize-space()='39']")).toHaveText("39");
  await expect(page.locator("//div[normalize-space()='cierra@example.com']")).toHaveText("cierra@example.com");
  await expect(page.locator("//div[normalize-space()='10000']")).toHaveText("10000");
  await expect(page.locator("//div[normalize-space()='Insurance']")).toHaveText("Insurance");

  await page.locator("//span[@id='delete-record-1']//*[name()='svg']//*[name()='path' and contains(@d,'M864 256H7')]").click();

  await expect(page.locator("//div[normalize-space()='Cierra']")).not.toBeVisible;
  await expect(page.locator("//div[normalize-space()='Vega']")).not.toBeVisible;
  await expect(page.locator("//div[normalize-space()='39']")).not.toBeVisible;
  await expect(page.locator("//div[normalize-space()='cierra@example.com']")).not.toBeVisible;
  await expect(page.locator("//div[normalize-space()='10000']")).not.toBeVisible;
  await expect(page.locator("//div[normalize-space()='Insurance']")).not.toBeVisible;

  await page.close();
});


test('Edit an row in a table', async ({ page }) => {
  await page.goto('https://demoqa.com/webtables');

  await page.locator("//span[@id='edit-record-1']//*[name()='svg']//*[name()='path' and contains(@d,'M880 836H1')]").click();

  await page.locator("//input[@id='salary']").click();
  await page.locator("//input[@id='salary']").clear();
  await page.locator("//input[@id='salary']").click();
  await page.locator("//input[@id='salary']").fill('999');
  await page.locator("//button[@id='submit']").click();


  await expect(page.locator("//div[normalize-space()='Cierra']")).toHaveText("Cierra");
  await expect(page.locator("//div[normalize-space()='Vega']")).toHaveText("Vega");
  await expect(page.locator("//div[normalize-space()='39']")).toHaveText("39");
  await expect(page.locator("//div[normalize-space()='cierra@example.com']")).toHaveText("cierra@example.com");
  await expect(page.locator("//div[normalize-space()='999']")).toHaveText("999");
  await expect(page.locator("//div[normalize-space()='Insurance']")).toHaveText("Insurance");

  await page.close();
});