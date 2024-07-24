import { Builder, By, until } from "selenium-webdriver";
import "chromedriver";
import assert from "assert";

async function runTests() {
    const username = "standard_user";
    const password = "secret_sauce";
    let driver;

    try {
        driver = await new Builder().forBrowser("chrome").build();

        // Test: Login with invalid credentials
        await driver.get("https://www.saucedemo.com/");

        let usernameField = await driver.findElement(By.id("user-name"));
        await usernameField.sendKeys("standard");

        let passwordField = await driver.findElement(By.id("password"));
        await passwordField.sendKeys("random");

        let loginButton = await driver.findElement(By.id("login-button"));
        await loginButton.click();

        try {
            await driver.wait(until.elementLocated(By.css("h3")), 20000);
            let errorMessage = await driver.findElement(By.css("h3")).getText();
            console.log("Error message:", errorMessage);
            assert(errorMessage.length > 0, "Expected error message not found");
        } catch (err) {
            console.log("Error message element not found:", err);
        }

        // Test: Login with valid credentials
        await driver.get("https://www.saucedemo.com/");

        usernameField = await driver.findElement(By.id("user-name"));
        await usernameField.sendKeys(username);

        passwordField = await driver.findElement(By.id("password"));
        await passwordField.sendKeys(password);

        loginButton = await driver.findElement(By.id("login-button"));
        await loginButton.click();

        await driver.wait(until.urlContains("inventory.html"), 20000);

        let currentUrl = await driver.getCurrentUrl();
        console.log("Current URL:", currentUrl);

        assert(currentUrl.includes("inventory.html"), "Login failed or URL is incorrect");

    } finally {
        if (driver) {
            await driver.quit();
        }
    }
}

runTests().catch(error => console.log(error));
