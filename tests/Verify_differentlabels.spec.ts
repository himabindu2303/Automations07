import { test, expect, Locator} from "@playwright/test"

test("Verify Page title", async({page})=>{

   await page.goto("https://www.demoblaze.com/");



   // To get the title on the top of the page

    /*let title = await page.locator("#nava").textContent();

    console.log("Page title is", title);

    await expect(page.locator("#nava")).toHaveText("PRODUCT STORE")*/




    // To use getby AltText() Locator

    /*const first:Locator= page.getByAltText("First slide") // getByAltText() - identifies images based on the Alt attribute
    
    await expect(first).toBeVisible(); //await should be used only if the statement is returning some promise*/




    //To Use previous button by using the locator

   /* let previousbutton  = await page.locator("#carousel-control-prev-icon");

   await previousbutton.click();*/



   //To Use the getByText()


  // await expect(page.getByText("Samsung").nth(3)).toBeVisible(); // getByText() method is used for Non Interactive Elements
/*
 // To Use the getBYRole()

   await page.getByRole('link', { name: 'Cart'}).click(); // getByRole() method is used for finding elements based on the role.Here Role is not an attribute

   //For Non Interactive elements also we can use getByRole()

   await expect(page.getByRole('heading', { name: 'Products'})).toBeVisible();
   //Same can be used by getByText() method

   const Product= await page.getByText("Products").isVisible();
   console.log("Products text is visible" , Product); //Verifying the text is visible or not
   */

/*//Sign Up User

   //To Use the getByLabel()
   await page.getByRole("link", {name: "Sign up"}).click();
   await page.getByLabel('Username:').fill("Happy777777777");
   await page.getByLabel('Password:').fill("77");
   await page.getByRole('button', { name: 'Sign up' }).click();

const [dialog] = await Promise.all([
  page.waitForEvent('dialog'),
  page.getByRole("button", { name: "Sign up" }).click()
]);

await dialog.accept();

await expect(page.locator("#signInModal")).toBeHidden();

await expect(page.locator("#login2")).toContainText("Log in");
*/

//Verify page is loaded
await expect(page.getByText("CATEGORIES")).toBeVisible();
console.log("Categories text is visible");

//Login as User


   await page.getByRole("link",{name: "Log in"}).click();
   await expect(page.locator('#logInModal')).toBeVisible();
   await page.locator('#loginusername').fill("Happy777777777");
   await page.locator("#loginpassword").fill("77");
   await page.getByRole("button", {name: "Log in"}).click();

   await expect(page.locator("#logInModal")).toBeHidden();

   

  await expect(page.locator("#nameofuser")).toContainText("Welcome");

// Select Laptops from Categories

await page.getByRole('link', { name: 'Laptops' }).click();

await page.waitForTimeout(5000);

const Nextbutton= await page.locator('#next2');
await expect(Nextbutton).toBeVisible();
await Nextbutton.click();

console.log("Next button is visible");

//Selecting a Macbook
const Macbook = await page.getByRole('link', { name: 'MacBook Pro' });
await expect(Macbook).toBeVisible();
await Macbook.click();

await page.waitForTimeout(2000);
//Verify page is navigated to Macbook details page
const details= await page.locator("#tbodyid");
await expect(details).toBeVisible();
console.log("Macbook details page is displayed")

//Verify adding to cart

const addtocart= await page.getByRole('link',{name: "Add to cart"});
await addtocart.click();

const [dialog] = await Promise.all([
  page.waitForEvent('dialog'),
  //expect(page.getByText("Product added")).toContainText("Product")
]);

await dialog.accept();

await page.getByRole('link',{name: "Cart"}).nth(0).click();

// To Check Cart page is visible
const Product= await page.getByText("Products").isVisible();
   console.log("Products text is visible" , Product);

})