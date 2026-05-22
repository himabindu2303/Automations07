import { test, expect, Locator, Page } from "@playwright/test"
import { testData } from "./Testdata";

export class LoginPage {

    page: Page;
    username: Locator; //Locator is a Playwright object used to identify and interact with web elements
    password: Locator;
    loginbutton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.username = page.locator("#loginusername"); // Assigning the locator references or address to the this.username
        this.password = page.locator("#loginpassword");
        this.loginbutton = page.getByRole("button", { name: "Log in" });
    }

    //Validate Login button
    async ClickLoginbutton(page: Page) {
        page.getByRole("link", { name: "Log in" }).click();

        const loginpopup = await page.locator("#logInModalLabel").textContent();

        if (loginpopup == "Log in") {
            console.log("Login popup displayed");

        }
        else {
            console.log("Login popup not displayed")
        }
    }

    //Verifying Login with the user
    async VerifyLogin(Username: string, Password: string): Promise<boolean> {
        await this.username.fill(Username); // adds the values in fields
        await this.password.fill(Password);
        let isUserExists = true;
        let dialogDetected = false;

        this.page.once('dialog', async dialog => {
            dialogDetected = true;

            const content = dialog.message();

            if (content.includes("User does not exist")) {
                isUserExists = false;
            }

            await dialog.accept();

            // Close login modal only if dialog came
            await this.page.getByLabel('Log in').getByText('Close').click();
        });


        await this.loginbutton.click();

        console.log("Login clicked");


        if (isUserExists) {

            const userText = this.page.locator("#nameofuser");
            await expect(userText).toBeVisible();
            await expect(userText).toContainText(Username);
        }

        return isUserExists;
    }
}