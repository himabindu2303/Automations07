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

        await this.loginbutton.click();

        const userText = this.page.locator('#nameofuser');
        const loginModal = this.page.locator('#logInModal');

        try {

            // Check successful login (old user)
            await userText.waitFor({ state: 'visible', timeout: 5000 });

            await expect(userText).toContainText(Username);
            console.log("Login successful - existing user");

            return true; // old user

        } catch {

            // New user (or) invalid login
            console.log("User does not exist - navigating for signup");

            if (await loginModal.isVisible()) {
                await loginModal.getByRole('button', { name: 'Close' }).click();
            }

            return false; // new user
        }
    }



}