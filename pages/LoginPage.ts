import {test,expect,Locator,Page} from "@playwright/test"

export class LoginPage{

    page: Page;
    username:Locator; //Locator is a Playwright object used to identify and interact with web elements
    password:Locator;
    loginbutton:Locator;
    constructor(page: Page)
    {
        this.page=page; 
        this.username= page.locator("#loginusername"); // Assigning the locator references or address to the this.username
        this.password= page.locator("#loginpassword");
        this.loginbutton= page.getByRole("button", {name: "Log in"});
    }

    //Verifying Login functionality
    async VerifyLogin(username: string,password: string)
    {
        this.username.fill(username); // adds the values in fields
        this.username.fill(password);
        this.loginbutton.click();
    }

}
