import { Builder, By, until } from "selenium-webdriver";
import "chromedriver";
import assert from "assert";

async function setupDriver() {
  return new Builder().forBrowser("chrome").build();
}

async function navigateToFormPage(driver) {
  await driver.get("https://formy-project.herokuapp.com/form");
  await driver.sleep(2000);
}

async function fillForm(driver) {
  await driver.findElement(By.id("first-name")).sendKeys("John");
  await driver.findElement(By.id("last-name")).sendKeys("Doe");
  await driver.findElement(By.id("job-title")).sendKeys("QA Engineer");

  await driver.findElement(By.id("radio-button-2")).click();
  await driver.findElement(By.id("checkbox-1")).click();
  await driver.findElement(By.css("option[value='3']")).click();

  await driver.findElement(By.id("datepicker")).sendKeys("03/03/2021");

  await driver.findElement(By.css(".btn.btn-lg.btn-primary")).click();
  await driver.sleep(2000);
}

async function testAlert(driver) {
  //navigate to next page https://formy-project.herokuapp.com/thanks there is a alert messag

  await driver.get("https://formy-project.herokuapp.com/thanks");

  await driver.sleep(2000);

  //div[role='alert'] get this

    let alert = await driver.findElement(By.css("div[role='alert']"));
    let alertText = await alert.getText();
    assert.strictEqual(alertText, "The form was successfully submitted!");

    await driver.sleep(2000);
    
}

async function runTests() {
  let driver;

  try {
    driver = await setupDriver();
    await navigateToFormPage(driver);
    await fillForm(driver);
    await testAlert(driver);
  } catch (error) {
    console.error(error);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}

runTests().catch((error) => console.error(error));
