import {Page,expect,Locator} from "@playwright/test"

export class ProductPage{

    page: Page;

    constructor(page: Page)
    {
        this.page = page;
        expect(this.page.getByText("CATEGORIES")).toBeVisible();
        console.log("Containers text is visible");
    }

}