import {Page,expect,Locator} from "@playwright/test"

export class HomePage{

    page: Page;
    Login:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.Login= page.locator("#login2");
    }

    //Verify Homepage launch
    async HomepageLaunch(): Promise<string>
    {
         await this.page.goto("https://www.demoblaze.com/index.html");

         const title= await this.page.title();;
            return title; 
    }

    //Verify clicking the Login button
    async ClickLogin()
    {
        await this.Login.click();
    }


}