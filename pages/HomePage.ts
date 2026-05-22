import {Page,expect,Locator} from "@playwright/test"

export class HomePage{

    page: Page;
    Signup:Locator;
    Login:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.Signup= page.locator("#signin2");
        this.Login= page.locator("#login2");
    }

    //Verify Homepage launch
    async HomepageLaunch(): Promise<string>
    {
         await this.page.goto("https://www.demoblaze.com/index.html");

         const title= await this.page.title();;
            return title; 
    }
}