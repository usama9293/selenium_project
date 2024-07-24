import { Builder, By, until } from "selenium-webdriver";
import "chromedriver";
import assert from "assert";



async function runTests() {

    let driver;

    try{

        driver = await new Builder().forBrowser("chrome").build();
        await driver.get("https://formy-project.herokuapp.com/switch-window");
        await driver.sleep(2000);

        // let newTabButton = await driver.findElement(By.id("new-tab-button"));
        // await newTabButton.click();

        // await driver.sleep(2000);

        // let originalHandle = await driver.getWindowHandle();
        // let handles = await driver.getAllWindowHandles();

        // for(let handle of handles){
        //     if(handle !== originalHandle){
        //         await driver.switchTo().window(handle);
        //         break;
        //     }
        // }

        // await driver.sleep(2000);

        let alertButton = await driver.findElement(By.id("alert-button"));
        await alertButton.click();

        await driver.sleep(2000);

        await driver.switchTo().alert().accept();

        await driver.sleep(2000);




    }
    finally{
        if(driver){
            await driver.quit();
        }
    }
}

runTests().catch(error => console.log(error));