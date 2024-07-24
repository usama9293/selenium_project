
import { Builder, By, Key, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';  // Note the change here

(async function gridTest() {
  // Create a WebDriver instance pointing to the Selenium Grid Hub
  let driver = await new Builder()
    .usingServer('http://localhost:4444/wd/hub') // Hub URL
    .forBrowser('chrome') // Browser name
    .setChromeOptions(new chrome.Options())
    .build();

  try {
    await driver.get('https://www.google.com'); // Corrected URL
    let title = await driver.getTitle();
    console.log('Page title is:', title);

    // Wait for a specific condition, e.g., title contains a certain text
    await driver.wait(until.titleContains('Google'), 10000); // Corrected title check
  } finally {
    await driver.quit();
  }
})();




// import { Builder, By, Key, until } from 'selenium-webdriver';
// import 'chromedriver';
// import assert from 'assert';

// (async function facebookLoginTest() {
//   let driver;

//   try {
//     driver = await new Builder().forBrowser('chrome').build();

//     // Test case: Login with invalid credentials
//     console.log('Testing login with invalid credentials...');
//     await driver.get('https://www.facebook.com');

//     let emailField = await driver.findElement(By.id('email'));
//     await emailField.sendKeys('invalid@example.com');

//     let passwordField = await driver.findElement(By.id('pass'));
//     await passwordField.sendKeys('wrongpassword');

//     let loginButton = await driver.findElement(By.name('login'));
//     await loginButton.click();

//     // Updated to wait for a more general error message container or use an alternative
//     try {
//       await driver.wait(until.elementLocated(By.css('div[data-testid="login_error"]')), 10000);
//       let errorMessage = await driver.findElement(By.css('div[data-testid="login_error"]')).getText();
//       console.log('Error message:', errorMessage);
//       assert(errorMessage.length > 0, 'Expected error message not found');
//     } catch (err) {
//       console.log('Error message element not found:', err);
//     }

//     // Test case: Login with valid credentials
//     console.log('Testing login with valid credentials...');
//     await driver.get('https://www.facebook.com');

//     emailField = await driver.findElement(By.id('email'));
//     await emailField.sendKeys('usamaarshad9293@gmail.com');

//     passwordField = await driver.findElement(By.id('pass'));
//     await passwordField.sendKeys('gty3');

//     loginButton = await driver.findElement(By.name('login'));
//     await loginButton.click();

//     await driver.wait(until.urlContains('facebook.com'), 10000);

//     let currentUrl = await driver.getCurrentUrl();
//     console.log('Current URL:', currentUrl);

//     assert(currentUrl.includes('facebook.com'), 'Login failed or URL is incorrect');

//     // Logout
//     console.log('Logging out...');
//     await driver.get('https://www.facebook.com/logout.php');

//   } catch (err) {
//     console.error('Test failed with error:', err);
//   } finally {
//     if (driver) {
//       await driver.quit();
//     }
//   }
// })();
