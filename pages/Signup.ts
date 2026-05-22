import { Page,expect,Locator } from "@playwright/test";

export class Signup
{
    page: Page;
    Signuplink: Locator;
    Username: Locator;
    Password: Locator;
    signinbutton: Locator;
    

    constructor(page:Page)
    {

            this.page= page;
            this.Signuplink= page.getByRole("link", {name: "Sign up"});
            this.Username= page.locator("#sign-username");
            this.Password= page.locator("#sign-password");
            this.signinbutton = page.getByRole('button', { name: 'Sign up' });

    }

        //Verify clicking the Signup button
    async ClickSignup()
    {
        await this.Signuplink.click();

        const verifysignuppopup = await this.page.locator("#signInModalLabel").textContent();

        if(verifysignuppopup == "Sign up")
        {
            console.log("Sign Up Popup displayed");
        }
        else
        {
            console.log("Sign Up popup not displayed");
        }

    }

    //Verify Signup for new user
    async NewUserSignup(username: string, password: string)
    {
        await this.Username.fill(username);
        await this.Password.fill(password);
        await this.signinbutton.click();
        console.log("Signed in Successfully");

    }




}