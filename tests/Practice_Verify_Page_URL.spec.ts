import {test,expect} from "@playwright/test";

test("Verify Page URL",async ({page})=>{ 
    await page.goto("https://www.demoblaze.com/");
    let URL: String =  page.url();
    console.log("URL Contains:", URL);
    await expect(page).toHaveURL(/demoblaze/); //Checks the URL contains the Word specified
})