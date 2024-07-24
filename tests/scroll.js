import { Builder, By, until } from "selenium-webdriver";
import "chromedriver";
import assert from "assert";

async function scrollTest() {
    let driver;

    try {
        driver = await new Builder().forBrowser("chrome").build();
        await driver.get("https://formy-project.herokuapp.com/scroll");

        // Adding a delay to ensure the page loads
        await driver.sleep(2000);

        // Scroll to the name field and enter a name
        let nameField = await driver.findElement(By.id("name"));
        await driver.executeScript("arguments[0].scrollIntoView(true);", nameField);
        await driver.sleep(1000); // Adding a delay to see the scroll
        await nameField.sendKeys("John Doe");

        // Adding a delay after entering the name
        await driver.sleep(1000);

        // Scroll to the date field and enter a date
        let dateField = await driver.findElement(By.id("date"));
        await driver.executeScript("arguments[0].scrollIntoView(true);", dateField);
        await driver.sleep(1000); // Adding a delay to see the scroll
        await dateField.sendKeys("01/01/2020");

        // Adding a delay after entering the date
        await driver.sleep(1000);

    } finally {
        if (driver) {
            await driver.quit();
        }
    }
}

scrollTest().catch(error => console.log(error));
