import {test,expect} from "@playwright/test";


test("Verify page navigation",async ({page})=>{

    await page.goto("https://www.demoblaze.com/");

   // let pagetitle: string= page.title();
    console.log("Page title is:" , await page.title());

    await expect(page).toHaveTitle("STORE");
})
//test("Verify")