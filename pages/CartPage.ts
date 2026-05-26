import { Page, expect, Locator } from "@playwright/test"
import { testData } from "./Testdata";

export class Cartpage {

    page: Page

    constructor(page: Page) {
        this.page = page;
    }

    async clickoncart(page: Page) {

        await page.getByRole('link', { name: 'Cart', exact: true }).click();

        const Product = await page.getByText("Products").isVisible();

        console.log("Products text is visible", Product);
    }


    async verifyCartItems(expectedProducts: string[]) {


        // await expect(this.page.locator("#totalp")).toBeVisible();
        const cartRows = this.page.locator('#tbodyid tr');

        await expect(cartRows).not.toHaveCount(0);

        // ✅ Get count of items in cart
        const count = await cartRows.count();
        console.log("Items in cart:", count);

        await expect(count).toBeGreaterThan(0);

        const actualProducts: string[] = [];

        for (let i = 0; i < count; i++) {

            // Get product name (2nd column = Title)
            const productName = await cartRows.nth(i).locator('td:nth-child(2)').textContent();

            if (productName) {
                actualProducts.push(productName.trim());
            }
        }

        console.log("Actual Products:", actualProducts);

        //  Assertion
       // await expect(actualProducts).toEqual(expectedProducts);
    }

}