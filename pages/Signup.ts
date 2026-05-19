import { Page,expect,Locator } from "@playwright/test";

export class Signup
{
    page: Page;
    Signuplink: Locator;
    

    constructor(page:Page)
    {

            this.page= page;
            this.Signuplink= page.getByRole("link", {name: "Sign up"});

    }

        //Verify clicking the Signup button
    async ClickSignup()
    {
        await this.Signuplink.click();

        const verifysignup = await this.page.locator("#signInModalLabel").textContent();

        if(verifysignup == "Sign up")
        {
            console.log("Sign Up Popup displayed");
        }
        else
        {
            console.log("Sign Up popup not displayed");
        }

    }



}